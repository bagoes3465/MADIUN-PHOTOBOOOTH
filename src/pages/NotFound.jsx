import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Camera, Image, AlertCircle } from 'lucide-react';
import Button from '../components/UI/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-8 animate-bounce">
          <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-hard">
            <AlertCircle className="text-white" size={64} />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-9xl font-bold gradient-text mb-4 animate-fade-in">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-slide-up">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button
            icon={Home}
            size="lg"
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
          <Button
            icon={Camera}
            variant="outline"
            size="lg"
            onClick={() => navigate('/capture')}
          >
            Take a Photo
          </Button>
          <Button
            icon={Image}
            variant="ghost"
            size="lg"
            onClick={() => navigate('/gallery')}
          >
            View Gallery
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-soft animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            If you think this is a mistake, here are some helpful links:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <button
              onClick={() => navigate('/')}
              className="text-madiun-primary hover:underline"
            >
              Home
            </button>
            <span className="text-gray-400">•</span>
            <button
              onClick={() => navigate('/capture')}
              className="text-madiun-primary hover:underline"
            >
              Capture
            </button>
            <span className="text-gray-400">•</span>
            <button
              onClick={() => navigate('/gallery')}
              className="text-madiun-primary hover:underline"
            >
              Gallery
            </button>
            <span className="text-gray-400">•</span>
            <button
              onClick={() => navigate('/admin')}
              className="text-madiun-primary hover:underline"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;