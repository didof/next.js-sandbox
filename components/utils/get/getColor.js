export const getColor = (color) => {
	const parsed = parseInt(color, 10)
		switch (parsed) {
			case 1:
				return 'default'
			case 2:
				return 'primary'
			case 3:
				return 'secondary'
			default:
				return 'inherit'
		}
	}