import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import ClientHeader from '@/components/ClientHeader';

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

interface PageParams {
  locale: string;
  id: string;
}

// generateMetadata function
export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await params;
  const { locale, id } = resolvedParams;
  const t = await getTranslations({ locale, namespace: 'BlogPost' });

  // ...
}

// Our page component
export default async function BlogPostPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const resolvedParams = await params;
  const { locale, id } = resolvedParams;
  const t = await getTranslations({ locale, namespace: 'BlogPost' });
  const isRTL = locale === 'ar';

  // example usage (remove any truly unused variables)
  let post: BlogPost | null = null;
  let error: string | null = null;

  try {
    const origin = process.env.NEXT_PUBLIC_BASE_URL || 'https://savemycareer.ai';
    const response = await fetch(`${origin}/api/blog/${id}?locale=${locale}`, {
      cache: 'no-store'
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
              {isRTL ? `${t('back_to_blog')} ⟵ ` : `⟵ ${t('back_to_blog')}`}
            </Link>
          </div>

          {error ? (
            <div className="py-12 text-center text-red-500">{error}</div>
          ) : !post ? (
            <div className="py-12 text-center">
              {/* loader */}
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-500">{t('loading')}</p>
            </div>
          ) : (
            <article className={isRTL ? 'text-right' : 'text-left'}>
              {post.featuredImage && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  {/* Next recommends <Image /> here */}
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

              <div
                className={`prose max-w-none ${isRTL ? 'rtl text-right' : 'ltr text-left'}`}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 mb-8">
                  <h3 className="text-lg font-semibold mb-2">{t('tags')}:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                      >
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
                    {post.relatedPosts.map((relatedPost) => (
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