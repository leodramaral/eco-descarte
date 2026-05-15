import { toast } from "sonner";

export function showToast(
  type: "success" | "error" | "info",
  message: string,
  description?: string
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
  showToast("success", "🌱 Anúncio publicado!", "Seu item agora está visível no catálogo.");
}

export function showItemSavedToast() {
  showToast("success", "⭐ Item salvo!", "Adicionado aos seus favoritos.");
}

export function showItemRemovedToast() {
  showToast("info", "📌 Item removido", "Removido dos seus favoritos.");
}

export function showContactStartedToast() {
  showToast("success", "💬 Contato iniciado!", "Redirecionando para o WhatsApp...");
}

export function showLoginSuccessToast(name: string) {
  showToast("success", "Bem-vindo!", `Olá, ${name}! Você está logado.`);
}

export function showLogoutToast() {
  showToast("info", "Até logo!", "Você saiu do Recolhe Aí.");
}

export function showRegistrationSuccessToast() {
  showToast("success", "🎉 Cadastro realizado!", "Bem-vindo ao Recolhe Aí!");
}

export function showImpactNudge(impact: { wasteAvoided: number; itemsDiscarded: number }) {
  const messages = [
    `🌿 Você evitou ${impact.wasteAvoided}kg de resíduos!`,
    `⭐ ${impact.itemsDiscarded} itens descartados com sucesso!`,
    `🏆 Continue assim, você está salvando o planeta!`,
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