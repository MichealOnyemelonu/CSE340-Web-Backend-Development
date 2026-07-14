import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';

import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/project.js';
import { getAllCategories } from './src/models/categories.js';
import { get } from 'https';
import { title } from 'process';


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



// working on this app//



app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    console.log(organizations);

    const title = 'Our Partner Organisations';

    res.render('organizations', { title, organizations });
});



app.get('/projects', async (req, res) => {
    const projects = await getAllProjects();

    console.log(projects);

    const title = 'Service Projects';

    res.render('projects', { title, projects });

});

app.get('/categories', async (req, res) => {
    const categories = await getAllCategories();

    console.log(categories);

    res.render('categories', {
        title: 'Categories', categories
    });

   
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
