import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PhotoProvider } from './context/PhotoContext';
import { SessionProvider } from './context/SessionContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout
import MainLayout from './components/Layout/MainLayout';

// Pages
import Home from './pages/Home';
import Capture from './pages/Capture';
import Edit from './pages/Edit';
import Gallery from './pages/Gallery';
import Download from './pages/Download';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

// Styles
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <SessionProvider>
        <PhotoProvider>
          <Router>
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="capture" element={<Capture />} />
                <Route path="edit/:photoId?" element={<Edit />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="download/:qrCode?" element={<Download />} />
                <Route path="admin" element={<Admin />} />
              </Route>

              {/* 404 */}
              <Route path="404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Router>
        </PhotoProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;