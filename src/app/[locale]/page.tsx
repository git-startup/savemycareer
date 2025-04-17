import {Link} from '@/i18n/routing';
import Header from '@/components/Header';
import FeatureCard from "@/components/FeatureCard";
import { ShieldIcon, BoltIcon, AdjustmentsIcon } from '@/components/Icons';
import { useTranslations, useLocale } from "next-intl";

export default function LandingPage() { 
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const isRtl = locale === 'ar';
 
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
 
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("title_one")} <span className="text-blue-500" dir={isRtl ? 'rtl' : ''}> {t("title_two")} {isRtl ? '؟' : '?'} </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-10">
              {t("bio")}
            </p>
            
            {/* Assessment Buttons Section */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <Link href="/career-assessment">
                <button className="bg-blue-500 cursor-pointer text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto">
                  {t("ai_impact_test_button")}
                </button>
              </Link>
              
              <Link href="/career-finder">
                <button className="bg-purple-600 cursor-pointer text-white font-medium py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto">
                  {t("career_finder_button")}
                </button>
              </Link>
            </div>
            
            <div className="inline-block bg-blue-50 text-blue-500 py-2 px-4 rounded-full text-sm">
              {t("action_label")}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">{t("how_it_works")}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* AI Impact Assessment */}
              <div className="relative">
                <div className="border-2 border-blue-500 rounded-lg rounded-lg bg-white p-8 text-center">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">1</div>
                  <h3 className="text-2xl font-bold mb-4 mt-2">{t("ai_impact_test_title")}</h3>
                  <p className="text-gray-600 mb-6">{t("ai_impact_test_description")}</p>
                  <Link href="/career-assessment">
                    <button className="bg-blue-500 text-white font-medium py-2 px-5 rounded-lg hover:bg-blue-600 transition-colors">
                      {t("ai_impact_test_button")}
                    </button>
                  </Link>
                </div>
              
                {/* Arrow pointing to next step - visible only on desktop */}
                <div className="hidden md:block absolute top-1/2 -right-12 transform -translate-y-1/2">
                  <svg width="60" height="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60 12L45 0v9H0v6h45v9z" fill="#4361ee" />
                  </svg>
                </div>
              </div>

              {/* Career Finder */}
              <div className="relative border-2 border-indigo-600 rounded-lg bg-white p-8 text-center">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-2xl font-bold mb-4 mt-2">{t("career_finder_title")}</h3>
                <p className="text-gray-600 mb-6">{t("career_finder_description")}</p>
                <Link href="/career-finder">
                  <button className="bg-purple-600 text-white font-medium py-2 px-5 rounded-lg hover:bg-purple-700 transition-colors">
                    {t("career_finder_button")}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<ShieldIcon />}
                title={t("feature_one_title")}
                description={t("feature_one_bio")}
              />
              
              <FeatureCard 
                icon={<BoltIcon />}
                title={t("feature_two_title")}
                description={t("feature_two_bio")}
              />
              
              <FeatureCard 
                icon={<AdjustmentsIcon />}
                title={t("feature_three_title")}
                description={t("feature_three_bio")}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}