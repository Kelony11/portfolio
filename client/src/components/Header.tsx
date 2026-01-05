import { useState, useEffect } from 'react';
import type { Theme, ViewMode } from '../types';
import './Header.css';

interface HeaderProps {
  theme: Theme;
  viewMode: ViewMode;
  toggleTheme: () => void;
}

const roles = [
  "Ex-Software Dev. Intern @ J&J",
  "Masters in Software Engineering"
];

const Header = ({ viewMode }: HeaderProps) => {

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentRole.length) {
          setDisplayedText(currentRole.slice(0, displayedText.length + 1));
          setTypingSpeed(100);
        } else {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(currentRole.slice(0, displayedText.length - 1));
          setTypingSpeed(50);
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <header className={`header ${viewMode}`}>
      <div className="profile-picture">
        <img 
          src="Image.jpg"
          alt="Profile" 
        />
      </div>
      <div className="profile-info">
        <h1 className="profile-name">Kelvin Ihezue Test</h1>
        <p className="profile-subtitle">
          {displayedText}
          <span className="cursor">|</span>
        </p>
      </div>
    </header>
  );
};

export default Header;