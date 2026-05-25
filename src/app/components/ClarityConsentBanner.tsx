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
              Privacidade e Dados de Uso
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200 leading-relaxed">
              Este sistema é um projeto acadêmico desenvolvido para a disciplina de{' '}
              <strong>Design Thinking</strong>, do curso de{' '}
              <strong>Análise e Desenvolvimento de Sistemas</strong> do{' '}
              <strong>CIESA</strong>, sem fins lucrativos. Utilizamos o Microsoft
              Clarity para gravar sessões de navegação e gerar mapas de calor, com o
              objetivo de analisar a usabilidade e melhorar a experiência do usuário.
              Nenhum dado pessoal é comercializado ou compartilhado com terceiros. Ao
              continuar, você concorda com essa coleta para fins exclusivamente
              acadêmicos.
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
