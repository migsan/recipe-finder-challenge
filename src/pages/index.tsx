import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'

import { RandomRecipesContextProvider } from '~/contexts/RandomContext'

import RecipesOfTheDay from '~/components/RecipesOfTheDay'
import Search from '~/components/Search'
import HeroHome from '~/components/commons/HeroHome'

import backgroundImage from '../../public/images/hero_image.jpeg'
import logoImage from '../../public/images/logo.png'

// Home Page ---------

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Recipe Finder</title>
				<meta name="description" content="Recipe Finder Challenge" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<HeroHome imageURL={backgroundImage} logoURL={logoImage} />

			<RandomRecipesContextProvider>
				<RecipesOfTheDay />
			</RandomRecipesContextProvider>

			<Search />
		</div>
	)
}

export default Home
