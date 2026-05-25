import type { ReactNode } from "react";
import { toast } from "sonner";
import {
  IconSeedling,
  IconStar,
  IconPin,
  IconMessage,
  IconConfetti,
  IconPlant2,
  IconTrophy,
} from "@tabler/icons-react";

export function showToast(
  type: "success" | "error" | "info",
  message: ReactNode,
  description?: ReactNode
) {
  switch (type) {
    case "success":
      toast.success(message, {
        description,
        position: "bottom-center",
        duration: 3000,
      });
      break;
    case "error":
      toast.error(message, {
        description,
        position: "bottom-center",
        duration: 4000,
      });
      break;
    case "info":
      toast.info(message, {
        description,
        position: "bottom-center",
        duration: 2500,
      });
      break;
  }
}

export function showItemPublishedToast() {
  showToast("success", <span className="flex items-center gap-1.5"><IconSeedling size={16} /> Anúncio publicado!</span>, "Seu item agora está visível no catálogo.");
}

export function showItemSavedToast() {
  showToast("success", <span className="flex items-center gap-1.5"><IconStar size={16} /> Item salvo!</span>, "Adicionado aos seus favoritos.");
}

export function showItemRemovedToast() {
  showToast("info", <span className="flex items-center gap-1.5"><IconPin size={16} /> Item removido</span>, "Removido dos seus favoritos.");
}

export function showContactStartedToast() {
  showToast("success", <span className="flex items-center gap-1.5"><IconMessage size={16} /> Contato iniciado!</span>, "Redirecionando para o WhatsApp...");
}

export function showLoginSuccessToast(name: string) {
  showToast("success", "Bem-vindo!", `Olá, ${name}! Você está logado.`);
}

export function showLogoutToast() {
  showToast("info", "Até logo!", "Você saiu do Recolhe Aí.");
}

export function showRegistrationSuccessToast() {
  showToast("success", <span className="flex items-center gap-1.5"><IconConfetti size={16} /> Cadastro realizado!</span>, "Bem-vindo ao Recolhe Aí!");
}

export function showImpactNudge(impact: { wasteAvoided: number; itemsDiscarded: number }) {
  const messages: ReactNode[] = [
    <span key="1" className="flex items-center gap-1.5"><IconPlant2 size={16} /> Você evitou {impact.wasteAvoided}kg de resíduos!</span>,
    <span key="2" className="flex items-center gap-1.5"><IconStar size={16} /> {impact.itemsDiscarded} itens descartados com sucesso!</span>,
    <span key="3" className="flex items-center gap-1.5"><IconTrophy size={16} /> Continue assim, você está salvando o planeta!</span>,
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  toast.info("Seu impacto ambiental", {
    description: randomMessage,
    position: "top-center",
    duration: 5000,
    action: {
      label: "Ver perfil",
      onClick: () => window.location.href = "/profile",
    },
  });
}
