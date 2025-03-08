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

// Updated interface to use translation keys instead of hardcoded values
interface AssessmentResults {
  riskLevelKey: 'high_risk' | 'moderate_risk' | 'low_risk'; // Translation keys instead of direct values
  percentage: number;
  messageKey: string; // Using translation key
  tipKeys: string[]; // Array of translation keys for tips
}

interface Answers {
  [key: number]: number;
}

// Toast notification type
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

  const { riskLevelKey, percentage, messageKey, tipKeys } = results;
  
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
          <h1 className="text-3xl font-bold text-center mb-6">
            {t("title")}
          </h1>
          
          {/* User Info Section */}
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 ${locale === "ar" ? "text-right" : ""}`}>
            <h2 className="text-xl font-medium mb-4">{t("user_info_title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("career")}</p>
                <p className="font-medium">{userInfo.career}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("location")}</p>
                <p className="font-medium">{userInfo.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t("experience")}</p>
                <p className="font-medium">{userInfo.experience}</p>
              </div>
            </div>
          </div>
          
          {/* Risk Assessment Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <div className={`mb-4 md:mb-0 ${locale === "ar" ? "text-right mr-4" : ""}`}>
                <h2 className="text-2xl font-bold mb-2">
                  <span className={getRiskColor()}>{t(`risk_levels.${riskLevelKey}`)}</span>
                </h2>
                <p className="text-lg">{t(`messages.${messageKey}`)}</p>
              </div>
              
              <div className="w-40 h-40 relative">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
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
              
              <h3 className="text-xl font-medium mb-4">{t("recommendation_title")}</h3>
              <ul className={`space-y-3 ${locale === "ar" ? "text-right" : ""}`}>
                {tipKeys.map((tipKey, index) => (
                  <li key={index} className={`flex ${locale === "ar" ? "flex-row-reverse text-right" : ""}`}>
                    <span className={`mt-1 text-blue-500 ${locale === "ar" ? "ml-2" : "mr-2"}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span>{t(`tips.${tipKey}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Next Steps Section */}
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 ${locale === "ar" ? "text-right" : ""}`}>
            <h2 className="text-xl font-medium mb-4">{t("next_steps_title")}</h2>
            <p className="mb-6">
             {t("next_steps_bio")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">{t("skill_development_title")}</h3>
                <p>{t("skill_development_bio")}</p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">{t("ai_literacy_title")}</h3>
                <p>{t("ai_literacy_bio")}</p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">{t("career_pivoting_title")}</h3>
                <p>{t("career_pivoting_bio")}</p>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <h3 className="font-medium mb-2">{t("continuous_learning_title")}</h3>
                <p>{t("continuous_learning_bio")}</p>
              </div>
            </div>
            
            {/* Newsletter Signup Form */}
            <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-xl font-medium mb-4">{t("newsletter_title")}</h3>
              <p className="mb-4">{t("newsletter_description")}</p>
              
              <form className={`mt-4 space-y-4 ${locale === "ar" ? "text-right" : ""}`} onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name') as string;
                const email = formData.get('email') as string;
                
                // Send user data to backend along with assessment results
                fetch('/api/subscribe', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name,
                    email,
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
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t("name_label")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${locale === "ar" ? "text-right" : ""}`}
                      placeholder={t("name_placeholder")}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {t("email_label")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className={`w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white ${locale === "ar" ? "text-right" : ""}`}
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
                  <label htmlFor="consent" className={`block text-sm text-gray-700 dark:text-gray-300 ${locale === "ar" ? "mr-2" : "ml-2"}`}>
                    {t("consent_text")}
                  </label>
                </div>
                
                <div className={`flex justify-between items-center mt-6 ${locale === "ar" ? "flex-row-reverse" : ""}`}>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                  >
                    {t("subscribe_btn")}
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => router.push('/')}
                    className="text-blue-500 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                  >
                    {t("back_home_btn")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}