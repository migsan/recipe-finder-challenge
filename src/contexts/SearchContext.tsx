import React, { createContext, useReducer, useContext, useEffect } from 'react'

import { RecipeType } from '~/api/@types/RecipeCustom'
import { getRecipesByName } from '~/api'

export enum SearchActionTypes {
	Error = 'ERROR',
	FetchResults = 'FETCH_RESULTS',
	Success = 'SUCCESS',
}

type SearchStateType = {
	error?: string | null
	isLoading: boolean
	recipes: RecipeType[]
	query?: string
}

type SearchContextType = {
	state: SearchStateType
	dispatch: (action: SearchActions) => void
}

type SearchActions = {
	payload?: {
		recipes?: RecipeType[]
		error?: string | null
		query?: string
	}
	type: SearchActionTypes
}

const resultsInitialState: SearchStateType = {
	error: null,
	isLoading: false,
	recipes: [],
	query: '',
}

/**
 * Search and parse meals from the Meal API
 * @returns Array of clean recipe objetcs based on query
 */
const fetchSearchResults = async (query: string) => {
	const recipes = await getRecipesByName(query)

	return recipes
}

const SearchRecipesContext = createContext<SearchContextType | null>(null)

const reducer = (state: SearchStateType, action: SearchActions): SearchStateType => {
	switch (action.type) {
		case SearchActionTypes.FetchResults:
			return { ...state, isLoading: true, query: action.payload!.query }
		case SearchActionTypes.Success:
			return { ...state, isLoading: false, recipes: action.payload!.recipes! }
		case SearchActionTypes.Error:
			return { ...state, isLoading: false, error: action.payload!.error }
		default:
			return state
	}
}

// Search Recipe by Name Context Provider
export const SearchRecipesContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, resultsInitialState)

	const { query } = state

	useEffect(() => {
		if (query && query.length) {
			const getRecipesByName = async () => {
				const recipes = await fetchSearchResults(query)

				dispatch({
					payload: {
						recipes: recipes,
					},
					type: SearchActionTypes.Success,
				})
			}

			getRecipesByName()
		}
	}, [query])

	return (
		<SearchRecipesContext.Provider value={{ state, dispatch }}>
			{children}
		</SearchRecipesContext.Provider>
	)
}

// Search by Name Context Provider

export const useSearchContext = () => {
	const contextValue = useContext(SearchRecipesContext)

	if (contextValue === undefined) {
		throw new Error('Expected a SearchRecipesContext in the React tree to set the context value')
	}

	return contextValue
}
