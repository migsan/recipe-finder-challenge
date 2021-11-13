import { css, Global } from '@emotion/react'

export default (
  <Global 
    styles={
      css`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        ul,
        ol,
        li {
          margin: 0;
          padding: 0;
          text-decoration: none;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        * {
          box-sizing: border-box;
        }
      `
    }
  />
)