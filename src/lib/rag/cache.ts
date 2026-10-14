/**
 * Small in-process LRU with TTL. Used for query embeddings: they are deterministic for a given
 * model + dimensions + text and contain no per-user data, so sharing them is safe. Per pod only.
 */
export class LruCache<V> {
  private map = new Map<string, { value: V; expires: number }>()
  max: number
  ttlMs: number
  hits = 0
  misses = 0
  constructor(max: number, ttlMs: number) {
    this.max = max
    this.ttlMs = ttlMs
  }
  get(key: string, now = Date.now()): V | undefined {
    const e = this.map.get(key)
    if (!e || e.expires < now) {
      if (e) this.map.delete(key)
      this.misses++
      return undefined
    }
    this.map.delete(key)
    this.map.set(key, e)
    this.hits++
    return e.value
  }
  set(key: string, value: V, now = Date.now()) {
    this.map.delete(key)
    this.map.set(key, { value, expires: now + this.ttlMs })
    while (this.map.size > this.max) this.map.delete(this.map.keys().next().value as string)
  }
  get size() {
    return this.map.size
  }
}

export const normalizeQuery = (q: string) => q.trim().toLowerCase().replace(/\s+/g, ' ')
