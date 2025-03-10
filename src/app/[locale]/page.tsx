import {Link} from '@/i18n/routing';
import Header from '@/components/Header';
import FeatureCard from "@/components/FeatureCard";
import { ShieldIcon, BoltIcon, AdjustmentsIcon } from '@/components/Icons';
import { useTranslations, useLocale } from "next-intl";

export default function LandingPage() {

  const t = useTranslations('HomePage');
  const locale = useLocale();
 
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header is now a separate component */}
      <Header /> 
 
      <main>
        {/* Hero Section - Centered and Simplified */}
        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("title_one")} <span className="text-blue-500" dir={locale == 'ar' ? 'rtl' : ''}> {t("title_two")} { locale == 'ar' ? '؟' : '?' } </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              {t("bio")}
            </p>
            
            <div className="flex justify-center">
              <Link href="/questions">
                <button
                  className="cursor-pointer bg-blue-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors" >
                  {t("action_btn")}
                </button>
              </Link>
            </div>
            
            <div className="mt-4 bg-blue-50 text-blue-500 py-2 px-4 rounded-full inline-block">
              {t("action_label")}
            </div>
          </div>
        </section>
        
        {/* Features Section - Centered and Simplified */}
        <section className="py-16 bg-gray-50">
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