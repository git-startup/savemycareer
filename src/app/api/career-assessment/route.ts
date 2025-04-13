import { NextResponse } from 'next/server';

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
    
    // Make sure userInfo has the required fields
    if (!userInfo || typeof userInfo !== 'object' || 
        !userInfo.career || !userInfo.location || !userInfo.experience) {
      return NextResponse.json(
        { success: false, message: 'User info must include career, location, and experience' },
        { status: 400 }
      );
    }
    
    // Call Laravel API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://iptvstreamline.com/api';
    const response = await fetch(`${apiUrl}/risk-assessments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Authorization': `Bearer ${process.env.API_TOKEN}` // Optional: If you use token authentication
      },
      body: JSON.stringify({
        name,
        email,
        risk_level_key: riskLevelKey, // Ensure this matches Laravel's expected field name
        percentage,
        user_info: {  // Make sure this is structured as an object
          career: userInfo.career,
          location: userInfo.location,
          experience: userInfo.experience
        },
        answers
      })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error response:', data);
      return NextResponse.json(
        { success: false, message: data.message || 'An error occurred during subscription', errors: data.errors },
        { status: response.status }
      );
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: data.message || 'Subscription successful'
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred during subscription' },
      { status: 500 }
    );
  }
}