import { getTranslations } from "next-intl/server";
import { Link } from '@/i18n/routing';
import ClientHeader from '@/components/ClientHeader';

// Define types for blog data
interface BlogPost {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  author?: string;
  featuredImage?: string;
  tags?: string[];
  relatedPosts?: {
    id: string;
    title: string;
    publishedAt?: string;
  }[];
}

// Metadata generation
export async function generateMetadata({
  params
}: {
  params: { locale: string; id: string }
}) {
  // Properly await the parameters
  const { locale, id } = params;
  const t = await getTranslations({ locale, namespace: 'BlogPost' });
  
  try {
    // Fetch the post for metadata
    const origin = process.env.NEXT_PUBLIC_BASE_URL || 'https://savemycareer.ai';
    const response = await fetch(`${origin}/api/blog/${id}?locale=${locale}`, {
      next: { revalidate: 3600 } // Cache for an hour
    });
    
    if (!response.ok) {
      return {
        title: `${t('post_not_found')} | SaveMyCareer.ai`,
        description: t('description'),
      };
    }
    
    const post: BlogPost = await response.json();
    
    return {
      title: `${post.title} | SaveMyCareer.ai`,
      description: post.content.substring(0, 155).replace(/<[^>]*>/g, ''),
      openGraph: {
        title: post.title,
        description: post.content.substring(0, 155).replace(/<[^>]*>/g, ''),
        images: post.featuredImage ? [post.featuredImage] : [],
      },
    };
  } catch (error) {
    // Fallback metadata if we can't fetch the post
    return {
      title: 'Blog | SaveMyCareer.ai',
      description: t('description'),
    };
  }
}

// This is a Server Component
export default async function BlogPostPage({
  params
}: {
  params: { locale: string; id: string }
}) {
  // Properly await the parameters
  const { locale, id } = params;
  const t = await getTranslations({ locale, namespace: 'BlogPost' });
  const isRTL = locale === 'ar';
  
  // Fetch blog post from our API
  let post: BlogPost | null = null;
  let error = null;
  
  try {
    const origin = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${origin}/api/blog/${id}?locale=${locale}`, {
      cache: 'no-store' // Don't cache at page level to ensure fresh content
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        error = t('post_not_found');
      } else {
        throw new Error(`Failed to fetch blog post: ${response.status}`);
      }
    } else {
      post = await response.json();
    }
  } catch (err) {
    console.error('Error fetching blog post:', err);
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
      <ClientHeader />
      
      <main>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <Link href="/blogs" className="text-blue-500 hover:text-blue-600 inline-block mb-6">
              {isRTL ? `${t('back_to_blog')} ⟵ ` : `⟵ ${t('back_to_blog')}` }
            </Link>
          </div>
          
          {error ? (
            <div className="py-12 text-center text-red-500">
              {error}
            </div>
          ) : !post ? (
            <div className="py-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-500">{t('loading')}</p>
            </div>
          ) : (
            <article className={isRTL ? 'text-right' : 'text-left'}>
              {post.featuredImage && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title} 
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              
              <div className="text-gray-500 mb-8">
                {formatDate(post.publishedAt)}
                {post.author && ` • ${post.author}`}
              </div>
              
              {/* Render the HTML content safely with RTL/LTR support */}
              <div 
                className={`prose max-w-none ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 mb-8">
                  <h3 className="text-lg font-semibold mb-2">{t('tags')}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {post.relatedPosts && post.relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-lg font-semibold mb-4">{t('related_posts')}:</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {post.relatedPosts.map(relatedPost => (
                      <Link 
                        key={relatedPost.id} 
                        href={`/blogs/${relatedPost.id}`}
                        className="p-4 border rounded hover:bg-gray-50 transition-colors"
                      >
                        <h4 className="font-medium text-blue-500">{relatedPost.title}</h4>
                        {relatedPost.publishedAt && (
                          <span className="text-sm text-gray-500">
                            {formatDate(relatedPost.publishedAt)}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          )}
        </div>
      </main>
    </div>
  );
}