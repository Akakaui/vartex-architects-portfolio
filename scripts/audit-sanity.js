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

async function auditData() {
  try {
    const query = `*[_type == "project"] {
        title,
        slug,
        categories[]->{title}
    }`;
    const docs = await client.fetch(query);
    console.log('--- RAW SANITY AUDIT ---');
    docs.forEach(doc => {
      const cats = doc.categories?.map(c => c.title) || [];
      console.log(`Project: "${doc.title}" | Slug: ${doc.slug?.current} | Categories: [${cats.join(', ')}]`);
    });
  } catch (error) {
    console.error('Audit Error:', error);
  }
}

auditData();
