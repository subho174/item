import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "Name is required"],
  },
  type: {
    type: String,
    lowercase: true,
    required: [true, "Type is required"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Description is required"],
  },
  coverImage: {
    type: String,
    trim: true,
    required: [true, "Cover Image is required"],
  },
  additionalImages: [
    {
      type: String,
      trim: true,
    },
  ],
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

export default Item;
