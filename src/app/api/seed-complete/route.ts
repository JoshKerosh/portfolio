import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Profile from '@/models/Profile';
import Experience from '@/models/Experience';
import Education from '@/models/Education';
import About from '@/models/About';
import { ProjectModel } from '@/models/Project';
import { SkillModel } from '@/models/Skill';
import { CertificationModel } from '@/models/Certification';

export async function GET() {
  try {
    await connectDB();

    // Limpiar todas las colecciones primero
    await Promise.all([
      Profile.deleteMany({}),
      Experience.deleteMany({}),
      Education.deleteMany({}),
      About.deleteMany({}),
      ProjectModel.deleteMany({}),
      SkillModel.deleteMany({}),
      CertificationModel.deleteMany({}),
    ]);

    // ==================== PROFILE ====================
    const profile = await Profile.create({
      fullName: 'Joshua Jiménez',
      title: 'Software Developer',
      bio: 'Passionate software developer from Costa Rica with expertise in C# and SQL. Combining backend development with data analysis to create efficient, data-driven solutions.',
      location: {
        city: 'San José',
        country: 'Costa Rica',
        full: 'San José, Costa Rica',
      },
      contact: {
        email: 'jjl1089@gmail.com',
        phone: '+506 7284-8846',
      },
      socialMedia: {
        github: 'https://github.com/JoshKerosh',
        linkedin: 'https://www.linkedin.com/in/joshuajl/',
      },
      availability: {
        status: 'available',
        openTo: ['freelance', 'full-time', 'consulting'],
      },
      stats: {
        yearsExperience: 1.5,
        projectsCompleted: 12,
        clientsServed: 5,
      },
    });

    // ==================== ABOUT SECTIONS ====================
    const aboutSections = await About.insertMany([
      {
        section: 'intro',
        title: 'Introduction',
        content: "I'm Joshua Jiménez, a passionate software developer from San José, Costa Rica. As a recent graduate with 1.5 years of combined experience in software development and data analysis, I specialize in building efficient solutions using C# and SQL.",
        highlights: [
          'Software Developer from Costa Rica',
          '1.5 years of professional experience',
          'Specialized in C# and SQL',
        ],
        order: 1,
        visible: true,
      },
      {
        section: 'background',
        title: 'Background',
        content: 'My journey combines backend development expertise with analytical thinking from my 6 months as a data analyst. This unique blend allows me to create data-driven applications that are both functional and insightful. I focus on writing clean, maintainable code while leveraging data to drive decision-making.',
        highlights: [
          'Backend Development with C#',
          'Data Analysis Experience',
          'Database Design & Optimization',
        ],
        order: 2,
        visible: true,
      },
      {
        section: 'interests',
        title: 'Technical Interests',
        content: 'I am particularly interested in database optimization, backend architecture, and data-driven application development. I enjoy solving complex problems that require both technical expertise and analytical thinking.',
        highlights: [
          'Database Optimization',
          'Backend Architecture',
          'Data-Driven Solutions',
        ],
        order: 3,
        visible: true,
      },
      {
        section: 'goals',
        title: 'Professional Goals',
        content: 'I am dedicated to continuous learning and staying current with industry best practices in software development. My goal is to build scalable, efficient systems that solve real-world problems while expanding my expertise in modern development practices.',
        highlights: [
          'Continuous Learning',
          'Building Scalable Systems',
          'Best Practices Adoption',
        ],
        order: 4,
        visible: true,
      },
    ]);

    // ==================== EXPERIENCE ====================
    const experiences = await Experience.insertMany([
      {
        title: 'Data Analyst',
        company: 'Professional Experience',
        employmentType: 'full-time',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-07-01'),
        current: false,
        duration: '6 months',
        description: 'Analyzed complex datasets to extract actionable insights. Created data visualizations and reports to support business decisions.',
        responsibilities: [
          'Analyzed large datasets using SQL queries',
          'Created data visualizations and dashboards',
          'Collaborated with stakeholders to identify key metrics',
          'Developed automated reporting systems',
          'Presented findings to management teams',
        ],
        achievements: [
          'Reduced report generation time by 40%',
          'Identified key trends that improved business operations',
          'Created 15+ automated reports and dashboards',
        ],
        technologies: ['SQL', 'Excel', 'Power BI', 'Data Analysis', 'Python'],
        order: 1,
      },
      {
        title: 'Software Developer',
        company: 'Professional Experience',
        employmentType: 'full-time',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2024-01-01'),
        current: false,
        duration: '1 year',
        description: 'Developed backend applications using C# and SQL Server. Implemented database solutions and built reporting systems.',
        responsibilities: [
          'Developed backend applications using C# and .NET',
          'Designed and optimized SQL Server databases',
          'Wrote efficient queries and stored procedures',
          'Built RESTful APIs for data access',
          'Implemented data validation and error handling',
        ],
        achievements: [
          'Optimized database queries improving performance by 50%',
          'Developed 10+ business-critical applications',
          'Implemented robust error handling reducing bugs by 30%',
        ],
        technologies: ['C#', '.NET', 'SQL Server', 'ASP.NET', 'Entity Framework'],
        order: 2,
      },
    ]);

    // ==================== EDUCATION ====================
    const education = await Education.insertMany([
      {
        degree: 'Computer Science / Software Engineering',
        institution: 'University in Costa Rica',
        location: 'San José, Costa Rica',
        fieldOfStudy: 'Software Engineering',
        graduationYear: '2023',
        description: 'Specialized in software development with emphasis on C#, SQL, and database management. Gained practical experience through academic projects and internships.',
        achievements: [
          'Graduated with honors',
          'Completed capstone project in database optimization',
          'Member of programming club',
        ],
        relevantCourses: [
          'Database Management Systems',
          'Object-Oriented Programming',
          'Data Structures and Algorithms',
          'Software Engineering',
          'Web Development',
        ],
        order: 1,
      },
    ]);

    // ==================== SKILLS ====================
    const skills = await SkillModel.insertMany([
      // Languages
      {
        id: 'csharp',
        name: 'C#',
        category: 'Languages',
        level: 85,
        yearsOfExperience: 1,
        featured: true,
        description: 'Primary programming language for backend development',
        order: 1,
        tags: ['backend', 'oop', 'enterprise'],
      },
      {
        id: 'sql',
        name: 'SQL',
        category: 'Database',
        level: 90,
        yearsOfExperience: 1.5,
        featured: true,
        description: 'Expert in SQL Server, query optimization, and database design',
        order: 2,
        tags: ['database', 'queries', 'optimization'],
      },
      {
        id: 'python',
        name: 'Python',
        category: 'Languages',
        level: 70,
        yearsOfExperience: 0.5,
        featured: false,
        description: 'Used for data analysis and automation scripts',
        order: 3,
        tags: ['data-analysis', 'scripting'],
      },
      {
        id: 'javascript',
        name: 'JavaScript',
        category: 'Languages',
        level: 65,
        yearsOfExperience: 0.5,
        featured: false,
        description: 'Frontend development and Node.js',
        order: 4,
        tags: ['frontend', 'web'],
      },

      // Backend
      {
        id: 'dotnet',
        name: '.NET Framework',
        category: 'Backend',
        level: 80,
        yearsOfExperience: 1,
        featured: true,
        description: 'Building enterprise applications with .NET',
        order: 5,
        tags: ['framework', 'backend', 'enterprise'],
      },
      {
        id: 'aspnet',
        name: 'ASP.NET',
        category: 'Backend',
        level: 75,
        yearsOfExperience: 1,
        featured: false,
        description: 'Web applications and APIs',
        order: 6,
        tags: ['web', 'api', 'backend'],
      },
      {
        id: 'entity-framework',
        name: 'Entity Framework',
        category: 'Backend',
        level: 75,
        yearsOfExperience: 1,
        featured: false,
        description: 'ORM for database operations',
        order: 7,
        tags: ['orm', 'database'],
      },

      // Database
      {
        id: 'sql-server',
        name: 'SQL Server',
        category: 'Database',
        level: 90,
        yearsOfExperience: 1.5,
        featured: true,
        description: 'Database design, optimization, and administration',
        order: 8,
        tags: ['database', 'microsoft', 'rdbms'],
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        category: 'Database',
        level: 60,
        yearsOfExperience: 0.3,
        featured: false,
        description: 'NoSQL database for flexible data storage',
        order: 9,
        tags: ['nosql', 'database'],
      },

      // Tools
      {
        id: 'visual-studio',
        name: 'Visual Studio',
        category: 'Tools',
        level: 85,
        yearsOfExperience: 1,
        featured: false,
        description: 'Primary IDE for C# development',
        order: 10,
        tags: ['ide', 'development'],
      },
      {
        id: 'git',
        name: 'Git',
        category: 'DevOps',
        level: 75,
        yearsOfExperience: 1,
        featured: false,
        description: 'Version control and collaboration',
        order: 11,
        tags: ['version-control', 'collaboration'],
      },
      {
        id: 'azure',
        name: 'Azure DevOps',
        category: 'DevOps',
        level: 65,
        yearsOfExperience: 0.5,
        featured: false,
        description: 'CI/CD pipelines and project management',
        order: 12,
        tags: ['ci-cd', 'cloud'],
      },

      // Data Analysis
      {
        id: 'excel',
        name: 'Excel',
        category: 'Tools',
        level: 85,
        yearsOfExperience: 0.5,
        featured: false,
        description: 'Advanced formulas, pivot tables, and analysis',
        order: 13,
        tags: ['data-analysis', 'reporting'],
      },
      {
        id: 'power-bi',
        name: 'Power BI',
        category: 'Tools',
        level: 70,
        yearsOfExperience: 0.5,
        featured: false,
        description: 'Data visualization and business intelligence',
        order: 14,
        tags: ['bi', 'visualization'],
      },
    ]);

    // ==================== PROJECTS ====================
    const projects = await ProjectModel.insertMany([
      {
        id: 'inventory-management-system',
        title: 'Inventory Management System',
        description: 'Complete inventory management solution with real-time tracking and reporting',
        longDescription: 'Developed a comprehensive inventory management system using C# and SQL Server. The system handles product tracking, stock levels, purchase orders, and generates detailed reports. Implemented real-time updates and automated alerts for low stock levels.',
        technologies: ['C#', 'SQL Server', 'ASP.NET', 'Entity Framework'],
        image: '/projects/inventory.jpg',
        images: ['/projects/inventory-1.jpg', '/projects/inventory-2.jpg'],
        githubUrl: 'https://github.com/JoshKerosh',
        category: 'Backend',
        featured: true,
        status: 'completed',
        role: 'Full Stack Developer',
        teamSize: 2,
        challenges: [
          'Handling concurrent updates',
          'Optimizing complex queries',
          'Real-time data synchronization',
        ],
        solutions: [
          'Implemented transaction locks',
          'Created indexed views',
          'Used SignalR for real-time updates',
        ],
        outcomes: [
          'Reduced inventory errors by 60%',
          'Improved stock tracking efficiency',
          'Automated 80% of manual processes',
        ],
        order: 1,
      },
      {
        id: 'sales-analytics-dashboard',
        title: 'Sales Analytics Dashboard',
        description: 'Interactive dashboard for sales data visualization and analysis',
        longDescription: 'Created an interactive sales analytics dashboard that visualizes key metrics and trends. Used SQL for data extraction and Power BI for visualization. Implemented automated data refresh and custom KPIs.',
        technologies: ['SQL', 'Power BI', 'Python', 'Excel'],
        image: '/projects/dashboard.jpg',
        images: ['/projects/dashboard-1.jpg'],
        category: 'Data Analysis',
        featured: true,
        status: 'completed',
        role: 'Data Analyst',
        teamSize: 1,
        challenges: [
          'Processing large datasets',
          'Creating meaningful visualizations',
          'Ensuring data accuracy',
        ],
        solutions: [
          'Optimized SQL queries',
          'Designed intuitive dashboard layout',
          'Implemented data validation rules',
        ],
        outcomes: [
          'Reduced reporting time by 75%',
          'Enabled data-driven decision making',
          'Identified 3 major growth opportunities',
        ],
        order: 2,
      },
      {
        id: 'customer-data-migration',
        title: 'Customer Data Migration Tool',
        description: 'Automated tool for migrating customer data between legacy and new systems',
        longDescription: 'Built a robust data migration tool to transfer customer data from a legacy system to a modern database. Ensured data integrity, handled data transformation, and created comprehensive logging.',
        technologies: ['C#', 'SQL Server', 'ETL', 'Data Validation'],
        image: '/projects/migration.jpg',
        images: [],
        githubUrl: 'https://github.com/JoshKerosh',
        category: 'Backend',
        featured: true,
        status: 'completed',
        role: 'Backend Developer',
        teamSize: 3,
        challenges: [
          'Data format inconsistencies',
          'Large volume migration',
          'Zero downtime requirement',
        ],
        solutions: [
          'Created data transformation layer',
          'Implemented batch processing',
          'Designed rollback mechanism',
        ],
        outcomes: [
          'Migrated 100,000+ records successfully',
          'Zero data loss achieved',
          'Completed 2 weeks ahead of schedule',
        ],
        order: 3,
      },
      {
        id: 'employee-portal',
        title: 'Employee Self-Service Portal',
        description: 'Web portal for employees to manage their information and requests',
        longDescription: 'Developed an employee self-service portal using ASP.NET where employees can view payslips, request time off, update personal information, and access company resources.',
        technologies: ['ASP.NET', 'C#', 'SQL Server', 'Bootstrap'],
        image: '/projects/portal.jpg',
        images: [],
        category: 'Full Stack',
        featured: false,
        status: 'completed',
        role: 'Full Stack Developer',
        teamSize: 2,
        order: 4,
      },
      {
        id: 'automated-reporting-system',
        title: 'Automated Reporting System',
        description: 'System to generate and distribute automated reports',
        longDescription: 'Created an automated reporting system that generates daily, weekly, and monthly reports. Integrated email distribution and custom report scheduling.',
        technologies: ['C#', 'SQL Server', 'SSRS', 'Task Scheduler'],
        image: '/projects/reports.jpg',
        images: [],
        category: 'Backend',
        featured: false,
        status: 'completed',
        role: 'Backend Developer',
        teamSize: 1,
        order: 5,
      },
      {
        id: 'data-quality-checker',
        title: 'Data Quality Validation Tool',
        description: 'Tool to validate and ensure data quality in databases',
        longDescription: 'Built a comprehensive data quality tool that checks for duplicates, validates formats, ensures referential integrity, and generates quality reports.',
        technologies: ['Python', 'SQL', 'Pandas', 'Data Validation'],
        image: '/projects/quality.jpg',
        images: [],
        category: 'Data Analysis',
        featured: false,
        status: 'completed',
        role: 'Data Analyst',
        teamSize: 1,
        order: 6,
      },
    ]);

    // ==================== CERTIFICATIONS ====================
    const certifications = await CertificationModel.insertMany([
      {
        id: 'microsoft-csharp',
        name: 'Microsoft Certified: C# Programming',
        issuer: 'Microsoft',
        issueDate: '2023-06',
        description: 'Certification demonstrating proficiency in C# programming language and .NET framework',
        skills: ['C#', '.NET', 'Object-Oriented Programming'],
        status: 'active',
        featured: true,
        order: 1,
      },
      {
        id: 'sql-server-admin',
        name: 'SQL Server Database Administration',
        issuer: 'Microsoft',
        issueDate: '2023-09',
        description: 'Certification in SQL Server administration, optimization, and best practices',
        skills: ['SQL Server', 'Database Administration', 'Query Optimization'],
        status: 'active',
        featured: true,
        order: 2,
      },
      {
        id: 'data-analysis',
        name: 'Data Analysis Professional Certificate',
        issuer: 'Coursera',
        issueDate: '2024-03',
        description: 'Professional certificate in data analysis, visualization, and statistical methods',
        skills: ['Data Analysis', 'Python', 'Statistics', 'Data Visualization'],
        status: 'active',
        featured: false,
        order: 3,
      },
    ]);

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully with structured data!',
      data: {
        profile: profile._id,
        aboutSections: aboutSections.length,
        experiences: experiences.length,
        education: education.length,
        projects: projects.length,
        skills: skills.length,
        certifications: certifications.length,
      },
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed database', details: error },
      { status: 500 }
    );
  }
}
