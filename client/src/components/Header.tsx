import type { Theme, ViewMode } from '../types';
import './Header.css';

interface HeaderProps {
  theme: Theme;
  viewMode: ViewMode;
  toggleTheme: () => void;
}

const Header = ({ viewMode }: HeaderProps) => {
  return (
    <header className={`header ${viewMode}`}>
      <div className="profile-picture">
        <img 
          src="/public/image.jpeg"
          alt="Profile" 
        />
      </div>
    </header>
  );
};

export default Header;