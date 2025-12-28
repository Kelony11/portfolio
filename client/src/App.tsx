import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SectionButtons from './components/SectionButtons';
import ContentMonitor from './components/ContentMonitor';
import FloatingResume from './components/FloatingResume';
import type { Section, Theme, ViewMode } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('bio');
  const [theme, setTheme] = useState<Theme>('dark');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'desktop' ? 'mobile' : 'desktop');
  };

  return (
    <div className={`app ${theme} ${viewMode}`}>
      <Header 
        theme={theme} 
        viewMode={viewMode}
        toggleTheme={toggleTheme}
        toggleViewMode={toggleViewMode}
      />
      
      <SectionButtons 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        viewMode={viewMode}
      />
      
      <ContentMonitor 
        activeSection={activeSection}
      />
      
      <FloatingResume />
    </div>
  );
}

export default App;