import { useLocale } from "next-intl";

export default function FeatureCard({ icon, title, description }) {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:scale-105 ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      {/* Icon positioned at the top-right */}
      <div
        className={`absolute top-4 ${isArabic ? "right-4" : "left-4"}`}
      >
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Title and description */}
      <div className="mt-16"> {/* Push text down to avoid overlap with icon */}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}