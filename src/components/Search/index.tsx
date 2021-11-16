import React from 'react'
import debounce from 'lodash/debounce'
import Link from 'next/link'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faSearch, faHeart } from '@fortawesome/free-solid-svg-icons'

import { useSearchContext, SearchActionTypes } from '~/contexts/SearchContext'
import { useModalsContext, ModalsActionTypes } from '~/contexts/ModalsContext'
import { useFavoritesContext } from '~/contexts/FavoritesContext'

import theme from '~/styles/theme'
import { mq } from '~/styles/utils/media'
import { bodyStyle } from '~/components/commons/Typography'

// Types ----------

interface SearchProps {}

type ModalProps = {
	isOpen: boolean
}

enum SearchToggleActions {
	Open = 'Open',
	Close = 'Close',
}

// Search ------

const Search: React.FC<SearchProps> = () => {
	const searchContext = useSearchContext()
	const modalsContext = useModalsContext()
	const favoritesContext = useFavoritesContext()

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

	const handleSearchToggle = (action: SearchToggleActions) => {
		const shouldOpen = action === SearchToggleActions.Open

		modalsContext?.dispatch({
			type: ModalsActionTypes.SetSearchModal,
			payload: {
				isSearchModalOpen: shouldOpen,
			},
		})
	}

	const hasResults = searchContext && searchContext.state && searchContext.state.recipes.length > 0

	const resultsList = searchContext?.state.recipes.map((recipe, index: number) => {
		return (
			<Link key={`search-result-${index}`} href={`/recipe/${recipe.id}`} passHref>
				<LinkElement>
					<Result>{recipe.title}</Result>
				</LinkElement>
			</Link>
		)
	})

	const hasFavorites =
		favoritesContext && favoritesContext.state.recipes && favoritesContext.state.recipes.length > 0

	return (
		<>
			<FloatingButtonSearch
				onClick={() => handleSearchToggle(SearchToggleActions.Open)}
				aria-label="Open Search"
			>
				<Icon icon={faSearch} size="sm" color={theme.colors.secondary} />
			</FloatingButtonSearch>

			{hasFavorites && (
				<Link href="/favorites" passHref>
					<FloatingButtonFavorites>
						<Icon icon={faHeart} size="sm" color={theme.colors.secondary} />
					</FloatingButtonFavorites>
				</Link>
			)}

			<Modal isOpen={modalsContext?.state.isSearchModalOpen ?? false}>
				<SearchWrapper>
					<BackButton
						onClick={() => handleSearchToggle(SearchToggleActions.Close)}
						aria-label="Close Search"
					>
						<Icon icon={faArrowLeft} size="sm" color={theme.colors.secondary} />
					</BackButton>
					<Input type="search" placeholder="I'm craving..." onChange={handleInputChange} />
				</SearchWrapper>

				{hasResults && <ResultsWrapper>{resultsList}</ResultsWrapper>}
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

const floatingButtonStyle = css`
	align-items: center;
	background-color: ${theme.colors.button.primary};
	border-radius: 50%;
	border: 0;
	display: flex;
	filter: drop-shadow(5px 5px 5px ${theme.colors.contrast});
	height: 60px;
	justify-content: center;
	position: fixed;
	right: 15px;
	transition: transform 0.3s ease-in;
	width: 60px;
	z-index: 5;

	${mq('lg')`
		&:hover {
			cursor: pointer;
			transform: scale(1.2);
		}
	`}
`

const FloatingButtonSearch = styled.button`
	${floatingButtonStyle}

	bottom: 15px;
`

const FloatingButtonFavorites = styled.a`
	${floatingButtonStyle}

	bottom: 90px;
`

const SearchWrapper = styled.div`
	align-items: center;
	background-color: ${({ theme }) => theme.colors.contrast};
	display: flex;
	flex-wrap: nowrap;
	/* TODO: Height of the Nav. Move to theme variable */
	height: 60px;
	padding: 0 ${({ theme }) => theme.spacing.gutter};
	width: 100%;
`

const ResultsWrapper = styled.ul`
	background-color: ${({ theme }) => theme.colors.secondary};
	display: block;
	/* TODO: 60 Height of the Nav. Move to theme variable */
	height: calc(100% - 60px);
	overflow-y: scroll;
	padding: ${({ theme }) => theme.spacing.inner} 0;
	width: 100%;
`

const Result = styled.li`
	${bodyStyle}

	display: inline-block;
	padding: ${({ theme }) => theme.spacing.inner};
	width: 100%;

	${mq('lg')`
		&:hover {
			cursor: pointer;
			text-decoration: underline;
		}
	`}
`

const LinkElement = styled.a``

const Icon = styled(FontAwesomeIcon)`
	display: block;
	height: 30px;
	width: 30px;
`

const BackButton = styled.button`
	align-items: center;
	background-color: ${({ theme }) => theme.colors.contrast};
	border: 0;
	display: flex;
	height: 40px;
	justify-content: center;
	width: 40px;
	transition: transform 0.3s ease-in;

	${mq('lg')`
		&:hover {
			cursor: pointer;
			transform: scale(1.2);
		}
	`}
`

const Input = styled.input`
	${bodyStyle}

	background-color: ${({ theme }) => theme.colors.contrast};
	color: ${({ theme }) => theme.colors.secondary};
	width: calc(100% - 30px);
	height: 100%;
	border: 0;
	padding: ${({ theme }) => theme.spacing.inner};

	&::-webkit-search-cancel-button {
		display: none;
	}
`

// Export ---------

export default Search
