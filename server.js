import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { testConnection } from './src/models/db.js';
import router from './src/routes.js';


// Application environment
const nodeEnv = process.env.NODE_ENV?.toLowerCase() || 'production';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = path.dirname(currentFilename);

// port number the server will listen on
const port = process.env.PORT || 3000;


const app = express();

/**
 * configure Express middleware
 */

// Serve static files from the public directory
app.use(express.static(path.join(currentDirname, 'public')));

// Setting EJS as the templating engine
app.set('view engine', 'ejs');

// Telling Express where to find my templates
app.set('views', path.join(currentDirname, 'src/views'));

// Middleware to log all incoming requests
app.use((req, res, next) => {
    if (nodeEnv === 'development') {
        console.log(`${req.method} ${req.url}`);
    }
    next(); // Pass control to the next middleware or route
});

// Middleware to make nodeEnv available to all templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = nodeEnv;
    next();
});

// Use the imported router to handle routes
app.use(router);


// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);
    
    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';
    
    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };
    
    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
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


