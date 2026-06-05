import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  Star,
  CheckCircle,
  MapPin,
  Truck,
  Car,
  Clock,
  Ruler,
  Package,
  Leaf,
  Shield,
  Zap,
  MessageCircle,
  Heart,
  Eye,
} from "lucide-react";
import {
  IconGift,
  IconCoin,
  IconFlame,
  IconSeedling,
} from "@tabler/icons-react";
import { BADGE_ICONS } from "../data/mockData";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { normalizePhone } from "../utils/phone";
import { getBadgeChipClassName } from "../utils/badgeStyles";
import { useClarityEvents } from "./clarity/events";
import { showContactStartedToast } from "../utils/toast";
import { toggleFavorite } from "../store/appSlice";

export function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, users, favoriteItems } = useAppSelector((state) => state.appData);
  const [currentImage, setCurrentImage] = useState(0);
  const { page_view_item_detail, contact_whatsapp_click, item_profile_click, item_detail_view } = useClarityEvents();

  const item = items.find((candidate) => candidate.id === id);
  const user = item ? users.find((candidate) => candidate.id === item.userId) ?? null : null;
  const isFavorite = favoriteItems?.includes(item?.id ?? "") ?? false;

  if (!item || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">Item não encontrado.</p>
        <button onClick={() => navigate("/")} className="mt-4 text-brand" style={{ fontWeight: 600 }}>
          Voltar ao início
        </button>
      </div>
    );
  }

  useEffect(() => {
    page_view_item_detail(item.id, item.category);
  }, []);

  const categoryLabel: Record<string, string> = {
    moveis: "Móveis",
    geladeiras: "Geladeiras",
    tvs: "TVs",
    eletrodomesticos: "Eletrodomésticos",
    outros: "Outros",
  };

  const whatsappMessage = encodeURIComponent(
    `Olá, vi o anúncio de ${item.name} no Recolhe Aí e gostaria de combinar a retirada.`
  );
  const whatsappUrl = `https://wa.me/${normalizePhone(user.phone)}?text=${whatsappMessage}`;

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(item.id));
  };

  const handleWhatsAppClick = () => {
    contact_whatsapp_click(item.id, user.id);
    showContactStartedToast();
  };

  return (
    <div className="pb-28">
      {/* Back Button */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded px-2 py-1"
          aria-label="Voltar para página anterior"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Voltar</span>
        </button>
      </div>

      {/* Image Gallery */}
      <div className="relative mx-4 rounded-2xl overflow-hidden bg-gray-200 mb-4">
        <img
          src={item.images[currentImage]}
          alt={item.name}
          className="w-full h-64 object-cover"
        />
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {isFavorite ? (
            <Heart className="w-5 h-5 fill-brand-accent text-brand-accent" />
          ) : (
            <Heart className="w-5 h-5 text-gray-600" />
          )}
        </button>
        {/* View Count Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 rounded-full px-2.5 py-1 shadow-md">
          <Eye className="w-3 h-3 text-[#7e7369]" />
          <span className="text-xs font-semibold text-[#2a211c]">
            {Math.floor(Math.random() * 200) + 20}
          </span>
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`rounded-full px-3 py-1 text-sm ${
              item.type === "doacao" ? "tone-donation" : "tone-paid"
            }`}
            style={{ fontWeight: 700 }}
          >
            {item.type === "doacao" ? <span className="flex items-center gap-1"><IconGift size={14} /> Doação</span> : <span className="flex items-center gap-1"><IconCoin size={14} /> R$ {item.price}</span>}
          </span>
          {item.urgent && (
            <span className="tone-urgent rounded-full px-3 py-1 text-sm flex items-center gap-1" style={{ fontWeight: 700 }}>
              <IconFlame size={14} /> Retirar hoje
            </span>
          )}
        </div>
        {item.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {item.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentImage ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Item Info */}
      <div className="px-4 space-y-4">
        {/* Title & Location */}
        <div>
          <div className="flex items-start justify-between mb-1">
            <h1 className="flex-1 pr-2 text-[#201814]" style={{ fontSize: "1.2rem" }}>{item.name}</h1>
            <span className="surface-earth flex-shrink-0 rounded-lg px-2 py-1 text-xs text-brand-earth">
              {categoryLabel[item.category]}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[#7e7369]">
            <MapPin className="h-4 w-4 text-brand-primary" />
            <span className="text-sm">{item.neighborhood} • {item.distance}km de você</span>
            <span className="text-[#c1b6ab]">•</span>
            <Clock className="h-3.5 w-3.5 text-[#9a9188]" />
            <span className="text-xs text-[#9a9188]">{item.postedAt}</span>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-xl border border-border bg-white p-4 shadow-[0_10px_28px_rgba(56,45,34,0.05)]">
          <h3 className="mb-2 text-[#2a211c]">Descrição</h3>
          <p className="text-sm leading-relaxed text-[#655b53]">{item.description}</p>
        </div>

        {/* Details */}
        <div className="rounded-xl border border-border bg-white p-4 shadow-[0_10px_28px_rgba(56,45,34,0.05)]">
          <h3 className="mb-3 text-[#2a211c]">Detalhes do item</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <Clock className="mt-0.5 h-4 w-4 text-brand-primary" />
              <div>
                <p className="text-xs text-[#9a9188]">Tempo de uso</p>
                <p className="text-sm text-[#584d45]" style={{ fontWeight: 500 }}>{item.timeOfUse}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Package className="mt-0.5 h-4 w-4 text-brand-earth" />
              <div>
                <p className="text-xs text-[#9a9188]">Material</p>
                <p className="text-sm text-[#584d45]" style={{ fontWeight: 500 }}>{item.material}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Ruler className="mt-0.5 h-4 w-4 text-brand-primary" />
              <div>
                <p className="text-xs text-[#9a9188]">Peso</p>
                <p className="text-sm text-[#584d45]" style={{ fontWeight: 500 }}>{item.weight}kg</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Ruler className="mt-0.5 h-4 w-4 text-brand-earth" />
              <div>
                <p className="text-xs text-[#9a9188]">Dimensões (cm)</p>
                <p className="text-sm text-[#584d45]" style={{ fontWeight: 500 }}>
                  {item.dimensions.height}×{item.dimensions.width}×{item.dimensions.depth}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logistics */}
        <div className="rounded-xl border border-border bg-white p-4 shadow-[0_10px_28px_rgba(56,45,34,0.05)]">
          <h3 className="mb-3 text-[#2a211c]">Logística</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  item.transport === "entrega" ? "surface-earth" : "surface-accent"
                }`}
              >
                {item.transport === "entrega" ? (
                  <Truck className="h-5 w-5 text-brand-earth" />
                ) : (
                  <MapPin className="h-5 w-5 text-brand-accent" />
                )}
              </div>
              <div>
                <p className="text-sm text-[#2a211c]" style={{ fontWeight: 600 }}>
                  {item.transport === "entrega" ? "Anunciante entrega" : "Coletor busca"}
                </p>
                <p className="text-xs text-[#7e7369]">
                  {item.transport === "entrega"
                    ? "O anunciante pode entregar"
                    : "Você precisa ir buscar no local"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  item.fitsInCar ? "surface-soft" : "surface-earth"
                }`}
              >
                {item.fitsInCar ? (
                  <Car className="h-5 w-5 text-brand-primary-strong" />
                ) : (
                  <Truck className="h-5 w-5 text-brand-earth" />
                )}
              </div>
              <div>
                <p className="text-sm text-[#2a211c]" style={{ fontWeight: 600 }}>
                  {item.fitsInCar ? "Cabe em carro" : "Transporte necessário"}
                </p>
                <p className="text-xs text-[#7e7369]">
                  {item.fitsInCar
                    ? "Pode ser transportado em um carro comum"
                    : "Necessário caminhão, van ou moto-frete"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="rounded-xl border border-border bg-white p-4 shadow-[0_10px_28px_rgba(56,45,34,0.05)]">
          <h3 className="mb-3 text-[#2a211c]">Localização</h3>
          <div className="surface-soft relative flex h-32 items-center justify-center overflow-hidden rounded-xl">
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, var(--brand-primary) 0px, transparent 1px, transparent 40px, var(--brand-primary) 40px), repeating-linear-gradient(90deg, var(--brand-earth) 0px, transparent 1px, transparent 40px, var(--brand-earth) 40px)",
              }}
            />
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="brand-mark flex h-10 w-10 items-center justify-center rounded-full">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-brand" style={{ fontWeight: 600 }}>
                {item.neighborhood}, Manaus
              </span>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="impact-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="h-5 w-5 text-brand-primary-strong" />
            <h3 className="text-brand">Impacto Ambiental</h3>
          </div>
          <p className="text-sm text-[#4d6f46]">
            <span className="inline-flex items-center gap-1"><IconSeedling size={16} /> Este item pode evitar o descarte de{" "}</span>
            <span style={{ fontWeight: 700 }}>{item.wasteWeight}kg de resíduos</span> no meio
            ambiente.
          </p>
        </div>

        {/* User Section */}
        <div
          onClick={() => {
            item_profile_click(item.id, user.id);
            navigate(`/profile/${user.id}`);
          }}
          className="cursor-pointer rounded-xl border border-border bg-white p-4 shadow-[0_10px_28px_rgba(56,45,34,0.05)]"
          <h3 className="mb-3 text-[#2a211c]">Anunciante</h3>
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/profile/${user.id}`);
              }}
              className="rounded-full cursor-pointer"
              aria-label={`Ver perfil de ${user.name}`}
            >
              <img
                src={user.photo}
                alt={user.name}
                className="h-14 w-14 rounded-full border-2 border-brand-primary-soft object-cover"
              />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <p className="text-[#201814]" style={{ fontWeight: 700 }}>{user.name}</p>
                {user.verified && (
                  <span className="chip-earth px-1.5 py-0.5 text-xs" style={{ fontWeight: 600 }}>
                    <CheckCircle className="w-3 h-3" /> Verificado
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-brand-accent text-brand-accent" />
                  <span className="text-sm text-[#584d45]" style={{ fontWeight: 600 }}>
                    {user.rating}
                  </span>
                  <span className="text-xs text-[#9a9188]">({user.reviewCount} avaliações)</span>
                </div>
              </div>
              {user.respondsQuickly && (
                <div className="flex items-center gap-1 mt-1">
                  <Zap className="h-3 w-3 text-brand-accent" />
                  <span className="text-xs text-accent" style={{ fontWeight: 500 }}>
                    Responde rápido
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="rounded-lg bg-[#faf7f2] p-2 text-center">
              <p className="text-sm text-[#2a211c]" style={{ fontWeight: 700 }}>{user.itemsDiscarded}</p>
              <p className="text-xs text-[#9a9188]">Descartados</p>
            </div>
            <div className="rounded-lg bg-[#faf7f2] p-2 text-center">
              <p className="text-sm text-[#2a211c]" style={{ fontWeight: 700 }}>{user.itemsCollected}</p>
              <p className="text-xs text-[#9a9188]">Coletados</p>
            </div>
            <div className="surface-soft rounded-lg p-2 text-center">
              <p className="text-sm text-brand" style={{ fontWeight: 700 }}>{user.wasteAvoided}kg</p>
              <p className="text-xs text-[#4d6f46]">Resíduos evitados</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {user.badges.slice(0, 4).map((badge) => (
              <span
                key={badge.id}
                className={`${getBadgeChipClassName(badge.color)} px-2 py-1 text-xs`}
                style={{ fontWeight: 600 }}
              >
                {(() => { const BIcon = BADGE_ICONS[badge.icon]; return BIcon ? <><BIcon size={12} /> {badge.label}</> : badge.label; })()}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Protected Notice */}
        <div className="surface-earth flex items-center gap-2 rounded-xl px-4 py-3">
          <Shield className="h-4 w-4 text-brand-earth" />
          <span className="text-xs text-brand-earth">Contato protegido — O número só é compartilhado quando você iniciar o contato</span>
        </div>
      </div>

      {/* Sticky Contact CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-3">
        <div className="max-w-2xl mx-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsAppClick}
            className="cta-primary flex w-full items-center justify-center gap-3 rounded-2xl py-4 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            style={{ fontWeight: 700, fontSize: "1rem" }}
            aria-label="Entrar em contato pelo WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
