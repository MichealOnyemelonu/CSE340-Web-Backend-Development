// Import any needed model functions
import { getAllOrganizations } from '../models/organizations.js';



// Define any controller functions
const showOrganizationsPage = async (req, res) => {
    const organizations = await getAllOrganizations();
    

    const title = 'Our Partner Organisations';

    res.render('organizations', { title, organizations });
};

// Export any controller functions
export { showOrganizationsPage };