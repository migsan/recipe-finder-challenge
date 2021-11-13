// You are also able to use a 3rd party theme this way:
import '@emotion/react'
import { theme } from '~/styles/theme' 

declare module '@emotion/react' {
  type ThemeType = typeof theme
  export interface Theme extends ThemeType {}
}