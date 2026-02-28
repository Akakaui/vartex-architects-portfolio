import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { join, basename } from 'path';
import 'dotenv/config';
import { config } from 'dotenv';
config({ path: '.env.local' });
import fetch from 'node-fetch';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
    token: process.env.SANITY_API_WRITE_TOKEN,
});

const PUBLIC_DIR = join(process.cwd(), 'public');

async function uploadImage(imagePath) {
    if (imagePath.startsWith('http')) {
        // Remote image
        try {
            const response = await fetch(imagePath);
            const buffer = await response.buffer();
            const asset = await client.assets.upload('image', buffer, {
                filename: basename(imagePath.split('?')[0]),
            });
            console.log(`✅ Uploaded remote image: ${imagePath} -> ${asset._id}`);
            return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
        } catch (err) {
            console.error(`❌ Failed remote upload: ${imagePath}`, err);
            return null;
        }
    }

    // Local image
    const fullPath = join(PUBLIC_DIR, imagePath);
    if (!existsSync(fullPath)) {
        console.error(`❌ Image not found: ${fullPath}`);
        return null;
    }

    try {
        const imageData = readFileSync(fullPath);
        const asset = await client.assets.upload('image', imageData, {
            filename: basename(fullPath),
        });
        console.log(`✅ Uploaded local image: ${imagePath} -> ${asset._id}`);
        return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
    } catch (error) {
        console.error(`❌ Failed local upload: ${imagePath}`, error);
        return null;
    }
}

async function migrateProjects() {
    const projects = [
        {
            id: "nka-na-uzu",
            title: "Nka na Uzu.",
            category: "Institutional",
            location: "Enugu, Nigeria",
            year: "2026",
            area: "Vocational Center",
            description: "Nka na Uzu is a sustainable, Afrocentric vocational training center situated in Enugu. Inspired by the traditional Igbo courtyard (Etiti Ulo), the building creates a serene, cave-like environment where comfort breeds collaboration. Its facade is constructed entirely from local burnt clay brick, resonating deeply with cultural identity.",
            images: [
                "/projects/nkanazu/PROJECT6-2Picture13.webp",
                "/projects/nkanazu/PROJECT6-1Picture12.webp",
                "/projects/nkanazu/PROJECT6-3Picture19.webp",
                "/projects/nkanazu/PROJECT6-4Picture14.webp",
                "/projects/nkanazu/PROJECT6-5Picture15.webp",
                "/projects/nkanazu/PROJECT6-6Picture16.webp",
                "/projects/nkanazu/PROJECT6-7Picture17.webp"
            ],
            specs: [
                { label: "Philosophy", value: "Bio-Climatic Afrocentrism" },
                { label: "Systems", value: "Passive Ventilation Towers" },
                { label: "Sustainability", value: "Passive Solar Design, Rainwater Harvesting" }
            ]
        },
        {
            id: "the-vartex-hub",
            title: "The Vartex Hub.",
            category: "Commercial",
            location: "Lagos, Nigeria",
            year: "2025",
            area: "5,400 sqm",
            description: "A state-of-the-art commercial headquarters that redefines the corporate workspace in Lagos. The building features a triple-height atrium and a high-performance facade designed to minimize solar gain while maximizing transparency and views of the Atlantic.",
            images: [
                "/projects/project-1.webp",
                "/projects/project-2.webp"
            ],
            specs: [
                { label: "Facade", value: "Double-Skin Ventilated Wall" },
                { label: "Automation", value: "Smart Building Management (BMS)" },
                { label: "Efficiency", value: "LEED Platinum Target" }
            ]
        },
        {
            id: "zenith-residence",
            title: "Zenith Residence.",
            category: "Residential",
            location: "Abuja, Nigeria",
            year: "2024",
            area: "1,200 sqm",
            description: "A luxury villa in Abuja that blends classical proportions with contemporary structural glass and concrete. The residence is organized around a private infinity pool and features extensive cantilevered terraces that provide shade and outdoor living space.",
            images: [
                "/projects/project-3.webp",
                "/projects/project-4.webp"
            ],
            specs: [
                { label: "Structure", value: "Post-Tensioned Concrete Slabs" },
                { label: "Glazing", value: "High-Performance Low-E Acoustic Glass" },
                { label: "Landscape", value: "Integrated Xeriscaping" }
            ]
        },
        {
            id: "urban-echoes",
            title: "Urban Echoes.",
            category: "Urban Planning",
            location: "Lagos, Nigeria",
            year: "2025",
            area: "Urban District",
            description: "A masterplan for a sustainable urban district in Lagos. The project focuses on walkability, public green space, and integrated transit-oriented development to create a resilient and connected urban fabric.",
            images: [
                "/projects/project-5.webp",
                "/projects/project-6.webp"
            ],
            specs: [
                { label: "Mobility", value: "Pedestrian-First Infrastructure" },
                { label: "Ecology", value: "Stormwater Management Park" },
                { label: "Density", value: "Mixed-Use Strategic Zoning" }
            ]
        }
    ];

    for (const p of projects) {
        console.log(`\n🏗️ Migrating project: ${p.title}`);

        const mainImage = await uploadImage(p.images[0]);
        const galleryImages = [];
        for (const img of p.images) {
            const uploaded = await uploadImage(img);
            if (uploaded) {
                uploaded._key = Math.random().toString(36).substr(2, 9);
                galleryImages.push(uploaded);
            }
        }

        const doc = {
            _type: 'project',
            _id: `project-${p.id}`,
            title: p.title,
            slug: { _type: 'slug', current: p.id },
            featured: true,
            category: p.category === "Urban Planning" ? "Urban" : p.category, // Map to list values
            location: p.location,
            year: p.year,
            area: p.area,
            mainImage: mainImage,
            gallery: galleryImages,
            description: p.description,
            specs: p.specs.map(s => ({ _key: Math.random().toString(36).substr(2, 9), ...s })),
        };

        await client.createOrReplace(doc);
        console.log(`🌟 Success: ${p.title}`);
    }
}

