import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Star,
  CheckCircle,
  Zap,
  Leaf,
  Package,
  Truck,
  ChevronRight,
  MapPin,
  Edit3,
  Phone,
  Calendar,
} from "lucide-react";
import { CURRENT_USER, ITEMS, USERS } from "../data/mockData";
import { AchievementBadge } from "./AchievementBadge";

type Tab = "descartando" | "historico" | "conquistas";

function formatPhoneForDisplay(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.length < 10) return phone;

  const localNumber = digits.slice(-11);
  const countryCode = digits.slice(0, -11);
  const ddd = localNumber.slice(0, 2);
  const prefix = localNumber.slice(2, 7);
  const suffix = localNumber.slice(7);

  return `${countryCode ? `+${countryCode} ` : ""}(${ddd}) ${prefix.slice(0, 2)}***-${suffix}`;
}

export function UserProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>("descartando");

  const user = id ? USERS.find((candidate) => candidate.id === id) ?? null : CURRENT_USER;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
        <p className="text-gray-500">Perfil não encontrado.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-green-600"
          style={{ fontWeight: 600 }}
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  const userItems = ITEMS.filter((item) => item.userId === user.id);
  const activeItems = userItems.filter((_, i) => i === 0);
  const historyItems = userItems.slice(1);
  const discardedItemsCount = historyItems.length;
  const collectedItemsCount = 0;
  const wasteAvoidedKg = historyItems.reduce((total, item) => total + item.wasteWeight, 0);
  const superEcoProgress = Math.min((discardedItemsCount / 20) * 100, 100);
  const formattedPhone = formatPhoneForDisplay(user.phone);
  const userNeighborhoods = [...new Set(userItems.map((item) => item.neighborhood))];
  const neighborhoodsSummary =
    userNeighborhoods.length <= 2
      ? userNeighborhoods.join(" • ")
      : `${userNeighborhoods.slice(0, 2).join(" • ")} +${userNeighborhoods.length - 2}`;

  const TABS: { value: Tab; label: string }[] = [
    { value: "descartando", label: "Ativos" },
    { value: "historico", label: "Histórico" },
    { value: "conquistas", label: "Conquistas" },
  ];

  return (
    <div className="pb-8">
      {/* Profile Header */}
      <div className="px-4 pt-5">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-[72px] h-[72px] rounded-full object-cover border-3 border-white shadow-lg ring-2 ring-gray-100"
                  style={{ borderWidth: 3 }}
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <div>
                <h2 className="text-gray-900 leading-tight" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                  {user.name}
                </h2>
                <p className="text-gray-500 text-xs mt-0.5">Perfil público</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  {user.verified && (
                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full" style={{ fontWeight: 600 }}>
                      <CheckCircle className="w-3 h-3" /> Conta verificada
                    </span>
                  )}
                  {user.respondsQuickly && (
                    <span className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-2 py-1 rounded-full" style={{ fontWeight: 600 }}>
                      <Zap className="w-3 h-3" /> Responde rápido
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
              <Edit3 className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 mb-3">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-gray-800 text-sm" style={{ fontWeight: 700 }}>
                {user.rating.toFixed(1)}
              </span>
              <span className="text-gray-500 text-xs">({user.reviewCount} avaliações)</span>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Membro desde {user.memberSince}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span>{formattedPhone}</span>
            </div>
            {neighborhoodsSummary && (
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>Atua em {neighborhoodsSummary}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <Package className="w-4 h-4 text-blue-600" />
                <p className="text-gray-800" style={{ fontWeight: 700 }}>
                  {discardedItemsCount}
                </p>
              </div>
              <p className="text-gray-500 text-xs">Itens descartados</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Papel Anunciante</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                <p className="text-gray-800" style={{ fontWeight: 700 }}>
                  {collectedItemsCount}
                </p>
              </div>
              <p className="text-gray-500 text-xs">Itens coletados</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <Package className="w-4 h-4 text-gray-600" />
                <p className="text-gray-800" style={{ fontWeight: 700 }}>
                  {activeItems.length}
                </p>
              </div>
              <p className="text-gray-500 text-xs">Anúncios ativos</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <div className="flex items-center justify-between mb-1.5">
                <Star className="w-4 h-4 text-gray-600" />
                <p className="text-gray-800" style={{ fontWeight: 700 }}>
                  {user.badges.length}
                </p>
              </div>
              <p className="text-gray-500 text-xs">Conquistas</p>
            </div>

            <div className="col-span-2 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-green-700" />
                  </div>
                  <div>
                    <p className="text-green-800 text-xs" style={{ fontWeight: 700 }}>
                      Resíduos evitados
                    </p>
                    <p className="text-green-700 text-[11px]">Seu maior impacto ambiental</p>
                  </div>
                </div>
                <p className="text-green-800" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                  {wasteAvoidedKg}kg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-4">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                activeTab === tab.value
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500"
              }`}
              style={{ fontWeight: activeTab === tab.value ? 600 : 400 }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 mt-4">
        {activeTab === "descartando" && (
          <div>
            {activeItems.length === 0 ? (
              <div className="text-center py-10">
                <div className="text-4xl mb-3">📦</div>
                <p className="text-gray-500 text-sm">Nenhum item ativo no momento</p>
                <button
                  onClick={() => navigate("/add")}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl text-sm"
                  style={{ fontWeight: 600 }}
                >
                  Anunciar item
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {activeItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/item/${item.id}`)}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden flex cursor-pointer active:scale-95 transition-transform"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-24 h-24 object-cover flex-shrink-0"
                    />
                    <div className="p-3 flex-1">
                      <p className="text-gray-800 text-sm mb-1" style={{ fontWeight: 600 }}>{item.name}</p>
                      <div className="flex items-center gap-1 mb-1.5">
                        <MapPin className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-gray-400">{item.neighborhood}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            item.type === "doacao"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                          style={{ fontWeight: 600 }}
                        >
                          {item.type === "doacao" ? "Doação" : `R$ ${item.price}`}
                        </span>
                        {item.urgent && (
                          <span className="text-xs text-orange-500" style={{ fontWeight: 600 }}>🔥 Urgente</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center pr-3">
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => navigate("/add")}
                  className="w-full border-2 border-dashed border-green-300 rounded-xl py-4 flex flex-col items-center gap-1 text-green-600"
                >
                  <span className="text-xl">+</span>
                  <span className="text-sm" style={{ fontWeight: 600 }}>Anunciar novo item</span>
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "historico" && (
          <div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2" style={{ fontWeight: 600 }}>
                📦 Histórico de anúncios
              </p>
              {historyItems.length > 0 ? (
                <div className="space-y-2">
                  {historyItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/item/${item.id}`)}
                      className="bg-white rounded-xl border border-gray-100 overflow-hidden flex cursor-pointer active:scale-95 transition-transform"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover flex-shrink-0 opacity-80"
                      />
                      <div className="p-3 flex-1">
                        <p className="text-gray-700 text-sm mb-0.5" style={{ fontWeight: 600 }}>{item.name}</p>
                        <div className="flex items-center gap-1 mb-1">
                          <MapPin className="w-3 h-3 text-gray-300" />
                          <span className="text-xs text-gray-400">{item.neighborhood}</span>
                        </div>
                        <span className="text-xs text-gray-400">{item.postedAt}</span>
                      </div>
                      <div className="flex flex-col items-end justify-center px-3 gap-1">
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full" style={{ fontWeight: 500 }}>
                          Concluído
                        </span>
                        <span className="text-xs text-green-600" style={{ fontWeight: 600 }}>
                          -{item.wasteWeight}kg
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm text-center py-4">Nenhum histórico ainda</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2" style={{ fontWeight: 600 }}>
                🚚 Itens coletados
              </p>
              <p className="text-gray-400 text-sm text-center py-4">Nenhum item coletado ainda</p>
            </div>
          </div>
        )}

        {activeTab === "conquistas" && (
          <div>
            <p className="text-gray-500 text-sm mb-4">
              Continue engajado para desbloquear mais conquistas! 🏆
            </p>
            <div className="grid grid-cols-3 gap-4">
              {user.badges.map((badge) => (
                <AchievementBadge
                  key={badge.id}
                  icon={badge.icon}
                  label={badge.label}
                  color={badge.color}
                  unlocked={true}
                  description={badge.description}
                />
              ))}
              {user.badgesLocked?.map((badge) => (
                <AchievementBadge
                  key={badge.id}
                  icon={badge.icon}
                  label={badge.label}
                  color={badge.color}
                  unlocked={false}
                  description={badge.description}
                />
              ))}
            </div>
            {/* Progress */}
            <div className="mt-5 bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-gray-700 mb-3" style={{ fontWeight: 600 }}>Seu progresso</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Super Eco (20 descartes)</span>
                    <span style={{ fontWeight: 600 }}>{user.itemsDiscarded}/20</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${(user.itemsDiscarded / 20) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>5 Estrelas (50 avaliações)</span>
                    <span style={{ fontWeight: 600 }}>{user.reviewCount}/50</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${(user.reviewCount / 50) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Mestre do Descarte (500kg)</span>
                    <span style={{ fontWeight: 600 }}>{user.wasteAvoided}/500kg</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all"
                      style={{ width: `${(user.wasteAvoided / 500) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
