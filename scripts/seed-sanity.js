const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function seed() {
  try {
    console.log('Fetching existing categories...');
    const existingCategories = await client.fetch('*[_type == "category"]');
    console.log(`Found ${existingCategories.length} categories.`);

    const categoryNames = ['Commercial', 'Residential', 'Industrial', 'Selected Works', 'Competition'];
    const categoryDocs = {};

    for (const name of categoryNames) {
      const existing = existingCategories.find(c => c.title === name);
      if (existing) {
        categoryDocs[name] = existing._id;
      } else {
        console.log(`Creating category: ${name}`);
        const newCat = await client.create({
          _type: 'category',
          title: name,
        });
        categoryDocs[name] = newCat._id;
      }
    }

    const projectsData = [
      {
        title: "NKA NA UZU",
        slug: "nka-na-uzu",
        category: 'Competition',
        location: "Enugu, NG",
        year: "2026",
        area: "14,403 m²",
        duration: "Design Proposal",
        sustainability: "Daylight Optimization, Local Materials, Natural Ventilation, Rainwater Harvesting, Solar shading, Thermal Mass",
        materiality: "Aluminum, Clay, Stone, Terracotta, Terrazzo, Timber",
        description: "A sustainable, Afrocentric vocational training center situated in Enugu.",
      },
      {
        title: "CLERGY OFFICE/ HOUSE",
        slug: "clergy-office-house",
        category: 'Commercial',
        location: "Oyo, NG",
        year: "2025",
        area: "N/A",
        duration: "Construction Completed",
        sustainability: "Daylight Optimization, Natural Ventilation",
        materiality: "N/A",
        description: "Clergy office and residence for the Catholic Archdiocese of Ibadan.",
      },
      {
        title: "THE CORINTHIAN",
        slug: "the-corinthian",
        category: 'Residential',
        location: "Anambra, NG",
        year: "2025",
        area: "1,156 m²",
        duration: "Design Proposal",
        sustainability: "Daylight Optimization, Natural Ventilation",
        materiality: "N/A",
        description: "A private residence project in Anambra.",
      },
      {
        title: "HOUSE ARIES",
        slug: "house-aries",
        category: 'Residential',
        location: "Lagos, NG",
        year: "2025",
        area: "426 m²",
        duration: "Design Proposal",
        sustainability: "Daylight Optimization, Natural Ventilation",
        materiality: "N/A",
        description: "A private residence project in Lagos.",
      },
      {
        title: "PORTFOLIO",
        slug: "portfolio",
        category: 'Selected Works',
        location: "N/A",
        year: "2025",
        area: "N/A",
        duration: "N/A",
        sustainability: "N/A",
        materiality: "N/A",
        description: "A curated selection of works.",
      }
    ];

    for (const p of projectsData) {
      console.log(`Checking project: ${p.title}`);
      const query = `*[_type == "project" && slug.current == "${p.slug}"][0]`;
      const existingProject = await client.fetch(query);

      const doc = {
        _type: 'project',
        title: p.title,
        slug: { _type: 'slug', current: p.slug },
        location: p.location,
        year: p.year,
        area: p.area,
        duration: p.duration,
        sustainability: p.sustainability,
        materiality: p.materiality,
        description: p.description,
        categories: [
          {
            _type: 'reference',
            _ref: categoryDocs[p.category],
            _key: Math.random().toString(36).substring(7)
          }
        ]
      };

      if (existingProject) {
        console.log(`Updating project: ${p.title}`);
        await client.patch(existingProject._id).set(doc).commit();
      } else {
        console.log(`Creating project: ${p.title}`);
        // For new projects, we need a placeholder image if using validation
        // But since we are seeding data without images (user will upload them),
        // we might hit validation if 'mainImage' is required.
        // The schema says Rule.required() for mainImage.
        // I might need to skip mainImage for now or provide a dummy asset ID.
        // Actually, if it's already there, 'set(doc)' might overwrite and fail if mainImage is missing.
        // I'll keep the existing image if it exists.
        if (existingProject && existingProject.mainImage) {
            doc.mainImage = existingProject.mainImage;
        }
        await client.create(doc);
      }
    }

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
}

seed();
