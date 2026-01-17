import './SectionContent.css';

const WorkContent = () => {
  return (
    <div className="section-content work-content">
      <h2 className="section-title">Work Experience</h2>
      
      <div className="timeline">

        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="work-header">
              <h3>Software Developer Co-op</h3>
              <span className="work-period">Jan - Jun 2025</span>
            </div>
            <h4 className="company-name">Johnson & Johnson Technology</h4>
            <p className="work-description">
              Built internal developer tooling and UI improvements to streamline
              onboarding, improve performance, and standardize delivery workflows across teams.
            </p>
            <div className="tech-tags">
              <span className="tag">Python</span>
              <span className="tag">React</span>
              <span className="tag">TanStack Router</span>
              <span className="tag">Bitbucket</span>
            </div>
            <ul className="achievements">
              <li>Automated TanStack Router setup with a Python CLI</li>
              <li>Improved Recognition App load time and page performance</li>
              <li>Standardized CI and Git workflows across 12 projects</li>
            </ul>
          </div>
        </div>

        {/* <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="work-header">
              <h3>Full Stack Developer</h3>
              <span className="work-period">2020 - 2022</span>
            </div>
            <h4 className="company-name">Digital Solutions LLC</h4>
            <p className="work-description">
              Developed and maintained multiple client-facing applications using modern web technologies. 
              Collaborated with design teams to create intuitive user interfaces.
            </p>
            <div className="tech-tags">
              <span className="tag">React</span>
              <span className="tag">Express</span>
              <span className="tag">MongoDB</span>
              <span className="tag">Firebase</span>
            </div>
            <ul className="achievements">
              <li>Built 15+ production applications from scratch</li>
              <li>Reduced bug reports by 40% through comprehensive testing</li>
              <li>Mentored 3 junior developers in best practices</li>
            </ul>
          </div>
        </div> */}

        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="work-header">
              <h3>Software Developer Intern</h3>
              <span className="work-period">May - Aug 2024</span>
            </div>
            <h4 className="company-name">Cisco</h4>
            <p className="work-description">
              Built and optimized internal web tools to automate product testing workflows and improve 
              visibility into factory performance through real-time reporting and dashboards.
            </p>
            <div className="tech-tags">
              <span className="tag">Python</span>
              <span className="tag">React</span>
              <span className="tag">REST APIs</span>
            </div>
            <ul className="achievements">
              <li>Built Python + React tools to automate internal reporting</li>
              <li>Created a real-time factory KPI dashboard</li>
              <li>Improved visibility and sped up decisions for cross-site teams</li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default WorkContent;