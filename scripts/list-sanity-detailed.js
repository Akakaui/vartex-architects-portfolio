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

async function listDetailed() {
  try {
    const query = `*[_type == "project" || _type == "category"] {
        _type,
        _id,
        title,
        slug,
        featured,
        selectedWork,
        "categoryTitles": categories[]->title
    }`;
    const docs = await client.fetch(query);
    console.log(`Found ${docs.length} total documents.`);
    docs.forEach(doc => {
      if (doc._type === 'category') {
          console.log(`- [CATEGORY] ${doc.title} (ID: ${doc._id})`);
      } else {
          console.log(`- [PROJECT] ${doc.title} (Slug: ${doc.slug?.current}, ID: ${doc._id}, Featured: ${doc.featured}, SelectedWork: ${doc.selectedWork}, Categories: ${doc.categoryTitles?.join(', ') || 'None'})`);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

listDetailed();
