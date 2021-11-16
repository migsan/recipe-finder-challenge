import { MealAPIObject } from '~/api/@types/MealAPI'
import { Ingredients, RecipeType } from '~/api/@types/RecipeCustom'

/**
 * Parse ingredients properties and match them with theirs corresponding measure
 * @param recipe
 * @returns Ingredients matched with measures
 */
const parseIngredients = (recipe: MealAPIObject) => {
	const INGREDIENT_PREFIX = 'strIngredient'
	const MEASURE_PREFIX = 'strMeasure'

	const ingredients: Ingredients = []

	const entries = Object.entries(recipe)

	const ingredientEntries = entries.filter(
		(entry) => entry[0].indexOf(INGREDIENT_PREFIX) > -1 && entry[1] !== '' && entry[1] !== null
	)
	const measureEntries = entries.filter(
		(entry) => entry[0].indexOf(MEASURE_PREFIX) > -1 && entry[1] !== ''
	)

	ingredientEntries.forEach((ingredient: [string, string], index: number) => {
		ingredients.push({
			ingredient: ingredient[1],
			measure: measureEntries[index][1],
		})
	})

	return ingredients
}

/**
 * Cleans the Meal object returned from the API
 * @param recipe
 * @returns
 */
export const parseRecipe = (recipe: MealAPIObject): RecipeType => {
	return {
		id: recipe.idMeal,
		title: recipe.strMeal,
		image: recipe.strMealThumb,
		instructions: recipe.strInstructions,
		ingredients: parseIngredients(recipe),
	}
}

/**
 * Cleans the multiple Meals objects returned from the API
 * @param recipe
 * @returns
 */
export const parseMultipleRecipes = (recipes: MealAPIObject[]): RecipeType[] => {
	const parsedRecipes = recipes.map((recipe) => parseRecipe(recipe))

	return parsedRecipes
}
