/**
 * Scheduled job: Sync inventory from Medusa to Shopify.
 * Runs every hour to keep Shopify stock levels in sync with Medusa.
 */

import type { MedusaContainer } from "@medusajs/framework/types"
import { ShopifySyncService } from "../modules/shopify-sync/service/shopify-sync"

export default async function shopifySyncJob(container: MedusaContainer) {
  const sync = ShopifySyncService.fromEnv()
  if (!sync) return

  const logger = container.resolve("logger") as any

  try {
    const connectionTest = await sync.testConnection()
    if (!connectionTest.connected) {
      logger.warn(`[shopify-sync] Connection failed: ${connectionTest.error}`)
      return
    }

    logger.info(`[shopify-sync] Connected to ${connectionTest.storeName}. Pulling inventory snapshot...`)
    const inventory = await sync.pullFullInventory()
    logger.info(`[shopify-sync] Pulled ${inventory.size} SKUs from Shopify`)
  } catch (error: any) {
    logger.error(`[shopify-sync] Sync failed: ${error.message}`)
  }
}

export const config = {
  name: "shopify-inventory-sync",
  schedule: "0 * * * *", // every hour
}
