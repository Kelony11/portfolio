import { useState, useEffect } from 'react';
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

  // Auto-detect mobile/desktop based on screen size
  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth <= 768 ? 'mobile' : 'desktop');
    };

    // Set initial value
    handleResize();

    // Listen for window resize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`app ${theme} ${viewMode}`}>
      <Header 
        theme={theme} 
        viewMode={viewMode}
        toggleTheme={toggleTheme}
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