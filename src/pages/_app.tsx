import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'

import globalStyles from '~/styles/global'
import theme from '~/styles/theme'

import { SearchRecipesContextProvider } from '~/contexts/SearchContext'
import { FavoritesContextProvider } from '~/contexts/FavoritesContext'
import { ModalsContextProvider } from '~/contexts/ModalsContext'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{globalStyles}
			<SearchRecipesContextProvider>
				<FavoritesContextProvider>
					<ModalsContextProvider>
						<ThemeProvider theme={theme}>
							<Component {...pageProps} />
						</ThemeProvider>
					</ModalsContextProvider>
				</FavoritesContextProvider>
			</SearchRecipesContextProvider>
		</>
	)
}

export default MyApp
