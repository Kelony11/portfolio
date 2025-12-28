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
              <h3>Senior Full Stack Developer</h3>
              <span className="work-period">2022 - Present</span>
            </div>
            <h4 className="company-name">Tech Innovations Inc.</h4>
            <p className="work-description">
              Leading the development of scalable web applications serving 100K+ users. 
              Architected microservices infrastructure and mentored junior developers.
            </p>
            <div className="tech-tags">
              <span className="tag">React</span>
              <span className="tag">Node.js</span>
              <span className="tag">PostgreSQL</span>
              <span className="tag">AWS</span>
            </div>
            <ul className="achievements">
              <li>Improved application performance by 60% through code optimization</li>
              <li>Led migration from monolith to microservices architecture</li>
              <li>Implemented CI/CD pipeline reducing deployment time by 75%</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item">
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
        </div>

        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="work-header">
              <h3>Junior Web Developer</h3>
              <span className="work-period">2019 - 2020</span>
            </div>
            <h4 className="company-name">StartUp Hub</h4>
            <p className="work-description">
              Started my professional journey building responsive websites and learning industry best practices. 
              Contributed to various client projects and internal tools.
            </p>
            <div className="tech-tags">
              <span className="tag">JavaScript</span>
              <span className="tag">HTML/CSS</span>
              <span className="tag">jQuery</span>
              <span className="tag">Bootstrap</span>
            </div>
            <ul className="achievements">
              <li>Developed 20+ responsive landing pages</li>
              <li>Improved website loading times by 50%</li>
              <li>Learned agile development methodologies</li>
            </ul>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <div className="work-header">
              <h3>Web Development Intern</h3>
              <span className="work-period">2018 - 2019</span>
            </div>
            <h4 className="company-name">Creative Digital Agency</h4>
            <p className="work-description">
              Gained hands-on experience in web development, working alongside experienced developers 
              on real-world projects. Learned version control and collaborative coding.
            </p>
            <div className="tech-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
              <span className="tag">JavaScript</span>
              <span className="tag">Git</span>
            </div>
            <ul className="achievements">
              <li>Assisted in building 10+ client websites</li>
              <li>Fixed 100+ bugs and UI inconsistencies</li>
              <li>Learned professional development workflows</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkContent;