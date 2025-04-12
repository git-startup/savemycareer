'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import Header from '@/components/Header';
import { analyzeCareerResponses, CareerMatch, careerMatches, arCareerMatches } from '@/data/careerFinderQuestions';
import { useTranslations, useLocale } from "next-intl";
import { saveCareerFinderResults } from '@/lib/apiRoutes';

// Define TypeScript interfaces
interface UserInfo {
  currentField: string;
  educationLevel: string;
  adaptability: string;
}

interface Answers {
  [key: number]: number;
}

export default function CareerFinderResultsPage() {
  const t = useTranslations('CareerFinderPage');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const router = useRouter();
  
  const [topCareers, setTopCareers] = useState<CareerMatch[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    currentField: '',
    educationLevel: '',
    adaptability: ''
  });
  const [originalAnswers, setOriginalAnswers] = useState<Answers>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeCareer, setActiveCareer] = useState<string | null>(null);
  
  useEffect(() => {
    // Get stored assessment data from localStorage
    const storedAnswers = localStorage.getItem('careerFinderAnswers');
    const storedUserInfo = localStorage.getItem('careerFinderUserInfo');
    
    if (!storedAnswers) {
      router.push('/career-finder');
      return;
    }

    try {
      const parsedAnswers: Answers = JSON.parse(storedAnswers);
      setOriginalAnswers(parsedAnswers);
      const parsedUserInfo = JSON.parse(storedUserInfo || '{}');
      
      // Analyze responses to get career matches
      const results = analyzeCareerResponses(parsedAnswers, parsedUserInfo);
      
      // Get the correct language version of career matches
      let matchedCareers = results.topMatches;
      
      if (locale === 'ar') {
        // Map English IDs to Arabic career descriptions
        matchedCareers = results.topMatches.map(career => {
          const arMatch = arCareerMatches.find(c => c.id === career.id);
          return arMatch || career;
        });
      }
      
      setTopCareers(matchedCareers);
      setUserInfo({
        currentField: parsedUserInfo.currentField || 'Not provided',
        educationLevel: parsedUserInfo.educationLevel || 'Not provided',
        adaptability: parsedUserInfo.adaptability || 'Not provided'
      });
      
      // Set the first career as active by default
      if (matchedCareers.length > 0) {
        setActiveCareer(matchedCareers[0].id);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error processing results:', error);
      router.push('/career-finder');
    }
  }, [router, locale]);

  // Handle email subscription
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    
    // Prepare data for API call
    const careerTitles = topCareers.map(c => c.title).join(', ');
    
    try {
      // Call our API route to send data to Laravel
      const response = await saveCareerFinderResults({
        name,
        email,
        careers: careerTitles,
        userInfo,
        answers: originalAnswers
      });
      
      if (response.success) {
        setSubmitted(true);
        // Clear form and localStorage if successful
        (e.target as HTMLFormElement).reset();
        // Optionally clear localStorage to prevent resubmission
        // localStorage.removeItem('careerFinderAnswers');
        // localStorage.removeItem('careerFinderUserInfo');
      } else {
        setSubmitError(response.message || 'There was an error submitting your information. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (topCareers.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p>{t("no_results")}</p>
          <button 
            onClick={() => router.push('/career-finder')}
            className="mt-4 bg-purple-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
          >
           {t("take_assessment_btn")}
          </button>
        </div>
      </div>
    );
  }

  const activeCareerId = activeCareer || topCareers[0]?.id;
  const activeCareerDetails = topCareers.find(career => career.id === activeCareerId);

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRtl ? "rtl" : "ltr"}>
      <Header />

      <main>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-8">
            {t("results_title")}
          </h1>
          
          {/* User Info Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-medium mb-4">{t("user_info_title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">{t("current_field")}</p>
                <p className="font-medium">{userInfo.currentField}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("education_level")}</p>
                <p className="font-medium">{userInfo.educationLevel}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("tech_adaptability")}</p>
                <p className="font-medium">{userInfo.adaptability}</p>
              </div>
            </div>
          </div>
          
          {/* Career Matches Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {t("career_matches_title")}
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Career Tabs */}
              <div className="md:w-1/3">
                <div className="bg-gray-50 rounded-lg p-1">
                  {topCareers.map((career, index) => (
                    <button
                      key={career.id}
                      onClick={() => setActiveCareer(career.id)}
                      className={`w-full text-start p-4 rounded-md mb-1 transition-colors ${
                        activeCareerId === career.id
                          ? "bg-purple-100 text-purple-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${
                          activeCareerId === career.id ? "bg-purple-500" : "bg-gray-300"
                        } text-white font-semibold ${isRtl ? "ml-3" : "mr-3"}`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium">{career.title}</h3>
                          <div className={`text-sm ${
                            career.aiResistance === 'high' 
                              ? 'text-green-600' 
                              : career.aiResistance === 'medium'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                          }`}>
                            {career.aiResistance === 'high' 
                              ? t("ai_resistant_high")
                              : career.aiResistance === 'medium'
                                ? t("ai_resistant_medium")
                                : t("ai_resistant_low")
                            }
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Career Details */}
              {activeCareerDetails && (
                <div className="md:w-2/3 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-2">{activeCareerDetails.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeCareerDetails.aiResistance === 'high' 
                        ? 'bg-green-100 text-green-800' 
                        : activeCareerDetails.aiResistance === 'medium' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {t("ai_resistance")}: {
                        activeCareerDetails.aiResistance === 'high'
                          ? t("high")
                          : activeCareerDetails.aiResistance === 'medium'
                            ? t("medium")
                            : t("low")
                      }
                    </span>
                    
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      activeCareerDetails.growthPotential === 'high' 
                        ? 'bg-green-100 text-green-800' 
                        : activeCareerDetails.growthPotential === 'medium' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {t("growth_potential")}: {
                        activeCareerDetails.growthPotential === 'high'
                          ? t("high")
                          : activeCareerDetails.growthPotential === 'medium'
                            ? t("medium")
                            : t("low")
                      }
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    {activeCareerDetails.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{t("education_required")}</h4>
                      <p className="text-gray-700">{activeCareerDetails.eduRequirement}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{t("salary_range")}</h4>
                      <p className="text-gray-700">{activeCareerDetails.salaryRange}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{t("key_skills")}</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeCareerDetails.keySkills.map((skill, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Next Steps Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">{t("next_steps_title")}</h2>
            <p className="text-gray-700 mb-4">
              {t("next_steps_description")}
            </p>
            
            <ul className={`${isRtl ? "list-disc pr-5" : "list-disc pl-5"} space-y-2 text-gray-700`}>
              <li>{t("next_step_1")}</li>
              <li>{t("next_step_2")}</li>
              <li>{t("next_step_3")}</li>
              <li>{t("next_step_4")}</li>
            </ul>
          </div>
          
          {/* Email Subscription Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            {submitted ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold mb-2">{t("thank_you_title")}</h3>
                <p className="text-lg mb-6">{t("career_finder_thank_you_message")}</p>
                <button 
                  onClick={() => router.push('/')}
                  className="bg-purple-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {t("back_home_btn")}
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4">{t("career_roadmap_title")}</h2>
                <p className="mb-6">{t("career_roadmap_description")}</p>
                
                {submitError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="mx-3">
                        <p className="text-sm text-red-600">
                          {submitError}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        {t("name_label")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-black"
                        placeholder={t("email_placeholder")}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-purple-600 border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="block text-sm text-gray-700 mx-2">
                      {t("consent_text")}
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-purple-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t("processing")}
                        </span>
                      ) : (
                        t("get_roadmap_btn")
                      )}
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => router.push('/')}
                      className="text-purple-600 hover:text-purple-800 font-medium transition-colors cursor-pointer"
                    >
                      {t("skip_for_now")}
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