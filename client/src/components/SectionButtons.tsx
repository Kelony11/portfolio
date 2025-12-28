import type { Section, ViewMode } from '../types';
import './SectionButtons.css';

interface SectionButtonsProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  viewMode: ViewMode;
}

const SectionButtons = ({ activeSection, setActiveSection, viewMode }: SectionButtonsProps) => {
  const sections: Section[] = ['bio', 'work', 'projects', 'contact'];

  return (
    <nav className={`section-buttons ${viewMode}`}>
      {sections.map((section) => (
        <button
          key={section}
          className={`section-btn ${activeSection === section ? 'active' : ''}`}
          onClick={() => setActiveSection(section)}
        >
          {section.toUpperCase()}
        </button>
      ))}
    </nav>
  );
};

export default SectionButtons;