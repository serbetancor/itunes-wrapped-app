import { createFetch } from '@vueuse/core'

import type { useFetch, UseFetchOptions } from '@vueuse/core'

export function createApiFetch(baseUrl: string, options: UseFetchOptions = {}): typeof useFetch {
  return createFetch({
    baseUrl,
    fetchOptions: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    ...options,
  })
}

export function buildUrl(
  parts: string,
  searchParams?: Record<string, string | number | boolean> | URLSearchParams,
): string {
  const params = new URLSearchParams(searchParams as Record<string, string> | URLSearchParams)
  return params.size ? parts.concat(`?${params.toString()}`) : parts
}
