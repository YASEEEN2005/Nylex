import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  quote: string;
  author: string;
  role?: string;
  avatarColor: string;
  initials: string;
  rating?: number;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema({
  quote: {
    type: String,
    required: [true, 'Please provide a quote'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Please provide an author name'],
    trim: true,
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  role: {
    type: String,
    trim: true,
  },
  avatarColor: {
    type: String,
    required: true,
    default: 'bg-blue-600',
  },
  initials: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
