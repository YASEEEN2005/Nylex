import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Review from '../../../models/Review';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { quote, author, role, avatarColor, initials, rating } = body;

    if (!quote || !author) {
      return NextResponse.json(
        { error: 'Quote and author are required fields' },
        { status: 400 }
      );
    }

    const review = await Review.create({
      quote,
      author,
      role,
      avatarColor,
      initials,
      rating: rating || 5,
    });

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    
    // Fetch all reviews, sorted by newest first
    const reviews = await Review.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: reviews });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}
