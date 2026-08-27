import { Metadata } from 'next';
import JournalPostClient from './JournalPostClient';
import { getBlogBySlug, getBlogs } from '@/sanity/lib/service';
import { journalPosts as mockPosts } from '@/data/journal';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    
    // Fetch post details to populate metadata
    let post: any = await getBlogBySlug(id);
    if (!post) {
        post = mockPosts.find(p => p.id === id);
    }
    
    if (!post) {
        return {
            title: "Post Not Found | Vartex Journal",
        };
    }
    
    return {
        title: `${post.title} | Vartex Architects Journal`,
        description: post.excerpt || post.summary || `Read our latest article: ${post.title} on the Vartex Architects Journal.`,
        openGraph: {
            title: `${post.title} | Vartex Architects Journal`,
            description: post.excerpt || post.summary || `Read our latest article: ${post.title} on the Vartex Architects Journal.`,
            url: `https://vartexarchitects.com/journal/${id}`,
            images: post.image ? [{ url: post.image }] : [],
        }
    };
}

export default async function JournalPostPage({ params }: Props) {
    const { id } = await params;

    // Try fetching from Sanity first
    let post: any = await getBlogBySlug(id);

    // Fallback to mock data if not found in Sanity
    if (!post) {
        post = mockPosts.find(p => p.id === id);
    }

    if (!post) {
        notFound();
    }

    // Get all posts for navigation and related
    const sanityPosts = await getBlogs();
    const activePosts = sanityPosts.length > 0 ? sanityPosts : mockPosts;

    // Related posts (same category, excluding current)
    const relatedPosts = activePosts
        .filter((p: any) => p.category === post.category && (p.slug || p.id) !== (post.slug || post.id))
        .slice(0, 2);

    // Navigation logic
    const currentIndex = activePosts.findIndex((p: any) => (p.slug || p.id) === (post.slug || post.id));
    const prevPost = currentIndex > 0 ? activePosts[currentIndex - 1] : null;
    const nextPost = currentIndex < activePosts.length - 1 ? activePosts[currentIndex + 1] : null;

    return (
        <JournalPostClient
            post={post}
            relatedPosts={relatedPosts}
            prevPost={prevPost}
            nextPost={nextPost}
        />
    );
}
