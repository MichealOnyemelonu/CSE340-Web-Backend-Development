# Week 03 Coaching Session Transcript

## Coach
I’m your supportive and non-judgmental Learning Coach and Software Mentor.

**Welcome! Just to be clear from the start, this is a coaching session, not a test. It is perfectly okay—and even encouraged—to say "I don't know" or "I made a mistake." That's the fastest way we'll learn today.**

Micheal, this is a safe learning space where mistakes are encouraged because they help us discover what to focus on next. Since we're working in a chat interface, whenever we discuss code, please paste the relevant code snippet directly into the chat so we can review it together.

**Question:** Could you paste a non-trivial model function from your assignment that accepts a parameter and uses it in an SQL query?

## Micheal
```js
const getAllProjects = async() => {
    const query = `
        SELECT organization_id, title, description, location, project_date
      FROM public.service_project;
    `;

    const result = await db.query(query);

    return result.rows;
}
```

## Coach
Discussed model responsibilities and noted that the function did not accept a parameter. Requested a model function that accepts a parameter and uses it in SQL.

## Micheal
```js
const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;

      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};
```

## Coach
Discussed parameterized queries, SQL injection prevention, database-side filtering, and model responsibilities.

**Question:** Why did you choose to retrieve projects by organizationId instead of retrieving all projects and filtering them elsewhere in your application?

## Micheal
I choose to retrieve by organizationid because i wanted to avoid sql injection

## Coach
Explained that parameterized queries prevent SQL injection and discussed efficiency benefits of filtering in the database.

**Question:** Could you now paste a non-trivial EJS view snippet that inserts data into a link so we can discuss Topic 2: Views?

## Micheal
```ejs
<%- include('partials/header') %>

<main>
    <h1><%= project.title %></h1>

    <p>
        <strong>Description:</strong>
        <%= project.description %>
    </p>

    <p>
        <strong>Date:</strong>
        <%= project.date %>
    </p>

    <p>
        <strong>Location:</strong>
        <%= project.location %>
    </p>

    <p>
        <strong>Partner Organization:</strong>
        ">
            <%= project.organization_name %>
        </a>
    </p>
</main>

<%- include('partials/footer') %>
```

## Coach
Discussed view rendering and requested a complete hyperlink example.

## Micheal
```ejs
<main>
    <h1><%= title %></h1>

    <ul>
        <% categories.forEach(category => { %>
            <li>
                <%= category.category_id%>
                 <%= category.category_name%>
            </li>
        <% }) %>
    </ul>
</main>

<%- include('partials/footer') %>
```

## Coach
Discussed EJS looping and rendering dynamic content. Requested an example containing a link.

## Micheal
```ejs
<%- include('partials/header') %>

<main>
    <h1><%= title %></h1>

    <ul class="project-list">
        <% projects.forEach(project => { %>
            <li>
                <h2>
                    /project/<%= project.project_id %>>
                </h2>

                <p>
                    Organization:
                    /organization/<%= project.organization_id %>
                        <%= project.organization_name %>
                    </a>
                </p>

                <p><%= project.description %></p>
            </li>
        <% }) %>
    </ul>
</main>

<%- include('partials/footer') %>
```

## Coach
Discussed dynamic IDs in URLs and EJS-rendered content.

**Question:** Could you now paste a controller route handler that uses a route parameter?

## Micheal
```js
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const projectId = req.params.id;

    const project = await getProjectDetails(projectId);

    res.render('project', {
        title: project.title,
        project
    });
};
```

## Coach
Discussed controllers, route parameters, req.params.id, and MVC responsibilities.

**Question:** Can you paste your error-handling code so we can discuss Topic 4?

## Micheal
```js
const testConnection = async() => {
    try {
        const result = await db.query('SELECT NOW() as current_time');
        console.log('Database connection successful:', result.rows[0].current_time);
        return true;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error;
    }
};

export { db as default, testConnection };
```

## Coach
Discussed try/catch, logging, rethrowing errors, and requested a 404 or 500 page example.

## Micheal
```ejs
<%- include('../partials/header') %>
<main>
    <h1>Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <p>Return to the <a href="/">homepage</a> to continue browsing.</p>
</main>
<%- include('../partials/footer') %>
```

## Coach Summary
Covered all required topics:
1. Models
2. Views
3. Controllers
4. Error Handling (including a 404 page)

Session completed as a coaching discussion focused on learning and reflection.
