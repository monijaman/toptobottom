import mongoose from "mongoose";
// import { MongooseQueryLogger } from 'mongoose-query-logger';

// Define the schema for the color sizes
const colorSizeSchema = new mongoose.Schema({
  type: String,
  value: String
});

// Define the schema for the colors
const colorSchema = new mongoose.Schema({
  type: String,
  sizes: [colorSizeSchema] // Make sizes an array of colorSizeSchema
});

 const conditionSchema = new mongoose.Schema({
    id: String,
    name: String
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    //  colors: [colorSchema], // Make colors an array of colorSchema
    // coloro: [{}],
    conditions:  [{}],
    brand: { type: String },
    rating: { type: Number,  default: 0 },
    numReviews: { type: Number,  default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// productSchema.plugin(queryLogger.getPlugin());

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;

