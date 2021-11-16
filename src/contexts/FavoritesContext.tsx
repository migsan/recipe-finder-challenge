import React, { createContext, useReducer, useContext, useEffect, useState } from 'react'

import { RecipeType } from '~/api/@types/RecipeCustom'

export enum FavoritesActionTypes {
	Error = 'ERROR',
	FetchFavorites = 'FETCH_FAVORITES',
	UpdateFavorite = 'UPDATE_FAVORITE',
	Success = 'SUCCESS',
}

type FavoritesStateType = {
	isLoading: boolean
	recipes: RecipeType[]
}

type FavoritesContextType = {
	state: FavoritesStateType
	dispatch: (action: FavoritesActions) => void
}

type FavoritesActions = {
	payload?: {
		recipes: RecipeType[]
		error?: string | null
	}
	type: FavoritesActionTypes
}

type TransformedType = {
	parsedObject: Record<string, RecipeType>
	parsedArray: RecipeType[]
}

const favoritesInitialState: FavoritesStateType = {
	isLoading: false,
	recipes: [],
}

const FavoritesContext = createContext<FavoritesContextType | null>(null)

const transformFromLocalStorage = (LSObject: string): TransformedType => {
	const parsedObject = JSON.parse(LSObject)
	const entries = Object.entries(parsedObject)

	if (entries.length > 0) {
		const parsedArray = entries.map((entry) => entry[1]) as RecipeType[]

		return { parsedObject: parsedObject, parsedArray: parsedArray }
	}

	return {
		parsedObject: parsedObject,
		parsedArray: [],
	}
}

/**
 * Utility to check for duplicated and omit adding to localStorage
 * @param state Previews state
 * @param recipe New recipe to try to add
 * @returns New recipes with desired recipe added
 */
const updateFavorites = (state: FavoritesStateType, recipesToAdd: RecipeType[]): RecipeType[] => {
	const recipesCopy = [...state.recipes]

	if (recipesCopy.some((recipe) => recipe.id === recipesToAdd[0].id)) {
		const newRecipes = recipesCopy.filter((recipe) => {
			return recipe.id !== recipesToAdd[0].id
		})

		return newRecipes
	}

	recipesCopy.push(recipesToAdd[0])
	return recipesCopy
}

const reducer = (state: FavoritesStateType, action: FavoritesActions): FavoritesStateType => {
	switch (action.type) {
		case FavoritesActionTypes.FetchFavorites:
			return { ...state, isLoading: true }

		case FavoritesActionTypes.UpdateFavorite:
			return {
				...state,
				isLoading: false,
				recipes: updateFavorites(state, action.payload!.recipes),
			}

		case FavoritesActionTypes.Success:
			return { ...state, isLoading: false, recipes: action.payload!.recipes }

		default:
			return state
	}
}

export const FavoritesContextProvider: React.FC = ({ children }) => {
	const FAVORITES_KEY = 'user-favorites'

	const [state, dispatch] = useReducer(reducer, favoritesInitialState)

	// Fetch Favorites on load
	useEffect(() => {
		dispatch({
			type: FavoritesActionTypes.FetchFavorites,
		})

		const { parsedArray } = transformFromLocalStorage(localStorage.getItem(FAVORITES_KEY) || '{}')

		dispatch({
			type: FavoritesActionTypes.Success,
			payload: {
				recipes: parsedArray,
			},
		})
	}, [])

	// Store new Favorites when state changes
	useEffect(() => {
		localStorage.setItem(FAVORITES_KEY, JSON.stringify(state.recipes))
	}, [state])

	return (
		<FavoritesContext.Provider value={{ state, dispatch }}>{children}</FavoritesContext.Provider>
	)
}

// Search by Name Context Provider

export const useFavoritesContext = () => {
	const contextValue = useContext(FavoritesContext)

	if (contextValue === undefined) {
		throw new Error('Expected a FavoritesContext in the React tree to set the context value')
	}

	return contextValue
}
