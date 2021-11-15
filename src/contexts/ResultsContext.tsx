import React, { createContext, useReducer, useContext, useEffect } from 'react'

import { RecipeType } from '~/api/@types/RecipeCustom'
import { getRandomRecipe } from '~/api'

export enum ActionTypes {
	Error = 'ERROR',
	FetchRandom = 'FETCH_RANDOM',
	FetchResults = 'FETCH_RESULTS',
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

const fetchRandomRecipes = async () => {
	const RECIPES_SIZE = 5
	const range = [...Array(RECIPES_SIZE).keys()]

	const recipes = await Promise.all(range.map(() => getRandomRecipe()))

	return recipes
}

const ResultsContext = createContext<ResultsStateType | null>(null)

const reducer = (state: ResultsStateType, action: ResultsActions): ResultsStateType => {
	switch (action.type) {
		case ActionTypes.FetchRandom:
			return { ...state, isLoading: true }
		case ActionTypes.FetchResults:
			return { ...state, isLoading: true }
		case ActionTypes.Success:
			return { ...state, isLoading: false, recipes: action.payload!.recipes }
		case ActionTypes.Error:
			return { ...state, isLoading: false, error: action.payload!.error }
		default:
			return state
	}
}

export const ResultsContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, resultsInitialState)

	const { isLoading } = state

	useEffect(() => {
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

		getRandomRecipes()
	}, [])

	return <ResultsContext.Provider value={state}>{children}</ResultsContext.Provider>
}

export const useResultsContext = () => {
	const contextValue = useContext(ResultsContext)

	if (contextValue === undefined) {
		throw new Error('Expected a ResultsContext in the React tree to set the context value')
	}

	return contextValue
}
