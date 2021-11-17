import axios from 'axios'

import { RandomMealResponse, SearchMealsResponse } from '~/api/@types/MealAPI'
import { RecipeType } from '~/api/@types/RecipeCustom'

import { parseRecipe, parseMultipleRecipes } from '~/api/utils'

enum Endpoints {
	Random = '/random.php',
	Detail = '/lookup.php',
	Search = '/search.php',
}

// Instantiate Axios with the base API URL
const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_MEAL_API_URL,
	timeout: 5000,
})

export namespace API {
	/**
	 * @returns One random recipe from The Meal DB
	 */
	export const getRandomRecipe = async (): Promise<RecipeType> => {
		// Adding random unique param to try to bypass Safari not calling
		// the request multiple times
		const config = {
			params: {
				unique: `${Date.now()}-${Math.trunc(Math.random() * 100000)}`,
			},
		}

		try {
			const response = await instance.get<RandomMealResponse>(Endpoints.Random, config)

			if (response === null) {
				throw Error('Failed to fetch random meal data')
			}

			const randomSingleMeal = response.data.meals[0]

			const cleanRecipe = parseRecipe(randomSingleMeal)

			return cleanRecipe
		} catch (error) {
			console.error(error)
			throw new Error('Get Random Recipe Failed')
		}
	}

	/**
	 * @returns Recipe Details for a single Recipe
	 */
	export const getRecipeById = async (recipeId: string): Promise<RecipeType> => {
		try {
			const config = {
				params: {
					i: recipeId,
				},
			}
			const response = await instance.get<RandomMealResponse>(Endpoints.Detail, config)

			if (response === null) {
				throw Error('Failed to fetch meal details data')
			}

			const randomSingleMeal = response.data.meals[0]

			const cleanRecipe = parseRecipe(randomSingleMeal)

			return cleanRecipe
		} catch (error) {
			console.error(error)
			throw new Error('Get Recipe By Id Failed')
		}
	}

	/**
	 * @returns Search Recipes by Name
	 */
	export const getRecipesByName = async (query: string): Promise<RecipeType[] | []> => {
		try {
			const config = {
				params: {
					s: query,
				},
			}
			const response = await instance.get<SearchMealsResponse>(Endpoints.Search, config)

			if (response === null) {
				throw Error(`Failed to fetch meals by name ${query}`)
			}

			const foundMeals = response.data.meals

			if (!foundMeals) {
				return []
			}

			const cleanRecipes = parseMultipleRecipes(foundMeals)

			return cleanRecipes
		} catch (error) {
			console.error(error)
			throw new Error('Get Recipes By Name Failed')
		}
	}
}
