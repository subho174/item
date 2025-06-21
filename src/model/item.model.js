import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  coverImage: String,
  additionalImages: [String],
}, { timestamps: true });

export const Item = mongoose.models.Item || mongoose.model('Item', ItemSchema);