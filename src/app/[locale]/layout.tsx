import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal } from "next/font/google";
import { QuestionsProvider } from '@/context/QuestionsContext';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing'; 
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
  title: "SaveMyCareer.ai", 
  description: "Learn actionable strategies to stay ahead in the age of automation",
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
    <QuestionsProvider>
    <html lang={locale} >
      <body className={`${ locale == 'ar' ? 'ar' : geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
    </QuestionsProvider>
  );
}
