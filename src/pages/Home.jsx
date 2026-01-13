import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Image, Sparkles, QrCode, Zap, Shield } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';
import { useSession } from '../context/SessionContext';
import { CONFIG } from '../constants/config';

const Home = () => {
  const navigate = useNavigate();
  const { photoCount, getSessionDuration } = useSession();

  const features = [
    {
      icon: Camera,
      title: 'Instant Capture',
      description: 'Take high-quality photos with professional camera controls'
    },
    {
      icon: Sparkles,
      title: '10+ Filters',
      description: 'Apply beautiful filters and effects to enhance your photos'
    },
    {
      icon: Image,
      title: 'Custom Frames',
      description: 'Choose from various frames designed for events in Madiun'
    },
    {
      icon: QrCode,
      title: 'QR Download',
      description: 'Share and download photos instantly via QR code'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Quick processing and instant preview of your photos'
    },
    {
      icon: Shield,
      title: 'Secure Storage',
      description: 'Your photos are stored securely with auto-cleanup'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-madiun-primary/10 to-madiun-secondary/10 dark:from-madiun-primary/5 dark:to-madiun-secondary/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center animate-fade-in">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-madiun-primary to-madiun-secondary rounded-3xl flex items-center justify-center shadow-hard transform hover:scale-110 transition-transform duration-300">
                <Camera className="text-white" size={48} />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Photobooth</span>
              <br />
              <span className="text-gray-800 dark:text-gray-200">Madiun</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Capture your special moments with professional quality. 
              Edit, enhance, and share instantly!
            </p>

            {/* Stats */}
            {photoCount > 0 && (
              <div className="flex justify-center gap-8 mb-8 animate-slide-up">
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">{photoCount}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Photos Captured</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold gradient-text">
                    {Math.floor(getSessionDuration() / 60000)}m
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Session Time</p>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                icon={Camera}
                size="lg"
                onClick={() => navigate('/capture')}
                className="w-full sm:w-auto"
              >
                Start Taking Photos
              </Button>
              <Button
                icon={Image}
                variant="outline"
                size="lg"
                onClick={() => navigate('/gallery')}
                className="w-full sm:w-auto"
              >
                View Gallery
              </Button>
            </div>

            {/* Quick Info */}
            <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
              {CONFIG.WATERMARK_TEXT} • Professional Quality • Instant Results
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to create stunning photos for your events
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  hover 
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-madiun-primary to-madiun-secondary rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Simple and easy in 4 steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Capture', description: 'Take a photo with our camera' },
              { step: '2', title: 'Edit', description: 'Apply filters and frames' },
              { step: '3', title: 'Save', description: 'Save to gallery instantly' },
              { step: '4', title: 'Share', description: 'Download via QR code' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="relative text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-madiun-primary to-madiun-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-madiun-primary to-madiun-secondary -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-madiun-primary to-madiun-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Capture Amazing Photos?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Start your photobooth experience now and create memories that last forever
          </p>
          <Button
            icon={Camera}
            variant="secondary"
            size="xl"
            onClick={() => navigate('/capture')}
            className="shadow-hard hover:shadow-2xl"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;