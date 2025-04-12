// src/app/api/blog/route.ts
import { NextResponse } from 'next/server';

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

export async function GET(request: Request) {
  // Get locale from URL params
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale') || 'en';
  
  try {
    // Fetch blog posts from the external API
    const response = await fetch(`https://iptvstreamline.com/api/posts?locale=${locale}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Revalidate every hour, adjust as needed
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Return the blog posts data directly
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' }, 
      { status: 500 }
    );
  }
}