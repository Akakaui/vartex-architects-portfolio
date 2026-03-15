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

async function listAll() {
  try {
    const query = `*[(_type == "project" || _type == "blog")]`;
    const docs = await client.fetch(query);
    console.log(`Found ${docs.length} total documents.`);
    docs.forEach(doc => {
      console.log(`- [${doc._type}] ${doc.title} (Slug: ${doc.slug?.current || 'N/A'}, ID: ${doc._id})`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

listAll();
