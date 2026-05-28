import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  name: string;
  email?: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this review.'],
    trim: true,
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating'],
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: [true, 'Please provide a comment'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
