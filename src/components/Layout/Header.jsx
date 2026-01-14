import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Images, Home, Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from 'src/context/ThemeContext';
import { useSession } from 'src/context/SessionContext';
import { ROUTES } from 'src/constants/routes';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const { sessionId } = useSession();
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: ROUTES.HOME, icon: Home },
    { name: 'Camera', path: ROUTES.CAMERA, icon: Camera },
    { name: 'Gallery', path: ROUTES.GALLERY, icon: Images },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2 group">
            <Camera className="w-8 h-8 text-madiun-primary group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold gradient-text">
              Photobooth Madiun
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-madiun-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t dark:border-gray-700 animate-slide-down">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                    isActive(item.path)
                      ? 'bg-madiun-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;