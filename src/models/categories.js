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

// Function to create a new category

const createCategory = async (category_name) => {
    const query = `
        INSERT INTO category (category_name)
        VALUES ($1)
        RETURNING category_id;
    `;
    const result = await db.query(query, [category_name]);
    if (result.rows.length === 0) {
        throw new Error('Failed to create category');12
    }

    return result.rows[0].category_id;
};

const showNewCategoryForm = (req, res) => {
    res.render('new-category', { title: 'Create Category' })
};

const processNewCategoryForm = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(e => req.flash('error', e.msg));
        return res.redirect('/new-category');
    }

    const { category_name } = req.body;

    try {
        await createCategory(category_name);
        req.flash('success', 'Category created successfully');
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error creating category');
        res.redirect('/new-category');
    }
};

const updateCategory = async (categoryId, category_name) => {
    const query = `
        UPDATE category
        SET category_name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const result = await db.query(query, [category_name, categoryId]);

    if (result.rows.length === 0) {
        throw new Error('Failed to update category');
    }

    return result.rows[0].category_id;
};






export  {
    getAllCategories,
    getCategoryById,
    getCategoriesByProjectId,
    getProjectsByCategoryId,
    updateCategoryAssignments,
    assignCategoryToProject,
    showNewCategoryForm,
    processNewCategoryForm,
    createCategory,
    updateCategory
    
};