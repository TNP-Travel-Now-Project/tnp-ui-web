'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type * as React from 'react'

export interface QueryProviderProps {
  children: React.ReactNode
  /** Override default query options */
  defaultOptions?: {
    queries?: {
      staleTime?: number
      gcTime?: number
      retry?: number | boolean
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
    }
    mutations?: {
      retry?: number | boolean
    }
  }
}

const makeQueryClient = (defaultOptions?: QueryProviderProps['defaultOptions']) => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 phút
        gcTime: 5 * 60 * 1000, // 5 phút (trước là cacheTime)
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        ...defaultOptions?.queries,
      },
      mutations: {
        retry: 1,
        ...defaultOptions?.mutations,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

const getQueryClient = (defaultOptions?: QueryProviderProps['defaultOptions']) => {
  if (typeof window === 'undefined') {
    // Server-side: luôn tạo mới
    return makeQueryClient(defaultOptions)
  }

  // Browser-side: reuse instance
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient(defaultOptions)
  }
  return browserQueryClient
}

const QueryProvider = ({ children, defaultOptions }: QueryProviderProps) => {
  const queryClient = getQueryClient(defaultOptions)

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export { QueryProvider }

{
  /* <QueryProvider 
  defaultOptions={{
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
    }
  }}
>
  {children}
</QueryProvider> */
}
