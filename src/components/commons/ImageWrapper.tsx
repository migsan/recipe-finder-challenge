import React from 'react'
import styled from '@emotion/styled'

import { mq } from '~/styles/utils/media'

// ImageWrapper ------

const ImageWrapper: React.FC = ({ children }) => {
	return <Wrapper>{children}</Wrapper>
}

// Styles ---------

const Wrapper = styled.div`
	height: 0;
	/* TODO: Create helper to generate aspect ratio containers */
	padding-top: calc(100% / 16 * 9); //16:9 Aspect Ratio
	width: 100%;
	position: relative;
	overflow: hidden;

	${mq('md')`
    padding-top: calc(100% / 21 * 9); //21:9 Aspect Ratio
  `}

	${mq('lg')`
    padding-top: 400px;
  `}
`

// Export ---------

export default ImageWrapper
