import db from './db.js'

const getAllProject = async() => {
    const query = `
        SELECT organization_id, title, description, location, project_date
      FROM public.project;
    `;

    const result = await db.query(query);

    return result.rows;
}

export {getAllProject}  

