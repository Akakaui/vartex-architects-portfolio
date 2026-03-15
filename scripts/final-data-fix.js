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

async function finalizeData() {
  try {
    // 1. Ensure Categories exist
    const categories = [
      { title: 'Commercial', slug: 'commercial' },
      { title: 'Residential', slug: 'residential' },
      { title: 'Competition', slug: 'competition' },
      { title: 'Selected Works', slug: 'selected-works' },
      { title: 'Industrial', slug: 'industrial' }
    ];

    const categoryDocs = {};
    for (const cat of categories) {
      const existing = await client.fetch(`*[_type == "category" && title == $title][0]`, { title: cat.title });
      if (!existing) {
        console.log(`Creating category: ${cat.title}`);
        const newCat = await client.create({
          _type: 'category',
          title: cat.title,
          slug: { _type: 'slug', current: cat.slug }
        });
        categoryDocs[cat.title] = newCat._id;
      } else {
        categoryDocs[cat.title] = existing._id;
      }
    }

    // 2. Ensure Projects exist and are linked
    const projectsToEnsure = [
      {
        slug: "nka-na-uzu",
        title: "NKA NA UZU.",
        featured: true,
        selectedWork: true,
        category: 'Competition'
      },
      {
        slug: "clergy-office-house",
        title: "CLERGY OFFICE/ HOUSE.",
        featured: true,
        selectedWork: true,
        category: 'Commercial'
      },
      {
        slug: "the-corinthian",
        title: "THE CORINTHIAN.",
        featured: true,
        selectedWork: true,
        category: 'Residential'
      },
      {
        slug: "house-aries",
        title: "HOUSE ARIES.",
        featured: true,
        selectedWork: true,
        category: 'Residential',
        description: "A private residence project in Lagos. Design Proposal with Daylight Optimization and Natural Ventilation.",
        location: "Lagos, NG",
        year: "2025"
      },
      {
        slug: "portfolio",
        title: "PORTFOLIO.",
        featured: true,
        selectedWork: true,
        category: 'Selected Works',
        description: "A curated selection of works showing the studio's breadth and technical rigor.",
        location: "N/A",
        year: "2025"
      }
    ];

    for (const p of projectsToEnsure) {
      const existing = await client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug: p.slug });
      
      const projectData = {
        _type: 'project',
        title: p.title,
        slug: { _type: 'slug', current: p.slug },
        featured: p.featured,
        selectedWork: p.selectedWork,
        description: p.description || "",
        location: p.location || "",
        year: p.year || "2025",
        categories: [
          {
            _type: 'reference',
            _ref: categoryDocs[p.category],
            _key: Math.random().toString(36).substring(7)
          }
        ]
      };

      if (!existing) {
        console.log(`Creating project: ${p.slug}`);
        await client.create(projectData);
      } else {
        console.log(`Updating project: ${p.slug}`);
        await client.patch(existing._id).set(projectData).commit();
      }
    }
    
    console.log('Final data fix complete.');
  } catch (error) {
    console.error('Error:', error);
  }
}

finalizeData();
