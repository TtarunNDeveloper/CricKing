import React, { useState, useEffect } from 'react';
import './ModeToggle.css'; 

const ModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`toggle-btn ${isDarkMode ? 'dark' : 'light'}`}
    >
      <div className={`toggle-icon ${isDarkMode ? 'moon' : 'sun'}`}></div>
    </button>
  );
};

export default ModeToggle;
