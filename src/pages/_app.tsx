import type { AppProps } from 'next/app'
import { ThemeProvider } from '@emotion/react'

import globalStyles from '~/styles/global'
import theme from '~/styles/theme'

import { ResultsContextProvider } from '~/contexts/ResultsContext'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			{globalStyles}
			<ResultsContextProvider>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</ResultsContextProvider>
		</>
	)
}

export default MyApp
