import React, { useState } from 'react';
import HomeScreen from './components/Screens/HomeScreen';
import CameraScreen from './components/Screens/CameraScreen';
import PreviewScreen from './components/Screens/PreviewScreen';
import './App.css';

function App() {
  const [screen, setScreen] = useState('home');
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  return (
    <div className="App min-h-screen">
      {screen === 'home' && (
        <HomeScreen 
          onSelectBackground={(bg) => {
            setSelectedBackground(bg);
            setScreen('camera');
          }}
        />
      )}
      
      {screen === 'camera' && (
        <CameraScreen 
          selectedBackground={selectedBackground}
          onCapture={(img) => {
            setCapturedImage(img);
            setScreen('preview');
          }}
          onBack={() => setScreen('home')}
        />
      )}
      
      {screen === 'preview' && (
        <PreviewScreen 
          image={capturedImage}
          onRetake={() => setScreen('camera')}
          onHome={() => {
            setScreen('home');
            setCapturedImage(null);
            setSelectedBackground(null);
          }}
        />
      )}
    </div>
  );
}

export default App;