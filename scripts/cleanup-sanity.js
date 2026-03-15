import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2023-05-03',
});

async function cleanupMocks() {
  try {
    console.log('Searching for for mock projects to delete...');
    
    // Find projects that are NOT the approved 3
    const query = `*[_type == "project" && !(slug.current in ["nka-na-uzu", "clergy-office-house", "the-corinthian"])]`;
    const projectsToDelete = await client.fetch(query);
    
    console.log(`Found ${projectsToDelete.length} projects to delete.`);
    
    for (const project of projectsToDelete) {
      console.log(`Deleting project: ${project.title} (${project._id})`);
      await client.delete(project._id);
    }
    
    console.log('Cleanup complete.');
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

cleanupMocks();
