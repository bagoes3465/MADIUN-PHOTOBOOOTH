import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Home, Image, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'src\context\ThemeContext.jsx';
import { useSession } from 'src\context\SessionContext.jsx';
import { NAV_ITEMS } from 'src\constants\routes.js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();
  const { photoCount } = useSession();

  const iconMap = {
    Home: Home,
    Camera: Camera,
    Image: Image
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-madiun-primary to-madiun-secondary rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Camera className="text-white" size={24} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold gradient-text">Photobooth</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Madiun</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const Icon = iconMap[item.icon];
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    active
                      ? 'bg-madiun-primary text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Photo Count Badge */}
            {photoCount > 0 && (
              <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-madiun-primary to-madiun-secondary text-white px-3 py-1 rounded-full text-sm font-medium animate-fade-in">
                <Image size={16} />
                <span>{photoCount}</span>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-gray-700" size={20} />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="text-gray-700 dark:text-gray-300" size={24} />
              ) : (
                <Menu className="text-gray-700 dark:text-gray-300" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 animate-slide-down">
          <nav className="px-4 py-4 space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = iconMap[item.icon];
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    active
                      ? 'bg-madiun-primary text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Mobile Photo Count */}
            {photoCount > 0 && (
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Photos Captured
                </span>
                <span className="bg-gradient-to-r from-madiun-primary to-madiun-secondary text-white px-3 py-1 rounded-full text-sm font-bold">
                  {photoCount}
                </span>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;