import React, { createContext, useContext, ReactNode } from 'react';
import { useClarity } from '../hooks/useClarity';

interface ClarityContextType {
  isClarityReady: boolean;
  hasConsent: boolean;
  trackEvent: (eventName: string, ...args: any[]) => void;
  setTag: (key: string, value: string) => void;
  identifyUser: (userId: string) => void;
  grantConsent: () => void;
  revokeConsent: () => void;
  isInitialized: boolean;
}

const ClarityContext = createContext<ClarityContextType | undefined>(undefined);

interface ClarityProviderProps {
  children: ReactNode;
}

export const ClarityProvider: React.FC<ClarityProviderProps> = ({ children }) => {
  const clarity = useClarity();

  return (
    <ClarityContext.Provider value={clarity}>
      {children}
    </ClarityContext.Provider>
  );
};

export const useClarityContext = (): ClarityContextType => {
  const context = useContext(ClarityContext);
  if (context === undefined) {
    throw new Error('useClarityContext must be used within a ClarityProvider');
  }
  return context;
};
