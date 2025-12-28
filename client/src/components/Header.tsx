import type { Theme, ViewMode } from '../types';
import './Header.css';

interface HeaderProps {
  theme: Theme;
  viewMode: ViewMode;
  toggleTheme: () => void;
  toggleViewMode: () => void;
}

const Header = ({ theme, viewMode, toggleTheme, toggleViewMode }: HeaderProps) => {
  return (
    <header className={`header ${viewMode}`}>
      <div className="profile-section">
        <div className="profile-picture">
          <img 
            src="/api/placeholder/200/200" 
            alt="Profile" 
          />
        </div>
        <div className="controls">
          <button 
            className="toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button 
            className="toggle-btn"
            onClick={toggleViewMode}
            aria-label="Toggle view mode"
          >
            {viewMode === 'desktop' ? '📱' : '🖥️'}
          </button>
        </div>
      </div>
      
      <div className="view-indicator">
        View: {viewMode === 'desktop' ? 'Desktop' : 'Mobile'} layout
      </div>
    </header>
  );
};

export default Header;