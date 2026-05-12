import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
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
  LogOut,
} from "lucide-react";
import { logout } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { formatPhoneForMask } from "../utils/phone";
import { AchievementBadge } from "./AchievementBadge";
import { useClarityEvents } from "./clarity/events";

type Tab = "descartando" | "historico" | "conquistas";

export function UserProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { currentUserId, items, users } = useAppSelector((state) => state.appData);
  const [activeTab, setActiveTab] = useState<Tab>("descartando");
  const currentUser = users.find((candidate) => candidate.id === currentUserId) ?? null;
  const isOwnProfile = !id || id === currentUser?.id;
  const { profile_tab_change } = useClarityEvents();

  if (!id && !currentUser) {
    return <Navigate to="/login?next=%2Fprofile" replace />;
  }

  const user = id ? users.find((candidate) => candidate.id === id) ?? null : currentUser;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
        <p className="text-gray-500">Perfil não encontrado.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-brand"
          style={{ fontWeight: 600 }}
        >
          Voltar ao início
        </button>
      </div>
    );
  }

  const userItems = items.filter((item) => item.userId === user.id);
  const activeItems = userItems;
  const historyItems: typeof userItems = [];
  const discardedItemsCount = user.itemsDiscarded;
  const collectedItemsCount = user.itemsCollected;
  const wasteAvoidedKg = user.wasteAvoided;
  const superEcoProgress = Math.min((discardedItemsCount / 20) * 100, 100);
  const formattedPhone = formatPhoneForMask(user.phone);
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
        <div className="rounded-3xl border border-border bg-white p-4 shadow-[0_18px_38px_rgba(56,45,34,0.08)]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user.photo}
                  alt={user.name}
                  className="h-[72px] w-[72px] rounded-full border-3 border-white object-cover shadow-lg ring-2 ring-[#f0ebe4]"
                  style={{ borderWidth: 3 }}
                />
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-white bg-brand-primary" />
              </div>
              <div>
                <h2 className="leading-tight text-[#201814]" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                  {user.name}
                </h2>
                <p className="mt-0.5 text-xs text-[#8d8379]">Perfil público</p>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  {user.verified && (
                    <span className="chip-earth px-2 py-1 text-xs" style={{ fontWeight: 600 }}>
                      <CheckCircle className="w-3 h-3" /> Conta verificada
                    </span>
                  )}
                  {user.respondsQuickly && (
                    <span className="chip-accent px-2 py-1 text-xs" style={{ fontWeight: 600 }}>
                      <Zap className="w-3 h-3" /> Responde rápido
                    </span>
                  )}
                </div>
              </div>
            </div>
            {isOwnProfile ? (
              <button
                onClick={() => {
                  dispatch(logout());
                  navigate("/", { replace: true });
                }}
                className="surface-earth inline-flex h-9 items-center gap-1 rounded-xl px-3 text-sm text-brand-earth"
                style={{ fontWeight: 600 }}
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            ) : (
              <button className="surface-earth flex h-9 w-9 items-center justify-center rounded-xl">
                <Edit3 className="w-4 h-4 text-brand-earth" />
              </button>
            )}
          </div>

          <div className="mb-3 rounded-xl border border-border bg-[#faf7f2] px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-brand-accent text-brand-accent" />
              <span className="text-sm text-[#2a211c]" style={{ fontWeight: 700 }}>
                {user.rating.toFixed(1)}
              </span>
              <span className="text-xs text-[#8d8379]">({user.reviewCount} avaliações)</span>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2 text-xs text-[#7e7369]">
              <Calendar className="h-3.5 w-3.5 text-[#9a9188]" />
              <span>Membro desde {user.memberSince}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#7e7369]">
              <Phone className="h-3.5 w-3.5 text-[#9a9188]" />
              <span>{formattedPhone}</span>
            </div>
            {neighborhoodsSummary && (
              <div className="flex items-center gap-2 text-xs text-[#7e7369]">
                <MapPin className="h-3.5 w-3.5 text-brand-primary" />
                <span>Atua em {neighborhoodsSummary}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-border bg-[#faf7f2] p-3">
              <div className="flex items-center justify-between mb-1.5">
                <Package className="h-4 w-4 text-brand-earth" />
                <p className="text-[#2a211c]" style={{ fontWeight: 700 }}>
                  {discardedItemsCount}
                </p>
              </div>
              <p className="text-xs text-[#7e7369]">Itens descartados</p>
              <p className="mt-0.5 text-[10px] text-[#a0978d]">Papel Anunciante</p>
            </div>

            <div className="rounded-xl border border-border bg-[#faf7f2] p-3">
              <div className="flex items-center justify-between mb-1.5">
                <Truck className="h-4 w-4 text-brand-accent" />
                <p className="text-[#2a211c]" style={{ fontWeight: 700 }}>
                  {collectedItemsCount}
                </p>
              </div>
              <p className="text-xs text-[#7e7369]">Itens coletados</p>
            </div>

            <div className="rounded-xl border border-border bg-[#faf7f2] p-3">
              <div className="flex items-center justify-between mb-1.5">
                <Package className="h-4 w-4 text-[#7e7369]" />
                <p className="text-[#2a211c]" style={{ fontWeight: 700 }}>
                  {activeItems.length}
                </p>
              </div>
              <p className="text-xs text-[#7e7369]">Anúncios ativos</p>
            </div>

            <div className="rounded-xl border border-border bg-[#faf7f2] p-3">
              <div className="flex items-center justify-between mb-1.5">
                <Star className="h-4 w-4 text-brand-accent" />
                <p className="text-[#2a211c]" style={{ fontWeight: 700 }}>
                  {user.badges.length}
                </p>
              </div>
              <p className="text-xs text-[#7e7369]">Conquistas</p>
            </div>

            <div className="impact-card col-span-2 rounded-xl p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="surface-soft flex h-8 w-8 items-center justify-center rounded-lg">
                    <Leaf className="h-4 w-4 text-brand-primary-strong" />
                  </div>
                  <div>
                    <p className="text-xs text-brand" style={{ fontWeight: 700 }}>
                      Resíduos evitados
                    </p>
                    <p className="text-[11px] text-[#4d6f46]">Seu maior impacto ambiental</p>
                  </div>
                </div>
                <p className="text-brand" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                  {wasteAvoidedKg}kg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-4">
        <div className="flex rounded-xl bg-[#ece5dc] p-1">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setActiveTab(tab.value);
                profile_tab_change(tab.value);
              }}
              className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                activeTab === tab.value
                  ? "bg-white text-brand shadow-sm"
                  : "text-[#7e7369]"
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
                <p className="text-sm text-[#7e7369]">Nenhum item ativo no momento</p>
                <button
                  onClick={() => navigate("/add")}
                  className="cta-primary mt-4 rounded-xl px-6 py-2 text-sm"
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
                    className="flex cursor-pointer overflow-hidden rounded-xl border border-border bg-white transition-transform active:scale-95"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-24 h-24 object-cover flex-shrink-0"
                    />
                    <div className="p-3 flex-1">
                      <p className="mb-1 text-sm text-[#2a211c]" style={{ fontWeight: 600 }}>{item.name}</p>
                      <div className="flex items-center gap-1 mb-1.5">
                        <MapPin className="h-3 w-3 text-brand-primary" />
                        <span className="text-xs text-[#9a9188]">{item.neighborhood}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            item.type === "doacao" ? "chip-brand" : "chip-earth"
                          }`}
                          style={{ fontWeight: 600 }}
                        >
                          {item.type === "doacao" ? "Doação" : `R$ ${item.price}`}
                        </span>
                        {item.urgent && (
                          <span className="text-xs text-accent" style={{ fontWeight: 600 }}>🔥 Urgente</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center pr-3">
                      <ChevronRight className="w-4 h-4 text-[#c8bdb2]" />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => navigate("/add")}
                  className="surface-soft flex w-full flex-col items-center gap-1 rounded-xl border-2 border-dashed border-brand-primary py-4 text-brand"
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
              <p className="mb-2 text-sm text-[#7e7369]" style={{ fontWeight: 600 }}>
                📦 Histórico de anúncios
              </p>
              {historyItems.length > 0 ? (
                <div className="space-y-2">
                  {historyItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/item/${item.id}`)}
                      className="flex cursor-pointer overflow-hidden rounded-xl border border-border bg-white transition-transform active:scale-95"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover flex-shrink-0 opacity-80"
                      />
                      <div className="p-3 flex-1">
                        <p className="mb-0.5 text-sm text-[#584d45]" style={{ fontWeight: 600 }}>{item.name}</p>
                        <div className="flex items-center gap-1 mb-1">
                          <MapPin className="h-3 w-3 text-[#c8bdb2]" />
                          <span className="text-xs text-[#9a9188]">{item.neighborhood}</span>
                        </div>
                        <span className="text-xs text-[#9a9188]">{item.postedAt}</span>
                      </div>
                      <div className="flex flex-col items-end justify-center px-3 gap-1">
                        <span className="surface-earth rounded-full px-2 py-0.5 text-xs text-brand-earth" style={{ fontWeight: 500 }}>
                          Concluído
                        </span>
                        <span className="text-xs text-brand" style={{ fontWeight: 600 }}>
                          -{item.wasteWeight}kg
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-4 text-center text-sm text-[#9a9188]">Nenhum histórico ainda</p>
              )}
            </div>
            <div>
              <p className="mb-2 text-sm text-[#7e7369]" style={{ fontWeight: 600 }}>
                🚚 Itens coletados
              </p>
              <p className="py-4 text-center text-sm text-[#9a9188]">Nenhum item coletado ainda</p>
            </div>
          </div>
        )}

        {activeTab === "conquistas" && (
          <div>
            <p className="mb-4 text-sm text-[#7e7369]">
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
            <div className="mt-5 rounded-xl border border-border bg-white p-4">
              <p className="mb-3 text-sm text-[#584d45]" style={{ fontWeight: 600 }}>Seu progresso</p>
              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-xs text-[#7e7369]">
                    <span>Super Eco (20 descartes)</span>
                    <span style={{ fontWeight: 600 }}>{user.itemsDiscarded}/20</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#ece5dc]">
                    <div
                      className="progress-brand h-full rounded-full transition-all"
                      style={{ width: `${(user.itemsDiscarded / 20) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs text-[#7e7369]">
                    <span>5 Estrelas (50 avaliações)</span>
                    <span style={{ fontWeight: 600 }}>{user.reviewCount}/50</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#ece5dc]">
                    <div
                      className="progress-accent h-full rounded-full transition-all"
                      style={{ width: `${(user.reviewCount / 50) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-xs text-[#7e7369]">
                    <span>Mestre do Descarte (500kg)</span>
                    <span style={{ fontWeight: 600 }}>{user.wasteAvoided}/500kg</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#ece5dc]">
                    <div
                      className="progress-earth h-full rounded-full transition-all"
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
