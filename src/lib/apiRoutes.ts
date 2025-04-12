// src/lib/apiRoutes.ts

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
  answers: Record<number, number>;
}

interface SaveAiImpactResultsProps {
  name: string;
  email: string;
  riskLevelKey: 'high_risk' | 'moderate_risk' | 'low_risk';
  percentage: number;
  userInfo: {
    career: string;
    location: string;
    experience: string;
  };
  answers: Record<number, number>;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  errors?: Record<string, string[]>;
}

/**
 * Save career finder assessment results to the backend
 */
export async function saveCareerFinderResults(data: SaveCareerFinderResultsProps): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/assessments/career-finder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      message: 'Network error occurred. Please try again later.'
    };
  }
}

/**
 * Save AI impact assessment results to the backend
 */
export async function saveAiImpactResults(data: SaveAiImpactResultsProps): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/assessments/ai-impact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      message: 'Network error occurred. Please try again later.'
    };
  }
}

/**
 * Unsubscribe from assessment emails
 */
export async function unsubscribeFromEmails(email: string, token: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/assessments/unsubscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, token }),
    });

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      message: 'Network error occurred. Please try again later.'
    };
  }
}