async function migrateBlogs() {
    const blogs = [
        {
            id: "designing-with-climate",
            title: "Designing With Climate: Passive Strategies for West African Architecture",
            excerpt: "How traditional building wisdom and modern environmental design converge to create comfortable, low-energy spaces in hot-humid climates.",
            content: [
                "Architecture in West Africa has always been shaped by climate. Long before mechanical cooling systems existed, builders in this region developed sophisticated strategies for managing heat, humidity, and rainfall through form, orientation, and material choice.",
                "At VARTEX, our approach to climate-responsive design begins with understanding the specific microclimate of each site. Wind patterns, solar angles, rainfall intensity, and vegetation all influence the decisions we make about building orientation, massing, and envelope design.",
                "Cross-ventilation is perhaps the most fundamental passive strategy in our toolkit. By carefully positioning openings on opposite or adjacent facades, we create pressure differentials that draw air through interior spaces."
            ],
            category: "Design Philosophy",
            date: "2026-02-15",
            readTime: 8,
            image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80",
        }
        // ... I'll add the rest in the script itself or just run this for now
    ];

    for (const b of blogs) {
        console.log(`\n📝 Migrating blog: ${b.title}`);
        const mainImage = await uploadImage(b.image);

        const doc = {
            _type: 'blog',
            _id: `blog-${b.id}`,
            title: b.title,
            slug: { _type: 'slug', current: b.id },
            publishedAt: new Date(b.date).toISOString(),
            featured: true,
            mainImage: mainImage,
            readTime: b.readTime,
            body: b.content.map(text => ({
                _type: 'block',
                _key: Math.random().toString(36).substr(2, 9),
                children: [{ _type: 'span', text: text }],
                markDefs: [],
                style: 'normal'
            })),
        };

        await client.createOrReplace(doc);
        console.log(`🌟 Success: ${b.title}`);
    }
}

async function run() {
    try {
        await migrateProjects();
        await migrateBlogs();
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

run();
