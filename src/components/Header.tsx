'use client';

import {Link} from '@/i18n/routing';
import Image from 'next/image';
import { useTransition } from 'react';
import {useParams} from 'next/navigation';
import { useTranslations, useLocale } from "next-intl";
import {usePathname, useRouter} from '@/i18n/routing'; 

export default function Header() {
  const locale = useLocale();
  const t = useTranslations('Header'); 
  const pathname = usePathname();
  const isArabic = locale === 'ar';

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

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
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

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6">
          {/*
          <Link href="/" className="hover:text-blue-500 transition-colors">
            {t('home')}
          </Link>
          
          <Link href="/questions" className="hover:text-blue-500 transition-colors">
            {t('assessment')}
          </Link>]
          *}

          {/* Language Switcher */}
          <Link href="#" data-locale={switchTo} onClick={changeLang} className="flex items-center space-x-2">
            <Image src={langIcon} alt={switchLabel} width={24} height={24} />
            <span className="text-sm">{switchLabel}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}