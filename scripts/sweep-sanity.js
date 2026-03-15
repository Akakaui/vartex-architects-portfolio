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

async function listAllAndFix() {
  try {
    const query = `*[_type == "project"]`;
    const docs = await client.fetch(query);
    console.log(`Found ${docs.length} total projects.`);
    
    for (const doc of docs) {
      console.log(`- Project: "${doc.title}" (Slug: ${doc.slug?.current}, ID: ${doc._id})`);
      
      // If it's a mock project, delete it
      const realSlugs = ["nka-na-uzu", "clergy-office-house", "the-corinthian"];
      if (!realSlugs.includes(doc.slug?.current)) {
        console.log(`  -> DELETING mock project...`);
        await client.delete(doc._id);
      } else {
        // If it's a real project, ensure title has full stop
        if (doc.title && !doc.title.endsWith('.')) {
          console.log(`  -> FIXING title (adding full stop)...`);
          await client.patch(doc._id).set({ title: doc.title + '.' }).commit();
        }
        // Also ensure it's "featured" so it shows up in hero
        if (doc.featured !== true) {
            console.log(`  -> SETTING as featured...`);
            await client.patch(doc._id).set({ featured: true }).commit();
        }
        // Also ensure it's "selectedWork"
        if (doc.selectedWork !== true) {
            console.log(`  -> SETTING as selectedWork...`);
            await client.patch(doc._id).set({ selectedWork: true }).commit();
        }
      }
    }
    
    console.log('Sweep complete.');
  } catch (error) {
    console.error('Error during sweep:', error);
  }
}

listAllAndFix();
