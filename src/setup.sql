-- wk 1
-- ========================================
-- Organization Table
-- ========================================

CREATE TABLE organization (
	organization_id SERIAL PRIMARY KEY,
	name VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	contact_email VARCHAR(255) NOT NULL,
	logo_filename VARCHAR(255) NOT NULL
);

SELECT * FROM organization;

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

SELECT * FROM organization;

-- == wk1 team activity
-- ==============================
-- Creating a service project table
-- ==============================

CREATE TABLE service_project (
    project_id INT PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    project_date DATE,

	FOREIGN KEY (organization_id)
		REFERENCES organization(organization_id)
        
);



INSERT INTO service_project
(project_id, organization_id, title, description, location, project_date)
VALUES
-- Organization 1
(1, 1, 'Community Clean-Up', 'Neighborhood waste collection and recycling initiative', 'New York', '2025-01-15'),
(2, 1, 'Food Bank Support', 'Distribution of food packages to low-income families', 'Chicago', '2025-02-10'),
(3, 1, 'Tree Planting Drive', 'Planting trees in public parks and schools', 'Seattle', '2025-03-22'),
(4, 1, 'School Renovation', 'Refurbishment of classrooms and facilities', 'Boston', '2025-04-05'),
(5, 1, 'Health Awareness Campaign', 'Community outreach on preventive healthcare', 'Atlanta', '2025-05-18'),

-- Organization 2
(6, 2, 'Youth Mentorship Program', 'Career and academic mentoring for students', 'Los Angeles', '2025-01-20'),
(7, 2, 'Digital Literacy Workshop', 'Basic computer training for seniors', 'San Francisco', '2025-02-14'),
(8, 2, 'Homeless Shelter Assistance', 'Providing resources and volunteer support', 'Denver', '2025-03-12'),
(9, 2, 'Blood Donation Drive', 'Organized blood donation event', 'Houston', '2025-04-08'),
(10, 2, 'Beach Restoration Project', 'Coastal cleanup and preservation activities', 'Miami', '2025-05-25'),

-- Organization 3
(11, 3, 'Community Garden Initiative', 'Development of shared urban gardens', 'Portland', '2025-01-28'),
(12, 3, 'Literacy Outreach Program', 'Reading and writing support for children', 'Philadelphia', '2025-02-19'),
(13, 3, 'Senior Care Visits', 'Volunteer visits and assistance for elderly residents', 'Detroit', '2025-03-30'),
(14, 3, 'Sports for All', 'Free sports activities for underserved youth', 'Dallas', '2025-04-17'),
(15, 3, 'Water Conservation Campaign', 'Awareness campaign promoting water-saving practices', 'Phoenix', '2025-06-02');

SELECt * FROM service_project;

CREATE TABLE category (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES service_project(project_id),

    FOREIGN KEY (category_id)
        REFERENCES category(category_id)
);
