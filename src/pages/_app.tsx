import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'

import globalStyles from '~/styles/global'
import theme from '~/styles/theme'

import { SearchRecipesContextProvider } from '~/contexts/SearchContext'
import { ModalsContextProvider } from '~/contexts/ModalsContext'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{globalStyles}
			<SearchRecipesContextProvider>
				<ModalsContextProvider>
					<ThemeProvider theme={theme}>
						<Component {...pageProps} />
					</ThemeProvider>
				</ModalsContextProvider>
			</SearchRecipesContextProvider>
		</>
	)
}

export default MyApp
