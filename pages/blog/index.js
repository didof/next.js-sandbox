import Head from 'next/head'
import { Layout } from '../../components/notAuthenticated'

import {
	Grid,
	Paper,
	Typography,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails,
} from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(3),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	title: {
		padding: theme.spacing(3),
	},
}))

const blogList = ({ pages }) => {
	const classes = useStyles()

	const title = 'Blog list'

	const separatedPages = (pages) => {
		let separated = []
		pages.map(({ topic, slug }) => {
			if (!separated[topic]) {
				separated[topic] = [slug]
			} else {
				separated[topic].push(slug)
			}
		})

		return separated
	}

	const separated = separatedPages(pages)

	// Calculate how to build the grid
	const calculateBreakpoints = (numberOfTopics) => {
		switch (numberOfTopics.length) {
			case 1:
				return 12
			case 2:
			case 4:
				return 6
			default:
				return 4
		}
	}

	const breakpoints = calculateBreakpoints(Object.keys(separated))

	const list_pages = Object.entries(separated).map(([key, values]) => {
		return (
			<Grid item xs={breakpoints} key={key}>
				<Paper className={classes.paper}>
					<Typography component='h2' variant='title'>
						{key}
					</Typography>
					{values.map((page) => {
						return (
							<ExpansionPanel key={page}>
								<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
									<Typography component='h4' variant='subtitle'>{page}</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<Typography>Description</Typography>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						)
					})}
				</Paper>
			</Grid>
		)
	})

	return (
		<React.Fragment>
			<Head>
				<title>{title}</title>
			</Head>
			<Layout>
				<main>
					<Typography component='h1' variant='h4' className={classes.title}>
						List of all topics ({Object.keys(separated).length} arguments){' '}
					</Typography>
					<div className={classes.root}>
						<Grid container spacing={3}>
							{list_pages}
						</Grid>
					</div>
				</main>
			</Layout>
		</React.Fragment>
	)
}

blogList.getInitialProps = async () => {
	const pages = [
		{ topic: 'nextjs', slug: 'first-post' },
		{ topic: 'nextjs', slug: 'second-post' },
		{ topic: 'babel', slug: 'first-post' },
		{ topic: 'webpack', slug: 'first-post' },
		// { topic: 'react', slug: 'first-post' },
	]

	return { pages }
}

export default blogList
