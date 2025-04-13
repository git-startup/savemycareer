// src/app/api/blog/[id]/route.ts
import { NextResponse } from 'next/server';

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

interface RouteParams {
  id: string;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> }
) {
  // Get the post ID from the route parameters
  const resolvedParams = await params;
  const postId = resolvedParams.id;
  
  // Get locale from URL params
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  
  try {
    // Fetch the specific blog post from the external API
    const response = await fetch(`https://iptvstreamline.com/api/posts/${postId}?locale=${locale}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Revalidate every hour, adjust as needed
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Blog post not found' }, 
          { status: 404 }
        );
      }
      throw new Error(`Failed to fetch blog post: ${response.status} ${response.statusText}`);
    }
    
    const post = await response.json();
    
    // Return the blog post data
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' }, 
      { status: 500 }
    );
  }
}