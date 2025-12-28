import type { Section } from '../types';
import './ContentMonitor.css';
import BioContent from './sections/BioContent';
import WorkContent from './sections/WorkContent';
import ProjectsContent from './sections/ProjectsContent';
import ContactContent from './sections/ContactContent';

interface ContentMonitorProps {
  activeSection: Section;
}

const ContentMonitor = ({ activeSection }: ContentMonitorProps) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'bio':
        return <BioContent />;
      case 'work':
        return <WorkContent />;
      case 'projects':
        return <ProjectsContent />;
      case 'contact':
        return <ContactContent />;
      default:
        return <BioContent />;
    }
  };

  return (
    <div className="content-monitor">
      
      <div className="monitor-content">
        <div className="scrollable-area">
          {renderContent()}
        </div>
        
        {/* Custom scrollbar indicator (F) */}
        <div className="scroll-indicator">
          <div className="scroll-track"></div>
        </div>
      </div>
      
    </div>
  );
};

export default ContentMonitor;