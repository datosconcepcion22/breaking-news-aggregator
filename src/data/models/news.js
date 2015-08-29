import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const News = new Schema({
  title: { type: String, required: true },
  text: { type: String },
  published: { type: Date, required: true },
  image: { type: String },
  url: { type: String }
})

News.index({ published: -1 })

export default mongoose.model('News', News)
