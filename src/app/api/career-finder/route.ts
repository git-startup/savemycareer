import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://iptvstreamline.com';

interface SaveCareerFinderResultsProps {
  name: string;
  email: string;
  careers: string;
  userInfo: {
    currentField: string;
    educationLevel: string;
    adaptability: string;
  };
  answers: Record<number | string, number>;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  errors?: Record<string, string[]>;
}

/**
 * POST handler for career finder assessment results
 */
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Get request body
    const data = await request.json() as SaveCareerFinderResultsProps;
    
    // Validate required fields
    if (!data.name || !data.email || !data.careers) {
      return NextResponse.json({
        success: false,
        message: 'Required fields are missing',
        errors: {
          validation: ['Name, email and careers are required fields']
        }
      }, { status: 400 });
    }
    
    // Forward to external API
    const response = await fetch(`${API_BASE_URL}/api/assessments/career-finder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    // Get response data
    const responseData = await response.json();
    
    // Return response with appropriate status code
    return NextResponse.json(responseData, { 
      status: response.ok ? 200 : response.status 
    });
  } catch (error) {
    console.error('API request failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Server error occurred. Please try again later.'
    }, { status: 500 });
  }
}