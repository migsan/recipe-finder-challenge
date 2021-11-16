import React from 'react'

import { RecipeType } from '~/api/@types/RecipeCustom'

import RecipeCard from '~/components/commons/RecipeCard'

// Types ----------

interface ComponentProps {
	recipes: RecipeType[]
}

// Component ------

const Component: React.FC<ComponentProps> = (props) => {
	const { recipes } = props

	const recipesCards = recipes.map((recipe, index: number) => {
		return (
			<RecipeCard
				key={`recipe-card-${index}`}
				title={recipe.title}
				imageURL={recipe.image}
				recipeId={recipe.id}
			/>
		)
	})

	return <>{recipesCards}</>
}

// Export ---------

export default Component
