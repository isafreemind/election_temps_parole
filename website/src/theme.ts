import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: '#f5f7ff' },
          100: { value: '#ebf0ff' },
          200: { value: '#d4dfff' },
          300: { value: '#a8bfff' },
          400: { value: '#7c9fff' },
          500: { value: '#667eea' },
          600: { value: '#5568d3' },
          700: { value: '#4452bc' },
          800: { value: '#333ca5' },
          900: { value: '#22268e' },
        },
        secondary: {
          500: { value: '#764ba2' },
        },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          value: '#0f172a',
        },
      },
    },
  },
})
