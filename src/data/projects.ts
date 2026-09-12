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
        description: "Nka na Uzu is a sustainable vocational training center designed for Enugu, rooted in Igbo culture. Inspired by the traditional courtyard (Etiti Ulo), the building creates a calm, sheltered space that encourages people to work together. The outer walls are built entirely from local burnt clay brick, connecting the building to the region's identity. Ventilation towers keep air moving naturally, and large openings bring in soft, filtered daylight. Hanging gardens, a central fountain, and a rainwater system round out a center where creativity (Nka) and craftsmanship (Uzu) come together.",
        tags: ["Aluminum", "Clay", "Stone", "Terracotta", "Terrazzo", "Timber"]
    },
    {
        id: "clergy-office-house",
        title: "CLERGY OFFICE/ HOUSE.",
        category: "Commercial",
        location: "Oyo, NG",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-9Picture21.webp",
        description: "This renovation modernizes the Clergy House while keeping its quiet, dignified character. Several compact living units were added within the existing structure, with new cross-ventilation and natural light throughout. Living quarters are kept separate from shared and worship spaces to preserve a calm atmosphere. Light-toned walls, wider eaves, and a lower roofline keep the building cool without mechanical cooling. Every change works with the existing structure, updating it for today's use without losing its character.",
        tags: ["Office", "Residence", "Catholic Archdiocese"]
    },
    {
        id: "the-corinthian",
        title: "THE CORINTHIAN.",
        category: "Residential",
        location: "Anambra, NG",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-14Picture28.webp",
        description: "The Corinthian blends classical style with modern, practical planning. True to its name, the home features Corinthian columns finished in white stucco with handcrafted detailing, giving it a formal, elevated presence. Inside, the classical style meets a modern, asymmetric floor plan shaped to fit the site while keeping the design balanced. Behind the classical exterior, the home is built for everyday comfort, with plenty of natural light and airflow throughout.",
        tags: ["Private", "Residence", "Anambra"]
    },
    {
        id: "house-aries",
        title: "HOUSE ARIES.",
        category: "Residential",
        location: "Lagos, NG",
        year: "2025",
        image: "/projects/nkanazu/PROJECT6-18Picture30.webp",
        description: "House Aries turns a small, flat site into an efficient, comfortable family home with a modern look. The design meets the client's need for a beautiful home that also includes a rentable apartment. Its standout feature is a large cantilevered balcony that gives generous outdoor space while shading the living areas below. Light-colored walls help keep the home cool by reflecting heat. Every choice was made with everyday livability in mind, proof that modern design can be both striking and practical.",
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
