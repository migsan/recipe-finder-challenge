import '@emotion/react'

const typography = {
	display: `"Arial Black", "sans-serif"`,
	body: `"Arial", "sans-serif"`,
}

const colors = {
	black: '#000000',
	grey1: '#444444',
	white: '#FFFFFF',
	red: '#F2090C',
}

const colorTheme = {
	primary: colors.black,
	secondary: colors.white,
	contrast: colors.grey1,
	button: {
		primary: colors.red,
	},
}

const theme = {
	font: typography,
	colors: colorTheme,
}

export default theme
