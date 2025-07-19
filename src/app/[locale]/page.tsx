"use client";
  
import {Link} from '@/i18n/routing';
import Header from '@/components/Header';
import EmailModal from '@/components/EmailModal';
import { ShieldIcon, BoltIcon, AdjustmentsIcon } from '@/components/Icons';
import { useState } from 'react';
import { useTranslations, useLocale } from "next-intl";

export default function LandingPage() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [showMessage, setShowMessage] = useState(false);

  const handleReportsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsEmailModalOpen(true);
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
  
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header /> 
 
      <main className="relative overflow-hidden">
        {/* Hero Section with Animated Background */}
        <section className="relative py-12 sm:py-16 md:py-20 lg:py-32">
          {/* Animated Background Elements - Responsive */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10 animate-pulse"></div>
            <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-tr from-indigo-400 to-cyan-600 rounded-full opacity-10 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-5 animate-spin-slow"></div>
          </div>

          {/* Floating Data Points - Responsive */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-16 sm:top-20 left-6 sm:left-10 w-2 sm:w-3 h-2 sm:h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
            <div className="absolute top-24 sm:top-32 right-8 sm:right-16 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-500 rounded-full animate-bounce delay-700"></div>
            <div className="absolute bottom-32 sm:bottom-40 left-12 sm:left-20 w-3 sm:w-4 h-3 sm:h-4 bg-indigo-500 rounded-full animate-bounce delay-1000"></div>
            <div className="absolute bottom-48 sm:bottom-60 right-6 sm:right-10 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-cyan-500 rounded-full animate-bounce delay-300"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="text-center">
              {/* Premium Badge - Responsive */}
              <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg mb-6 sm:mb-8 animate-fade-in">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="whitespace-nowrap">{t("trusted_data_badge")}</span>
              </div>
              
              {/* Main Headlines - Responsive Typography */}
              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent block">
                    {t("main_title_part1")}
                  </span>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient block">
                    {t("main_title_part2")}
                  </span>
                  <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent block">
                    {t("main_title_part3")}
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light px-2 sm:px-4">
                  {t("main_description")}
                </p>
              </div>
              
              {/* CTA Buttons - Responsive Layout */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
                <Link href="/survey" className="w-full sm:w-auto">
                  <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 text-base sm:text-lg w-full sm:w-auto">
                    <span className="relative z-10">{t("cta_primary")}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                </Link>
                
                <button 
                  onClick={handleReportsClick} 
                  className="group relative bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-2xl hover:bg-white hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-base sm:text-lg w-full sm:w-auto"
                >
                  <span className="relative z-10">{t("cta_secondary")}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
              
              {/* Participation Note - Responsive */}
              <div className="inline-flex items-center space-x-1.5 sm:space-x-2 bg-white/60 backdrop-blur-sm text-gray-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm border border-gray-200 shadow-sm max-w-full mx-4 sm:mx-0">
                <svg className="w-3 sm:w-4 h-3 sm:h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <span className="text-center break-words">{t("participation_note")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Banner Section - Responsive */}
        <section className="relative py-12 sm:py-16 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
              animation: 'float 6s ease-in-out infinite'
            }}></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    50K+
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg text-blue-100">{t("stat_professionals")}</div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    120+
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg text-purple-100">{t("stat_industries")}</div>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    95%
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg text-green-100">{t("stat_accuracy")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section - Responsive */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent px-2">
                {t("how_it_works_title")}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                {t("how_it_works_description")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  step: "1",
                  title: t("step_1_title"),
                  description: t("step_1_description"),
                  icon: "📊",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  step: "2", 
                  title: t("step_2_title"),
                  description: t("step_2_description"),
                  icon: "🔄",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  step: "3",
                  title: t("step_3_title"),
                  description: t("step_3_description"),
                  icon: "📈",
                  color: "from-indigo-500 to-blue-500"
                }
              ].map((item, index) => (
                <div key={index} className={`group relative ${locale === 'ar' ? 'text-center' : 'text-center'}`}>
                  {/* Connecting Line - Hide on mobile */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 z-0 transform translate-x-4"></div>
                  )}
                  
                  <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100">
                    {/* Step Number - Responsive */}
                    <div className={`w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-white font-bold text-lg sm:text-xl shadow-lg`}>
                      {item.step}
                    </div>
                    
                    {/* Icon - Responsive */}
                    <div className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                    
                    {/* Content - Responsive */}
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 px-2">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">{item.description}</p>
                    
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section - Responsive */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent px-2">
                {t("features_title")}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                {t("features_description")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: <ShieldIcon />,
                  title: t("feature_data_accuracy_title"),
                  description: t("feature_data_accuracy_description"),
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <BoltIcon />,
                  title: t("feature_real_time_title"),
                  description: t("feature_real_time_description"),
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: <AdjustmentsIcon />,
                  title: t("feature_personalized_title"),
                  description: t("feature_personalized_description"),
                  gradient: "from-indigo-500 to-blue-500"
                }
              ].map((feature, index) => (
                <div key={index} className="group relative">
                  <div className={`relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                    {/* Icon Container - Responsive */}
                    <div className={`w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-r ${feature.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center ${locale === 'ar' ? 'ml-auto' : 'mr-auto'} mb-4 sm:mb-6 shadow-lg`}>
                      <div className="text-white text-xl sm:text-2xl">
                        {feature.icon}
                      </div>
                    </div>
                    
                    {/* Content - Responsive */}
                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-900 px-1">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-1">{feature.description}</p>
                    
                    {/* Hover Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium CTA Section - Responsive */}
        <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
          {/* Animated Background - Responsive */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-6 sm:top-10 left-6 sm:left-10 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-blue-500/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 w-20 sm:w-28 lg:w-40 h-20 sm:h-28 lg:h-40 bg-purple-500/20 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 sm:w-18 lg:w-24 h-12 sm:h-18 lg:h-24 bg-indigo-500/20 rounded-full animate-pulse delay-500"></div>
            </div>
          </div>
          
          <div className="relative max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight px-2">
              {t("final_cta_title")}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed px-4">
              {t("final_cta_description")}
            </p>
            
            <Link href="/survey" className="inline-block w-full sm:w-auto">
              <button className="group relative bg-white text-blue-900 font-semibold py-4 sm:py-5 px-8 sm:px-12 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 text-base sm:text-lg w-full sm:w-auto">
                <span className="relative z-10">{t("final_cta_button")}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Link>
          </div>
        </section>
      </main>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin-slow {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>

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
        <div className={`fixed top-3 sm:top-4 right-3 sm:right-4 left-3 sm:left-auto z-50 sm:max-w-md p-3 sm:p-4 rounded-lg shadow-lg border transition-all duration-300 transform ${
          showMessage ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
        } ${
          messageType === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-start space-x-2 sm:space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {messageType === 'success' ? (
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium break-words">{submitMessage}</p>
            </div>
            <button
              onClick={() => {
                setShowMessage(false);
                setSubmitMessage('');
              }}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5"
              aria-label="Close notification"
            >
              <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
    </div>
    
  );
}