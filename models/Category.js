import mongoose from "mongoose";
const { Schema } = mongoose

const categorySchema = new Schema({
    title: String,
    slug: { type: String, unique: true }
})

const Category = mongoose.model('Category', categorySchema)

export default Category