import React, { createContext, useReducer, useContext, useEffect } from 'react'

import { RecipeType } from '~/api/@types/RecipeCustom'
import { getRandomRecipe } from '~/api'

export enum ActionTypes {
	Error = 'ERROR',
	FetchRandom = 'FETCH_RANDOM',
	Success = 'SUCCESS',
}

type ResultsStateType = {
	error?: string | null
	isLoading: boolean
	recipes: RecipeType[]
}

type ResultsActions = {
	payload?: {
		recipes: RecipeType[]
		error?: string | null
	}
	type: ActionTypes
}

const resultsInitialState: ResultsStateType = {
	error: null,
	isLoading: false,
	recipes: [],
}

/**
 * Retrieve and parse 5 meals from the API
 * @returns Array of 5 Clean recipe objetcs
 */
const fetchRandomRecipes = async () => {
	const RECIPES_SIZE = 5
	const range = [...Array(RECIPES_SIZE).keys()]

	const recipes = await Promise.all(range.map(() => getRandomRecipe()))

	return recipes
}

const RandomRecipesContext = createContext<ResultsStateType | null>(null)

const reducer = (state: ResultsStateType, action: ResultsActions): ResultsStateType => {
	switch (action.type) {
		case ActionTypes.FetchRandom:
			return { ...state, isLoading: true }
		case ActionTypes.Success:
			return { ...state, isLoading: false, recipes: action.payload!.recipes }
		case ActionTypes.Error:
			return { ...state, isLoading: false, error: action.payload!.error }
		default:
			return state
	}
}

export const RandomRecipesContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, resultsInitialState)

	useEffect(() => {
		// TODO: Store recipes in the browser to improve performance and reduce API calls.
		const getRandomRecipes = async () => {
			dispatch({
				type: ActionTypes.FetchRandom,
			})

			const recipes = await fetchRandomRecipes()

			dispatch({
				payload: {
					recipes: recipes,
				},
				type: ActionTypes.Success,
			})
		}

		// TODO: Check for recipes in the browser and avoid calling the API
		getRandomRecipes()
	}, [])

	return <RandomRecipesContext.Provider value={state}>{children}</RandomRecipesContext.Provider>
}

// Search by Name Context Provider

export const useRandomContext = () => {
	const contextValue = useContext(RandomRecipesContext)

	if (contextValue === undefined) {
		throw new Error('Expected a RandomRecipesContext in the React tree to set the context value')
	}

	return contextValue
}
