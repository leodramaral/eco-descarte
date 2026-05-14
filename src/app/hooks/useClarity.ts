import { useEffect, useRef, useCallback, useState } from 'react';
import Clarity from '@microsoft/clarity';

export interface ClarityHookReturn {
  isClarityReady: boolean;
  hasConsent: boolean;
  trackEvent: (eventName: string, ...args: any[]) => void;
  setTag: (key: string, value: string) => void;
  identifyUser: (userId: string) => void;
  grantConsent: () => void;
  revokeConsent: () => void;
  isInitialized: boolean;
}

const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID;
const CLARITY_ENABLED = import.meta.env.VITE_CLARITY_ENABLED === 'true';

export const useClarity = (): ClarityHookReturn => {
  const [isClarityReady, setIsClarityReady] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const initializationPromiseRef = useRef<Promise<void> | null>(null);

  const initializeClarity = useCallback(async (): Promise<void> => {
    if (!CLARITY_ENABLED || !CLARITY_PROJECT_ID || isInitialized) {
      return;
    }

    if (initializationPromiseRef.current) {
      await initializationPromiseRef.current;
      return;
    }

    initializationPromiseRef.current = (async () => {
      try {
        Clarity.init(CLARITY_PROJECT_ID);
        setIsInitialized(true);
        setIsClarityReady(true);
      } catch (error) {
        console.error('Failed to initialize Microsoft Clarity:', error);
      }
    })();

    await initializationPromiseRef.current;
  }, [isInitialized]);

  useEffect(() => {
    const storedConsent = localStorage.getItem('clarity_consent');
    if (storedConsent) {
      setHasConsent(storedConsent === 'granted');
    }

    return () => {
      initializationPromiseRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (hasConsent && CLARITY_ENABLED && CLARITY_PROJECT_ID) {
      initializeClarity();
    }
  }, [hasConsent, initializeClarity]);

  const trackEvent = useCallback((eventName: string, ..._args: any[]) => {
    if (hasConsent && isClarityReady) {
      Clarity.event(eventName);
    }
  }, [hasConsent, isClarityReady]);

  const setTag = useCallback((key: string, value: string) => {
    if (hasConsent && isClarityReady) {
      Clarity.setTag(key, value);
    }
  }, [hasConsent, isClarityReady]);

  const identifyUser = useCallback((userId: string) => {
    if (hasConsent && isClarityReady) {
      Clarity.identify(userId);
    }
  }, [hasConsent, isClarityReady]);

  const grantConsent = useCallback(() => {
    if (isClarityReady) {
      Clarity.consentV2({ ad_Storage: 'granted', analytics_Storage: 'granted' });
    }
    localStorage.setItem('clarity_consent', 'granted');
    setHasConsent(true);
    if (!isInitialized) {
      initializeClarity();
    }
  }, [isClarityReady, isInitialized, initializeClarity]);

  const revokeConsent = useCallback(() => {
    if (isClarityReady) {
      Clarity.consentV2({ ad_Storage: 'denied', analytics_Storage: 'denied' });
    }
    localStorage.setItem('clarity_consent', 'denied');
    setHasConsent(false);
  }, [isClarityReady]);

  return {
    isClarityReady,
    hasConsent,
    trackEvent,
    setTag,
    identifyUser,
    grantConsent,
    revokeConsent,
    isInitialized
  };
};
