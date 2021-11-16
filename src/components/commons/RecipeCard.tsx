import React from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'

import { mq } from '~/styles/utils/media'

import ImageWrapper from '~/components/commons/ImageWrapper'
import { heading1Style } from '~/components/commons/Typography'

// Types ----------

interface RecipeCardProps {
	title: string
	imageURL: string
	recipeId: string
}

// RecipeCard ------

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
	const { title, imageURL, recipeId } = props

	return (
		<Wrapper>
			<Link href={`/recipe/${recipeId}`} passHref>
				<LinkElement>
					<Title>{title}</Title>
					<ImageWrapper>
						<Image layout="fill" alt={title} src={imageURL} objectFit="cover" />
					</ImageWrapper>
				</LinkElement>
			</Link>
		</Wrapper>
	)
}

// Styles ---------

const Wrapper = styled.div`
	width: 100%;
	padding: ${({ theme }) => theme.spacing.inner} 0;

	${mq('lg')`
		img {
			filter: brightness(0.7);
			transition: filter 0.3s ease;
		}

		&:hover {
			img {
				filter: brightness(1);
			}
		}
	`}
`

const Title = styled.span`
	${heading1Style}

	display: inline-block;
	margin-bottom: ${({ theme }) => theme.spacing.inner};
	text-align: center;
	width: 100%;
`

const LinkElement = styled.a``

// Export ---------

export default RecipeCard
