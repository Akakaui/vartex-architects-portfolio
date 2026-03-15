import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2023-05-03',
});

async function sweepAndCreate() {
  try {
    const query = `*[_type == "project"]`;
    const docs = await client.fetch(query);
    console.log(`Found ${docs.length} projects in Sanity.`);
    
    const existingSlugs = docs.map(d => d.slug?.current);
    
    // Project data from local source of truth
    const projectsToEnsure = [
      {
        slug: "nka-na-uzu",
        title: "NKA NA UZU.",
        featured: true,
        selectedWork: true
      },
      {
        slug: "clergy-office-house",
        title: "CLERGY OFFICE/ HOUSE.",
        featured: true,
        selectedWork: true
      },
      {
        slug: "the-corinthian",
        title: "THE CORINTHIAN.",
        featured: true,
        selectedWork: true
      },
      {
        slug: "house-aries",
        title: "HOUSE ARIES.",
        featured: true,
        selectedWork: true,
        description: "A private residence project in Lagos. Design Proposal with Daylight Optimization and Natural Ventilation.",
        location: "Lagos, NG",
        year: "2025"
      },
      {
        slug: "portfolio",
        title: "PORTFOLIO.",
        featured: true,
        selectedWork: true,
        description: "A curated selection of works showing the studio's breadth and technical rigor.",
        location: "N/A",
        year: "2025"
      }
    ];

    for (const p of projectsToEnsure) {
      if (!existingSlugs.includes(p.slug)) {
        console.log(`CREATING missing project: ${p.slug}`);
        await client.create({
          _type: 'project',
          title: p.title,
          slug: { _type: 'slug', current: p.slug },
          featured: p.featured,
          selectedWork: p.selectedWork,
          description: p.description || "",
          location: p.location || "",
          year: p.year || "2025",
        });
      } else {
        const doc = docs.find(d => d.slug?.current === p.slug);
        let patch = {};
        if (doc.title !== p.title) patch.title = p.title;
        if (doc.featured !== p.featured) patch.featured = p.featured;
        if (doc.selectedWork !== p.selectedWork) patch.selectedWork = p.selectedWork;
        
        if (Object.keys(patch).length > 0) {
          console.log(`Updating project: ${p.slug}`);
          await client.patch(doc._id).set(patch).commit();
        }
      }
    }
    
    console.log('Sanity Sync V3 complete.');
  } catch (error) {
    console.error('Error during sweep:', error);
  }
}

sweepAndCreate();
