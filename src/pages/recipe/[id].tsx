import React from 'react'
import Head from 'next/head'

import { RecipeType } from '~/api/@types/RecipeCustom'
import { getRecipeById } from '~/api'

import { useFavoritesContext, FavoritesActionTypes } from '~/contexts/FavoritesContext'
import { isAlreadyStored } from '~/utils'

import Nav from '~/components/Nav'
import HeroDetail from '~/components/commons/HeroDetail'
import RecipeDetails from '~/components/RecipeDetails/RecipeDetails'

// Types --------------

interface RecipeDetailProps {
	recipeDetails: RecipeType
}

// ReceipeDetail Page ------

const ReceipeDetail = (props: RecipeDetailProps) => {
	const { recipeDetails } = props

	const favoritesContext = useFavoritesContext()

	const isFavorited = isAlreadyStored(favoritesContext?.state.recipes || [], recipeDetails)

	const handleFavoriteClick = () => {
		if (favoritesContext) {
			favoritesContext.dispatch({
				type: FavoritesActionTypes.UpdateFavorite,
				payload: {
					recipes: [recipeDetails],
				},
			})
		}
	}

	return (
		<>
			<Head>
				<title>{recipeDetails.title}</title>
				<meta name="description" content="Recipe Finder Challenge" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Nav handleFavoriteClick={handleFavoriteClick} isFavorited={isFavorited} />

			<HeroDetail title={recipeDetails.title} imageURL={recipeDetails.image} />

			<RecipeDetails
				ingredients={recipeDetails.ingredients}
				instructions={recipeDetails.instructions}
			/>
		</>
	)
}

export async function getServerSideProps(props: any) {
	const {
		query: { id },
	} = props

	const recipeDetails = await getRecipeById(id)

	return {
		props: {
			recipeDetails: recipeDetails,
		},
	}
}

// Export ---------

export default ReceipeDetail
