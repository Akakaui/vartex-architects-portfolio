import { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';
import { getAllProjects } from '@/sanity/lib/service';

export const revalidate = 60;

export const metadata: Metadata = {
    title: "Portfolio | Selected Architectural & Interior Design Projects",
    description: "Browse Vartex Architects' selected portfolio of architectural design, luxury interior spaces, and photorealistic 3D visualization works across Nigeria.",
    keywords: [
        "Architecture Portfolio Nigeria",
        "Luxury Interior Design Portfolio",
        "Residential Architecture Projects",
        "Commercial Building Designs",
        "Vartex Projects"
    ],
    alternates: {
        canonical: "https://vartexarchitects.com/portfolio"
    },
    openGraph: {
        title: "Portfolio | Selected Architectural & Interior Design Projects - Vartex Architects",
        description: "Browse Vartex Architects' selected portfolio of architectural design, luxury interior spaces, and photorealistic 3D visualization works across Nigeria.",
        url: "https://vartexarchitects.com/portfolio",
    }
};

export default async function Portfolio() {
    const projects = await getAllProjects();

    return <PortfolioClient projects={projects} />;
}
