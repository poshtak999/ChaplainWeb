import db from './database.js';
import { POSTbible } from '../src/biblePost.js';
import { POSTprayer } from '../src/prayerPost.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ptsrDataPath = join(__dirname, '../src/data/ptsrPosts.json');
const ptsrData = JSON.parse(readFileSync(ptsrDataPath, 'utf-8'));

export function seedDatabase() {
    // Clear existing data
    db.exec('DELETE FROM bible_posts');
    db.exec('DELETE FROM prayer_posts');
    db.exec('DELETE FROM ptsr_posts');

    // Insert Bible posts
    const insertBible = db.prepare(
        'INSERT INTO bible_posts (title, description) VALUES (?, ?)'
    );
    const insertBibleMany = db.transaction((posts) => {
        for (const post of posts) {
            insertBible.run(post.title, post.description);
        }
    });
    insertBibleMany(POSTbible);
    console.log(`✅ Seeded ${POSTbible.length} Bible posts`);

    // Insert Prayer posts
    const insertPrayer = db.prepare(
        'INSERT INTO prayer_posts (title, description) VALUES (?, ?)'
    );
    const insertPrayerMany = db.transaction((posts) => {
        for (const post of posts) {
            if (post.id) {
                // Skip posts without id
                insertPrayer.run(post.title, post.description);
            }
        }
    });
    insertPrayerMany(POSTprayer.filter((p) => p.id));
    console.log(
        `✅ Seeded ${POSTprayer.filter((p) => p.id).length} Prayer posts`
    );

    // Insert PTSR posts
    const insertPtsr = db.prepare(
        'INSERT INTO ptsr_posts (title, sections) VALUES (?, ?)'
    );
    const insertPtsrMany = db.transaction((posts) => {
        for (const post of posts) {
            insertPtsr.run(post.title, JSON.stringify(post.sections));
        }
    });
    insertPtsrMany(ptsrData.posts);
    console.log(`✅ Seeded ${ptsrData.posts.length} PTSR posts`);

    console.log('✅ Database seeded successfully');
}
