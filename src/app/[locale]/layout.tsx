import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing'; 
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Analytics } from '@vercel/analytics/react';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700"], 
  variable: "--font-tajawal",
});

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({locale}));
} 

export const metadata: Metadata = {
  title: "SaveMyCareer.ai | Most Trusted AI Career Data", 
  description: "Get monthly insights on how AI is transforming your industry and career path.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png', 
    // Add other sizes if needed
  },
};


export default async function RootLayout({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string } 
}>) {

  const messages = await getMessages();
  const { locale } = await params; 

  console.log(locale)
  return (
    <html lang={locale} >
      <body className={`${ locale == 'ar' ? 'ar' : geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
          <GoogleAnalytics />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
