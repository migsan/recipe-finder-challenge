import styled from '@emotion/styled'
import { css } from '@emotion/react'

import theme from '~/styles/theme'

// Types ----------

// Styles ---------

export const heading1Style = css`
	font-family: ${theme.font.display};
	font-size: 24px;
	color: ${theme.colors.primary};
`

export const breadcrumbStyle = css`
	color: ${theme.colors.contrast};
	font-family: ${theme.font.body};
	font-size: 18px;
	font-style: italic;
	font-weight: 300;
`

export const bodyStyle = css`
	color: ${theme.colors.primary};
	font-size: 20px;
	font-family: ${theme.font.body};
	line-height: 1.4;
`

export const Heading1 = styled.span`
	${heading1Style}
`

export const Breadcrumb = styled.span`
	${breadcrumbStyle}
`

export const Body = styled.p`
	${bodyStyle}
`
