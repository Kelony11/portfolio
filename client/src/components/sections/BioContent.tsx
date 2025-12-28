import './SectionContent.css';

const BioContent = () => {
  return (
    <div className="section-content bio-content">
      <h2 className="section-title">About Me</h2>
      
      <div className="bio-intro">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
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
            <div className="skill-icon">⚛️</div>
            <h4>Frontend</h4>
            <p>React, TypeScript, Next.js, Tailwind CSS</p>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🔧</div>
            <h4>Backend</h4>
            <p>Node.js, Express, MongoDB, PostgreSQL</p>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🚀</div>
            <h4>Tools</h4>
            <p>Git, Docker, AWS, Firebase</p>
          </div>
          <div className="skill-card">
            <div className="skill-icon">🎨</div>
            <h4>Design</h4>
            <p>Figma, Adobe XD, UI/UX Principles</p>
          </div>
        </div>
      </div>

      <div className="bio-section">
        <h3>Interests</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>

      <div className="bio-section">
        <h3>Philosophy</h3>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>

      <div className="bio-section">
        <h3>Education</h3>
        <p>
          Bachelor's Degree in Computer Science<br/>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>
      </div>

      <div className="bio-section">
        <h3>Fun Facts</h3>
        <ul className="fun-facts">
          <li>Fact #1</li>
          <li>Fact #2</li>
          <li>Fact #3</li>
          <li>Fact #4</li>
        </ul>
      </div>
    </div>
  );
};

export default BioContent;