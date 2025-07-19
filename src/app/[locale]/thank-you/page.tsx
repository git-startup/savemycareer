// src/app/[locale]/thank-you/page.tsx
'use client';

import {Link} from '@/i18n/routing';
import Header from '@/components/Header';
import { useTranslations, useLocale } from "next-intl";

export default function ThankYouPage() {
  const t = useTranslations('ThankYouPage');
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Main Content */}
          <div >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('title')}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('main_message')}
            </p>

            {/* What happens next */}
            <div className="bg-blue-50 rounded-lg p-8 mb-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-blue-900">
                {t('what_next_title')}
              </h2>
              
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${locale === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">{t('step_1_title')}</h3>
                    <p className="text-blue-700 text-sm">{t('step_1_description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">{t('step_2_title')}</h3>
                    <p className="text-blue-700 text-sm">{t('step_2_description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">{t('step_3_title')}</h3>
                    <p className="text-blue-700 text-sm">{t('step_3_description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-2">{t('step_4_title')}</h3>
                    <p className="text-blue-700 text-sm">{t('step_4_description')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8 max-w-2xl mx-auto">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={`${locale === 'ar' ? 'mr-3' : 'ml-3'}`}>
                  <p className="text-sm text-amber-700">
                    <strong>{t('important_note_title')}</strong><br />
                    {t('important_note_message')}
                  </p>
                </div>
              </div>
            </div>



            {/* Social Sharing */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">{t('share_message')}</p>
              <div className="flex justify-center space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  {t('share_linkedin')}
                </button>
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                  {t('share_twitter')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}