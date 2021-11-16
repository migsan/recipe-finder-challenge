import React from 'react'
import styled from '@emotion/styled'

// Types ----------

interface ComponentProps {}

// Component ------

const Component: React.FC<ComponentProps> = (props) => {
	return (
		<>
			<StyledElement>Your Favorites</StyledElement>
		</>
	)
}

// Styles ---------

const StyledElement = styled.div(
	({ theme }) => `
    font-family: ${theme.font.display};
  `
)

// Export ---------

export default Component
