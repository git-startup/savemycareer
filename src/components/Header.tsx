'use client';

import {Link} from '@/i18n/routing';
import Image from 'next/image';
import { useTransition, useState } from 'react';
import {useParams} from 'next/navigation';
import { useTranslations, useLocale } from "next-intl";
import {usePathname, useRouter} from '@/i18n/routing'; 
import PremiumLogo from './PremiumLogo';
import EmailModal from './EmailModal';

export default function Header() {
  const locale = useLocale();
  const t = useTranslations('Header'); 
  const pathname = usePathname();
  const isArabic = locale === 'ar';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [showMessage, setShowMessage] = useState(false);

  // Get the opposite locale for switching
  const switchTo = isArabic ? 'en' : 'ar';
  const switchLabel = isArabic ? 'English' : 'العربية';
  // Language icons
  const langIcon = isArabic ? '/images/lang-en.png' : '/images/lang-ar.png';

  const [ isPending, startTransition ] = useTransition();
  const router = useRouter();
  const params = useParams();

  const changeLang = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const nextLocale = e.currentTarget.getAttribute('data-locale');
    if (nextLocale) {
      startTransition(() => {
        router.replace(
          pathname,
          { locale: nextLocale }
        );
      });
    }
  }

  // Handle reports link click
  const handleReportsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEmailModalOpen(true);
    setIsMenuOpen(false); // Close mobile menu if open
    // Reset message state when opening modal
    setSubmitMessage('');
    setMessageType('');
    setShowMessage(false);
  };

  // Handle email submission
  const handleEmailSubmit = async (data: { name: string; email: string }) => {
    setIsSubmitting(true);
    setSubmitMessage('');
    setMessageType('');
    setShowMessage(false);
    
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data, language: locale}),
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitMessage(result.message || t('submit_success'));
        setMessageType('success');
        setShowMessage(true);
        
        // Close modal after 3 seconds on success
        setTimeout(() => {
          setIsEmailModalOpen(false);
          setShowMessage(false);
          setSubmitMessage('');
        }, 3000);
      } else {
        setSubmitMessage(result.message || t('submit_error'));
        setMessageType('error');
        setShowMessage(true);
      }
    } catch (error) {
      console.error('Email submission error:', error);
      setSubmitMessage(t('submit_error'));
      setMessageType('error');
      setShowMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigationItems = [
    { 
      href: '/reports', 
      label: t('reports'), 
      icon: '📊',
      onClick: handleReportsClick
    },
    { 
      href: '/survey', 
      label: t('participate'), 
      icon: '🎯'
    },
    { 
      href: '/about', 
      label: t('about'), 
      icon: 'ℹ️'
    }
  ];

  return (
    <>
      <header className="relative bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
          <div className="flex justify-between items-center min-h-[60px] sm:min-h-[70px]">
            {/* Premium Logo - Responsive sizing */}
            <div className="flex-shrink-0 min-w-0 max-w-[60%] sm:max-w-none">
              <PremiumLogo 
                size="large" 
                showTagline={false} 
                animate={true} 
                className="scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 origin-left"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.href}>
                  {item.onClick ? (
                    <button
                      onClick={item.onClick}
                      className="group relative px-3 xl:px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-base xl:text-lg">{item.icon}</span>
                        <span className="text-gray-700 group-hover:text-blue-600 font-medium transition-colors duration-300 text-sm xl:text-base">
                          {item.label}
                        </span>
                      </div>
                      
                      {/* Hover underline */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </button>
                  ) : (
                    <Link href={item.href}>
                      <div className="group relative px-3 xl:px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50">
                        <div className="flex items-center space-x-2">
                          <span className="text-base xl:text-lg">{item.icon}</span>
                          <span className="text-gray-700 group-hover:text-blue-600 font-medium transition-colors duration-300 text-sm xl:text-base">
                            {item.label}
                          </span>
                        </div>
                        
                        {/* Hover underline */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Language Switcher */}
              <div className="ml-4 xl:ml-6 pl-4 xl:pl-6 border-l border-gray-200">
                <button 
                  onClick={changeLang}
                  data-locale={switchTo}
                  className="group flex items-center space-x-2 px-3 xl:px-4 py-2 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-200 transition-all duration-300"
                >
                  <div className="w-5 xl:w-6 h-5 xl:h-6 rounded-full overflow-hidden border-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300 flex-shrink-0">
                    <Image 
                      src={langIcon} 
                      alt={switchLabel} 
                      width={24} 
                      height={24} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-xs xl:text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300 whitespace-nowrap">
                    {switchLabel}
                  </span>
                </button>
              </div>
            </nav>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              {/* Mobile Language Switcher */}
              <button 
                onClick={changeLang}
                data-locale={switchTo}
                className="flex items-center space-x-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 flex-shrink-0 min-w-0"
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={langIcon} 
                    alt={switchLabel} 
                    width={20} 
                    height={20} 
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap hidden xs:inline">
                  {switchLabel}
                </span>
              </button>
              
              {/* Hamburger Menu */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg flex-shrink-0"
                aria-label="Toggle menu"
              >
                <svg 
                  className={`w-5 sm:w-6 h-5 sm:h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-45' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-2 sm:mt-3' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-white/95 backdrop-blur-md rounded-lg sm:rounded-xl shadow-xl border border-gray-200 p-2 sm:p-3">
              <nav className="space-y-1">
                {navigationItems.map((item) => (
                  <div key={item.href}>
                    {item.onClick ? (
                      <button
                        onClick={item.onClick}
                        className="w-full flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 text-left"
                      >
                        <span className="text-base sm:text-lg flex-shrink-0">{item.icon}</span>
                        <span className="text-gray-700 font-medium text-sm sm:text-base truncate">{item.label}</span>
                      </button>
                    ) : (
                      <Link href={item.href}>
                        <div 
                          className="flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <span className="text-base sm:text-lg flex-shrink-0">{item.icon}</span>
                          <span className="text-gray-700 font-medium text-sm sm:text-base truncate">{item.label}</span>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Premium gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-50"></div>
      </header>

      {/* Email Modal */}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => {
          setIsEmailModalOpen(false);
          setSubmitMessage('');
          setMessageType('');
          setShowMessage(false);
        }}
        onSubmit={handleEmailSubmit}
        isSubmitting={isSubmitting}
        submitMessage={submitMessage}
        messageType={messageType}
        showMessage={showMessage}
      />

      {/* Global Success/Error Toast - Responsive */}
      {showMessage && submitMessage && (
        <div className={`fixed top-2 sm:top-4 right-2 sm:right-4 left-2 sm:left-auto z-50 sm:max-w-md p-2 sm:p-3 rounded-lg shadow-lg border transition-all duration-300 transform ${
          showMessage ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
        } ${
          messageType === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 mt-0.5">
              {messageType === 'success' ? (
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium break-words leading-tight">{submitMessage}</p>
            </div>
            <button
              onClick={() => {
                setShowMessage(false);
                setSubmitMessage('');
              }}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5"
              aria-label="Close notification"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}