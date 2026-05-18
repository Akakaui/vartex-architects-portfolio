import { Metadata } from 'next';
import JournalClient from './JournalClient';
import { getBlogs, getSiteSettings } from '@/sanity/lib/service';
import { journalPosts as mockPosts } from '@/data/journal';

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Journal | Architectural Insights & Studio Journal",
    description: "Explore the Vartex Architects Journal. Read our latest articles on minimalist architecture, sustainable luxury design, material science, and spatial proportions.",
    keywords: [
        "Architectural Blog",
        "Minimalist Architecture Insights",
        "Sustainable Design Trends",
        "Lagos Design Studio Journal",
        "Vartex Journal"
    ],
    alternates: {
        canonical: "https://vartexarchitects.com/journal"
    },
    openGraph: {
        title: "Journal | Architectural Insights & Studio Journal - Vartex Architects",
        description: "Explore the Vartex Architects Journal. Read our latest articles on minimalist architecture, sustainable luxury design, material science, and spatial proportions.",
        url: "https://vartexarchitects.com/journal",
    }
};

export default async function JournalPage() {
    const sanityPosts = await getBlogs();
    const settings = await getSiteSettings();
    const posts = sanityPosts.length > 0 ? sanityPosts : mockPosts;

    return <JournalClient initialPosts={posts} isGlobalComingSoon={settings?.journalComingSoon} />;
}
