'use client'

import type { ThemeProviderProps as NextThemesProviderProps } from 'next-themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type * as React from 'react'

export interface ThemeProviderProps extends NextThemesProviderProps {
  children: React.ReactNode
}

const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = true,
  storageKey = 'theme',
  attribute = 'class',
  ...props
}: ThemeProviderProps) => {
  return (
    //   <NextThemesProvider
    //     attribute={attribute}
    //     defaultTheme={defaultTheme}
    //     enableSystem={enableSystem}
    //     disableTransitionOnChange={disableTransitionOnChange}
    //     storageKey={storageKey}
    //     {...props} // cho phép override
    //   >
    //   </NextThemesProvider>
    children
  )
}

export { ThemeProvider }

// code template
// <ThemeProvider defaultTheme="light" enableSystem storageKey="theme">
//   {children}
// </ThemeProvider>
