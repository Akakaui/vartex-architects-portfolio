import { Metadata } from 'next';
import HomeClient from './HomeClient';
import { getFeaturedProjects, getSelectedWorks, getAllProjects } from '@/sanity/lib/service';

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Vartex Architects | Premium Architecture & Interior Design Lagos, Nigeria",
    description: "Vartex Architects is a leading premium architectural and interior design firm in Lagos and Enugu, Nigeria, specializing in high-end residential, commercial, and sustainable design projects.",
    keywords: [
        "Architects in Lagos",
        "Nigerian Architects",
        "Lagos Architecture Firm",
        "Interior Designers in Lagos",
        "Architecture Studio Nigeria",
        "Residential Architects Nigeria",
        "Sustainable Architecture Lagos",
        "Enugu Architects",
        "Lekki Architecture Studio",
        "Best Architects in Lagos",
        "Vartex Architects"
    ],
    alternates: {
        canonical: "https://vartexarchitects.com"
    },
    openGraph: {
        title: "Vartex Architects | Premium Architecture & Interior Design Lagos, Nigeria",
        description: "Specialized in premium Architecture, Interior Design, and 3D Visualization. We provide conceptual planning and high-end design execution.",
        url: "https://vartexarchitects.com",
    }
};

export default async function Home() {
    const featuredProjects = await getFeaturedProjects();
    const selectedWorks = await getSelectedWorks();
    const allProjects = await getAllProjects();

    return <HomeClient featuredProjects={featuredProjects} selectedWorks={selectedWorks} allProjects={allProjects} />;
}
