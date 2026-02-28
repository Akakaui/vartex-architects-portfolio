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
        title: "Nka na Uzu",
        category: "Institutional",
        location: "Enugu, Nigeria",
        year: "2026",
        image: "/projects/nkanazu/PROJECT6-2Picture13.webp",
        description: "A sustainable, Afrocentric vocational training center inspired by traditional Igbo craftsmanship.",
        tags: ["Sustainable", "Clay Brick", "Afrocentric"]
    },
    {
        id: "the-vartex-hub",
        title: "The Vartex Hub",
        category: "Commercial",
        location: "Lagos, Nigeria",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-9Picture21.webp",
        description: "A high-performance corporate headquarters designed for modern architectural dialogue.",
        tags: ["Glass Facade", "Atrium", "Corporate"]
    },
    {
        id: "zenith-residence",
        title: "Zenith Residence",
        category: "Residential",
        location: "Abuja, Nigeria",
        year: "2024",
        image: "/projects/nkanazu/PROJECT6-14Picture28.webp",
        description: "A luxury villa blending classical proportions with contemporary concrete and glass.",
        tags: ["Luxury", "Contemporary", "Villa"]
    },
    {
        id: "urban-echoes",
        title: "Urban Echoes",
        category: "Urban Planning",
        location: "Lagos, Nigeria",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-18Picture30.webp",
        description: "A masterplan for a sustainable urban district focusing on walkability and green space.",
        tags: ["Masterplanning", "Sustainable", "Urban"]
    }
];
