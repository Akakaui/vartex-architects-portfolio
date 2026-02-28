import HomeClient from './HomeClient';
import { getFeaturedProjects, getAllProjects } from '@/sanity/lib/service';

export default async function Home() {
    const featuredProjects = await getFeaturedProjects();
    const allProjects = await getAllProjects();

    return <HomeClient featuredProjects={featuredProjects} allProjects={allProjects} />;
}
