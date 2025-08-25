declare module '*.mdx' {
  import type { FC } from 'react'
  import type { MDXComponents } from 'nextra/mdx-components'
  const ReactComponent: FC<{
    components?: MDXComponents
  }>
  export default ReactComponent
}


import 'tailwindcss/tailwind.css'

declare module 'tailwindcss/tailwind.css' {
  interface CustomColors {
    border: string
    background: string
    foreground: string
    ring: string
    farbe: {
      DEFAULT: string
      rgb: string
      hex: string
    }
  }
  
  interface Theme {
    extend: {
      colors: CustomColors & {
        [key: string]: string | CustomColors
      }
    }
  }
}
