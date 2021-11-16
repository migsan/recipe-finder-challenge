import { RecipeType } from '~/api/@types/RecipeCustom'

export const isAlreadyStored = (favorites: RecipeType[], recipe: RecipeType) => {
	return favorites.some((storedRecipe) => storedRecipe.id === recipe.id)
}
