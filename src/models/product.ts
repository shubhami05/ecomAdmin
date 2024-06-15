import mongoose, { Schema, model } from "mongoose";

const ProductSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: Array }
})

// export const Product = model('Product',ProductSchema)

const Product = (mongoose.models.Product) || mongoose.model("Product", ProductSchema)
export { Product }