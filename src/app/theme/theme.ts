import type { ExtendableTheme } from '@pandacss/types'

const theme: ExtendableTheme = {
    extend: {
      tokens: {
        colors: {
          primary: {
            50: { value: '#eff6ff' },
            100: { value: '#dbeafe' },
            500: { value: '#3b82f6' },
            600: { value: '#2563eb' },
            700: { value: '#1d4ed8' },
            900: { value: '#1e3a8a' },
          },
          gray: {
            50: { value: '#f9fafb' },
            100: { value: '#f3f4f6' },
            200: { value: '#e5e7eb' },
            500: { value: '#6b7280' },
            600: { value: '#4b5563' },
            900: { value: '#111827' },
          },
        },
        spacing: {
          sm: { value: '0.5rem' },
          md: { value: '1rem' },
          lg: { value: '1.5rem' },
          xl: { value: '2rem' },
        },
        radii: {
          sm: { value: '0.25rem' },
          md: { value: '0.5rem' },
          lg: { value: '0.75rem' },
        },
        fontSizes: {
          sm: { value: '0.875rem' },
          base: { value: '1rem' },
          lg: { value: '1.125rem' },
        },
      },
    }
}

export { theme }