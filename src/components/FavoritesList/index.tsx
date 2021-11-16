import React from 'react'
import styled from '@emotion/styled'
import isEmpty from 'lodash/isEmpty'

import { useFavoritesContext } from '~/contexts/FavoritesContext'

import SectionWrapper from '~/components/commons/SectionWrapper'
import RecipesList from '~/components/commons/RecipesList'
import { breadcrumbStyle } from '~/components/commons/Typography'

// FavoritesList ------

const FavoritesList: React.FC = () => {
	const favoritesContext = useFavoritesContext()

	return (
		<Wrapper>
			<SectionWrapper>
				<Title>Your Favorites</Title>
			</SectionWrapper>

			<Favorites>
				{/* TODO: Add Card Skeleton loader while loading */}
				{favoritesContext?.state.isLoading && <span>Loading...</span>}

				{!favoritesContext?.state.isLoading && isEmpty(favoritesContext?.state.recipes) && (
					<span>You have no favorites yet.</span>
				)}

				{!favoritesContext?.state.isLoading && favoritesContext?.state.recipes && (
					<RecipesList recipes={favoritesContext?.state.recipes} />
				)}
			</Favorites>
		</Wrapper>
	)
}

// Styles ---------

const Wrapper = styled.main``

const Title = styled.h1`
	${breadcrumbStyle}

	margin: 0 0 ${({ theme }) => theme.spacing.push};
	text-align: center;
	width: 100%;
`

const Favorites = styled.div`
	width: 100%;
`

// Export ---------

export default FavoritesList
