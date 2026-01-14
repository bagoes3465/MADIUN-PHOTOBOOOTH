import { createContext, useContext, useState } from 'react';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const isActive = Boolean(sessionId);

  const startSession = () => {
    setSessionId(`session_${Date.now()}`);
  };

  const value = {
    sessionId,
    isActive,
    startSession,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used within SessionProvider');
  return ctx;
};
