import React from 'react'
import Head from 'next/head'

import { RecipeType } from '~/api/@types/RecipeCustom'
import { getRecipeById } from '~/api'

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
			<h1>{title}</h1>
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
