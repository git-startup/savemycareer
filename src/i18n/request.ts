import { getRequestConfig } from 'next-intl/server'; 
import { routing } from './routing';  

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  // First handle it as a potentially undefined string
  let locale = await requestLocale as string | undefined;
    
  // Ensure that a valid locale is used
  // We need to make TypeScript understand that locale will be of the correct type
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  } else {
    // This type assertion confirms to TypeScript that locale is one of the valid locales
    locale = locale as typeof routing.defaultLocale;
  }
    
  return {
    locale,
    messages: (await import(`../../translations/${locale}.json`)).default
  }; 
});