import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { join, basename } from 'path';
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
        },
        {
            id: "material-culture-in-architecture",
            title: "Material Culture: Why What We Build With Matters As Much As What We Build",
            excerpt: "An exploration of how material selection shapes spatial experience, cultural identity, and environmental impact in contemporary Nigerian architecture.",
            content: [
                "Every material carries meaning. Concrete speaks of permanence and industrial progress. Timber evokes warmth and craft. Laterite connects a building to the earth it sits upon.",
                "In Nigeria, the dominant construction material is concrete block with cement render. It is affordable, available, and familiar. But familiarity can breed indifference, and too many buildings in our cities are wrapped in the same featureless grey envelopes."
            ],
            category: "Materials",
            date: "2026-02-02",
            readTime: 6,
            image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80",
        },
        {
            id: "from-sketch-to-structure",
            title: "From Sketch to Structure: Inside Our Design Process",
            excerpt: "A behind-the-scenes look at how VARTEX moves from initial concept sketches through spatial studies to final architectural documentation.",
            content: [
                "Every project begins with a conversation. Before we draw a single line, we listen — to the client's aspirations, to the site's character, to the program's functional requirements.",
                "The first marks on paper are always loose and exploratory. We sketch by hand — quickly, freely, without commitment to any single idea. These early drawings are not about precision; they are about possibility."
            ],
            category: "Studio",
            date: "2026-01-18",
            readTime: 7,
            image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
        },
        {
            id: "spatial-choreography",
            title: "Spatial Choreography: The Art of Movement in Architecture",
            excerpt: "Designing for the human experience of time and space through intentional circulation and visual sequences.",
            content: [
                "Architecture is not just a static object; it is an experience that unfolds over time as we move through it. This sequence of movement — the journey from the street to the interior — is what we call spatial choreography.",
                "In our Nigerian context, the transition between 'public' and 'private' is often abrupt. We seek to soften this through thresholds, courtyards, and controlled vistas that prepare the occupant for the space ahead."
            ],
            category: "Design Philosophy",
            date: "2026-01-10",
            readTime: 5,
            image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=1200&q=80",
        },
        {
            id: "the-urban-vernacular",
            title: "The Urban Vernacular: Adapting Tradition for Megacities",
            excerpt: "How the lessons of rural vernacular architecture can be successfully scaled for the high-density requirements of Lagos and Abuja.",
            content: [
                "The challenge of the 21st-century African architect is one of scale. How do we preserve the social intimacy and environmental logic of the village while building for millions?",
                "We believe the answer lies in modularity and shared social spaces. By breaking down large structures into human-scaled clusters, we can create high-density environments that still feel like communities."
            ],
            category: "Urbanism",
            date: "2025-12-28",
            readTime: 10,
            image: "https://images.unsplash.com/photo-1485628390555-1a7bd503f9fe?w=1200&q=80",
        }
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
            category: b.category,
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
        // Note: Projects already migrated in previous steps
        await migrateBlogs();
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

run();
