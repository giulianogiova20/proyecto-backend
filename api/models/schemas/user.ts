import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { User } from "../../interfaces"
import { createNewCart } from '../../controllers/cart'
import { NextFunction } from 'express'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true, unique: true },
  password: { type: String, required: true },
  name:   { type: String, required: true },
  address: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  picture: { type: String, required: false },
  isAdmin: { type: String, required: true, default: false },
}, { collection: "users" })


userSchema.pre('save', async function (next) {
  const user = this
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    next()
  } catch (err: any) {
      next(err)
  }
})

userSchema.post('save', async function (res: any,next: NextFunction) {
  try {
    const user = {id: this.id, email: this.email}
    await createNewCart(user)
    next()
  } catch (err: any) {
      next(err)
  }
})


userSchema.methods.comparePassword = async (reqPassword: string, password: string): Promise<boolean> => {
  return await bcrypt.compareSync(reqPassword, password)
}

export default mongoose.model<User>('User', userSchema)