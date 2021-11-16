import React from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'

import ImageWrapper from '~/components/commons/ImageWrapper'
import SectionWrapper from '~/components/commons/SectionWrapper'
import { Heading1 } from '~/components/commons/Typography'

// Types ----------

interface HeroDetailProps {
	imageURL: string
	title: string
}

// HeroDetail ------

const HeroDetail: React.FC<HeroDetailProps> = (props) => {
	const { imageURL, title } = props

	return (
		<Wrapper>
			<ImageWrapper>
				<Image layout="fill" alt={title} src={imageURL} objectFit="cover" />
			</ImageWrapper>

			<SectionWrapper>
				<Heading1>{title}</Heading1>
			</SectionWrapper>
		</Wrapper>
	)
}

// Styles ---------

const Wrapper = styled.header`
	/* TODO: Height of the Nav. Move to theme variable */
	margin-top: 60px;
`

// Export ---------

export default HeroDetail
