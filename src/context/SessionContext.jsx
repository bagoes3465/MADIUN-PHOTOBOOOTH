import React, { createContext, useContext, useState, useEffect } from 'react';

const SessionContext = createContext();

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
};

export const SessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [photoCount, setPhotoCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionData, setSessionData] = useState({});

  // Initialize session on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('photobooth_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        // Check if session is still valid (not expired)
        const timeout = parseInt(process.env.REACT_APP_SESSION_TIMEOUT || 3600000);
        const elapsed = Date.now() - new Date(session.startTime).getTime();
        
        if (elapsed < timeout) {
          setSessionId(session.id);
          setSessionStartTime(session.startTime);
          setPhotoCount(session.photoCount);
          setIsActive(true);
          setSessionData(session.data || {});
        } else {
          // Session expired, clear it
          endSession();
        }
      } catch (error) {
        console.error('Error loading session:', error);
      }
    }
  }, []);

  // Save session to localStorage
  const saveSession = () => {
    const session = {
      id: sessionId,
      startTime: sessionStartTime,
      photoCount,
      data: sessionData
    };
    localStorage.setItem('photobooth_session', JSON.stringify(session));
  };

  // Start new session
  const startSession = (data = {}) => {
    const newSessionId = `session_${Date.now()}`;
    const startTime = new Date().toISOString();
    
    setSessionId(newSessionId);
    setSessionStartTime(startTime);
    setPhotoCount(0);
    setIsActive(true);
    setSessionData(data);

    // Save to localStorage
    const session = {
      id: newSessionId,
      startTime,
      photoCount: 0,
      data
    };
    localStorage.setItem('photobooth_session', JSON.stringify(session));

    return newSessionId;
  };

  // End session
  const endSession = () => {
    setSessionId(null);
    setSessionStartTime(null);
    setPhotoCount(0);
    setIsActive(false);
    setSessionData({});
    localStorage.removeItem('photobooth_session');
  };

  // Increment photo count
  const incrementPhotoCount = () => {
    setPhotoCount(prev => {
      const newCount = prev + 1;
      // Update in localStorage
      const savedSession = localStorage.getItem('photobooth_session');
      if (savedSession) {
        const session = JSON.parse(savedSession);
        session.photoCount = newCount;
        localStorage.setItem('photobooth_session', JSON.stringify(session));
      }
      return newCount;
    });
  };

  // Update session data
  const updateSessionData = (key, value) => {
    setSessionData(prev => {
      const updated = { ...prev, [key]: value };
      // Save to localStorage
      const savedSession = localStorage.getItem('photobooth_session');
      if (savedSession) {
        const session = JSON.parse(savedSession);
        session.data = updated;
        localStorage.setItem('photobooth_session', JSON.stringify(session));
      }
      return updated;
    });
  };

  // Get session duration
  const getSessionDuration = () => {
    if (!sessionStartTime) return 0;
    return Date.now() - new Date(sessionStartTime).getTime();
  };

  // Get session stats
  const getSessionStats = () => {
    return {
      id: sessionId,
      startTime: sessionStartTime,
      duration: getSessionDuration(),
      photoCount,
      isActive,
      data: sessionData
    };
  };

  const value = {
    sessionId,
    sessionStartTime,
    photoCount,
    isActive,
    sessionData,
    startSession,
    endSession,
    incrementPhotoCount,
    updateSessionData,
    getSessionDuration,
    getSessionStats,
    saveSession
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};