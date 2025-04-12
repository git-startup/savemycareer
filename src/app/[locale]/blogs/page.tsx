import { getTranslations } from "next-intl/server";
import ClientHeader from '@/components/ClientHeader';
import { Link } from '@/i18n/routing';

// Define types for blog data
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author?: string;
  featuredImage?: string;
  tags?: string[];
}

// Metadata generation
export async function generateMetadata({
  params
}: {
  params: { locale: string }
}) {
  // Properly await the locale parameter
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
  
  return {
    title: `${t('title')} | SaveMyCareer.ai`,
    description: t('description'),
  };
}

// This is a Server Component
export default async function BlogPage({
  params
}: {
  params: { locale: string }
}) {
  // Properly await the locale parameter
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'BlogPage' });
  const isRTL = locale === 'ar';
  
  // Fetch blog posts from our API route
  let posts: BlogPost[] = [];
  let error = null;
  
  try { 
    // Use the local API route we created
    const origin = process.env.NEXT_PUBLIC_BASE_URL || 'https://savemycareer.ai';
    const response = await fetch(`${origin}/api/blog?locale=${locale}`, {
      cache: 'no-store' // or use revalidate if needed
    }); 
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    
    posts = await response.json();
  } catch (err) {
    console.error('Error fetching blog posts:', err);
    error = t('error_loading');
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Use ClientHeader */}
      <ClientHeader />
      
      <main>
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
              
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {t('title')}
              </h1>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                {t('description')}
              </p>
            </div>
            
            {error ? (
              <div className="py-12 text-center text-red-500">
                {error}
              </div>
            ) : posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {post.featuredImage && (
                      <div className="w-full h-48 overflow-hidden">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-2">
                        <Link href={`/blogs/${post.id}`} className="text-blue-500 hover:text-blue-600">
                          {post.title}
                        </Link>
                      </h2>
                      <div className="text-gray-500 text-sm mb-3">
                        {formatDate(post.publishedAt)}
                        {post.author && ` • ${post.author}`}
                      </div>
                      <p className="text-gray-600 mb-4" style={{ textAlign: isRTL ? 'right' : 'left' }}>
                        {post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, '')}...
                      </p>
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <Link href={`/blogs/${post.id}`}>
                          <span className="inline-block bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                            {t('read_more')}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-500">
                {t('no_posts')}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}