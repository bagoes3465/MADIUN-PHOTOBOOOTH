import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [secondaryColor, setSecondaryColor] = useState('#7c3aed');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('photobooth_theme');
    if (savedTheme) {
      try {
        const themeData = JSON.parse(savedTheme);
        setTheme(themeData.mode || 'light');
        setPrimaryColor(themeData.primaryColor || '#2563eb');
        setSecondaryColor(themeData.secondaryColor || '#7c3aed');
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    // Save to localStorage
    const themeData = {
      mode: theme,
      primaryColor,
      secondaryColor
    };
    localStorage.setItem('photobooth_theme', JSON.stringify(themeData));
  }, [theme, primaryColor, secondaryColor]);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Set custom primary color
  const updatePrimaryColor = (color) => {
    setPrimaryColor(color);
  };

  // Set custom secondary color
  const updateSecondaryColor = (color) => {
    setSecondaryColor(color);
  };

  // Reset to default theme
  const resetTheme = () => {
    setTheme('light');
    setPrimaryColor('#2563eb');
    setSecondaryColor('#7c3aed');
  };

  const value = {
    theme,
    primaryColor,
    secondaryColor,
    toggleTheme,
    updatePrimaryColor,
    updateSecondaryColor,
    resetTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};