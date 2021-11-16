import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { RandomRecipesContextProvider } from '~/contexts/RandomContext'

import RecipesOfTheDay from '~/components/RecipesOfTheDay'
import Search from '~/components/Search'

// Home Page ---------

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Recipe Finder</title>
				<meta name="description" content="Recipe Finder Challenge" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<RandomRecipesContextProvider>
				<RecipesOfTheDay />
			</RandomRecipesContextProvider>

			<Search />
		</div>
	)
}

export default Home
