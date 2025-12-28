import './SectionContent.css';

const ProjectsContent = () => {
  const projects = [
    {
      title: "TradeLens",
      description: "This is a project description text example",
      technologies: ["React", "Node.js", "WebSocket", "D3.js", "PostgreSQL"],
      github: "https://github.com/yourusername/tradelens",
      demo: "https://tradelens-demo.com",
      features: [
        "Real-time stock market data visualization",
        "Simple Moving Average (SMA) calculations",
        "Interactive charts and graphs",
        "User portfolio management"
      ]
    },
    {
      title: "E-Commerce Platform",
      description: "This is a project description text example",
      technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS", "Redux"],
      github: "https://github.com/yourusername/ecommerce",
      demo: "https://ecommerce-demo.com",
      features: [
        "Secure payment processing with Stripe",
        "Advanced product filtering and search",
        "Real-time inventory management",
        "Admin analytics dashboard"
      ]
    },
    {
      title: "Task Management App",
      description: "This is a project description text example",
      technologies: ["React", "Firebase", "Material-UI", "TypeScript"],
      github: "https://github.com/yourusername/taskmanager",
      demo: "https://taskmanager-demo.com",
      features: [
        "Real-time collaboration",
        "Kanban board view",
        "Task assignments and deadlines",
        "Progress tracking and reports"
      ]
    },
    {
      title: "Weather Dashboard",
      description: "This is a project description text example",
      technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
      github: "https://github.com/yourusername/weather",
      demo: "https://weather-demo.com",
      features: [
        "7-day weather forecast",
        "Interactive weather maps",
        "Historical weather data",
        "Location-based alerts"
      ]
    },

    // Add more projects as needed below
    // {
    //   title: " ",
    //   description: " ",
    //   technologies: [" ", " ", " "],
    //   github: "link",
    //   demo: "link",
    //   features: [
    //     " ",
    //     " ",
    //     " ",
    //     " "
    //   ]
    // }
  ];

  return (
    <div className="section-content projects-content">
      <h2 className="section-title">Projects</h2>
      
      <p className="projects-intro">
        Here are some of the projects I've worked on. Each one represents a unique challenge 
        and learning experience in my development journey.
      </p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-header">
              <div className="project-icon">
                <img 
                  src="/api/placeholder/80/80" 
                  alt={project.title}
                />
              </div>
              <h3>{project.title}</h3>
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="project-features">
              <h4>Key Features:</h4>
              <ul>
                {project.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="project-tech">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-badge">{tech}</span>
              ))}
            </div>
            
            <div className="project-links">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link demo"
              >
                🚀 Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsContent;