import { CacheControl } from 'remix/headers'

export const publicStaticCache = new CacheControl({
  public: true,
  maxAge: 3600,
}).toString()

export const browserPageCache = new CacheControl({
  private: true,
  maxAge: 300,
  staleWhileRevalidate: 3600,
}).toString()

export const noStoreCache = new CacheControl({
  noStore: true,
}).toString()

export const noStoreHeaders = {
  'Cache-Control': noStoreCache,
}
