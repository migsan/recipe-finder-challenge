import React from 'react'

import styled from '@emotion/styled'

import { RecipeType } from '~/api/@types/RecipeCustom'
import { getRecipeById } from '~/api'

// Types --------------

interface RecipeDetailProps {
	recipeDetails: RecipeType
}

// ReceipeDetail ------

const ReceipeDetail = (props: RecipeDetailProps) => {
	const {
		recipeDetails: { title, image, instructions, ingredients },
	} = props

	return (
		<>
			<h1>{title}</h1>
		</>
	)
}

// Styles ---------

const StyledElement = styled.div(
	({ theme }) => `
    font-family: ${theme.font.display};
  `
)

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
