'use client';

import { useState, useEffect, useRef } from 'react';
import {useRouter} from '@/i18n/routing'; 
import Header from '@/components/Header';
import { careers, arCareers } from '@/data/careers';
import { locations, arLocations } from '@/data/locations';
import { useTranslations, useLocale } from "next-intl";

interface SurveyData {
  name: string;
  email: string;
  age: string; // Changed from dateOfBirth to age
  currentCareer: string;
  currentLocation: string;
  currentEmployer: string;
  currentSalary: string;
  aiUsageFrequency: string;
  aiHelpfulness: string;
  aiToolsUsed: string[];
  aiActivities: string[]; // New field for AI activities
  mostUsedAiTool: string;
  aiImpactOnJob: string;
  workFromHome: string;
  yearsExperience: string;
  industryType: string;
  teamSize: string;
  aiTrainingReceived: string;
  futureAiConcerns: string;
  additionalComments: string;
}

const initialSurveyData: SurveyData = {
  name: '',
  email: '',
  age: '', // Changed from dateOfBirth to age
  currentCareer: '',
  currentLocation: '',
  currentEmployer: '',
  currentSalary: '',
  aiUsageFrequency: '',
  aiHelpfulness: '',
  aiToolsUsed: [],
  aiActivities: [], // Initialize new field
  mostUsedAiTool: '',
  aiImpactOnJob: '',
  workFromHome: '',
  yearsExperience: '',
  industryType: '',
  teamSize: '',
  aiTrainingReceived: '',
  futureAiConcerns: '',
  additionalComments: ''
};

