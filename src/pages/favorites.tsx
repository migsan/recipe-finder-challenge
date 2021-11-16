import React from 'react'

import FavoritesList from '~/components/FavoritesList'
import Nav from '~/components/Nav'

// Types ----------

interface ComponentProps {}

// Component ------

const Component: React.FC<ComponentProps> = (props) => {
	return (
		<>
			<Nav />
			<FavoritesList />
		</>
	)
}

// Export ---------

export default Component
