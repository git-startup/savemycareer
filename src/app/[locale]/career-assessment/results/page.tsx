'use client';

import { useEffect, useState } from 'react';
import {useRouter} from '@/i18n/routing'; 
import Header from '@/components/Header';
import { analyzeResponses } from '@/data/results';
import { useTranslations, useLocale } from "next-intl";

// Define TypeScript interfaces
interface UserInfo {
  career: string;
  location: string;
  experience: string; 
}

interface AssessmentResults {
  riskLevelKey: 'high_risk' | 'moderate_risk' | 'low_risk';
  percentage: number;
  messageKey: string;
  tipKeys: string[];
}

interface Answers {
  [key: number]: number;
}

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
}

export default function ResultsPage() {
  const t = useTranslations('ResultsPage');
  const locale = useLocale();
  const router = useRouter();
  
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    career: '',
    location: '',
    experience: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  // Add toast state
  const [toast, setToast] = useState<ToastProps>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Function to show toast
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({
      message,
      type,
      isVisible: true
    });
    
    // Auto hide toast after 5 seconds
    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 5000);
  };

  useEffect(() => {
    // Use localStorage instead of router.query for Next.js 13+
    const storedAnswers = localStorage.getItem('aiAssessmentAnswers');
    const storedUserInfo = localStorage.getItem('aiAssessmentUserInfo');
    
    if (!storedAnswers) {
      router.push('/questions');
      return;
    }

    try {
      const parsedAnswers: Answers = JSON.parse(storedAnswers);
      const assessmentResults: AssessmentResults = analyzeResponses(parsedAnswers);
      
      setResults(assessmentResults);
      
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo({
          career: parsedUserInfo.career || 'Not provided',
          location: parsedUserInfo.location || 'Not provided',
          experience: parsedUserInfo.yearsExperience || 'Not provided'
        });
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error processing results:', error);
      router.push('/questions');
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p>{t("no_results")}</p>
          <button 
            onClick={() => router.push('/questions')}
            className="mt-4 bg-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
          >
           {t("take_assessment_btn")}
          </button>
        </div>
      </div>
    );
  }

  const { riskLevelKey, percentage, messageKey } = results;
  
  // Determine the risk color based on risk level key
  const getRiskColor = (): string => {
    if (riskLevelKey === "high_risk") return "text-red-500";
    if (riskLevelKey === "moderate_risk") return "text-yellow-500";
    if (riskLevelKey === "low_risk") return "text-green-500";
    return "text-blue-500";
  };

  const getProgressColor = (): string => {
    if (percentage >= 75) return "bg-red-500";
    if (percentage >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    
    // Send user data to backend along with assessment results
    fetch('/api/career-assessment', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        assessmentType: 'risk-assessment',
        riskLevelKey,
        percentage,
        userInfo,
        // Get the original answers from localStorage
        answers: JSON.parse(localStorage.getItem('aiAssessmentAnswers') || '{}')
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showToast(t("newsletter_success"), 'success');
        setSubmitted(true);
        // Clear form
        (e.target as HTMLFormElement).reset();
      } else {
        showToast(t("newsletter_error"), 'error');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showToast(t("newsletter_error"), 'error');
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Toast Notification */}
      {toast.isVisible && (
        <div 
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md transition-all duration-300 transform translate-y-0 flex items-center ${
            toast.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'
          }`}
        >
          <div className={`mr-3 flex-shrink-0 ${toast.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {toast.type === 'success' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <div className={`flex-1 ${toast.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
            {toast.message}
          </div>
          <button 
            onClick={() => setToast(prev => ({ ...prev, isVisible: false }))}
            className="ml-auto text-gray-400 hover:text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      <main>
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-8">
            {t("title")}
          </h1>
          
          {/* User Info Section */}
          <div className={`bg-white rounded-lg shadow-sm p-6 mb-6 ${locale === "ar" ? "text-right" : ""}`}>
            <h2 className="text-xl font-medium mb-4">{t("user_info_title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">{t("career")}</p>
                <p className="font-medium">{userInfo.career}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("location")}</p>
                <p className="font-medium">{userInfo.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("experience")}</p>
                <p className="font-medium">{userInfo.experience}</p>
              </div>
            </div>
          </div>
          
          {/* Risk Assessment Section - Simplified */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div className={`mb-4 md:mb-0 ${locale === "ar" ? "text-right mr-4" : ""}`}>
                <h2 className="text-2xl font-bold mb-2">
                  <span className={getRiskColor()}>{t(`risk_levels.${riskLevelKey}`)}</span>
                </h2>
                <p className="text-lg">{t(`messages.${messageKey}`)}</p>
              </div>
              
              <div className="w-40 h-40 relative">
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  <div className="absolute inset-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="10" 
                        strokeDasharray={`${percentage * 2.83}, 283`} 
                        strokeLinecap="round" 
                        className={`transform -rotate-90 origin-center ${getProgressColor()}`} 
                      />
                    </svg>
                  </div>
                  <div className="text-3xl font-bold">
                    {percentage}%
                  </div>
                </div>
              </div>
            </div>
            
            <div className={locale === "ar" ? "text-right" : ""}>
              <h3 className="text-xl font-medium mb-4">{t("assessment_means_title")}</h3>
              <p className="mb-6">
                {t("assessment_means_bio")}
                {t(`risk_explanations.${riskLevelKey}`)}
              </p>
            </div>
          </div>
          
          {/* Email Subscription Section - Now Primary Focus */}
          <div className={`bg-white rounded-lg shadow-sm p-6 ${locale === "ar" ? "text-right" : ""}`}>
            {submitted ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold mb-2">{t("thank_you_title")}</h3>
                <p className="text-lg mb-6">{t("thank_you_message")}</p>
                <button 
                  onClick={() => router.push('/')}
                  className="bg-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {t("back_home_btn")}
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">{t("get_full_insights_title") || "Get Your Full AI Impact Insights"}</h2>
                <p className="mb-6">{t("get_full_insights_description") || "We've prepared personalized recommendations and next steps based on your assessment results. To receive these valuable insights, plus stay updated with industry trends that could affect your career, please provide your details below:"}</p>
                
                <div  className={`bg-blue-50 ${locale === "ar" ? "border-r-4 text-right" : "border-l-4"} border-blue-500 p-4 mb-6`}>
                  <div className={`flex ${locale === "ar" ? "flex-row-reverse text-right" : ""}`}>
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className={`${locale === "ar" ? "mr-3" : "ml-3"}`}>
                      <p className="text-sm text-blue-800">
                        {t("email_benefits") || "By subscribing, you'll receive:"}
                      </p>
                      <ul className={`${locale === "ar" ? "list-inside rtl" : "list-disc list-inside"} mt-2 text-sm text-blue-700`}>
                        <li>{t("detailed_recommendations") || "Detailed personalized recommendations based on your results"}</li>
                        <li>{t("industry_trends") || "AI industry trends relevant to your career field"}</li>
                        <li>{t("skill_development") || "Skill development opportunities to stay competitive"}</li>
                        <li>{t("career_strategies") || "Effective career strategies in the age of AI"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <form  className={`mt-6 space-y-4 ${locale === "ar" ? "text-right" : ""}`} onSubmit={handleSubmit}>
                  <div dir={locale == "ar" ? "rtl" : "ltr"} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("name_label")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black ${locale === "ar" ? "text-right" : ""}`}
                        placeholder={t("name_placeholder")}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("email_label")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black ${locale === "ar" ? "text-right" : ""}`}
                        placeholder={t("email_placeholder")}
                      />
                    </div>
                  </div>
                  
                  <div className={`flex items-center mt-4 ${locale === "ar" ? "flex-row-reverse justify-start" : ""}`}>
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className={`block text-sm text-gray-700 ${locale === "ar" ? "mr-2" : "ml-2"}`}>
                      {t("consent_text")}
                    </label>
                  </div>
                  
                  <div className={`flex justify-between items-center mt-6 ${locale === "ar" ? "flex-row-reverse" : ""}`}>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                      {t("get_insights_btn") || "Get My Full Insights"}
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => router.push('/')}
                      className="text-blue-500 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                    >
                      {t("skip_for_now") || "Skip for now"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}