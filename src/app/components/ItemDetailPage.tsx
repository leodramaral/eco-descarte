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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { ITEMS, USERS } from "../data/mockData";

export function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  const item = ITEMS.find((i) => i.id === id);
  const user = item ? USERS.find((u) => u.id === item.userId) : null;

  if (!item || !user) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">Item não encontrado.</p>
        <button onClick={() => navigate("/")} className="mt-4 text-green-600" style={{ fontWeight: 600 }}>
          Voltar ao início
        </button>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Olá, tenho interesse no item anunciado.");
    window.open(`https://wa.me/${user.phone}?text=${message}`, "_blank");
  };

  const categoryLabel: Record<string, string> = {
    moveis: "Móveis",
    geladeiras: "Geladeiras",
    tvs: "TVs",
    eletrodomesticos: "Eletrodomésticos",
    outros: "Outros",
  };

  return (
    <div className="pb-28">
      {/* Back Button */}
      <div className="px-4 pt-4 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-600"
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
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.type === "doacao"
                ? "bg-green-500 text-white"
                : "bg-blue-500 text-white"
            }`}
            style={{ fontWeight: 700 }}
          >
            {item.type === "doacao" ? "🎁 Doação" : `💰 R$ ${item.price}`}
          </span>
          {item.urgent && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm" style={{ fontWeight: 700 }}>
              🔥 Retirar hoje
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
            <h1 className="text-gray-900 flex-1 pr-2" style={{ fontSize: "1.2rem" }}>{item.name}</h1>
            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-lg flex-shrink-0">
              {categoryLabel[item.category]}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <MapPin className="w-4 h-4 text-green-500" />
            <span className="text-sm">{item.neighborhood} • {item.distance}km de você</span>
            <span className="text-gray-300">•</span>
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">{item.postedAt}</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h3 className="text-gray-800 mb-2">Descrição</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h3 className="text-gray-800 mb-3">Detalhes do item</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Tempo de uso</p>
                <p className="text-sm text-gray-700" style={{ fontWeight: 500 }}>{item.timeOfUse}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Package className="w-4 h-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Material</p>
                <p className="text-sm text-gray-700" style={{ fontWeight: 500 }}>{item.material}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Ruler className="w-4 h-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Peso</p>
                <p className="text-sm text-gray-700" style={{ fontWeight: 500 }}>{item.weight}kg</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Ruler className="w-4 h-4 text-green-500 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Dimensões (cm)</p>
                <p className="text-sm text-gray-700" style={{ fontWeight: 500 }}>
                  {item.dimensions.height}×{item.dimensions.width}×{item.dimensions.depth}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logistics */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h3 className="text-gray-800 mb-3">Logística</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.transport === "entrega" ? "bg-blue-50" : "bg-amber-50"
                }`}
              >
                {item.transport === "entrega" ? (
                  <Truck className="w-5 h-5 text-blue-600" />
                ) : (
                  <MapPin className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-800" style={{ fontWeight: 600 }}>
                  {item.transport === "entrega" ? "Expositor entrega" : "Receptor busca"}
                </p>
                <p className="text-xs text-gray-500">
                  {item.transport === "entrega"
                    ? "O anunciante pode entregar"
                    : "Você precisa ir buscar no local"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  item.fitsInCar ? "bg-green-50" : "bg-gray-50"
                }`}
              >
                {item.fitsInCar ? (
                  <Car className="w-5 h-5 text-green-600" />
                ) : (
                  <Truck className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-800" style={{ fontWeight: 600 }}>
                  {item.fitsInCar ? "Cabe em carro" : "Transporte necessário"}
                </p>
                <p className="text-xs text-gray-500">
                  {item.fitsInCar
                    ? "Pode ser transportado em um carro comum"
                    : "Necessário caminhão, van ou moto-frete"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h3 className="text-gray-800 mb-3">Localização</h3>
          <div className="rounded-xl overflow-hidden relative bg-green-50 h-32 flex items-center justify-center border border-green-100">
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, #15803d 0px, transparent 1px, transparent 40px, #15803d 40px), repeating-linear-gradient(90deg, #15803d 0px, transparent 1px, transparent 40px, #15803d 40px)`,
              }}
            />
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-green-700" style={{ fontWeight: 600 }}>
                {item.neighborhood}, Manaus
              </span>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="w-5 h-5 text-green-600" />
            <h3 className="text-green-800">Impacto Ambiental</h3>
          </div>
          <p className="text-green-700 text-sm">
            🌱 Este item pode evitar o descarte de{" "}
            <span style={{ fontWeight: 700 }}>{item.wasteWeight}kg de resíduos</span> no meio
            ambiente.
          </p>
        </div>

        {/* User Section */}
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <h3 className="text-gray-800 mb-3">Anunciante</h3>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user.photo}
              alt={user.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-green-200"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <p className="text-gray-900" style={{ fontWeight: 700 }}>{user.name}</p>
                {user.verified && (
                  <span className="flex items-center gap-0.5 bg-blue-50 text-blue-600 text-xs px-1.5 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                    <CheckCircle className="w-3 h-3" /> Verificado
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-700" style={{ fontWeight: 600 }}>
                    {user.rating}
                  </span>
                  <span className="text-xs text-gray-400">({user.reviewCount} avaliações)</span>
                </div>
              </div>
              {user.respondsQuickly && (
                <div className="flex items-center gap-1 mt-1">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  <span className="text-xs text-yellow-600" style={{ fontWeight: 500 }}>
                    Responde rápido
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center bg-gray-50 rounded-lg p-2">
              <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{user.itemsDiscarded}</p>
              <p className="text-gray-400 text-xs">Descartados</p>
            </div>
            <div className="text-center bg-gray-50 rounded-lg p-2">
              <p className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>{user.itemsCollected}</p>
              <p className="text-gray-400 text-xs">Coletados</p>
            </div>
            <div className="text-center bg-green-50 rounded-lg p-2">
              <p className="text-green-700 text-sm" style={{ fontWeight: 700 }}>{user.wasteAvoided}kg</p>
              <p className="text-green-500 text-xs">Resíduos evitados</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {user.badges.slice(0, 4).map((badge) => (
              <span
                key={badge.id}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${badge.color}`}
                style={{ fontWeight: 600 }}
              >
                {badge.icon} {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Protected Notice */}
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
          <Shield className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-500">Contato protegido — O número só é compartilhado via WhatsApp</span>
        </div>
      </div>

      {/* Sticky WhatsApp CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-3">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleWhatsApp}
            className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl transition-all"
            style={{ fontWeight: 700, fontSize: "1rem" }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Falar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
