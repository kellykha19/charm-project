/**
 * Shopify Sync Service for Medusa.
 *
 * Medusa is the source of truth. This service:
 * - Pushes product changes from Medusa → Shopify
 * - Pushes inventory changes from Medusa → Shopify
 * - Pulls orders from Shopify → Medusa (for dual-channel)
 */

import { ShopifyClient } from "./shopify-client"

export interface ShopifySyncConfig {
  storeDomain: string
  accessToken: string
  apiVersion: string
}

export class ShopifySyncService {
  private client: ShopifyClient

  constructor(config: ShopifySyncConfig) {
    this.client = new ShopifyClient(config)
  }

  static fromEnv(): ShopifySyncService | null {
    const domain = process.env.SHOPIFY_STORE_DOMAIN
    const token = process.env.SHOPIFY_ACCESS_TOKEN
    const version = process.env.SHOPIFY_API_VERSION || "2026-04"
    if (!domain || !token) return null
    return new ShopifySyncService({ storeDomain: domain, accessToken: token, apiVersion: version })
  }

  // ── Products: Medusa → Shopify ──────────────────────

  async pushProduct(product: {
    title: string
    description: string
    variants: { sku: string; price: string; inventory_quantity?: number }[]
    images?: { src: string }[]
    tags?: string
  }): Promise<any> {
    return this.client.post("products.json", { product })
  }

  async updateShopifyProduct(shopifyProductId: number, updates: Record<string, any>): Promise<any> {
    return this.client.put(`products/${shopifyProductId}.json`, { product: updates })
  }

  // ── Inventory: Medusa → Shopify ─────────────────────

  async pushInventoryLevel(inventoryItemId: number, locationId: number, available: number): Promise<void> {
    await this.client.post("inventory_levels/set.json", {
      inventory_item_id: inventoryItemId,
      location_id: locationId,
      available,
    })
  }

  async pushAllInventory(skuQuantities: Map<string, number>): Promise<{ synced: number; failed: number; errors: string[] }> {
    const result = { synced: 0, failed: 0, errors: [] as string[] }

    const locations = await this.getLocations()
    const primaryLocation = locations.find((l: any) => l.active) || locations[0]
    if (!primaryLocation) {
      result.errors.push("No active Shopify location found")
      return result
    }

    const products = await this.getProducts()
    const skuToItem = new Map<string, number>()
    for (const product of products) {
      for (const variant of product.variants || []) {
        if (variant.sku && skuQuantities.has(variant.sku)) {
          skuToItem.set(variant.sku, variant.inventory_item_id)
        }
      }
    }

    for (const [sku, quantity] of skuQuantities) {
      const itemId = skuToItem.get(sku)
      if (!itemId) {
        result.errors.push(`SKU not found in Shopify: ${sku}`)
        result.failed++
        continue
      }
      try {
        await this.pushInventoryLevel(itemId, primaryLocation.id, quantity)
        result.synced++
      } catch (e: any) {
        result.errors.push(`${sku}: ${e.message}`)
        result.failed++
      }
    }
    return result
  }

  // ── Orders: Shopify → Medusa ────────────────────────

  async getOrders(sinceId?: number): Promise<any[]> {
    const params: Record<string, string> = { status: "any" }
    if (sinceId) params.since_id = sinceId.toString()
    return this.client.paginate("orders.json", "orders", params)
  }

  async getOrder(orderId: number): Promise<any> {
    const data = await this.client.get(`orders/${orderId}.json`)
    return data.order
  }

  // ── Products: read from Shopify ─────────────────────

  async getProducts(): Promise<any[]> {
    return this.client.paginate("products.json", "products", { status: "active" })
  }

  async getProduct(productId: number): Promise<any> {
    const data = await this.client.get(`products/${productId}.json`)
    return data.product
  }

  // ── Locations & Inventory: read from Shopify ────────

  async getLocations(): Promise<any[]> {
    const data = await this.client.get("locations.json")
    return data.locations || []
  }

  async getInventoryLevels(locationId: number): Promise<any[]> {
    return this.client.paginate("inventory_levels.json", "inventory_levels", {
      location_ids: locationId.toString(),
    })
  }

  async pullFullInventory(): Promise<Map<string, { total: number; byLocation: Map<number, number> }>> {
    const inventory = new Map<string, { total: number; byLocation: Map<number, number> }>()
    const products = await this.getProducts()
    const locations = await this.getLocations()

    const skuToItemId = new Map<string, number>()
    for (const product of products) {
      for (const variant of product.variants || []) {
        if (variant.sku) {
          skuToItemId.set(variant.sku, variant.inventory_item_id)
          inventory.set(variant.sku, { total: variant.inventory_quantity || 0, byLocation: new Map() })
        }
      }
    }

    for (const location of locations.filter((l: any) => l.active)) {
      const levels = await this.getInventoryLevels(location.id)
      for (const level of levels) {
        for (const [sku, itemId] of skuToItemId) {
          if (level.inventory_item_id === itemId) {
            inventory.get(sku)?.byLocation.set(location.id, level.available || 0)
          }
        }
      }
    }

    return inventory
  }

  // ── Fulfillment ─────────────────────────────────────

  async createFulfillment(orderId: number, trackingNumber?: string, trackingCompany?: string): Promise<void> {
    await this.client.post(`orders/${orderId}/fulfillments.json`, {
      fulfillment: { tracking_number: trackingNumber, tracking_company: trackingCompany, notify_customer: true },
    })
  }

  // ── Health check ────────────────────────────────────

  async testConnection(): Promise<{ connected: boolean; storeName?: string; error?: string }> {
    try {
      const data = await this.client.get("shop.json")
      return { connected: true, storeName: data.shop?.name }
    } catch (e: any) {
      return { connected: false, error: e.message }
    }
  }
}
