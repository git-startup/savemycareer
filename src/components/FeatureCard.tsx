import { useLocale } from "next-intl";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  gradient?: string;
}

export default function FeatureCard({ icon, title, description, gradient = "from-blue-500 to-cyan-500" }: FeatureCardProps) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="group relative">
      <div
        className={`relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-100 ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        {/* Icon Container with Gradient */}
        <div
          className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center ${
            isArabic ? "ml-auto" : "mr-auto"
          } mb-6 shadow-lg`}
        >
          <div className="text-white">
            {icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>

        {/* Hover Effect Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      </div>
    </div>
  );
}