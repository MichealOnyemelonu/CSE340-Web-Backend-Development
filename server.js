import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';

import { getAllOrganizations } from './src/models/organizations.js';


const nodeEnv = process.env.NODE_ENV?.toLowerCase() || 'production';
const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = path.dirname(currentFilename);

const port = process.env.PORT || 3000;


const app = express();

/**
 * configure Express middleware
 */
// Setting EJS as the templating engine
app.set('view engine', 'ejs');

// Telling Express where to find your templates
app.set('views', path.join(currentDirname, 'src/views'));

// Serve static files from the public directory
app.use(express.static(path.join(currentDirname, 'public')));






/**
  * Routes
  */
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render('home', { title });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();

    const title = 'Our Partner Organisations';

    res.render('organizations', { title, organizations });
});

app.get('/projects', async (req, res) => {
    const title = 'Service Projects';
    res.render('projects', { title });
});

app.get('/categories', async (req, res) => {
    const title = 'Categories';
    res.render('categories', { title });
});

app.listen(port, async() => {
    try {
        await testConnection();
        console.log(`Server is running at http://127.0.0.1:${port}`);
        console.log(`Environment: ${nodeEnv}`);
    }   catch (error) {
        console.error('Error connecting to the database:', error);
    }    
}); 