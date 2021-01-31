import mongoose, { Schema } from 'mongoose'

export interface OrganisationDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId
  name: string
  username: string
  avatar: string
  members: mongoose.Types.ObjectId[]
  stores: mongoose.Types.ObjectId[]
}

const OrganisationSchema: mongoose.Schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true },
  avatar: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  stores: [{ type: Schema.Types.ObjectId, ref: 'Store' }],
}, { timestamps: true })

export default mongoose.model<OrganisationDocument>('Organisation', OrganisationSchema)
