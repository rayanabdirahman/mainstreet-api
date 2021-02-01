import mongoose, { Schema } from 'mongoose'
import { RoleEnum } from '../../domain/enums/role.enum'
import BycryptHelper from '../../utilities/bcrypt-helper'

export interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  name: string
  username: string
  email: string
  avatar: string
  password: string
  role: RoleEnum[]
  address?: string
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, unique: true, index: true },
  avatar: { type: String },
  role: {
    type: [{
      type: String, 
      enum: [RoleEnum]
    }],
    default: RoleEnum.BUYER
  },
  password: { type: String, required: true },
  address: { type: Schema.Types.ObjectId, ref: 'Address' }
}, { timestamps: true })

// Encrypt user password before saving
UserSchema.pre('save', async function() {
  if(this.isModified('password')) {
    // hash user password
    const password = await BycryptHelper.encryptPassword(this.get('password'))
    this.set({ password })
  }
})

export default mongoose.model<UserDocument>('User', UserSchema)
