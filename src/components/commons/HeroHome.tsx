import React from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'

import { mq } from '~/styles/utils/media'
import ImageWrapper from '~/components/commons/ImageWrapper'

// Types ----------

interface HeroHomeProps {
	imageURL: any
	logoURL: any
}

// HeroHome ------

const HeroHome: React.FC<HeroHomeProps> = (props) => {
	const { imageURL, logoURL } = props

	return (
		<Wrapper>
			<ImageWrapper>
				<BackgroundWrapper>
					<Image layout="responsive" alt="" src={imageURL} />
				</BackgroundWrapper>
				<LogoWrapper>
					<Image layout="fill" alt="Recipe Finder" src={logoURL} objectFit="contain" />
				</LogoWrapper>
			</ImageWrapper>
		</Wrapper>
	)
}

// Styles ---------

const Wrapper = styled.section`
	height: auto;
	width: 100%;
`

const BackgroundWrapper = styled.div`
	display: block;
	height: auto;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
	z-index: 1;
`

const LogoWrapper = styled.div`
	display: block;
	height: 100%;
	left: 50%;
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 30%;
	z-index: 2;

	${mq('md')`
    height: 60%;
  `}
`

// Export ---------

export default HeroHome
