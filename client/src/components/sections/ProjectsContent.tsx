import { useState } from "react";
import "./SectionContent.css";

const ProjectsContent = () => {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const projects = [
    {
      title: "TradeLens",
      description: "A backend service that supports user accounts, portfolio creation and tracking, and generates automated BUY/SELL/HOLD trading signals using real-time stock data.",
      technologies: ["Python", "FastAPI", "Google Firestore", "Yahoo Finance API", "Pydantic", "Postman"],
      github: "https://github.com/Kelony11/TradeLens",
      features: [
        "Real-time market data visualization",
        "Portfolio creation and management",
        "Live portfolio tracking and performance insights",
        "Real-time trading signals from market price movements",
      ],
    },
    {
      title: "MyPortfolio",
      description: "A full-stack production-ready MERN platform with smart project discovery, secure contact & feedback messaging, light/dark mode, and production-grade deployment on AWS.",
      technologies: ["React", "TypeScript", "JavaScript", "Node.js", "MongoDB", "AWS EC2", "Cloudfare", "Express.js"],
      github: "https://github.com/Kelony11/portfolio",
      features: [
        "Smart project filtering by technology stack",
        "Intelligent project suggestions when no filters match",
        "Light & dark mode with responsive UI design",
        "Bot protection and rate-limited APIs for security",
      ],
    },
    {
      title: "SportsPredictor (Django Package)",
      description: "A web app that lets fans make game predictions, see live results, and manage matchups through a built-in admin dashboard, packaged for reuse across projects.",
      technologies: ["Django", "Python", "SQLite", "Django REST"],
      github: "https://github.com/Kelony11/sports_predictor",
      features: [
        "Fan voting flow for game outcomes",
        "Real-time results page with prediction totals and percentages",
        "Admin dashboard to create & manage matchups and view stored data",
        "⚡️⬇️ Install: run `pip install sports_predictor` on your terminal",
      ],
      
    },
    {
      title: "MarketMetrics",
      description:
        "A Django app that ingests Yahoo Finance historical stock data, stores it in a database, and serves an HTML dashboard plus a JSON REST API for querying price history.",
      technologies: ["Python", "Django", "pandas", "Yahoo Finance API"],
      github: "https://github.com/Kelony11/_market_metrics",
      features: [
        "Yahoo Finance OHLCV Data Ingestion to CSV",
        "Data Validation and Summary Statistics",
        "Price and Volume Chart Generation",
        "Django ORM Storage, HTML View & JSON REST Endpoint",
      ],
    },
    {
      title: "ProceduralRoom",
      description: "A Blender Python project that procedurally generates a furnished 3D room using reusable assets, scripted geometry, and material assignments.",
      technologies: ["Python", "Blender API", "3D Modeling"],
      github: "https://github.com/Kelony11/procedural_room",
      features: [
        "Procedural Floor Tile Grid Generation",
        "Reusable Chair and Table Asset Importing",
        "Automated Scene Construction via Python",
        "Material Assignment and Scene Organization",
      ],
    },
    {
      title: "TickerTensor",
      description: "Node.js tool that ingests stock price CSVs from multiple sources and aligns them by date into a clean, consistent dataset for faster quantitative analysis and moving-window statistics.",
      technologies: ["JavaScript", "Node.js", "Jasmine", "Git"],
      github: "https://github.com/Kelony11/TickerTensor",
      features: [
        "Robust CSV Ingestion",
        "Moving-Window Statistics",
        "Deterministic Time-Series Alignment",
        "Readable, Developer-Friendly CLI Output",
      ],
    },
    {
      title: "x86-compiler",
      description: "A mini compiler that turns a small expression/control-flow language into runnable x86-64 assembly, with full test coverage and Makefile-driven tooling.",
      technologies: ["Rust", "C", "Makefile"],
      github: "https://github.com/Kelony11/x86-Compiler",
      features: [
        "Rust-Based x86-64 Codegen",
        "Expression & Control-Flow Support",
        "Automated Regression Test Suite",
        "Clean, Modular Compiler Architecture",
      ],
    },
    {
      title: "FittedIn",
      description: "Health & wellness social platform designed for goal tracking, user profiles, and fitness networking.",
      technologies: ["Node.js", "PostgreSQL", "RESTful API", "AWS EC2", "Vanilla JS", "Nginx", "PM2", "GitHub Actions"],
      github: "https://github.com/Kelony11/FittedIn",
      features: [
        "Secure Authentication System",
        "Goal Tracking and Progress Monitoring",
        "Database Management",
      ],
    },
    {
      title: "RU FileSystem",
      description: "A user-space file system built with FUSE, supporting file and directory operations via inodes, bitmaps, and path resolution.",
      technologies: ["C", "FUSE API", "Linux/Unix", "Makefile"],
      github: "https://github.com/Kelony11/ru-filesystem",
      features: [
        "File-Backed Disk Emulation",
        "Bitmap-Based Block and Inode Allocation",
        "UNIX-Style Inode Architecture",
        "Directory Management and Core File Operations",
      ],
    },
    {
      title: "Virtual Memory Manager",
      description: "Simulated virtual memory system for allocating memory, moving data, and running matrix workloads while measuring paging and TLB behavior to understand performance trade-offs",
      technologies: ["C", "Linux/Unix", "Makefile"],
      github: "https://github.com/Kelony11/virtual-memory-manager",
      features: [
        "Bitmap-driven page tracking",
        "User level virtual allocation API",
        "TLB-aware address translation",
        "Benchmarked matrix and data workloads",
      ],
    },
    {
      title: "Pantry Tracker",
      description: "A cloud-based pantry management web app that lets users track, search, and update inventory in real time, reducing food waste and streamlining grocery planning.",
      technologies: ["JavaScript", "Firebase", "Next.js", "React", "MaterialUI", "Vercel"],
      github: "https://github.com/Kelony11/Pantry_Tracker",
      features: [
        "Store and manage items from any device",
        "Update item quantities with ease",
        "Fast search filter to quickly find items",
        "AI recipe suggestions based on pantry contents",
      ],
    },
    {
      title: "ULTS",
      description: "User-level threading library with preemptive PSJF/MLFQ/CFS schedulers and custom mutexes; benchmarks reveal performance trade-offs vs pthreads for real concurrent workloads.",
      technologies: ["C", "Linux/Unix", "Makefile"],
      github: "https://github.com/Kelony11/user-level-threads-lib-scheduler",
      features: [
        "Preemptive PSJF/MLFQ/CFS scheduling",
        "Non-recursive mutexes with FIFO wait queues",
        "POSIX-style worker API (create/yield/join)",
        "Benchmarks & stats (runtime, context switches)",
      ],
    },
    {
      title: "Midnight Landing",
      description: "A sleek single-page landing page with a dark gradient theme, custom typography, and a lightweight 1–5 star rating prompt for quick user feedback.",
      technologies: ["HTML", "CSS", "JavaScript", "Google Fonts"],
      github: "https://github.com/Kelony11/midnight_landing",
      features: [
        "Dark gradient UI with readable, modern styling",
        "Custom typography via Google Fonts",
        "Tech stack section with colored category labels",
        "Timed 1–5 star rating + optional feedback prompt",
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
              <h1>{project.title}</h1>
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
