import React from 'react'
import debounce from 'lodash/debounce'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import { useSearchContext, SearchActionTypes } from '~/contexts/SearchContext'
import { useModalsContext, ModalsActionTypes } from '~/contexts/ModalsContext'

// Types ----------

interface SearchProps {}

type ModalProps = {
	isOpen: boolean
}

// Search ------

const Search: React.FC<SearchProps> = () => {
	const searchContext = useSearchContext()
	const modalsContext = useModalsContext()

	const updateValue = debounce((value) => {
		if (searchContext) {
			searchContext.dispatch({
				type: SearchActionTypes.FetchResults,
				payload: {
					query: value,
				},
			})
		}
	}, 200)

	const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
		if (event.currentTarget.value.length > 1) {
			updateValue(event.currentTarget.value)
		} else if (event.currentTarget.value.length === 0) {
			updateValue('')
		}
	}

	const handleSearchOpen = () => {
		modalsContext?.dispatch({
			type: ModalsActionTypes.SetSearchModal,
			payload: {
				isSearchModalOpen: true,
			},
		})
	}

	const hasResults = searchContext && searchContext.state && searchContext.state.recipes.length > 0

	return (
		<>
			<FloatingButton onClick={handleSearchOpen} />

			<Modal isOpen={modalsContext?.state.isSearchModalOpen ?? false}>
				<SearchWrapper>
					<Input type="search" placeholder="I'm craving..." onChange={handleInputChange} />
				</SearchWrapper>

				{hasResults && (
					<ResultsWrapper>
						<pre>{JSON.stringify(searchContext.state.recipes, null, 2)}</pre>
					</ResultsWrapper>
				)}
			</Modal>
		</>
	)
}

// Styles ---------

const openModalStyles = css`
	right: 0;
`

const Modal = styled.div<ModalProps>`
	width: 100vw;
	height: 100vh;
	height: -webkit-fill-available;
	background: ${({ theme }) => theme.colors.secondary};
	position: fixed;
	right: -100%;
	top: 0;
	z-index: 10;
	transition: right 0.3s ease-in;

	${({ isOpen }) => isOpen && openModalStyles}
`

const FloatingButton = styled.button`
	background-color: ${({ theme }) => theme.colors.button.primary};
	border: 0;
	border-radius: 50%;
	bottom: 20px;
	display: block;
	height: 40px;
	position: fixed;
	right: 20px;
	width: 40px;
	z-index: 5;
`

const SearchWrapper = styled.div(
	({ theme }) => `
    background-color: ${theme.colors.contrast};
    height: 60px;
    width: 100%;
  `
)

const ResultsWrapper = styled.div(
	({ theme }) => `
    background-color: ${theme.colors.secondary};
    height: 60px;
    width: 100%;
  `
)

const Input = styled.input``

// Export ---------

export default Search
