import './SectionContent.css';

const BioContent = () => {
  return (
    <div className="section-content bio-content">
      <h2 className="section-title">About Me</h2>
      
      <div className="bio-intro">
        <p>
          Hey there! Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>

      <div className="bio-section">
        <h3>Background</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>

      <div className="bio-section">
        <h3>Skills</h3>
        <div className="skills-grid">
          <div className="skill-card">
            <div className="skill-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h4>Frontend</h4>
            <ul className="skill-list">
              <li>React & TypeScript</li>
              <li>Next.js</li>
              <li>Tailwind CSS</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="skill-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h4>Backend</h4>
            <ul className="skill-list">
              <li>Node.js & Express</li>
              <li>Python & Django</li>
              <li>PostgreSQL & MongoDB</li>
              <li>REST APIs</li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="skill-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6"/>
                <path d="M1 12h6m6 0h6"/>
                <path d="M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24"/>
                <path d="M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/>
              </svg>
            </div>
            <h4>Tools & DevOps</h4>
            <ul className="skill-list">
              <li>Git & GitHub</li>
              <li>Docker</li>
              <li>AWS & Firebase</li>
              <li>CI/CD Pipelines</li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="skill-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"/>
                <polyline points="7.5 19.79 7.5 14.6 3 12"/>
                <polyline points="21 12 16.5 14.6 16.5 19.79"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h4>Design</h4>
            <ul className="skill-list">
              <li>Figma</li>
              <li>Adobe XD</li>
              <li>UI/UX Principles</li>
              <li>Prototyping</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bio-section">
        <h3>Technical Proficiencies</h3>
        <div className="tech-categories">
          <div className="tech-category">
            <h4>Languages</h4>
            <div className="tech-tags">
              <span className="tech-tag">JavaScript</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Java</span>
              <span className="tech-tag">SQL</span>
            </div>
          </div>
          
          <div className="tech-category">
            <h4>Frameworks & Libraries</h4>
            <div className="tech-tags">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">Express</span>
              <span className="tech-tag">Django</span>
              <span className="tech-tag">Flask</span>
            </div>
          </div>
          
          <div className="tech-category">
            <h4>Databases</h4>
            <div className="tech-tags">
              <span className="tech-tag">PostgreSQL</span>
              <span className="tech-tag">MongoDB</span>
              <span className="tech-tag">Redis</span>
              <span className="tech-tag">MySQL</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bio-section">
        <h3>Interests</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>

      <div className="bio-section">
        <h3>Philosophy</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>

      <div className="bio-section">
        <h3>Education</h3>
        <p>
          Bachelor's Degree in Computer Science<br/>
          Specialized in XYZ
        </p>
      </div>
    </div>
  );
};

export default BioContent;