export default function SurveyPage() {
  const t = useTranslations('SurveyPage');
  const locale = useLocale();
  const router = useRouter();
  
  const [surveyData, setSurveyData] = useState<SurveyData>(initialSurveyData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  // Autocomplete states
  const [careerSuggestions, setCareerSuggestions] = useState<string[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showCareerSuggestions, setShowCareerSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  
  const careerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  const careersList = locale === 'ar' ? arCareers : careers;
  const locationsList = locale === 'ar' ? arLocations : locations;

  const totalSteps = 4;

  // AI Tools list
  const aiTools = locale === 'ar' ? [
    'ChatGPT', 'Google Bard/Gemini', 'Claude', 'Perplexity', 'Meta AI', 'Grok', 'Microsoft Copilot', 'GitHub Copilot',
    'Midjourney', 'DALL-E', 'Stable Diffusion', 'Figma AI', 'Notion AI',
    'Grammarly', 'Jasper', 'Copy.ai', 'Canva AI', 'Adobe Firefly',
    'Tableau AI', 'DataRobot', 'H2O.ai', 'Slack AI', 'Zoom AI', 'Notion AI', 'Midjourney', 
    'أدوات أخرى'
  ] : [
    'ChatGPT', 'Google Bard/Gemini', 'Claude', 'Perplexity', 'Meta AI', 'Grok', 'Microsoft Copilot', 'GitHub Copilot',
    'Midjourney', 'DALL-E', 'Stable Diffusion', 'Figma AI', 'Notion AI',
    'Grammarly', 'Jasper', 'Copy.ai', 'Canva AI', 'Adobe Firefly',
    'Tableau AI', 'DataRobot', 'H2O.ai', 'Slack AI', 'Zoom AI', 'Notion AI', 'Midjourney',
    'Other'
  ];

  // AI Activities list - New addition
  const aiActivities = locale === 'ar' ? [
    'كتابة النصوص والمحتوى', 'تحرير وتدقيق النصوص', 'ترجمة النصوص', 'إنشاء الصور والتصاميم',
    'تحليل البيانات', 'البرمجة وكتابة الكود', 'البحث والتحليل', 'إنشاء العروض التقديمية',
    'كتابة رسائل البريد الإلكتروني', 'إنشاء ملخصات', 'حل المشاكل التقنية', 'التخطيط والتنظيم',
    'تعلم مهارات جديدة', 'إنشاء المحتوى التسويقي', 'تحليل النصوص والوثائق', 'إنشاء الجداول والتقارير',
    'العصف الذهني والأفكار', 'مراجعة وتحسين المحتوى', 'أنشطة أخرى'
  ] : [
    'Writing and content creation', 'Editing and proofreading', 'Translation', 'Image and design generation',
    'Data analysis', 'Programming and coding', 'Research and analysis', 'Creating presentations',
    'Writing emails', 'Summarization', 'Technical troubleshooting', 'Planning and organization',
    'Learning new skills', 'Marketing content creation', 'Document analysis', 'Creating spreadsheets and reports',
    'Brainstorming and ideation', 'Content review and improvement', 'Other activities'
  ];

  // Force light theme
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);

  // Autocomplete logic
  useEffect(() => {
    if (surveyData.currentCareer) {
      const filtered = careersList.filter(item => 
        item.toLowerCase().includes(surveyData.currentCareer.toLowerCase())
      );
      setCareerSuggestions(filtered.slice(0, 10));
    } else {
      setCareerSuggestions([]);
    }
  }, [surveyData.currentCareer, careersList]);

  useEffect(() => {
    if (surveyData.currentLocation) {
      const filtered = locationsList.filter(item => 
        item.toLowerCase().includes(surveyData.currentLocation.toLowerCase())
      );
      setLocationSuggestions(filtered.slice(0, 10));
    } else {
      setLocationSuggestions([]);
    }
  }, [surveyData.currentLocation, locationsList]);

  // Handle clicking outside autocomplete
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (careerRef.current && !careerRef.current.contains(event.target as Node)) {
        setShowCareerSuggestions(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSurveyData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'currentCareer') {
      setShowCareerSuggestions(true);
    } else if (name === 'currentLocation') {
      setShowLocationSuggestions(true);
    }
  };

  const handleCheckboxChange = (tool: string) => {
    setSurveyData(prev => ({
      ...prev,
      aiToolsUsed: (prev.aiToolsUsed || []).includes(tool)
        ? (prev.aiToolsUsed || []).filter(t => t !== tool)
        : [...(prev.aiToolsUsed || []), tool]
    }));
  };

  // New function for handling AI activities checkbox changes
  const handleActivityCheckboxChange = (activity: string) => {
    setSurveyData(prev => ({
      ...prev,
      aiActivities: (prev.aiActivities || []).includes(activity)
        ? (prev.aiActivities || []).filter(a => a !== activity)
        : [...(prev.aiActivities || []), activity]
    }));
  };

  const handleSuggestionSelect = (field: string, value: string) => {
    setSurveyData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'currentCareer') {
      setShowCareerSuggestions(false);
    } else if (field === 'currentLocation') {
      setShowLocationSuggestions(false);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(surveyData.name && surveyData.email && surveyData.age && 
                 surveyData.currentCareer && surveyData.currentLocation);
      case 2:
        return !!(surveyData.aiUsageFrequency && surveyData.aiHelpfulness && 
                 surveyData.aiToolsUsed && surveyData.aiToolsUsed.length > 0 && 
                 surveyData.aiActivities && surveyData.aiActivities.length > 0);
      case 3:
        return !!(surveyData.mostUsedAiTool && surveyData.aiImpactOnJob && 
                 surveyData.yearsExperience);
      case 4:
        return true; // Optional fields
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...surveyData, language: locale}),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitMessage(t('submit_success'));
        setTimeout(() => {
          router.push('/thank-you');
        }, 2000);
      } else {
        setSubmitMessage(result.message || t('submit_error'));
      }
    } catch (error) {
      console.error('Survey submission error:', error);
      setSubmitMessage(t('submit_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step configuration with translations
  const stepConfig = [
    {
      title: t('step_1_title'),
      subtitle: t('step_1_subtitle'),
      icon: "👤",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: t('step_2_title'),
      subtitle: t('step_2_subtitle'),
      icon: "🤖",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: t('step_3_title'),
      subtitle: t('step_3_subtitle'),
      icon: "📈",
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: t('step_4_title'),
      subtitle: t('step_4_subtitle'),
      icon: "💡",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section - Responsive */}
      <section className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
        {/* Animated Background Elements - Responsive */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-gradient-to-tr from-indigo-400 to-cyan-600 rounded-full opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg mb-4 sm:mb-6">
              <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>{t('hero_badge')}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent px-2">
              {t('hero_title')}
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              {t('hero_description')}
            </p>
          </div>

          {/* Step Progress - Mobile Friendly */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
            {/* Desktop Progress */}
            <div className="hidden sm:flex items-center justify-between mb-6">
              {stepConfig.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full text-white font-bold text-sm md:text-lg shadow-lg transition-all duration-300 ${
                    index + 1 <= currentStep 
                      ? `bg-gradient-to-r ${step.color}` 
                      : 'bg-gray-300'
                  }`}>
                    {index + 1 <= currentStep ? step.icon : index + 1}
                  </div>
                  {index < stepConfig.length - 1 && (
                    <div className={`w-12 md:w-16 lg:w-24 h-1 mx-2 rounded-full transition-all duration-300 ${
                      index + 1 < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Progress */}
            <div className="sm:hidden flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                {stepConfig.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-xs shadow-lg transition-all duration-300 ${
                      index + 1 <= currentStep 
                        ? `bg-gradient-to-r ${step.color}` 
                        : 'bg-gray-300'
                    }`}>
                      {index + 1 <= currentStep ? step.icon : index + 1}
                    </div>
                    {index < stepConfig.length - 1 && (
                      <div className={`w-4 h-0.5 mx-1 rounded-full transition-all duration-300 ${
                        index + 1 < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2 px-2">
                {stepConfig[currentStep - 1].title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 px-4">
                {stepConfig[currentStep - 1].subtitle}
              </p>
            </div>
          </div>

          {/* Progress Bar - Responsive */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
            <div className="w-full bg-gray-200 h-1.5 sm:h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              >
                <div className="h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs sm:text-sm text-gray-500 px-2">
              <span>{t('progress_step')} {currentStep} {t('progress_of')} {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% {t('progress_complete')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Survey Content - Responsive */}
      <main className="pb-8 sm:pb-16">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-4 sm:p-6 lg:p-8 xl:p-12">
            {/* Step 1: Basic Information - Responsive */}
            {currentStep === 1 && (
              <div className={`space-y-6 sm:space-y-8 ${locale === 'ar' ? 'text-right' : ''}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      {t('name_label')} {t('required_field')}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={surveyData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                        placeholder={t('name_placeholder')}
                        required
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      {t('email_label')} {t('required_field')}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={surveyData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                        placeholder={t('email_placeholder')}
                        required
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    {t('age_label')} {t('required_field')}
                  </label>
                  <div className="relative">
                    <select
                      name="age"
                      value={surveyData.age}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                      required
                    >
                      <option value="">{t('age_placeholder')}</option>
                      <option value="18-24">{t('age_18_24')}</option>
                      <option value="25-34">{t('age_25_34')}</option>
                      <option value="35-44">{t('age_35_44')}</option>
                      <option value="45-54">{t('age_45_54')}</option>
                      <option value="55-64">{t('age_55_64')}</option>
                      <option value="65+">{t('age_65_plus')}</option>
                    </select>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                  </div>
                </div>

                <div className="relative" ref={careerRef}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    {t('career_label')} {t('required_field')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="currentCareer"
                      value={surveyData.currentCareer}
                      onChange={handleInputChange}
                      onFocus={() => setShowCareerSuggestions(true)}
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                      placeholder={t('career_placeholder')}
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                  </div>
                  {showCareerSuggestions && careerSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white/95 backdrop-blur-md mt-2 border border-gray-200 rounded-lg sm:rounded-xl shadow-xl max-h-48 sm:max-h-60 overflow-auto">
                      {careerSuggestions.map((suggestion, i) => (
                        <div
                          key={i} 
                          className={`px-3 sm:px-4 py-2 sm:py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-200 text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''} ${i === 0 ? 'rounded-t-lg sm:rounded-t-xl' : ''} ${i === careerSuggestions.length - 1 ? 'rounded-b-lg sm:rounded-b-xl' : ''}`}
                          onClick={() => handleSuggestionSelect('currentCareer', suggestion)}
                        >
                          <span className="text-gray-700 font-medium">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative" ref={locationRef}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    {t('location_label')} {t('required_field')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="currentLocation"
                      value={surveyData.currentLocation}
                      onChange={handleInputChange}
                      onFocus={() => setShowLocationSuggestions(true)}
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                      placeholder={t('location_placeholder')}
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                  </div>
                  {showLocationSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full bg-white/95 backdrop-blur-md mt-2 border border-gray-200 rounded-lg sm:rounded-xl shadow-xl max-h-48 sm:max-h-60 overflow-auto">
                      {locationSuggestions.map((suggestion, i) => (
                        <div
                          key={i} 
                          className={`px-3 sm:px-4 py-2 sm:py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer transition-all duration-200 text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''} ${i === 0 ? 'rounded-t-lg sm:rounded-t-xl' : ''} ${i === locationSuggestions.length - 1 ? 'rounded-b-lg sm:rounded-b-xl' : ''}`}
                          onClick={() => handleSuggestionSelect('currentLocation', suggestion)}
                        >
                          <span className="text-gray-700 font-medium">{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      {t('employer_label')} <span className="text-gray-400 font-normal">{t('employer_optional')}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="currentEmployer"
                        value={surveyData.currentEmployer}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                        placeholder={t('employer_placeholder')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                      {t('salary_label')} <span className="text-gray-400 font-normal">{t('salary_optional')}</span>
                    </label>
                    <div className="relative">
                      <select
                        name="currentSalary"
                        value={surveyData.currentSalary}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                      >
                        <option value="">{t('salary_placeholder')}</option>
                        <option value="under_30k">{t('salary_under_30k')}</option>
                        <option value="30k_50k">{t('salary_30k_50k')}</option>
                        <option value="50k_75k">{t('salary_50k_75k')}</option>
                        <option value="75k_100k">{t('salary_75k_100k')}</option>
                        <option value="100k_150k">{t('salary_100k_150k')}</option>
                        <option value="over_150k">{t('salary_over_150k')}</option>
                        <option value="prefer_not_to_say">{t('salary_prefer_not')}</option>
                      </select>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: AI Usage - Responsive */}
            {currentStep === 2 && (
              <div className={`space-y-6 sm:space-y-8 ${locale === 'ar' ? 'text-right' : ''}`}>
                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                    {t('ai_usage_frequency_label')} {t('required_field')}
                  </label>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { value: 'daily', label: t('ai_usage_daily'), icon: '🔥' },
                      { value: 'weekly', label: t('ai_usage_weekly'), icon: '📅' },
                      { value: 'monthly', label: t('ai_usage_monthly'), icon: '📊' },
                      { value: 'rarely', label: t('ai_usage_rarely'), icon: '⏰' },
                      { value: 'never', label: t('ai_usage_never'), icon: '🚫' }
                    ].map((option) => (
                      <label key={option.value} className={`group flex items-center ${locale === 'ar' ? 'flex-row-reverse' : ''} p-3 sm:p-4 bg-white/40 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] sm:hover:scale-[1.02] ${
                        surveyData.aiUsageFrequency === option.value 
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-md' 
                          : 'hover:border-blue-300'
                      }`}>
                        <input 
                          type="radio" 
                          name="aiUsageFrequency" 
                          value={option.value}
                          checked={surveyData.aiUsageFrequency === option.value}
                          onChange={handleInputChange}
                          className="h-4 sm:h-5 w-4 sm:w-5 text-blue-500 focus:ring-blue-500 border-gray-300" 
                        />
                        <span className="text-xl sm:text-2xl mx-2 sm:mx-4">{option.icon}</span>
                        <span className={`text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base ${locale === 'ar' ? 'mr-2 sm:mr-3 text-right' : 'ml-2 sm:ml-3'}`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                    {t('ai_helpfulness_label')} {t('required_field')}
                  </label>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { value: 'very_helpful', label: t('ai_helpfulness_very_helpful'), icon: '🚀' },
                      { value: 'somewhat_helpful', label: t('ai_helpfulness_somewhat_helpful'), icon: '👍' },
                      { value: 'neutral', label: t('ai_helpfulness_neutral'), icon: '😐' },
                      { value: 'not_very_helpful', label: t('ai_helpfulness_not_very_helpful'), icon: '👎' },
                      { value: 'not_helpful', label: t('ai_helpfulness_not_helpful'), icon: '❌' }
                    ].map((option) => (
                      <label key={option.value} className={`group flex items-center ${locale === 'ar' ? 'flex-row-reverse' : ''} p-3 sm:p-4 bg-white/40 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] sm:hover:scale-[1.02] ${
                        surveyData.aiHelpfulness === option.value 
                          ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 shadow-md' 
                          : 'hover:border-purple-300'
                      }`}>
                        <input 
                          type="radio" 
                          name="aiHelpfulness" 
                          value={option.value}
                          checked={surveyData.aiHelpfulness === option.value}
                          onChange={handleInputChange}
                          className="h-4 sm:h-5 w-4 sm:w-5 text-purple-500 focus:ring-purple-500 border-gray-300" 
                        />
                        <span className="text-xl sm:text-2xl mx-2 sm:mx-4">{option.icon}</span>
                        <span className={`text-gray-700 font-medium group-hover:text-purple-600 transition-colors duration-200 text-sm sm:text-base ${locale === 'ar' ? 'mr-2 sm:mr-3 text-right' : 'ml-2 sm:ml-3'}`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                    {t('ai_tools_used_label')} {t('required_field')}
                    <span className="text-gray-500 font-normal text-xs sm:text-sm ml-2">{t('select_all_apply')}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
                    {aiTools.map((tool) => (
                      <label key={tool} className={`group flex items-center ${locale === 'ar' ? 'flex-row-reverse' : ''} p-2 sm:p-3 bg-white/40 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.01] sm:hover:scale-[1.02] ${
                        (surveyData.aiToolsUsed || []).includes(tool) 
                          ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-blue-50 shadow-md' 
                          : 'hover:border-indigo-300'
                      }`}>
                        <input 
                          type="checkbox" 
                          checked={(surveyData.aiToolsUsed || []).includes(tool)}
                          onChange={() => handleCheckboxChange(tool)}
                          className="h-3 sm:h-4 w-3 sm:w-4 text-indigo-500 focus:ring-indigo-500 border-gray-300 rounded" 
                        />
                        <span className={`text-xs sm:text-sm text-gray-700 font-medium group-hover:text-indigo-600 transition-colors duration-200 ${locale === 'ar' ? 'mr-1.5 sm:mr-2 text-right' : 'ml-1.5 sm:ml-2'} break-words`}>
                          {tool}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* NEW AI Activities Question */}
                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                    {t('ai_activities_label')} {t('required_field')}
                    <span className="text-gray-500 font-normal text-xs sm:text-sm ml-2">{t('select_all_apply')}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {aiActivities.map((activity) => (
                      <label key={activity} className={`group flex items-center ${locale === 'ar' ? 'flex-row-reverse' : ''} p-2 sm:p-3 bg-white/40 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.01] sm:hover:scale-[1.02] ${
                        (surveyData.aiActivities || []).includes(activity) 
                          ? 'border-teal-500 bg-gradient-to-r from-teal-50 to-cyan-50 shadow-md' 
                          : 'hover:border-teal-300'
                      }`}>
                        <input 
                          type="checkbox" 
                          checked={(surveyData.aiActivities || []).includes(activity)}
                          onChange={() => handleActivityCheckboxChange(activity)}
                          className="h-3 sm:h-4 w-3 sm:w-4 text-teal-500 focus:ring-teal-500 border-gray-300 rounded" 
                        />
                        <span className={`text-xs sm:text-sm text-gray-700 font-medium group-hover:text-teal-600 transition-colors duration-200 ${locale === 'ar' ? 'mr-1.5 sm:mr-2 text-right' : 'ml-1.5 sm:ml-2'} break-words`}>
                          {activity}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: AI Impact & Experience - Responsive */}
            {currentStep === 3 && (
              <div className={`space-y-6 sm:space-y-8 ${locale === 'ar' ? 'text-right' : ''}`}>
                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                    {t('most_used_ai_tool_label')} {t('required_field')}
                  </label>
                  <div className="relative">
                    <select
                      name="mostUsedAiTool"
                      value={surveyData.mostUsedAiTool}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                      required
                    >
                      <option value="">{t('select_most_used')}</option>
                      {aiTools.map((tool) => (
                        <option key={tool} value={tool}>{tool}</option>
                      ))}
                    </select>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                  </div>
                </div>

                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                    {t('ai_impact_on_job_label')} {t('required_field')}
                  </label>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { value: 'very_positive', label: t('ai_impact_very_positive'), icon: '🌟' },
                      { value: 'positive', label: t('ai_impact_positive'), icon: '✅' },
                      { value: 'neutral', label: t('ai_impact_neutral'), icon: '➖' },
                      { value: 'negative', label: t('ai_impact_negative'), icon: '⚠️' },
                      { value: 'very_negative', label: t('ai_impact_very_negative'), icon: '🚨' }
                    ].map((option) => (
                      <label key={option.value} className={`group flex items-center ${locale === 'ar' ? 'flex-row-reverse' : ''} p-3 sm:p-4 bg-white/40 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] sm:hover:scale-[1.02] ${
                        surveyData.aiImpactOnJob === option.value 
                          ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-green-50 shadow-md' 
                          : 'hover:border-emerald-300'
                      }`}>
                        <input 
                          type="radio" 
                          name="aiImpactOnJob" 
                          value={option.value}
                          checked={surveyData.aiImpactOnJob === option.value}
                          onChange={handleInputChange}
                          className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-500 focus:ring-emerald-500 border-gray-300" 
                        />
                        <span className="text-xl sm:text-2xl mx-2 sm:mx-4">{option.icon}</span>
                        <span className={`text-gray-700 font-medium group-hover:text-emerald-600 transition-colors duration-200 text-sm sm:text-base ${locale === 'ar' ? 'mr-2 sm:mr-3 text-right' : 'ml-2 sm:ml-3'}`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                      {t('years_experience_label')} {t('required_field')}
                    </label>
                    <div className="relative">
                      <select
                        name="yearsExperience"
                        value={surveyData.yearsExperience}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                        required
                      >
                        <option value="">{t('select_experience')}</option>
                        <option value="0-1">{t('experience_0_1')}</option>
                        <option value="2-5">{t('experience_2_5')}</option>
                        <option value="6-10">{t('experience_6_10')}</option>
                        <option value="11-15">{t('experience_11_15')}</option>
                        <option value="16-20">{t('experience_16_20')}</option>
                        <option value="over_20">{t('experience_over_20')}</option>
                      </select>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                      {t('work_arrangement_label')} <span className="text-gray-400 font-normal">{t('optional_field')}</span>
                    </label>
                    <div className="relative">
                      <select
                        name="workFromHome"
                        value={surveyData.workFromHome}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                      >
                        <option value="">{t('select_work_arrangement')}</option>
                        <option value="fully_remote">{t('work_fully_remote')}</option>
                        <option value="hybrid">{t('work_hybrid')}</option>
                        <option value="fully_office">{t('work_fully_office')}</option>
                      </select>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Additional Information - Responsive */}
            {currentStep === 4 && (
              <div className={`space-y-6 sm:space-y-8 ${locale === 'ar' ? 'text-right' : ''}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                      {t('industry_type_label')} <span className="text-gray-400 font-normal">{t('optional_field')}</span>
                    </label>
                    <div className="relative">
                      <select
                        name="industryType"
                        value={surveyData.industryType}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                      >
                        <option value="">{t('select_industry')}</option>
                        <option value="technology">{t('industry_technology')}</option>
                        <option value="healthcare">{t('industry_healthcare')}</option>
                        <option value="finance">{t('industry_finance')}</option>
                        <option value="education">{t('industry_education')}</option>
                        <option value="manufacturing">{t('industry_manufacturing')}</option>
                        <option value="retail">{t('industry_retail')}</option>
                        <option value="consulting">{t('industry_consulting')}</option>
                        <option value="government">{t('industry_government')}</option>
                        <option value="other">{t('industry_other')}</option>
                      </select>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                      {t('team_size_label')} <span className="text-gray-400 font-normal">{t('optional_field')}</span>
                    </label>
                    <div className="relative">
                      <select
                        name="teamSize"
                        value={surveyData.teamSize}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                      >
                        <option value="">{t('select_team_size')}</option>
                        <option value="1-5">{t('team_1_5')}</option>
                        <option value="6-10">{t('team_6_10')}</option>
                        <option value="11-25">{t('team_11_25')}</option>
                        <option value="26-50">{t('team_26_50')}</option>
                        <option value="over_50">{t('team_over_50')}</option>
                      </select>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                    {t('ai_training_label')} <span className="text-gray-400 font-normal">{t('optional_field')}</span>
                  </label>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { value: 'formal_training', label: t('ai_training_formal'), icon: '🎓' },
                      { value: 'informal_training', label: t('ai_training_informal'), icon: '💬' },
                      { value: 'self_taught', label: t('ai_training_self_taught'), icon: '🔬' },
                      { value: 'no_training', label: t('ai_training_none'), icon: '🤷' }
                    ].map((option) => (
                      <label key={option.value} className={`group flex items-center ${locale === 'ar' ? 'flex-row-reverse' : ''} p-3 sm:p-4 bg-white/40 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] sm:hover:scale-[1.02] ${
                        surveyData.aiTrainingReceived === option.value 
                          ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-md' 
                          : 'hover:border-orange-300'
                      }`}>
                        <input 
                          type="radio" 
                          name="aiTrainingReceived" 
                          value={option.value}
                          checked={surveyData.aiTrainingReceived === option.value}
                          onChange={handleInputChange}
                          className="h-4 sm:h-5 w-4 sm:w-5 text-orange-500 focus:ring-orange-500 border-gray-300" 
                        />
                        <span className="text-xl sm:text-2xl mx-2 sm:mx-4">{option.icon}</span>
                        <span className={`text-gray-700 font-medium group-hover:text-orange-600 transition-colors duration-200 text-sm sm:text-base ${locale === 'ar' ? 'mr-2 sm:mr-3 text-right' : 'ml-2 sm:ml-3'}`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                    {t('future_concerns_label')} <span className="text-gray-400 font-normal">{t('optional_field')}</span>
                  </label>
                  <div className="space-y-3 sm:space-y-4">
                    {[
                      { value: 'job_replacement', label: t('concern_job_replacement'), icon: '🤖' },
                      { value: 'skill_obsolescence', label: t('concern_skill_obsolescence'), icon: '📉' },
                      { value: 'privacy_concerns', label: t('concern_privacy'), icon: '🔒' },
                      { value: 'quality_issues', label: t('concern_quality'), icon: '📋' },
                      { value: 'no_concerns', label: t('concern_none'), icon: '😊' }
                    ].map((option) => (
                      <label key={option.value} className={`group flex items-center ${locale === 'ar' ? 'flex-row-reverse' : ''} p-3 sm:p-4 bg-white/40 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] sm:hover:scale-[1.02] ${
                        surveyData.futureAiConcerns === option.value 
                          ? 'border-red-500 bg-gradient-to-r from-red-50 to-pink-50 shadow-md' 
                          : 'hover:border-red-300'
                      }`}>
                        <input 
                          type="radio" 
                          name="futureAiConcerns" 
                          value={option.value}
                          checked={surveyData.futureAiConcerns === option.value}
                          onChange={handleInputChange}
                          className="h-4 sm:h-5 w-4 sm:w-5 text-red-500 focus:ring-red-500 border-gray-300" 
                        />
                        <span className="text-xl sm:text-2xl mx-2 sm:mx-4">{option.icon}</span>
                        <span className={`text-gray-700 font-medium group-hover:text-red-600 transition-colors duration-200 text-sm sm:text-base ${locale === 'ar' ? 'mr-2 sm:mr-3 text-right' : 'ml-2 sm:ml-3'}`}>
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
                    {t('additional_comments_label')} <span className="text-gray-400 font-normal">{t('optional_field')}</span>
                  </label>
                  <div className="relative">
                    <textarea
                      name="additionalComments"
                      value={surveyData.additionalComments}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-3 sm:px-4 py-3 sm:py-4 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 placeholder-gray-400 shadow-sm hover:shadow-md resize-none text-sm sm:text-base ${locale === 'ar' ? 'text-right' : ''}`}
                      placeholder={t('additional_comments_placeholder')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg sm:rounded-xl pointer-events-none"></div>
                  </div>
                </div>

                {submitMessage && (
                  <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm ${
                    submitMessage.includes('success') || submitMessage === t('submit_success')
                      ? 'bg-green-100/80 border border-green-300 text-green-700' 
                      : 'bg-red-100/80 border border-red-300 text-red-700'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {submitMessage.includes('success') || submitMessage === t('submit_success') ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                      </svg>
                      <span className="font-medium text-sm sm:text-base">{submitMessage}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons - Responsive */}
            <div className={`mt-8 sm:mt-12 flex ${locale === 'ar' ? 'flex-row-reverse' : ''} justify-between items-center gap-3 sm:gap-4`}>
              <button 
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`group relative py-3 sm:py-4 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  currentStep === 1 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-700 hover:bg-white hover:shadow-lg hover:scale-105'
                }`}
              >
                <span className="flex items-center space-x-1 sm:space-x-2">
                  <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>{t('btn_previous')}</span>
                </span>
              </button>
              
              {currentStep < totalSteps ? (
                <button 
                  onClick={nextStep}
                  disabled={!validateStep(currentStep)}
                  className={`group relative py-3 sm:py-4 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg text-sm sm:text-base ${
                    !validateStep(currentStep) 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:shadow-xl hover:scale-105'
                  }`}
                >
                  <span className="flex items-center space-x-1 sm:space-x-2">
                    <span>{t('btn_next_step')}</span>
                    <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              ) : (
                <button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`group relative py-3 sm:py-4 px-4 sm:px-6 lg:px-8 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 shadow-lg text-sm sm:text-base ${
                    isSubmitting 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-xl hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-1 sm:space-x-2">
                      <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('btn_submitting')}</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1 sm:space-x-2">
                      <span>{t('btn_submit')}</span>
                      <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}