'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/routing'; 
import Header from '@/components/Header';
import { careerFinderQuestions, arCareerFinderQuestions, careerFinderFieldsQuestions, arCareerFinderFieldsQuestions } from '@/data/careerFinderQuestions';
import { useTranslations, useLocale } from "next-intl";

interface UserInfo {
  currentField: string;
  educationLevel: string;
  adaptability: string;
}

interface Answers {
  [key: number]: number;
}

export default function CareerFinderPage() {
  const t = useTranslations('CareerFinderPage');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  // Force light theme by default
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, []);
  
  // Determine which question set to use based on locale
  const questionSet = locale === 'ar' ? arCareerFinderQuestions : careerFinderQuestions;
  const fieldQuestionSet = locale === 'ar' ? arCareerFinderFieldsQuestions : careerFinderFieldsQuestions;

  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [userInfo, setUserInfo] = useState<UserInfo>({
    currentField: '',
    educationLevel: '',
    adaptability: ''
  });

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
  };

  const handleNext = (): void => {
    if (currentQuestion < questionSet.length) {
      setCurrentQuestion(currentQuestion + 1);
      window.scrollTo(0, 0);
    } else {
      // Store assessment data in localStorage for results page
      localStorage.setItem('careerFinderAnswers', JSON.stringify(answers));
      localStorage.setItem('careerFinderUserInfo', JSON.stringify(userInfo));
      router.push('/career-finder/results'); 
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
      return userInfo.currentField !== '' && 
             userInfo.educationLevel !== '' && 
             userInfo.adaptability !== '';
    }
    
    // For regular questions
    return answers[questionSet[currentQuestion - 1].id] !== undefined;
  };

  // Use fieldQuestionSet for the first question (index 0)
  const initialQuestion = fieldQuestionSet[0];
  
  // Use regular questions for subsequent questions (adjust index to match the array)
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
              className="bg-purple-600 h-2 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="text-center mb-2">
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
              {currentQuestion === 0 ? t("about_you") : `${t("question")} ${currentQuestion} ${t("of")} ${questionSet.length}`}
            </span>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-medium mb-6 text-center">
              {question.title}
            </h2>
            
            {currentQuestion === 0 ? ( 
              <div className="space-y-6">
                {initialQuestion.fields.map((field, index) => (
                  <div key={index} className="space-y-2">
                    <label className={`block text-sm font-medium text-gray-700 ${isRtl ? 'text-right' : ''}`}>
                      {field.label}
                    </label>
                    
                    {field.type === 'select' && (
                      <select
                        dir={isRtl ? 'rtl' : 'ltr'}
                        name={field.name}
                        value={userInfo[field.name as keyof UserInfo]}
                        onChange={handleInfoChange}
                        className={`w-full p-3 border border-gray-300 rounded-md
                                 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 ${isRtl ? 'text-right' : ''}`}
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
                {question.options.map((option, index) => {
                  return (
                    <label 
                      key={index} 
                      className={`flex items-center ${isRtl ? 'flex-row-reverse' : ''} p-3 border rounded-md cursor-pointer transition-colors
                                ${answers[question.id] === index 
                                  ? 'border-purple-500 bg-purple-50' 
                                  : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <input 
                        type="radio" 
                        name={`question${question.id}`} 
                        checked={answers[question.id] === index}
                        onChange={() => handleAnswerSelect(question.id, index)}
                        className="h-4 w-4 text-purple-500" 
                      />
                      <span className={`text-gray-700 ${isRtl ? 'mr-3 text-right' : 'ml-3'}`}>
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
            
            <div className={`mt-8 flex ${isRtl ? '' : 'flex-row-reverse'} justify-between`}>
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
                            ? 'bg-purple-300 cursor-not-allowed' 
                            : 'bg-purple-600 text-white hover:bg-purple-700'}`}
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