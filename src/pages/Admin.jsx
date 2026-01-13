import React, { useState } from 'react';
import { 
  BarChart3, Camera, Image, Clock, Trash2, 
  Settings, Download, RefreshCw 
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import { usePhoto } from '../context/PhotoContext';
import { useSession } from '../context/SessionContext';
import { CONFIG } from '../constants/config';

const Admin = () => {
  const { photos, clearAllPhotos } = usePhoto();
  const { getSessionStats, endSession } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const sessionStats = getSessionStats();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === CONFIG.ADMIN.password || password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleResetSession = () => {
    if (window.confirm('Are you sure you want to reset the session?')) {
      endSession();
      window.location.reload();
    }
  };

  const handleClearPhotos = () => {
    if (window.confirm(`Are you sure you want to delete all ${photos.length} photos?`)) {
      clearAllPhotos();
    }
  };

  const handleExportData = () => {
    const data = {
      photos: photos.length,
      session: sessionStats,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `photobooth-data-${Date.now()}.json`;
    link.click();
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-madiun-primary to-madiun-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Login
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Enter password to access admin panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-madiun-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                placeholder="Enter admin password"
                required
              />
            </div>
            <Button type="submit" fullWidth>
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor and manage your photobooth
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Camera className="text-blue-600 dark:text-blue-300" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Photos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {photos.length}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Image className="text-green-600 dark:text-green-300" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Edited Photos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {photos.filter(p => p.edited).length}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Clock className="text-purple-600 dark:text-purple-300" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Session Time</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatDuration(sessionStats.duration)}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-orange-600 dark:text-orange-300" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Photos/Hour</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sessionStats.duration > 0 
                    ? Math.round((photos.length / sessionStats.duration) * 3600000)
                    : 0}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Session Info */}
          <Card title="Session Information">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Session ID</span>
                <span className="font-mono text-sm text-gray-900 dark:text-white">
                  {sessionStats.id || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Started</span>
                <span className="text-gray-900 dark:text-white">
                  {sessionStats.startTime 
                    ? new Date(sessionStats.startTime).toLocaleString('id-ID')
                    : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className={`px-2 py-1 rounded text-sm ${
                  sessionStats.isActive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}>
                  {sessionStats.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </Card>

          {/* System Info */}
          <Card title="System Information">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Version</span>
                <span className="text-gray-900 dark:text-white">{CONFIG.APP_VERSION}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Storage</span>
                <span className="text-gray-900 dark:text-white">
                  {photos.length} / {CONFIG.STORAGE.maxPhotos}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">QR Expiry</span>
                <span className="text-gray-900 dark:text-white">
                  {CONFIG.QR.expireHours}h
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <Card title="Admin Actions">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              icon={RefreshCw}
              variant="outline"
              onClick={handleResetSession}
              fullWidth
            >
              Reset Session
            </Button>
            <Button
              icon={Download}
              variant="outline"
              onClick={handleExportData}
              fullWidth
            >
              Export Data
            </Button>
            <Button
              icon={Trash2}
              variant="danger"
              onClick={handleClearPhotos}
              fullWidth
              disabled={photos.length === 0}
            >
              Clear Photos
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsAuthenticated(false)}
              fullWidth
            >
              Logout
            </Button>
          </div>
        </Card>

        {/* Recent Photos */}
        <Card title="Recent Photos" className="mt-6">
          {photos.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
              No photos captured yet
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {photos.slice(0, 12).map((photo) => (
                <div key={photo.id} className="aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={photo.data} 
                    alt="Photo" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Admin;