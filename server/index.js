import express from 'express';
import cors from 'cors';
import db from './database.js';
import { createTables } from './migrations.js';
import { seedDatabase } from './seed.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Admin password (in production, use environment variable)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_TOKENS = new Set(); // In production, use Redis or database

// Simple token generation
function generateToken() {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Date.now().toString(36)
    );
}

// Admin authentication middleware
function requireAdmin(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token || !ADMIN_TOKENS.has(token)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    next();
}

// Initialize database
createTables();
seedDatabase();

// ========== BIBLE POSTS ==========
// Get all Bible posts
app.get('/api/bible', (req, res) => {
    try {
        const posts = db.prepare('SELECT * FROM bible_posts ORDER BY id').all();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single Bible post
app.get('/api/bible/:id', (req, res) => {
    try {
        const post = db
            .prepare('SELECT * FROM bible_posts WHERE id = ?')
            .get(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create Bible post
app.post('/api/bible', (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res
                .status(400)
                .json({ error: 'Title and description are required' });
        }
        const result = db
            .prepare(
                'INSERT INTO bible_posts (title, description) VALUES (?, ?)'
            )
            .run(title, description);
        res.status(201).json({
            id: result.lastInsertRowid,
            title,
            description,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Bible post
app.put('/api/bible/:id', (req, res) => {
    try {
        const { title, description } = req.body;
        const result = db
            .prepare(
                'UPDATE bible_posts SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
            )
            .run(title, description, req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ id: req.params.id, title, description });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Bible post
app.delete('/api/bible/:id', (req, res) => {
    try {
        const result = db
            .prepare('DELETE FROM bible_posts WHERE id = ?')
            .run(req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ========== PRAYER POSTS ==========
// Get all Prayer posts
app.get('/api/prayer', (req, res) => {
    try {
        const posts = db
            .prepare('SELECT * FROM prayer_posts ORDER BY id')
            .all();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single Prayer post
app.get('/api/prayer/:id', (req, res) => {
    try {
        const post = db
            .prepare('SELECT * FROM prayer_posts WHERE id = ?')
            .get(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create Prayer post
app.post('/api/prayer', (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res
                .status(400)
                .json({ error: 'Title and description are required' });
        }
        const result = db
            .prepare(
                'INSERT INTO prayer_posts (title, description) VALUES (?, ?)'
            )
            .run(title, description);
        res.status(201).json({
            id: result.lastInsertRowid,
            title,
            description,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Prayer post
app.put('/api/prayer/:id', (req, res) => {
    try {
        const { title, description } = req.body;
        const result = db
            .prepare(
                'UPDATE prayer_posts SET title = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
            )
            .run(title, description, req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ id: req.params.id, title, description });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Prayer post
app.delete('/api/prayer/:id', (req, res) => {
    try {
        const result = db
            .prepare('DELETE FROM prayer_posts WHERE id = ?')
            .run(req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ========== PTSR POSTS ==========
// Get all PTSR posts
app.get('/api/ptsr', (req, res) => {
    try {
        const posts = db.prepare('SELECT * FROM ptsr_posts ORDER BY id').all();
        // Parse JSON sections
        const postsWithSections = posts.map((post) => ({
            ...post,
            sections: JSON.parse(post.sections),
        }));
        res.json(postsWithSections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single PTSR post
app.get('/api/ptsr/:id', (req, res) => {
    try {
        const post = db
            .prepare('SELECT * FROM ptsr_posts WHERE id = ?')
            .get(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({
            ...post,
            sections: JSON.parse(post.sections),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create PTSR post
app.post('/api/ptsr', (req, res) => {
    try {
        const { title, sections } = req.body;
        if (!title || !sections) {
            return res
                .status(400)
                .json({ error: 'Title and sections are required' });
        }
        const sectionsJson = JSON.stringify(sections);
        const result = db
            .prepare('INSERT INTO ptsr_posts (title, sections) VALUES (?, ?)')
            .run(title, sectionsJson);
        res.status(201).json({
            id: result.lastInsertRowid,
            title,
            sections,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update PTSR post
app.put('/api/ptsr/:id', (req, res) => {
    try {
        const { title, sections } = req.body;
        const sectionsJson = JSON.stringify(sections);
        const result = db
            .prepare(
                'UPDATE ptsr_posts SET title = ?, sections = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
            )
            .run(title, sectionsJson, req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ id: req.params.id, title, sections });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete PTSR post
app.delete('/api/ptsr/:id', (req, res) => {
    try {
        const result = db
            .prepare('DELETE FROM ptsr_posts WHERE id = ?')
            .run(req.params.id);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ========== ADMIN AUTHENTICATION ==========
// Admin login
app.post('/api/admin/login', (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        if (password !== ADMIN_PASSWORD) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = generateToken();
        ADMIN_TOKENS.add(token);

        // Token expires after 24 hours (in production, use proper expiration)
        setTimeout(
            () => {
                ADMIN_TOKENS.delete(token);
            },
            24 * 60 * 60 * 1000
        );

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Verify admin token
app.get('/api/admin/verify', (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token || !ADMIN_TOKENS.has(token)) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        res.json({ valid: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin logout
app.post('/api/admin/logout', (req, res) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (token) {
            ADMIN_TOKENS.delete(token);
        }

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API endpoints available at http://localhost:${PORT}/api`);
    console.log(
        `🔐 Admin password: ${ADMIN_PASSWORD} (set ADMIN_PASSWORD env var to change)`
    );
});
