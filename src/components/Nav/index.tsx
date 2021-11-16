import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

import theme from '~/styles/theme'
import { mq } from '~/styles/utils/media'

// Types ------

interface NavProps {
	handleFavoriteClick?(): void
	isFavorited?: boolean
}

// Nav ------

const Nav: React.FC<NavProps> = (props) => {
	const { handleFavoriteClick, isFavorited } = props

	return (
		<Wrapper>
			<Link href="/" passHref>
				<BackLink>
					<Icon icon={faArrowLeft} size="sm" color={theme.colors.secondary} />
				</BackLink>
			</Link>

			{handleFavoriteClick &&
				(isFavorited ? (
					<FavoriteButton aria-label="Remove from Favorites" onClick={handleFavoriteClick}>
						{/* "far" style of the fontAwesome icon doesn't work with Individual Imports */}
						<Icon icon={faHeartBroken} size="sm" color={theme.colors.button.primary} />
					</FavoriteButton>
				) : (
					<FavoriteButton aria-label="Add to Favorites" onClick={handleFavoriteClick}>
						<Icon icon={faHeart} size="sm" color={theme.colors.secondary} />
					</FavoriteButton>
				))}
		</Wrapper>
	)
}

// Styles ---------

const Wrapper = styled.nav`
	background-color: ${({ theme }) => theme.colors.contrast};
	display: flex;
	justify-content: space-between;
	flex-wrap: nowrap;
	/* TODO: Height of the Nav. Move to theme variable */
	height: 60px;
	padding: 0 ${({ theme }) => theme.spacing.gutter};
	width: 100%;
	align-items: center;
	left: 0;
	position: fixed;
	top: 0;
	z-index: 10;
`

const Icon = styled(FontAwesomeIcon)`
	display: block;
	height: 30px;
	width: 30px;
`

const BackLink = styled.a`
	align-items: center;
	background-color: ${({ theme }) => theme.colors.contrast};
	display: flex;
	height: 40px;
	justify-content: center;
	width: 40px;
	transition: transform 0.3s ease-in;

	${mq('lg')`
		&:hover {
			cursor: pointer;
			transform: scale(1.2);
		}
	`}
`

const FavoriteButton = styled.button`
	align-items: center;
	border: 0;
	background-color: ${({ theme }) => theme.colors.contrast};
	display: flex;
	height: 40px;
	justify-content: center;
	width: 40px;
	transition: transform 0.3s ease-in;

	${mq('lg')`
		&:hover {
			cursor: pointer;
			transform: scale(1.2);
		}
	`}
`

// Export ---------

export default Nav
