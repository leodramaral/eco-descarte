import { useEffect, useRef, useCallback, useState } from 'react';

interface ClarityWindow extends Window {
  clarity?: {
    (e: 'start', projectId: string): void;
    (e: 'identify', userId: string, sessionId?: string, userTag?: string): void;
    (e: 'event', eventName: string, ...args: any[]): void;
    (e: 'set', ...args: any[]): void;
    (e: 'consentV2', consent: { analytics_Storage: 'granted' | 'denied' }): void;
  };
}

declare const window: ClarityWindow;

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
      return new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.innerHTML = `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
        `;
        
        script.onload = () => {
          setIsInitialized(true);
          setIsClarityReady(true);
          resolve();
        };
        
        script.onerror = () => {
          console.error('Failed to load Microsoft Clarity script');
          resolve();
        };
        
        document.head.appendChild(script);
      });
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

  const trackEvent = useCallback((eventName: string, ...args: any[]) => {
    if (hasConsent && window.clarity && isClarityReady) {
      window.clarity('event', eventName, ...args);
    }
  }, [hasConsent, isClarityReady]);

  const setTag = useCallback((key: string, value: string) => {
    if (hasConsent && window.clarity && isClarityReady) {
      window.clarity('set', key, value);
    }
  }, [hasConsent, isClarityReady]);

  const identifyUser = useCallback((userId: string) => {
    if (hasConsent && window.clarity && isClarityReady) {
      window.clarity('identify', userId);
    }
  }, [hasConsent, isClarityReady]);

  const grantConsent = useCallback(() => {
    if (window.clarity && isClarityReady) {
      window.clarity('consentV2', { analytics_Storage: 'granted' });
    }
    localStorage.setItem('clarity_consent', 'granted');
    setHasConsent(true);
    if (!isInitialized) {
      initializeClarity();
    }
  }, [isClarityReady, isInitialized, initializeClarity]);

  const revokeConsent = useCallback(() => {
    if (window.clarity && isClarityReady) {
      window.clarity('consentV2', { analytics_Storage: 'denied' });
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
