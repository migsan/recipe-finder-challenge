import React from 'react'
import styled from '@emotion/styled'

import { useRandomContext } from '~/contexts/RandomContext'

import SectionWrapper from '~/components/commons/SectionWrapper'
import { breadcrumbStyle } from '~/components/commons/Typography'
import RecipesList from '~/components/commons/RecipesList'

// RecipesOfTheDay ------

const RecipesOfTheDay: React.FC = () => {
	const resultsState = useRandomContext()

	return (
		<Wrapper>
			<SectionWrapper>
				<Title>Recipes of the day</Title>

				<Results>
					{/* TODO: Add Card Skeleton loader while loading */}
					{resultsState?.isLoading && <span>Loading...</span>}

					{!resultsState?.isLoading && resultsState?.recipes && (
						<RecipesList recipes={resultsState.recipes} />
					)}
				</Results>
			</SectionWrapper>
		</Wrapper>
	)
}

// Styles ---------

const Wrapper = styled.main``

const Title = styled.h1`
	${breadcrumbStyle}

	margin: 0 0 ${({ theme }) => theme.spacing.push};
	text-align: center;
	width: 100%;
`

const Results = styled.div`
	width: 100%;
`

// Export ---------

export default RecipesOfTheDay
