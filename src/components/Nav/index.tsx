import React from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import theme from '~/styles/theme'

// Component ------

const Component: React.FC = () => {
	return (
		<Wrapper>
			<Link href="/" passHref>
				<BackLink>
					<Icon icon={faArrowLeft} size="sm" color={theme.colors.secondary} />
				</BackLink>
			</Link>
		</Wrapper>
	)
}

// Styles ---------

const Wrapper = styled.nav`
	background-color: ${({ theme }) => theme.colors.contrast};
	display: flex;
	flex-wrap: nowrap;
	/* TODO: Height of the Nav. Move to theme variable */
	height: 60px;
	padding: 0 ${({ theme }) => theme.spacing.gutter};
	width: 100%;
	align-items: center;
	left: 0;
	position: fixed;
	top: 0;
	z-index: 10;
`

const Icon = styled(FontAwesomeIcon)`
	display: block;
	height: 30px;
	width: 30px;
`

const BackLink = styled.a`
	align-items: center;
	background-color: ${({ theme }) => theme.colors.contrast};
	display: flex;
	height: 40px;
	justify-content: center;
	width: 40px;
`

// Export ---------

export default Component
