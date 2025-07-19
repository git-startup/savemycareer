// src/app/api/survey/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'dateOfBirth', 'currentCareer', 'currentLocation', 'aiUsageFrequency', 'aiHelpfulness', 'aiToolsUsed'];
    const missingFields = requiredFields.filter(field => !body[field] || (Array.isArray(body[field]) && body[field].length === 0));
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}`,
          errors: { fields: missingFields }
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate date of birth (should be in the past and reasonable age range)
    const dob = new Date(body.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    
    if (age < 16 || age > 100) {
      return NextResponse.json(
        { success: false, message: 'Invalid date of birth' },
        { status: 400 }
      );
    }

    // Prepare data for external API
    const surveyData = {
      name: body.name,
      email: body.email,
      date_of_birth: body.dateOfBirth,
      current_career: body.currentCareer,
      current_location: body.currentLocation,
      current_employer: body.currentEmployer || null,
      current_salary: body.currentSalary || null,
      ai_usage_frequency: body.aiUsageFrequency,
      ai_helpfulness: body.aiHelpfulness,
      ai_tools_used: Array.isArray(body.aiToolsUsed) ? body.aiToolsUsed : [],
      most_used_ai_tool: body.mostUsedAiTool || null,
      ai_impact_on_job: body.aiImpactOnJob || null,
      work_from_home: body.workFromHome || null,
      years_experience: body.yearsExperience || null,
      industry_type: body.industryType || null,
      team_size: body.teamSize || null,
      ai_training_received: body.aiTrainingReceived || null,
      future_ai_concerns: body.futureAiConcerns || null,  
      additional_comments: body.additionalComments || null,
      submission_date: new Date().toISOString(),
      language: body.language || 'en'
    };
    
    // Call external Laravel API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://iptvstreamline.com/api';
    
    try {
      const response = await fetch(`${apiUrl}/survey-responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // Add API key if you have one
          // 'Authorization': `Bearer ${process.env.API_TOKEN}`
        },
        body: JSON.stringify(surveyData)
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
            message: data.message || 'Failed to submit survey to external service' 
          },
          { status: response.status }
        );
      }
      
      // Success response
      return NextResponse.json({
        success: true,
        message: data.message || 'Survey submitted successfully! You will receive your AI impact report via email.',
        data: {
          submissionId: data.id || null,
          reportDeliveryInfo: 'Your personalized AI impact report will be sent to your email within 24 hours.'
        }
      });
      
    } catch (apiError) {
      console.error('API call failed:', apiError);
      
      // Fallback: Store locally or log for manual processing
      console.log('Survey data for manual processing:', surveyData);
      
      return NextResponse.json(
        { 
          success: false, 
          message: 'Service temporarily unavailable. Please try again later.' 
        },
        { status: 503 }
      );
    }
    
  } catch (error) {
    console.error('Survey submission error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'An unexpected error occurred. Please try again.' 
      },
      { status: 500 }
    );
  }
}