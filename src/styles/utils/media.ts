import { css } from '@emotion/react'

export const breakpoints = {
	sm: 420,
	md: 768,
	lg: 1025,
}

/**
 * Generate a media query css
 * @param key
 * @returns Media for the breakpoint provided
 */
export const mq = (key: keyof typeof breakpoints) => {
	return (template: TemplateStringsArray, ...args: any[]) =>
		css`
			@media (min-width: ${breakpoints[key]}px) {
				${css(template, ...args)};
			}
		`
}
