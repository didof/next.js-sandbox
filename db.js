require('dotenv').config()

import { UserModel } from './server/database/schema'
import mongoose from 'mongoose'

const { Types } = mongoose

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
   console.log('> Connection to db')
})

UserModel.find({}).exec((err, users) => {
  users.forEach(u => console.log(u))
})

UserModel.updateOne({ email: "didonato.fr@gmail.com" }, { role: "Admin" }).exec()