import Button from '@material-ui/core/Button'
import { useRouter } from 'next/router'
import { useEffect, createRef } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { getColor } from '../utils'

const useStyles = makeStyles((theme) => ({
	btn: {
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
	},
}))

export default ({
	children = 'missing children',
	href = '/',
	prefetch = 'true',
	color,
	variant = 'outlined',
}) => {
	const classes = useStyles()

	const router = useRouter()

	const btnRef = createRef()

	const clr = getColor(color)

	useEffect(() => {
		if (prefetch) {
			console.log(`> prefetching ${href}`)
			router.prefetch(href)
		} else {
			btnRef.current.addEventListener('mouseenter', handle_mouseEnter)
		}
	}, [])

	const handle_mouseEnter = (e) => {
		console.log(`> prefetching ${href}`)
		e.preventDefault()
		router.prefetch(href)
	}

	const handle_click = (e) => {
		e.preventDefault()
		router.push(href)
	}

	return (
		<Button
			color={clr}
			variant={variant}
			onClick={handle_click}
			ref={btnRef}
			className={classes.btn}
		>
			{children}
		</Button>
	)
}
