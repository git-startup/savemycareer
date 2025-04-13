'use client';

import {Link} from '@/i18n/routing';
import Image from 'next/image';
import { useTransition, useState } from 'react';
import {useParams} from 'next/navigation';
import { useTranslations, useLocale } from "next-intl";
import {usePathname, useRouter} from '@/i18n/routing'; 

export default function Header() {
  const locale = useLocale();
  const t = useTranslations('Header'); 
  const pathname = usePathname();
  const isArabic = locale === 'ar';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get the opposite locale for switching
  const switchTo = isArabic ? 'en' : 'ar';
  const switchLabel = isArabic ? 'English' : 'العربية';
  
  const [ isPending, startTransition ] = useTransition();
  const router = useRouter();
  const params = useParams();

  const changeLang = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const nextLocale = e.currentTarget.getAttribute('data-locale');
    // Make sure nextLocale is not null before using it
    if (nextLocale) {
      startTransition(() => {
        // Fix: Correctly use the router.replace method based on next-intl routing
        router.replace(
          pathname,
          { locale: nextLocale }
        );
      });
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-800" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Container - Text-focused design */}
        <Link href="/" className="flex items-center">
          {/* SVG Logo - Text-focused for better visibility */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 500 120" 
            className="h-12 w-48 md:h-14 md:w-56"
            style={{ minWidth: '180px' }}
          >
            {/* Streamlined Logo for Header Use */}
            <g transform="scale(0.6) translate(10, -20)">
              {/* Career Path Line - Made smaller to emphasize text */}
              <path 
                d="M40,100 C80,80 120,90 160,70 C200,50 240,60 280,40 C320,20 360,30 400,10" 
                stroke="#4361ee" 
                strokeWidth="10" 
                fill="none" 
                strokeLinecap="round"
              />
              
              {/* Data Points */}
              <circle cx="40" cy="100" r="6" fill="#4361ee"/>
              <circle cx="160" cy="70" r="6" fill="#4361ee"/>
              <circle cx="280" cy="40" r="6" fill="#4361ee"/>
              <circle cx="400" cy="10" r="6" fill="#4361ee"/>
              
              {/* AI Circuit Element - Smaller to emphasize text */}
              <g transform="translate(220, 55)">
                <circle cx="0" cy="0" r="25" fill="#4361ee" opacity="0.2"/>
                <circle cx="0" cy="0" r="15" fill="#4361ee" opacity="0.3"/>
                <path d="M-12,-12 L12,12 M-12,12 L12,-12" stroke="#4361ee" strokeWidth="3.5"/>
                <path d="M0,-15 L0,-25 M0,15 L0,25 M-15,0 L-25,0 M15,0 L25,0" stroke="#4361ee" strokeWidth="2"/>
              </g>
            </g>
            
            {/* Text Elements - Larger and more prominent */}
            <text x="250" y="85" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="42">
              <tspan fill="#4361ee">Save</tspan><tspan fill="#3a0ca3">My</tspan><tspan fill="#4361ee">Career</tspan><tspan fill="#3a0ca3">.ai</tspan>
            </text>
          </svg>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <div className="flex items-center">
            <Link href="/" className="px-4 hover:text-blue-500 transition-colors">
              {t('home')}
            </Link>
            
            <Link href="/career-assessment" className="px-4 hover:text-blue-500 transition-colors">
              {t('ai_impact')}
            </Link>

            <Link href="/career-finder" className="px-4 hover:text-blue-500 transition-colors">
              {t('career_discovary')}
            </Link>
            
            {/* Blog Link */}
            <Link href="/blogs" className="px-4 hover:text-blue-500 transition-colors">
              {t('blog')}
            </Link>
          </div>

          {/* Enhanced Language Switcher - With proper spacing from nav links */}
          <button 
            data-locale={switchTo} 
            onClick={changeLang} 
            className={`flex items-center  cursor-pointer px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors ${isArabic ? 'mr-4' : 'ml-4'}`}
          >
            <span className={`flex w-5 h-5 overflow-hidden rounded-full border border-gray-200 ${isArabic ? 'ml-2' : 'mr-2'}`}>
              <Image 
                src={isArabic ? '/images/lang-en.png' : '/images/lang-ar.png'} 
                alt={switchLabel} 
                width={20} 
                height={20}
                className="object-cover"
              />
            </span>
            <span className="text-sm font-medium">{switchLabel}</span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-2 flex flex-col">
            <Link 
              href="/" 
              className="py-2 hover:text-blue-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('home')}
            </Link>
            
            <Link 
              href="/career-assessment" 
              className="py-2 hover:text-blue-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('ai_impact')}
            </Link>

            <Link 
              href="/career-finder" 
              className="py-2 hover:text-blue-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('career_discovary')}
            </Link>
            
            {/* Blog Link */}
            <Link 
              href="/blogs" 
              className="py-2 hover:text-blue-500 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('blog')}
            </Link>

            {/* Enhanced Mobile Language Switcher */}
            <button 
              data-locale={switchTo} 
              onClick={(e) => {
                changeLang(e);
                setMobileMenuOpen(false);
              }} 
              className="flex items-center  cursor-pointer py-2 px-3 mt-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors self-start"
            >
              <span className={`flex w-5 h-5 overflow-hidden rounded-full border border-gray-200 ${isArabic ? 'ml-2' : 'mr-2'}`}>
                <Image 
                  src={isArabic ? '/images/lang-en.png' : '/images/lang-ar.png'} 
                  alt={switchLabel} 
                  width={20} 
                  height={20}
                  className="object-cover"
                />
              </span>
              <span className="text-sm font-medium">{switchLabel}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}