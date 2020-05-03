// import '../styles/global.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../styles/theme'

export default ({ Component, pageProps }) => {
	return (
		<>
			<Head>
				<title>Blog</title>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}
