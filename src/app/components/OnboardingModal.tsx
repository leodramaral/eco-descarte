import { X, Leaf, PackageOpen, Users, Award } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ONBOARDING_STEPS = [
  {
    icon: <PackageOpen className="w-12 h-12 text-brand-primary-strong" />,
    title: "Bem-vindo ao Recolhe Aí!",
    description: "A plataforma que conecta quem quer descartar itens com quem pode reaproveitá-los de forma consciente.",
  },
  {
    icon: <Leaf className="w-12 h-12 text-brand-accent" />,
    title: "Impacto Ambiental",
    description: "Cada item descartado corretamente evita resíduos no meio ambiente e ajuda a economia circular.",
  },
  {
    icon: <Users className="w-12 h-12 text-brand-earth" />,
    title: "Comunidade Conectada",
    description: "Encontre pessoas na sua região prontas para coletar ou doar seus itens usados.",
  },
  {
    icon: <Award className="w-12 h-12 text-brand-primary-strong" />,
    title: "Conquistas e Progresso",
    description: "Acompanhe seu impacto, desbloqueie badges e veja como você está salvando o planeta!",
  },
];

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          aria-label="Pular onboarding"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="surface-soft flex h-20 w-20 items-center justify-center rounded-2xl">
            {ONBOARDING_STEPS[currentStep].icon}
          </div>
        </div>

        {/* Content */}
        <h2 className="text-xl font-bold text-center text-[#201814] mb-3">
          {ONBOARDING_STEPS[currentStep].title}
        </h2>
        <p className="text-sm text-center text-[#655b53] leading-relaxed mb-8">
          {ONBOARDING_STEPS[currentStep].description}
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {ONBOARDING_STEPS.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentStep ? "bg-brand-primary-strong" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 rounded-xl py-3 font-medium text-[#7e7369] transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            Pular
          </button>
          <button
            onClick={handleNext}
            className="flex-1 cta-primary rounded-xl py-3 font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            {currentStep === ONBOARDING_STEPS.length - 1 ? "Começar!" : "Próximo"}
          </button>
        </div>
      </div>
    </div>
  );
}