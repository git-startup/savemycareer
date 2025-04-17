import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Use FormData for processing multipart form data
    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const position = formData.get('position') as string;
    const country = formData.get('country') as string;
    const expectations = formData.get('expectations') as string;
    const cvFile = formData.get('cv') as File | null;
    
    // Validate required fields
    if (!name || !email || !position || !country || !expectations) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled' },
        { status: 400 }
      );
    }
    
    // Create a new FormData object to send to Laravel API
    const apiFormData = new FormData();
    apiFormData.append('name', name);
    apiFormData.append('email', email);
    apiFormData.append('position', position);
    apiFormData.append('country', country);
    apiFormData.append('expectations', expectations);
    
    // Handle the CV file differently
    if (cvFile) {
      // Get file data as ArrayBuffer
      const fileBuffer = await cvFile.arrayBuffer();
      // Create a new Blob with the correct MIME type
      const fileBlob = new Blob([fileBuffer], { type: cvFile.type });
      // Add to form data with the original filename
      apiFormData.append('cv', fileBlob, cvFile.name);
      
      console.log('File prepared for upload:', {
        name: cvFile.name,
        type: cvFile.type,
        size: fileBuffer.byteLength
      });
    }
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://iptvstreamline.com/api';
      console.log('Sending request to:', `${apiUrl}/workshop-registrations`);
      
      // Create a controller for timeout instead of using AbortSignal.timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout
      
      // Use node-fetch compatible API
      const response = await fetch(`${apiUrl}/workshop-registrations`, {
        method: 'POST',
        body: apiFormData,
        signal: controller.signal
      });
      
      // Clear the timeout if the fetch completed successfully
      clearTimeout(timeoutId);
      
      console.log('Response received, status:', response.status);
      
      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('API Error details:', responseData);
        return NextResponse.json(
          { 
            success: false, 
            message: responseData.message || 'An error occurred during registration', 
            errors: responseData.errors 
          },
          { status: response.status }
        );
      }
      
      // Return success response
      return NextResponse.json({
        success: true,
        message: responseData.message || 'Registration successful!'
      });
    } catch (error: any) { // Use any type for error to access properties
      console.error('Connection error details:', error);
      
      // Check if it's a timeout error
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { success: false, message: 'Request timed out. The file may be too large or the server is taking too long to respond.' },
          { status: 408 }
        );
      }
      
      return NextResponse.json(
        { success: false, message: 'Error connecting to registration service', errorDetails: String(error) },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred processing your registration' },
      { status: 500 }
    );
  }
}