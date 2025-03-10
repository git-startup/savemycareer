'use client';

import { useState, useEffect, useRef } from 'react';
import {useRouter} from '@/i18n/routing'; 
import Header from '@/components/Header';
import { questions, arQuestions, fieldsQuestions, arFieldsQuestions, Question, Field } from '@/data/questions';
import { careers, arCareers } from '@/data/careers';
import { locations, arLocations } from '@/data/locations';
import { useTranslations, useLocale } from "next-intl";

interface UserInfo {
  career: string;
  location: string;
  yearsExperience: string;
}

interface Answers {
  [key: number]: number;
}

export default function QuestionsPage() {
  const t = useTranslations('QuestionsPage');
  const locale = useLocale();
  
  // Force light theme by default
  useEffect(() => {
    // Remove dark class from document to ensure light theme
    document.documentElement.classList.remove('dark');
    // You can store this preference if needed
    localStorage.setItem('theme', 'light');
  }, []);
  
  // Determine which question set to use based on locale
  const questionSet = locale === 'ar' ? arQuestions : questions;
  const fieldQuestionSet = locale === 'ar' ? arFieldsQuestions : fieldsQuestions;
  // Use the correct career and location lists based on locale
  const careersList = locale === 'ar' ? arCareers : careers;
  const locationsList = locale === 'ar' ? arLocations : locations;

  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [userInfo, setUserInfo] = useState<UserInfo>({
    career: '',
    location: '',
    yearsExperience: ''
  });

  // Autocomplete state
  const [careerSuggestions, setCareerSuggestions] = useState<string[]>([]);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showCareerSuggestions, setShowCareerSuggestions] = useState<boolean>(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState<boolean>(false);
  
  // Refs for clicking outside detection
  const careerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  // Handle autocomplete filtering with the locale-appropriate lists
  useEffect(() => {
    if (userInfo.career) {
      const filtered = careersList.filter(item => 
        item.toLowerCase().includes(userInfo.career.toLowerCase())
      );
      setCareerSuggestions(filtered);
    } else {
      setCareerSuggestions([]);
    }
  }, [userInfo.career, careersList]);

  useEffect(() => {
    if (userInfo.location) {
      const filtered = locationsList.filter(item => 
        item.toLowerCase().includes(userInfo.location.toLowerCase())
      );
      setLocationSuggestions(filtered);
    } else {
      setLocationSuggestions([]);
    }
  }, [userInfo.location, locationsList]);

  // Handle clicking outside of autocomplete
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

  const handleAnswerSelect = (questionId: number, answerIndex: number): void => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });

    // Show suggestions when typing
    if (name === 'career') {
      setShowCareerSuggestions(true);
    } else if (name === 'location') {
      setShowLocationSuggestions(true);
    }
  };

  const handleSuggestionSelect = (name: string, value: string): void => {
    setUserInfo({
      ...userInfo,
      [name]: value
    });
    
    if (name === 'career') {
      setShowCareerSuggestions(false);
    } else if (name === 'location') {
      setShowLocationSuggestions(false);
    }
  };

  const handleNext = (): void => {
    if (currentQuestion < questionSet.length) {
      setCurrentQuestion(currentQuestion + 1);
      window.scrollTo(0, 0);
    } else {
      // For Next.js 13+ App Router, storing in localStorage instead of router query
      localStorage.setItem('aiAssessmentAnswers', JSON.stringify(answers));
      localStorage.setItem('aiAssessmentUserInfo', JSON.stringify(userInfo));
      router.push('/results'); 
    }
  };

  const handlePrevious = (): void => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      window.scrollTo(0, 0);
    }
  };

  const isCurrentQuestionAnswered = (): boolean => {
    if (currentQuestion === 0) {
      // For the user info page
      return userInfo.career.trim() !== '' && 
             userInfo.location.trim() !== '' && 
             userInfo.yearsExperience !== '';
    }
    
    // For regular questions
    return answers[questionSet[currentQuestion - 1].id] !== undefined;
  };

  // Use fieldsQuestions or arFieldsQuestions for the first question (index 0)
  const initialQuestion = fieldQuestionSet[0];
  
  // Use regular questions or arQuestions for subsequent questions (adjust index to match the array)
  const question = currentQuestion === 0 
    ? initialQuestion 
    : questionSet[currentQuestion - 1];

  const progressPercentage = (currentQuestion / questionSet.length) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        <div className="max-w-3xl mx-auto px-4 py-12">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="text-center mb-2">
            <span className="bg-blue-100 text-blue-500 px-3 py-1 rounded-full text-sm font-medium">
              {currentQuestion === 0 ? t("about_you") : `${t("question")} ${currentQuestion} ${t("of")} ${questionSet.length}`}
            </span>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-medium mb-6 text-center">
              {question.title}
            </h2>
            
            {currentQuestion === 0 ? ( 
              <div className="space-y-6">
                {initialQuestion.fields.map((field: Field, index: number) => (
                  <div key={index} className="space-y-2">
                    <label className={`block text-sm font-medium text-gray-700 ${locale === 'ar' ? 'text-right' : ''}`}>
                      {field.label}
                    </label>
                    
                    {field.type === 'autocomplete' && field.name === 'career' && (
                      <div className="relative" ref={careerRef}>
                        <input
                          dir={locale == 'ar' ? 'rtl' : ''}
                          type="text"
                          name={field.name}
                          value={userInfo[field.name as keyof UserInfo]}
                          onChange={handleInfoChange}
                          onFocus={() => setShowCareerSuggestions(true)}
                          placeholder={field.placeholder}
                          className={`w-full p-3 border border-gray-300 rounded-md 
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${locale === 'ar' ? 'text-right' : ''}`}
                        />
                        {showCareerSuggestions && careerSuggestions.length > 0 && (
                          <ul className="absolute z-10 w-full bg-white mt-1 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                            {careerSuggestions.map((suggestion, i) => (
                              <li 
                                key={i} 
                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${locale === 'ar' ? 'text-right' : ''}`}
                                onClick={() => handleSuggestionSelect('career', suggestion)}
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    
                    {field.type === 'autocomplete' && field.name === 'location' && (
                      <div className="relative" ref={locationRef}>
                        <input
                          dir={locale == 'ar' ? 'rtl' : ''}
                          type="text"
                          name={field.name}
                          value={userInfo[field.name as keyof UserInfo]}
                          onChange={handleInfoChange}
                          onFocus={() => setShowLocationSuggestions(true)}
                          placeholder={field.placeholder}
                          className={`w-full p-3 border border-gray-300 rounded-md 
                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${locale === 'ar' ? 'text-right' : ''}`}
                        />
                        {showLocationSuggestions && locationSuggestions.length > 0 && (
                          <ul className="absolute z-10 w-full bg-white mt-1 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                            {locationSuggestions.map((suggestion, i) => (
                              <li 
                                key={i} 
                                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${locale === 'ar' ? 'text-right' : ''}`}
                                onClick={() => handleSuggestionSelect('location', suggestion)}
                              >
                                {suggestion}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    
                    {field.type === 'select' && (
                      <select
                        dir={locale == 'ar' ? 'rtl' : ''}
                        name={field.name}
                        value={userInfo[field.name as keyof UserInfo]}
                        onChange={handleInfoChange}
                        className={`w-full p-3 border border-gray-300 rounded-md
                                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${locale === 'ar' ? 'text-right' : ''}`}
                      >
                        <option value="">{t("select_an_option")}</option>
                        {field.options && field.options.map((option: string, i: number) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              // Render multiple choice options
              <div className="space-y-3">
                {(question as Question).options.map((option, index) => {
                  return (
                    <label 
                      key={index} 
                      className={`flex items-center ${locale === 'ar' ? 'flex-row-reverse' : ''} p-3 border rounded-md cursor-pointer transition-colors
                                ${answers[(question as Question).id] === index 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <input 
                        type="radio" 
                        name={`question${(question as Question).id}`} 
                        checked={answers[(question as Question).id] === index}
                        onChange={() => handleAnswerSelect((question as Question).id, index)}
                        className="h-4 w-4 text-blue-500" 
                      />
                      <span className={`text-gray-700 ${locale === 'ar' ? 'mr-3' : 'ml-3'}`}>
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
            
            <div className={`mt-8 flex ${locale === 'ar' ? '' : 'flex-row-reverse'} justify-between`}>
              <button 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`py-2 px-4 rounded-lg transition-colors cursor-pointer
                          ${currentQuestion === 0 
                            ? 'bg-gray-300 cursor-not-allowed' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                {t("previous")}
              </button>
              
              <button 
                onClick={handleNext}
                disabled={!isCurrentQuestionAnswered()}
                className={`py-2 px-4 rounded-lg transition-colors cursor-pointer
                          ${!isCurrentQuestionAnswered() 
                            ? 'bg-blue-300 cursor-not-allowed' 
                            : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                {currentQuestion === questionSet.length ? t("see_results") : t("next")}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}