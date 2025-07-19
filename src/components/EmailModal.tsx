'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from "next-intl";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
  isSubmitting?: boolean;
  submitMessage?: string;
  messageType?: 'success' | 'error' | '';
  showMessage?: boolean;
}

export default function EmailModal({ isOpen, onClose, onSubmit }: EmailModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const t = useTranslations('EmailModal');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Email validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  // Name validation
  useEffect(() => {
    setIsNameValid(name.trim().length >= 2);
  }, [name]);

  const isFormValid = isEmailValid && isNameValid;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({ name: name.trim(), email });
      setIsSubmitting(false);
      setName('');
      setEmail('');
      onClose();
    }, 1000);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-gray-900/75 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        {/* Modal positioning */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        {/* Modal content */}
        <div className={`relative inline-block overflow-hidden ${isRTL ? 'text-right' : 'text-left'} align-bottom transition-all transform bg-white rounded-3xl shadow-2xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`} dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Premium gradient border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-5 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-indigo-400 to-cyan-600 rounded-full opacity-5 animate-pulse delay-1000"></div>
          </div>

          <div className="relative bg-white/90 backdrop-blur-md px-6 pt-8 pb-6 sm:px-8 sm:pt-10 sm:pb-8">
            {/* Close button */}
            <button
              onClick={onClose}
              className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-300`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className={`text-center mb-8 ${isRTL ? 'arabic-text' : ''}`}>
              {/* Icon */}
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-3xl">📊</span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {t('title')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className={`block text-sm font-semibold text-gray-700 mb-3 ${isRTL ? 'arabic-text' : ''}`}>
                  {t('nameLabel')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('namePlaceholder')}
                    className={`w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-300 text-gray-900 placeholder-gray-500 ${isNameValid && name ? 'border-green-400' : ''} ${name && !isNameValid ? 'border-red-400' : ''} ${isRTL ? 'text-right arabic-text' : 'text-left'}`}
                    required
                  />
                  
                  {/* Validation icons */}
                  {name && (
                    <div className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'}`}>
                      {isNameValid ? (
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Error message */}
                {name && !isNameValid && (
                  <p className={`mt-2 text-sm text-red-600 ${isRTL ? 'arabic-text' : ''}`}>
                    {t('nameError')}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className={`block text-sm font-semibold text-gray-700 mb-3 ${isRTL ? 'arabic-text' : ''}`}>
                  {t('emailLabel')}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    className={`w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-300 text-gray-900 placeholder-gray-500 ${isEmailValid && email ? 'border-green-400' : ''} ${email && !isEmailValid ? 'border-red-400' : ''} ${isRTL ? 'text-right arabic-text' : 'text-left'}`}
                    required
                  />
                  
                  {/* Validation icons */}
                  {email && (
                    <div className={`absolute top-1/2 transform -translate-y-1/2 ${isRTL ? 'left-4' : 'right-4'}`}>
                      {isEmailValid ? (
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Error message */}
                {email && !isEmailValid && (
                  <p className={`mt-2 text-sm text-red-600 ${isRTL ? 'arabic-text' : ''}`}>
                    {t('emailError')}
                  </p>
                )}
              </div>

              {/* Privacy note */}
              <div className={`bg-blue-50/80 backdrop-blur-sm border border-blue-200 rounded-2xl p-4 ${isRTL ? 'arabic-text' : ''}`}>
                <div className={`flex ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-3`}>
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">{t('privacyTitle')}</p>
                    <p className="text-blue-700">{t('privacyText')}</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} gap-4 pt-4`}>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {t('cancelButton')}
                </button>
                
                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="flex-1 group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                                      <span className="relative z-10 flex items-center justify-center">
                    {isSubmitting ? (
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className={`${isRTL ? 'mr-3' : 'ml-3'}`}>{t('sendingButton')}</span>
                      </div>
                    ) : (
                      <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{t('submitButton')}</span>
                        <svg className={`w-5 h-5 ${isRTL ? 'mr-2 transform scale-x-[-1]' : 'ml-2'} group-hover:translate-x-1 transition-transform duration-300`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}