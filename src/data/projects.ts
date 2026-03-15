export interface Project {
    id: string;
    title: string;
    category: string;
    location: string;
    year: string;
    image: string;
    description: string;
    tags: string[];
}

export const projects: Project[] = [
    {
        id: "nka-na-uzu",
        title: "NKA NA UZU.",
        category: "Competition",
        location: "Enugu, NG",
        year: "2026",
        image: "/projects/nkanazu/PROJECT6-2Picture13.webp",
        description: "A sustainable, Afrocentric vocational training center situated in Enugu. Design Proposal featuring Daylight Optimization, Local Materials, Natural Ventilation, Rainwater Harvesting, Solar shading, and Thermal Mass.",
        tags: ["Aluminum", "Clay", "Stone", "Terracotta", "Terrazzo", "Timber"]
    },
    {
        id: "clergy-office-house",
        title: "CLERGY OFFICE/ HOUSE.",
        category: "Commercial",
        location: "Oyo, NG",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-9Picture21.webp",
        description: "Clergy office and residence for the Catholic Archdiocese of Ibadan. Construction Completed with Daylight Optimization and Natural Ventilation.",
        tags: ["Office", "Residence", "Catholic Archdiocese"]
    },
    {
        id: "the-corinthian",
        title: "THE CORINTHIAN.",
        category: "Residential",
        location: "Anambra, NG",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-14Picture28.webp",
        description: "A private residence project in Anambra. Design Proposal with Daylight Optimization and Natural Ventilation.",
        tags: ["Private", "Residence", "Anambra"]
    },
    {
        id: "house-aries",
        title: "HOUSE ARIES.",
        category: "Residential",
        location: "Lagos, NG",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-18Picture30.webp",
        description: "A private residence project in Lagos. Design Proposal with Daylight Optimization and Natural Ventilation.",
        tags: ["Private", "Lagos", "Aries"]
    },
    {
        id: "portfolio",
        title: "PORTFOLIO.",
        category: "Selected Works",
        location: "N/A",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-1Picture12.webp",
        description: "A curated selection of works showing the studio's breadth and technical rigor.",
        tags: ["Selected Works", "Gallery"]
    }
];
