import { model, Schema } from 'mongoose'

import { ROLES } from '../../../utils'

const UserSchema = new Schema({
	email: String,
	password: String,
	businessName: String,
	firstName: String,
	lastName: String,
	displayName: String,
	providerId: String,
	provider: String,
	role: { type: String, default: ROLES.Customer },
})

const UserModel = model('User', UserSchema)

export { UserModel }
