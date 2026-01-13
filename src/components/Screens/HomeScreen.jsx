// src/components/Screens/HomeScreen.jsx
import React, { useState } from 'react';
import { Camera } from 'lucide-react';

const HomeScreen = ({ onSelectBackground }) => {
  const [selected, setSelected] = useState(null);

  const backgrounds = [
    {
    id: 'custom-bg',
    name: 'Custom Background',
    color: '#FF5722',
    gradient: 'linear-gradient(135deg, #FF5722 0%, #FFC107 100%)'
    },
    {
      id: 'none',
      name: 'Tanpa Background',
      color: '#f3f4f6',
      gradient: null
    },
    {
      id: 'alun-alun',
      name: 'Alun-alun Madiun',
      color: '#4CAF50',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 'wringin',
      name: 'Wringin Lawang',
      color: '#2196F3',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 'tugu',
      name: 'Tugu Peringatan',
      color: '#FF9800',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 'batik',
      name: 'Batik Madiun',
      color: '#9C27B0',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  const handleStart = () => {
    if (selected) {
      onSelectBackground(selected);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          📸 PHOTOBOOTH
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">
          MADIUN
        </h2>
        <p className="text-white text-lg md:text-xl px-4">
          Abadikan Momen Anda dengan Latar Khas Madiun
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-2xl w-full animate-slide-up">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
          Pilih Background
        </h3>
        
        {/* Background Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
          {backgrounds.map(bg => (
            <button
              key={bg.id}
              onClick={() => setSelected(bg)}
              className={`p-4 md:p-6 rounded-xl border-4 transition-all transform hover:scale-105 ${
                selected?.id === bg.id
                  ? 'border-blue-600 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div
                className="w-full h-20 md:h-24 rounded-lg mb-3 shadow-inner"
                style={{
                  background: bg.gradient || bg.color
                }}
              />
              <p className="text-xs md:text-sm font-semibold text-gray-700 text-center">
                {bg.name}
              </p>
            </button>
          ))}
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={!selected}
          className="w-full py-3 md:py-4 px-6 md:px-8 bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl font-bold rounded-xl transition-all disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
        >
          <Camera size={28} />
          Mulai Ambil Foto
        </button>

        {/* Info */}
        {!selected && (
          <p className="text-center text-gray-500 text-sm mt-4">
            Pilih salah satu background untuk melanjutkan
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-white text-sm opacity-75">
          © 2024 Photobooth Madiun - Dibuat dengan ❤️
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;