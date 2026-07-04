import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';


const NODE_ENV =process.env.NODE_ENV?.toLowerCase() || 'production';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;


const app = express();

/**
 * configure Express middleware
 */
// Setting EJS as the templating engine
app.set('view engine', 'ejs');

// Telling Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));




/**
  * Routes
  */
app.get('/', async (req, res) => {
    const title = 'Home';
    res.render ('home', { title });
});

app.get('/organizations', async (req, res) => {
    const title =- 'Our Partner Organisations';
    res.render ('organizations', { title });
});

app.get('/projects', async (req, res) => {
    const title = 'Service Projects'
    res.render ('projects', { title });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});