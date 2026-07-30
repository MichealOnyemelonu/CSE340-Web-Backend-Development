import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, category_name
        FROM public.category
        ORDER BY category_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT category_id, category_name
        FROM public.category
        WHERE category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
}

const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.category_name
        FROM public.category c
        JOIN public.project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.category_id;
    `;

    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT
            sp.project_id,
            sp.organization_id,
            sp.title,
            sp.description,
            sp.location,
            sp.project_date
        FROM public.service_project sp
        JOIN public.project_category pc
            ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY sp.project_date;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows;
}

const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
   
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}


export  {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    updateCategoryAssignments,
    assignCategoryToProject,
    
    
};