import React from 'react'
import styled from '@emotion/styled'

import { Ingredients } from '~/api/@types/RecipeCustom'

import SectionWrapper from '~/components/commons/SectionWrapper'
import { Heading1, bodyStyle, Body } from '~/components/commons/Typography'

// Types ----------

interface RecipeDetailsProps {
	ingredients: Ingredients
	instructions: string
}

// RecipeDetails ------

const RecipeDetails: React.FC<RecipeDetailsProps> = (props) => {
	const { ingredients, instructions } = props

	const IngredientsList = ingredients.map((ingredient, index: number) => (
		<Ingredient key={`ingredient-${index}`}>
			{`${ingredient.measure} ${ingredient.ingredient}`}
		</Ingredient>
	))

	return (
		<Wrapper>
			<SectionWrapper>
				<IngredientsWrapper>{IngredientsList}</IngredientsWrapper>

				<Heading1>Directions</Heading1>
				<Body>{instructions}</Body>
			</SectionWrapper>
		</Wrapper>
	)
}

// Styles ---------

const Wrapper = styled.main``

const IngredientsWrapper = styled.ul`
	display: block;
	margin-bottom: ${({ theme }) => theme.spacing.push};
`

const Ingredient = styled.li`
	${bodyStyle}

	display: block;
	margin-bottom: ${({ theme }) => theme.spacing.list};
	width: 100%;
`

// Export ---------

export default RecipeDetails
