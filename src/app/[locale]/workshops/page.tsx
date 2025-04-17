'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import Header from '@/components/Header';
import { useTranslations, useLocale } from "next-intl";
import Image from 'next/image';

// Define TypeScript interfaces for the form data
interface WorkshopRegistration {
  name: string;
  email: string;
  position: string;
  country: string;
  expectations: string;
  cv?: File | null;
}

// Define TypeScript interface for toast notifications
interface ToastProps {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
}

export default function WorkshopPage() {
  const t = useTranslations('WorkshopPage');
  const locale = useLocale();
  const router = useRouter();
  const isArabic = locale === 'ar';
  
  // Form state
  const [formData, setFormData] = useState<WorkshopRegistration>({
    name: '',
    email: '',
    position: '',
    country: '',
    expectations: '',
    cv: null
  });
  
  // File upload state
  const [fileName, setFileName] = useState<string>('');
  
  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Toast notification state
  const [toast, setToast] = useState<ToastProps>({
    message: '',
    type: 'success',
    isVisible: false
  });

  // Function to show toast notifications
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

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        showToast(t('file_too_large') || 'File size exceeds 5MB limit', 'error');
        return;
      }
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        showToast(t('invalid_file_type') || 'Only PDF and Word documents are allowed', 'error');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        cv: file
      }));
      setFileName(file.name);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create FormData object for multipart/form-data (for file upload)
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('position', formData.position);
      data.append('country', formData.country);
      data.append('expectations', formData.expectations);
      
      if (formData.cv) {
        data.append('cv', formData.cv);
      }
      
      // Send data to API endpoint
      const response = await fetch('/api/workshop-registration', {
        method: 'POST',
        body: data, // Send FormData directly
        // Don't set Content-Type header, it will be set automatically with the boundary
      });
      
      if (response.ok) {
        showToast(t('success_message'), 'success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          position: '',
          country: '',
          expectations: '',
          cv: null
        });
        setFileName('');
      } else {
        const error = await response.json();
        showToast(error.message || t('error_message'), 'error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showToast(t('error_message'), 'error');
    } finally {
      setIsSubmitting(false);
    }
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
        {/* Hero Banner Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-800 text-white overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl"></div>
            <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className={`md:w-1/2 mb-10 md:mb-0 ${isArabic ? 'md:order-2' : ''}`}>
                <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isArabic ? 'text-right' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
                  {isArabic ? (
                    <>
                      <span className="inline-block">AI-X:</span> <span className="inline-block">أتقن الذكاء الاصطناعي</span> <span className="inline-block">في عملك اليومي</span>
                    </>
                  ) : (
                    t('hero_title')
                  )}
                </h1>
                <div className={`bg-blue-500 h-1 w-20 mb-6 ${isArabic ? 'ml-auto' : ''}`}></div>
                <p className={`text-xl mb-8 text-blue-100 ${isArabic ? 'text-right' : ''}`} dir={isArabic ? 'rtl' : 'ltr'}>
                  {t('hero_subtitle')}
                </p>
                <div className={`flex flex-wrap gap-4 ${isArabic ? 'justify-end' : ''}`}>
                  {['feature_1', 'feature_2', 'feature_3'].map((feature, index) => (
                    <div key={index} className={`flex items-center bg-blue-700 bg-opacity-80 px-4 py-2 rounded-full shadow-md ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isArabic ? 'ml-2' : 'mr-2'} text-white`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-white">{t(feature)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={`md:w-1/2 ${isArabic ? 'md:order-1' : ''}`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-lg transform rotate-3"></div>
                  <div className="relative overflow-hidden rounded-lg shadow-xl">
                    <Image 
                      src="/images/workshop-banner.png" 
                      alt="AI-X Workshop"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                      style={{ 
                        background: "linear-gradient(to right, #4f46e5, #3b82f6)",
                        padding: "2rem"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Registration Form Section */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className={`text-3xl font-bold mb-2 text-center`}>{t('form_title')}</h2>
            <p className={`text-lg text-gray-600 mb-8 text-center`}>{t('form_subtitle')}</p>
            
            <div className="bg-gray-50 rounded-lg shadow-md p-6 md:p-8">
              <form onSubmit={handleSubmit} className={`space-y-6 ${isArabic ? 'text-right' : ''}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form_name')} *
                    </label>
                    <input
                      dir={isArabic ? 'rtl' : 'ltr'}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t('form_name_placeholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form_email')} *
                    </label>
                    <input
                      dir={isArabic ? 'rtl' : 'ltr'}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t('form_email_placeholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form_position')} *
                    </label>
                    <input
                      dir={isArabic ? 'rtl' : 'ltr'}
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t('form_position_placeholder')}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('form_country')} *
                    </label>
                    <input
                      dir={isArabic ? 'rtl' : 'ltr'}
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={t('form_country_placeholder')}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="expectations" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form_expectations')} *
                  </label>
                  <textarea
                    dir={isArabic ? 'rtl' : 'ltr'}
                    id="expectations"
                    name="expectations"
                    value={formData.expectations}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t('form_expectations_placeholder')}
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form_cv')}
                  </label>
                  <div className="relative border border-gray-300 rounded-md">
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="sr-only"
                    />
                    <label
                      htmlFor="cv"
                      className="cursor-pointer flex items-center justify-between w-full px-4 py-3"
                    >
                      <span className={`text-gray-500 ${fileName ? 'text-blue-600' : ''}`}>
                        {fileName || t('form_cv_placeholder')}
                      </span>
                      <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm">
                        {t('form_browse')}
                      </span>
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {t('form_cv_help')}
                  </p>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('form_submitting') : t('form_submit')}
                    {isSubmitting && (
                      <span className="ml-2 inline-block animate-spin">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}