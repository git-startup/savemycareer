import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract name and email from nested data structure if present
    let name, email, language;
    
    if (body.data && typeof body.data === 'object') {
      // Handle nested structure: { data: { name, email }, language }
      name = body.data.name;
      email = body.data.email;
      language = body.language || 'en';
    } else {
      // Handle flat structure: { name, email, language }
      name = body.name;
      email = body.email;
      language = body.language || 'en';
    }
    
    // Validate required fields
    const requiredFields = [];
    if (!name || (Array.isArray(name) && name.length === 0)) {
      requiredFields.push('name');
    }
    if (!email || (Array.isArray(email) && email.length === 0)) {
      requiredFields.push('email');
    }
    
    if (requiredFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${requiredFields.join(', ')}`,
          errors: { fields: requiredFields }
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare data for external API - send flat structure
    const emailData = {
      name: name,
      email: email,
      language: language
    };
    
    // Call external Laravel API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://iptvstreamline.com/api';
    
    try {
      const response = await fetch(`${apiUrl}/email-responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Add API key if you have one
          // 'Authorization': `Bearer ${process.env.API_TOKEN}`
        },
        body: JSON.stringify(emailData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        console.error('External API Error:', data);
        
        // Check if it's a validation error from Laravel
        if (response.status === 422 && data.errors) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Validation failed', 
              errors: data.errors 
            },
            { status: 422 }
          );
        }
        
        // For other errors, return a generic message
        return NextResponse.json(
          { 
            success: false, 
            message: data.message || 'Failed to submit email to external service' 
          },
          { status: response.status }
        );
      }
      
      // Success response
      return NextResponse.json({
        success: true,
        message: data.message || 'Email submitted successfully! You will receive your AI impact report via email.',
        data: {
          submissionId: data.id || null,
          reportDeliveryInfo: 'Your personalized AI impact report will be sent to your email within 24 hours.'
        }
      });
      
    } catch (apiError) {
      console.error('API call failed:', apiError);
      
      // Fallback: Store locally or log for manual processing
      console.log('Email data for manual processing:', emailData);
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Service temporarily unavailable. Please try again later.' 
        },
        { status: 503 }
      );
    }
    
  } catch (error) {
    console.error('Email subscription error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again.' 
      },
      { status: 500 }
    );
  }
}