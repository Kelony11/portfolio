import { useState } from "react";
import "./SectionContent.css";

const ProjectsContent = () => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const projects = [
    {
      title: "TradeLens",
      description: "This is a project description text example",
      technologies: ["React", "Node.js", "WebSocket", "D3.js", "PostgreSQL"],
      github: "https://github.com/yourusername/tradelens",
      features: [
        "Real-time stock market data visualization",
        "Simple Moving Average (SMA) calculations",
        "Interactive charts and graphs",
        "User portfolio management",
      ],
    },
    {
      title: "E-Commerce Platform",
      description: "This is a project description text example",
      technologies: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS", "Redux"],
      github: "https://github.com/yourusername/ecommerce",
      features: [
        "Secure payment processing with Stripe",
        "Advanced product filtering and search",
        "Real-time inventory management",
        "Admin analytics dashboard",
      ],
    },
    {
      title: "Task Management App",
      description: "This is a project description text example",
      technologies: ["React", "Firebase", "Material-UI", "TypeScript"],
      github: "https://github.com/yourusername/taskmanager",
      features: [
        "Real-time collaboration",
        "Kanban board view",
        "Task assignments and deadlines",
        "Progress tracking and reports",
      ],
    },
    {
      title: "Weather Dashboard",
      description: "This is a project description text example",
      technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
      github: "https://github.com/yourusername/weather",
      features: [
        "7-day weather forecast",
        "Interactive weather maps",
        "Historical weather data",
        "Location-based alerts",
      ],
    },
    {
      title: "Social Media Analytics",
      description: "This is a project description text example",
      technologies: ["Python", "Flask", "React", "MongoDB", "Pandas"],
      github: "https://github.com/yourusername/social-analytics",
      features: [
        "Multi-platform integration",
        "Custom metric tracking",
        "Automated reporting",
        "Trend predictions with ML",
      ],
    },
    {
      title: "Portfolio Generator",
      description: "This is a project description text example",
      technologies: ["React", "Gatsby", "GraphQL", "Styled Components"],
      github: "https://github.com/yourusername/portfolio-gen",
      features: [
        "Multiple pre-built themes",
        "Drag-and-drop customization",
        "SEO optimization",
        "One-click deployment",
      ],
    },
  ];

  // Get all unique technologies
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  ).sort();

  // Filter projects - must have ALL selected technologies
  const filteredProjects =
    selectedTechs.length > 0
      ? projects.filter((project) =>
          selectedTechs.every((tech) => project.technologies.includes(tech))
        )
      : projects;

  // Find close match suggestions. Projects with at least 1 matching tech
  const getClosestMatch = () => {
    if (selectedTechs.length === 0 || filteredProjects.length > 0) return null;

    // Find projects that have at least 1 of the selected techs
    const matchingProjects = projects
      .map((project) => {
        const matchingTechs = selectedTechs.filter((tech) =>
          project.technologies.includes(tech)
        );
        return {
          project,
          matchingTechs,
          matchCount: matchingTechs.length,
        };
      })
      .filter(({ matchCount }) => matchCount > 0) // At least 1 match
      .sort((a, b) => b.matchCount - a.matchCount); // Sort by most matches

    if (matchingProjects.length === 0) return null;

    const bestMatch = matchingProjects[0];
    const removedCount = selectedTechs.length - bestMatch.matchCount;

    return {
      project: bestMatch.project,
      matchingTechs: bestMatch.matchingTechs,
      removedCount,
    };
  };

  const handleTechToggle = (tech: string) => {
    if (selectedTechs.includes(tech)) {
      setSelectedTechs(selectedTechs.filter((t) => t !== tech));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const clearFilters = () => {
    setSelectedTechs([]);
  };

  const applySuggestion = (techs: string[]) => {
    setSelectedTechs(techs);
  };

  const closestMatch = getClosestMatch();

  return (
    <div className="section-content projects-content">
      <div className="projects-header">
        <div>
          <h2 className="section-title">Projects</h2>
          <p className="projects-intro">
            Here are some of the projects I've worked on. Each one represents a
            unique challenge and learning experience in my development journey.
          </p>
        </div>

        {/* Filter Dropdown - Top Right */}
        <div className="tech-filter-container">
          <button
            className="filter-toggle-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filter ({selectedTechs.length})
          </button>

          {isDropdownOpen && (
            <>
                <div className="filter-backdrop" onClick={() => setIsDropdownOpen(false)} />
                <div className="filter-dropdown">
                <div className="filter-dropdown-header">
                    <h4>Filter by Technology</h4>
                    {selectedTechs.length > 0 && (
                    <button className="clear-all-btn" onClick={clearFilters}>
                        Clear All
                    </button>
                    )}
                </div>
                
                <div className="filter-options">
                    {allTechnologies.map((tech) => (
                    <label key={tech} className="filter-checkbox">
                        <input
                        type="checkbox"
                        checked={selectedTechs.includes(tech)}
                        onChange={() => handleTechToggle(tech)}
                        />
                        <span className="checkbox-custom"></span>
                        <span className="tech-label">{tech}</span>
                    </label>
                    ))}
                </div>

                {/* Done button - mobile only */}
                <div className="filter-dropdown-footer">
                    <button 
                    className="filter-done-btn"
                    onClick={() => setIsDropdownOpen(false)}
                    >
                    Done
                    </button>
                </div>
                </div>
            </>
            )}
        </div>
      </div>

      {/* Selected Filters Display */}
      {selectedTechs.length > 0 && (
        <div className="active-filters">
          <span className="filter-label">Active filters:</span>
          {selectedTechs.map((tech) => (
            <span key={tech} className="active-filter-tag">
              {tech}
              <button
                className="remove-filter"
                onClick={() => handleTechToggle(tech)}
                aria-label={`Remove ${tech} filter`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Projects Count */}
      <div className="projects-count">
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      {/* Close Match Suggestion */}
      {closestMatch && (
        <div className="suggestion-box">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <span>
            No exact matches found. Try{" "}
            <button
              className="suggestion-link"
              onClick={() => applySuggestion(closestMatch.matchingTechs)}
            >
              {closestMatch.matchingTechs.join(", ")}
            </button>{" "}
            instead? ({closestMatch.removedCount}{" "}
            {closestMatch.removedCount === 1 ? "tag" : "tags"} removed)
          </span>
        </div>
      )}

      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div key={index} className="project-card">
            <div className="project-header">
              <div className="project-icon">
                <img src="/api/placeholder/80/80" alt={project.title} />
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
                <span key={idx} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-links">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && !closestMatch && (
        <div className="no-projects">
          <p>No projects found with the selected technologies.</p>
          <button className="clear-filter-btn" onClick={clearFilters}>
            View All Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsContent;
