/**
 * Shopify REST Admin API client.
 * Handles auth, pagination, rate limiting, and retries.
 */

interface ShopifyClientConfig {
  storeDomain: string
  accessToken: string
  apiVersion: string
}

export class ShopifyClient {
  private baseUrl: string
  private headers: Record<string, string>

  constructor(private config: ShopifyClientConfig) {
    this.baseUrl = `https://${config.storeDomain}/admin/api/${config.apiVersion}`
    this.headers = {
      "X-Shopify-Access-Token": config.accessToken,
      "Content-Type": "application/json",
    }
  }

  async get<T = any>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${this.baseUrl}/${endpoint}`)
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    return this.request<T>("GET", url.toString())
  }

  async post<T = any>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>("POST", `${this.baseUrl}/${endpoint}`, body)
  }

  async put<T = any>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>("PUT", `${this.baseUrl}/${endpoint}`, body)
  }

  async paginate<T = any>(endpoint: string, resourceKey: string, params?: Record<string, string>): Promise<T[]> {
    const results: T[] = []
    const url = new URL(`${this.baseUrl}/${endpoint}`)
    url.searchParams.set("limit", "250")
    if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
    let nextUrl: string | null = url.toString()

    while (nextUrl) {
      const res = await this.fetchWithRetry(nextUrl, { headers: this.headers })
      const data = await res.json()
      results.push(...(data[resourceKey] || []))

      const link = res.headers.get("Link") || ""
      nextUrl = null
      for (const part of link.split(",")) {
        if (part.includes('rel="next"')) {
          const match = part.match(/<([^>]+)>/)
          if (match) nextUrl = match[1]
        }
      }
    }
    return results
  }

  private async request<T>(method: string, url: string, body?: unknown): Promise<T> {
    const res = await this.fetchWithRetry(url, {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    })
    return res.json()
  }

  private async fetchWithRetry(url: string, init: RequestInit, maxRetries = 3): Promise<Response> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const res = await fetch(url, init)

      if (res.status === 429) {
        const wait = parseFloat(res.headers.get("Retry-After") || "2") * 1000
        await new Promise(r => setTimeout(r, wait))
        continue
      }
      if (res.status >= 500 && attempt < maxRetries - 1) {
        await new Promise(r => setTimeout(r, 2 ** (attempt + 1) * 1000))
        continue
      }
      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Shopify API ${res.status}: ${text.slice(0, 300)}`)
      }
      return res
    }
    throw new Error("Shopify API: max retries exceeded")
  }
}
