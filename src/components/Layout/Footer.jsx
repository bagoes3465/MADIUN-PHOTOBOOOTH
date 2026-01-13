import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Heart, Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { CONFIG, SOCIAL_LINKS } from 'src\constants\config.js';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-madiun-primary to-madiun-secondary rounded-lg flex items-center justify-center">
                <Camera className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Photobooth Madiun</h3>
                <p className="text-sm text-gray-400">Capture Your Moments</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 max-w-md">
              {CONFIG.APP_DESCRIPTION}. Professional photobooth application with instant editing, 
              filters, frames, and QR code sharing capabilities.
            </p>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-madiun-primary transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-madiun-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-800 hover:bg-madiun-primary transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href={`mailto:support@photoboothmadiun.com`}
                className="p-2 rounded-lg bg-gray-800 hover:bg-madiun-primary transition-colors duration-300"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-madiun-primary transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/capture" className="text-sm hover:text-madiun-primary transition-colors duration-300">
                  Take Photo
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-sm hover:text-madiun-primary transition-colors duration-300">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-sm hover:text-madiun-primary transition-colors duration-300">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-madiun-primary transition-colors duration-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-madiun-primary transition-colors duration-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-madiun-primary transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-madiun-primary transition-colors duration-300">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © {currentYear} Photobooth Madiun. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center">
            Made with <Heart className="text-red-500 mx-1" size={16} /> in Madiun, Indonesia
          </p>
        </div>

        {/* Version Info */}
        {CONFIG.DEBUG_MODE && (
          <div className="text-center mt-4">
            <p className="text-xs text-gray-600">
              Version {CONFIG.APP_VERSION} | Debug Mode
            </p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;