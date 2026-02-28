import PortfolioClient from './PortfolioClient';
import { getAllProjects } from '@/sanity/lib/service';

export default async function Portfolio() {
    const projects = await getAllProjects();

    return <PortfolioClient projects={projects} />;
}
