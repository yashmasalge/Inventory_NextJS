import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the schema as a simple object
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Define and export the Product model
const Product: Model<Document> = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
