import React from 'react'
import styled from '@emotion/styled'

import { useRandomContext } from '~/contexts/RandomContext'

// Types ----------

interface RecipesOfTheDayProps {}

// RecipesOfTheDay ------

const RecipesOfTheDay: React.FC<RecipesOfTheDayProps> = (props) => {
	const resultsState = useRandomContext()

	return (
		<>
			{resultsState?.isLoading ? (
				<h1>Loading...</h1>
			) : (
				<pre>{JSON.stringify(resultsState?.recipes, null, 2)}</pre>
				// <span>results</span>
			)}
		</>
	)
}

// Styles ---------

const StyledElement = styled.div(
	({ theme }) => `
    font-family: ${theme.font.display};
  `
)

// Export ---------

export default RecipesOfTheDay
