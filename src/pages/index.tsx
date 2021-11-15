import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'

import { useResultsContext } from '~/contexts/ResultsContext'

const Home: NextPage = () => {
	const resultsState = useResultsContext()

	return (
		<div>
			<Head>
				<title>Recipe Finder</title>
				<meta name="description" content="Recipe Finder Challenge" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{resultsState?.isLoading ? (
				<h1>Loading...</h1>
			) : (
				<pre>{JSON.stringify(resultsState?.recipes, null, 2)}</pre>
			)}
		</div>
	)
}

export default Home
