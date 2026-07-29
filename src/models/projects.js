import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT organization_id, title, description, location, project_date
      FROM public.service_project;
    `;

    const result = await db.query(query);

  

    return result.rows;
}

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


// week 3 group activity


async function getUpcomingProjects(number_of_projects) {
    try {
        const sql = `
            SELECT
                sp.project_id,
                sp.title,
                sp.description,
                sp.project_date AS date,
                sp.location,
                sp.organization_id,
                o.name AS organization_name
            FROM service_project sp
            JOIN organization o
                ON sp.organization_id = o.organization_id
            WHERE sp.project_date >= CURRENT_DATE
            ORDER BY sp.project_date ASC
            LIMIT $1
        `;

        const result = await db.query(sql, [number_of_projects]);
        return result.rows;
    } catch (error) {
        console.error("Error retrieving upcoming projects:", error);
        throw error;
    }
}


async function getProjectDetails(id) {
    try {
        const sql = `
            SELECT
                sp.project_id,
                sp.title,
                sp.description,
                sp.project_date AS date,
                sp.location,
                sp.organization_id,
                o.name AS organization_name
            FROM service_project sp
            JOIN organization o
                ON sp.organization_id = o.organization_id
            WHERE sp.project_id = $1
        `;

        const result = await db.query(sql, [id]);

        return result.rows[0];
    } catch (error) {
        console.error("Error retrieving project details:", error);
        throw error;
    }
}


export { 
  getAllProjects, 
  getProjectsByOrganizationId, 
  getUpcomingProjects, 
  getProjectDetails
}; 


