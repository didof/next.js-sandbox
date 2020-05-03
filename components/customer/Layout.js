import Nav from './Nav'

import Container from '@material-ui/core/Container'

export default function Layout({ children }) {
	return (
		<div>
			<Nav />
			<Container>{children}</Container>
		</div>
	)
}
