import { useState, useEffect } from 'react';
import { useClarityContext } from './ClarityProvider';
import { Button } from './ui/button';
import { Card } from './ui/card';

export const ClarityConsentBanner = () => {
  const { grantConsent, revokeConsent } = useClarityContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('clarity_consent');
    if (!consent) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    }
  }, []);

  const handleAcceptAll = () => {
    grantConsent();
    handleHide();
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('clarity_consent', 'essential');
    handleHide();
  };

  const handleReject = () => {
    revokeConsent();
    handleHide();
  };

  const handleHide = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 transition-all duration-300 ${
      isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <Card className="max-w-2xl mx-auto p-4 md:p-6 bg-gradient-to-br from-green-50 to-amber-50 dark:from-green-950/50 dark:to-amber-950/50 border-2 border-green-200 dark:border-green-800 shadow-xl">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
              Privacidade e Cookies
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
              Usamos cookies para melhorar sua experiência e analisar o uso do app. 
              Ao continuar, você concorda com nossa política de privacidade.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              onClick={handleAcceptAll}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium shadow-md transition-all duration-200 hover:scale-105"
            >
              Aceitar tudo
            </Button>
            <Button
              onClick={handleAcceptEssential}
              variant="outline"
              className="flex-1 border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800 font-medium transition-all duration-200"
            >
              Apenas essencial
            </Button>
            <Button
              onClick={handleReject}
              variant="ghost"
              className="flex-1 text-green-700 hover:text-green-900 hover:bg-green-100/50 font-medium transition-all duration-200"
            >
              Rejeitar
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
