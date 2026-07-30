// Import any needed model functions
import { getAllCategories, getProjectsByCategoryId, getCategoryById, } from '../models/categories.js';

import { getProjectDetails } from '../models/projects.js';

import { getCategoriesByProjectId } from '../models/categories.js';
import { updateCategoryAssignments } from '../models/categories.js';
import { createCategory } from '../models/categories.js';
import { updateCategory } from '../models/categories.js';

import { body, validationResult } from 'express-validator';



// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);

    const title = category.category_name;

    res.render('category', { title, category, projects });
};

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};


const showEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);

    res.render('edit-category', { title: 'Edit Category', category });
};

const processEditCategoryForm = async (req, res) => {
    const categoryId = req.params.id;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(e => req.flash('error', e.msg));
        return res.redirect(`/edit-category/${categoryId}`);
    }

    const { category_name } = req.body;

    try {
        await updateCategory(categoryId, category_name);
        req.flash('success', 'Category updated');
        res.redirect('/categories');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Error updating category');
        res.redirect(`/edit-category/${categoryId}`);
    }
};

const categoryValidation = [
    body('category_name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ max: 100 }).withMessage('Max length is 100 characters')
        .isLength({ min: 3 }).withMessage('Min length is 3 characters')
];

const showNewCategoryForm = (req, res) => {
    res.render('new-category', { title: 'Create Category' });
};

const processNewCategoryForm = async (req, res) => {

    console.log("NEW CATEGORY FORM SUBMITTED");

    const error = validationResult(req);
    if(!error.isEmpty()) {
        error.array().forEach(e => req.flash('error', e.msg));
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


// Export any controller functions
export { 
    showCategoriesPage, 
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showEditCategoryForm,
    processEditCategoryForm,   
    categoryValidation,
    showNewCategoryForm,
    processNewCategoryForm
    
    
 };