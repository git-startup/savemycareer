// src/app/api/subscribe/route.ts
import { NextResponse } from 'next/server';
import { connect } from '@/lib/database';
import { UserSubscription } from '@/models/UserSubscription';

export async function POST(request: Request) {
  try { 
    const body = await request.json();
    const { name, email, riskLevelKey, percentage, userInfo, answers } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connect();

    // Create new subscription document
    const subscription = new UserSubscription({
      name,
      email,
      subscriptionDate: new Date(),
      assessmentResults: {
        riskLevelKey,
        percentage,
        userInfo,
        answers
      }
    });

    // Save to database
    await subscription.save();

    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Subscription successful' 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during subscription' },
      { status: 500 }
    );
  }
}