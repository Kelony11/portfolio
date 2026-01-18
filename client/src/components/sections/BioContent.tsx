import './SectionContent.css';

const BioContent = () => {
  return (
    <div className="section-content bio-content">
      <h2 className="section-title">About Me</h2>
      
      <div className="bio-intro">
        <p>
          Hey there! I'm a graduate Software Engineering student at Rutgers with a passion for building scalable backend systems, developer tools, and real-world software.
          Whether it's automating workflows, designing APIs, or deploying full-stack apps, I enjoy solving problems through clean, thoughtful engineering.
        </p>
      </div>

      <div className="bio-section">
        <h3>Background</h3>
        <p>
          I’ve interned at Johnson & Johnson and Cisco, where I built internal tools using Python, React, and SQL to improve automation and support data-driven decision-making across teams.
          My academic and personal projects, including TradeLens and FittedIn, span backend platforms, cloud deployment (AWS/Firebase), and the integration of external data sources through APIs.
        </p>
      </div>

      <div className="bio-section">
        <h3>Education</h3>
        <p>
          M.S in Software Engineering '26 <br/>
          B.S in Computer Science '24 <br/>
          @ Rutgers Univeristy - New Brunswick <br/>
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
              <li>JavaScript/TypeScript</li>
              <li>SwiftUI</li>
              <li>TanStack Router</li>
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
              <li>Python</li>
              <li>Swift</li>
              <li>Sequelize</li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="skill-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3"/>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            </div>
            <h4>Database</h4>
            <ul className="skill-list">
              <li>PostgreSQL</li>
              <li>Firebase Firestore</li>
              <li>SQL</li>
              <li>REST/JSON APIs</li>
            </ul>
          </div>
          
          <div className="skill-card">
            <div className="skill-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
              </svg>
            </div>
            <h4>Cloud</h4>
            <ul className="skill-list">
              <li>AWS (EC2)</li>
              <li>Firebase (Auth, Storage)</li>
              <li>Docker</li>
              <li>GitHub Actions</li>
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
              <span className="tech-tag">Python</span>
              <span className="tech-tag">JavaScript</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">Swift</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">C/C++</span>
            </div>
          </div>
          
          <div className="tech-category">
            <h4>Frameworks & Libraries</h4>
            <div className="tech-tags">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">Express</span>
              <span className="tech-tag">SwiftUI</span>
              <span className="tech-tag">TanStack Router</span>
              <span className="tech-tag">Sequelize</span>
            </div>
          </div>

          <div className="tech-category">
            <h4>DevOps & Tools</h4>
            <div className="tech-tags">
              <span className="tech-tag">AWS (EC2)</span>
              <span className="tech-tag">Docker</span>
              <span className="tech-tag">GitHub Actions</span>
              <span className="tech-tag">Git</span>
              <span className="tech-tag">Postman</span>
              <span className="tech-tag">Linux/Unix</span>
            </div>
          </div>

          <div className="tech-category">
            <h4>Testing</h4>
            <div className="tech-tags">
              <span className="tech-tag">Jasmine</span>
              <span className="tech-tag">Pytest</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bio-section">
        <h3>Certifications</h3>
        <li>
          <b>Professional Scrum Master 2025 (PSM I) - Scrum.org</b>
        </li>
        <br/>
        
      </div>


      {/* <div className="bio-section">
        <h3>Interests</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div> */}

    </div>
  );
};

export default BioContent;