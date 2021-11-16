import React from 'react'
import Head from 'next/head'

import { RecipeType } from '~/api/@types/RecipeCustom'
import { getRecipeById } from '~/api'

import Nav from '~/components/Nav'
import HeroDetail from '~/components/commons/HeroDetail'
import RecipeDetails from '~/components/RecipeDetails/RecipeDetails'

// Types --------------

interface RecipeDetailProps {
	recipeDetails: RecipeType
}

// ReceipeDetail Page ------

const ReceipeDetail = (props: RecipeDetailProps) => {
	const {
		recipeDetails: { title, image, instructions, ingredients },
	} = props

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content="Recipe Finder Challenge" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Nav />

			<HeroDetail title={title} imageURL={image} />

			<RecipeDetails ingredients={ingredients} instructions={instructions} />
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
