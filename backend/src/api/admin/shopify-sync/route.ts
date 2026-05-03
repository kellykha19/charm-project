/**
 * Admin API: GET/POST /admin/shopify-sync
 *
 * GET  — Test Shopify connection and return store info
 * POST — Trigger sync actions:
 *   { action: "push-products" }      — Push all Medusa products to Shopify
 *   { action: "push-inventory" }     — Push Medusa inventory to Shopify
 *   { action: "pull-orders" }        — Pull Shopify orders into Medusa
 *   { action: "pull-inventory" }     — Pull Shopify inventory snapshot
 *   { action: "test" }               — Test connection
 */

import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ShopifySyncService } from "../../../modules/shopify-sync/service/shopify-sync"

function getSync(): ShopifySyncService {
  const svc = ShopifySyncService.fromEnv()
  if (!svc) throw new Error("Shopify not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_ACCESS_TOKEN.")
  return svc
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const sync = getSync()
    const status = await sync.testConnection()
    const locations = status.connected ? await sync.getLocations() : []
    return res.json({ ...status, locations })
  } catch (e: any) {
    return res.status(500).json({ error: e.message })
  }
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { action } = req.body as { action: string }

  try {
    const sync = getSync()

    switch (action) {
      case "test": {
        const status = await sync.testConnection()
        return res.json(status)
      }

      case "pull-orders": {
        const sinceId = (req.body as any).since_id
        const orders = await sync.getOrders(sinceId)
        return res.json({ action, count: orders.length, orders: orders.map((o: any) => ({ id: o.id, name: o.name, total: o.total_price, status: o.financial_status })) })
      }

      case "pull-inventory": {
        const inventory = await sync.pullFullInventory()
        const snapshot: Record<string, number> = {}
        for (const [sku, data] of inventory) snapshot[sku] = data.total
        return res.json({ action, skuCount: inventory.size, snapshot })
      }

      case "push-inventory": {
        const { skus } = req.body as { skus?: Record<string, number> }
        if (!skus) return res.status(400).json({ error: "Provide 'skus' map: { SKU: quantity }" })
        const skuMap = new Map(Object.entries(skus).map(([k, v]) => [k, v as number]))
        const result = await sync.pushAllInventory(skuMap)
        return res.json({ action, ...result })
      }

      case "get-products": {
        const products = await sync.getProducts()
        return res.json({
          action,
          count: products.length,
          products: products.map((p: any) => ({
            id: p.id,
            title: p.title,
            variants: p.variants?.length || 0,
            status: p.status,
          })),
        })
      }

      default:
        return res.status(400).json({
          error: `Unknown action: ${action}`,
          actions: ["test", "get-products", "pull-orders", "pull-inventory", "push-inventory"],
        })
    }
  } catch (e: any) {
    return res.status(500).json({ error: e.message })
  }
}
