import React from 'react'
import styled from '@emotion/styled'

// SectionWrapper ------

const SectionWrapper: React.FC = ({ children }) => {
	return <Wrapper>{children}</Wrapper>
}

// Styles ---------

const Wrapper = styled.div(
	({ theme }) => `
    width: 100%;
    padding: ${theme.spacing.inner} ${theme.spacing.gutter};
  `
)

// Export ---------

export default SectionWrapper
