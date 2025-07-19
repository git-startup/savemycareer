'use client';

import {Link} from '@/i18n/routing';
import Header from '@/components/Header';
import { useTranslations, useLocale } from "next-intl";
import EmailModal from '@/components/EmailModal';
import { useState } from 'react';

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [activeTab, setActiveTab] = useState('mission');
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

      <main className={`relative overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-40 ${isRTL ? '-left-40' : '-right-40'} w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-10 animate-pulse`}></div>
            <div className={`absolute -bottom-40 ${isRTL ? '-right-40' : '-left-40'} w-96 h-96 bg-gradient-to-tr from-indigo-400 to-cyan-600 rounded-full opacity-10 animate-pulse delay-1000`}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-5 animate-spin-slow"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4">
            <div className="text-center">
              {/* Premium Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg mb-8">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
                <span>{t('hero.badge')}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                  {t('hero.title.part1')}
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {t('hero.title.part2')}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
                {t('hero.subtitle')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/survey">
                  <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                    <span className="relative z-10">{t('hero.cta.primary')}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                </Link>
                
                <button onClick={handleReportsClick} className="group relative bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-2xl hover:bg-white hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <span className="relative z-10">{t('hero.cta.secondary')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values Section */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-gray-200">
                {[
                  { id: 'mission', label: t('tabs.mission'), icon: '🎯' },
                  { id: 'vision', label: t('tabs.vision'), icon: '🔮' },
                  { id: 'values', label: t('tabs.values'), icon: '💎' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <span className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="max-w-5xl mx-auto">
              {activeTab === 'mission' && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/20 transform transition-all duration-500 opacity-100">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {t('mission.title')}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {t('mission.description')}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: t('mission.points.dataInsights.title'),
                        description: t('mission.points.dataInsights.description'),
                        icon: "📊"
                      },
                      {
                        title: t('mission.points.democratized.title'),
                        description: t('mission.points.democratized.description'),
                        icon: "🌍"
                      },
                      {
                        title: t('mission.points.futureReady.title'),
                        description: t('mission.points.futureReady.description'),
                        icon: "🚀"
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                        <div className="text-3xl mb-4">{item.icon}</div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/20 transform transition-all duration-500 opacity-100">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">🔮</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {t('vision.title')}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {t('vision.description')}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-900">{t('vision.goals2025.title')}</h3>
                      <ul className="space-y-3 text-gray-600">
                        <li className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span>{t('vision.goals2025.items.professionals')}</span>
                        </li>
                        <li className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span>{t('vision.goals2025.items.industries')}</span>
                        </li>
                        <li className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span>{t('vision.goals2025.items.countries')}</span>
                        </li>
                        <li className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                          <span>{t('vision.goals2025.items.database')}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
                      <h3 className="text-2xl font-semibold mb-4 text-gray-900">{t('vision.longTerm.title')}</h3>
                      <ul className="space-y-3 text-gray-600">
                        <li className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                          <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                          <span>{t('vision.longTerm.items.anxiety')}</span>
                        </li>
                        <li className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                          <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                          <span>{t('vision.longTerm.items.adaptability')}</span>
                        </li>
                        <li className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                          <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                          <span>{t('vision.longTerm.items.collaboration')}</span>
                        </li>
                        <li className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                          <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                          <span>{t('vision.longTerm.items.inclusive')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/20 transform transition-all duration-500 opacity-100">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-3xl">💎</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                      {t('values.title')}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                      {t('values.description')}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: t('values.items.transparency.title'),
                        description: t('values.items.transparency.description'),
                        icon: "🔍",
                        color: "from-blue-500 to-cyan-500"
                      },
                      {
                        title: t('values.items.accuracy.title'),
                        description: t('values.items.accuracy.description'),
                        icon: "🎯",
                        color: "from-green-500 to-emerald-500"
                      },
                      {
                        title: t('values.items.inclusivity.title'),
                        description: t('values.items.inclusivity.description'),
                        icon: "🌍",
                        color: "from-purple-500 to-pink-500"
                      },
                      {
                        title: t('values.items.innovation.title'),
                        description: t('values.items.innovation.description'),
                        icon: "🚀",
                        color: "from-orange-500 to-red-500"
                      },
                      {
                        title: t('values.items.privacy.title'),
                        description: t('values.items.privacy.description'),
                        icon: "🔒",
                        color: "from-gray-500 to-slate-500"
                      },
                      {
                        title: t('values.items.empowerment.title'),
                        description: t('values.items.empowerment.description'),
                        icon: "💪",
                        color: "from-yellow-500 to-amber-500"
                      }
                    ].map((value, index) => (
                      <div key={index} className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mb-4`}>
                          <span className="text-xl">{value.icon}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-900">{value.title}</h3>
                        <p className="text-gray-600">{value.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                {t('story.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('story.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4 mb-4`}>
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">01</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{t('story.steps.problem.title')}</h3>
                      <p className="text-gray-500">2023</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {t('story.steps.problem.description')}
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4 mb-4`}>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">02</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{t('story.steps.solution.title')}</h3>
                      <p className="text-gray-500">2024</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {t('story.steps.solution.description')}
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/20">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4 mb-4`}>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">03</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{t('story.steps.impact.title')}</h3>
                      <p className="text-gray-500">{t('story.steps.impact.year')}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    {t('story.steps.impact.description')}
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('story.stats.title')}</h3>
                    <p className="text-gray-600">{t('story.stats.subtitle')}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                      <div className="text-sm text-gray-600">{t('story.stats.professionals')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">120+</div>
                      <div className="text-sm text-gray-600">{t('story.stats.industries')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                      <div className="text-sm text-gray-600">{t('story.stats.accuracy')}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">25+</div>
                      <div className="text-sm text-gray-600">{t('story.stats.countries')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                {t('technology.title')}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('technology.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: t('technology.sections.dataCollection.title'),
                  description: t('technology.sections.dataCollection.description'),
                  icon: "📊",
                  color: "from-blue-500 to-cyan-500",
                  features: [
                    t('technology.sections.dataCollection.features.surveys'),
                    t('technology.sections.dataCollection.features.partnerships'),
                    t('technology.sections.dataCollection.features.realTime'),
                    t('technology.sections.dataCollection.features.global')
                  ]
                },
                {
                  title: t('technology.sections.aiAnalysis.title'),
                  description: t('technology.sections.aiAnalysis.description'),
                  icon: "🤖",
                  color: "from-purple-500 to-pink-500",
                  features: [
                    t('technology.sections.aiAnalysis.features.ml'),
                    t('technology.sections.aiAnalysis.features.pattern'),
                    t('technology.sections.aiAnalysis.features.predictive'),
                    t('technology.sections.aiAnalysis.features.trends')
                  ]
                },
                {
                  title: t('technology.sections.insights.title'),
                  description: t('technology.sections.insights.description'),
                  icon: "💡",
                  color: "from-green-500 to-emerald-500",
                  features: [
                    t('technology.sections.insights.features.reports'),
                    t('technology.sections.insights.features.benchmarks'),
                    t('technology.sections.insights.features.recommendations'),
                    t('technology.sections.insights.features.predictions')
                  ]
                }
              ].map((item, index) => (
                <div key={index} className="group bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mb-6">{item.description}</p>
                  
                  <ul className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 text-sm text-gray-600`}>
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`}></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              {t('cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/survey">
                <button className="bg-white text-blue-900 font-semibold py-4 px-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
                  {t('cta.buttons.survey')}
                </button>
              </Link>
              
                <button onClick={handleReportsClick}  className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-2xl hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  {t('cta.buttons.reports')}
                </button>
      
            </div>
          </div>
        </section>
      </main>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .rtl .space-x-reverse > :not([hidden]) ~ :not([hidden]) {
          --tw-space-x-reverse: 1;
          margin-right: calc(0.5rem * var(--tw-space-x-reverse));
          margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
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

      {/* Global Success/Error Toast */}
      {showMessage && submitMessage && (
        <div className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-lg shadow-lg border transition-all duration-300 transform ${
          showMessage ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
        } ${
          messageType === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {messageType === 'success' ? (
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{submitMessage}</p>
            </div>
            <button
              onClick={() => {
                setShowMessage(false);
                setSubmitMessage('');
              }}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      
    </div>
  );
}