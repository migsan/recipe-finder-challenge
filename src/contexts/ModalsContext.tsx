import React, { createContext, useReducer, useContext } from 'react'

export enum ModalsActionTypes {
	SetSearchModal = 'SET_SEARCH_MODAL',
}

type ModalsStateType = {
	isSearchModalOpen?: boolean
}

type ModalsContextType = {
	state: ModalsStateType
	dispatch: (action: ModalsActions) => void
}

type ModalsActions = {
	payload: Partial<ModalsStateType>
	type: ModalsActionTypes
}

const modalsInitialState: ModalsStateType = {
	isSearchModalOpen: false,
}

const ModalsContext = createContext<ModalsContextType | null>(null)

const reducer = (state: ModalsStateType, action: ModalsActions): ModalsStateType => {
	switch (action.type) {
		case ModalsActionTypes.SetSearchModal:
			return { ...state, isSearchModalOpen: action.payload.isSearchModalOpen }
		default:
			return state
	}
}

export const ModalsContextProvider: React.FC = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, modalsInitialState)

	return <ModalsContext.Provider value={{ state, dispatch }}>{children}</ModalsContext.Provider>
}

// Modals State Context

export const useModalsContext = () => {
	const contextValue = useContext(ModalsContext)

	if (contextValue === undefined) {
		throw new Error('Expected a ModalsContext in the React tree to set the context value')
	}

	return contextValue
}
