import { useState } from "react";
import { useNavigate } from "react-router";
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
} from "lucide-react";
import { CURRENT_USER, ITEMS } from "../data/mockData";

type Tab = "descartando" | "historico" | "conquistas";

export function UserProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("descartando");

  const user = CURRENT_USER;
  const userItems = ITEMS.filter((item) => item.userId === user.id);
  const activeItems = userItems.filter((_, i) => i === 0);
  const historyItems = userItems.slice(1);

  const TABS: { value: Tab; label: string }[] = [
    { value: "descartando", label: "Descartando" },
    { value: "historico", label: "Histórico" },
    { value: "conquistas", label: "Conquistas" },
  ];

  return (
    <div className="pb-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 px-4 pt-6 pb-8 relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.photo}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                style={{ borderWidth: 3 }}
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <h2 className="text-white" style={{ fontSize: "1.1rem" }}>{user.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                {user.verified && (
                  <span className="flex items-center gap-0.5 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full" style={{ fontWeight: 600 }}>
                    <CheckCircle className="w-3 h-3" /> Telefone verificado
                  </span>
                )}
              </div>
              <p className="text-green-200 text-xs mt-1">Membro desde {user.memberSince}</p>
            </div>
          </div>
          <button className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Edit3 className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Rating & Response */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1.5">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-white text-sm" style={{ fontWeight: 700 }}>
              {user.rating}
            </span>
            <span className="text-white/70 text-xs">({user.reviewCount} avaliações)</span>
          </div>
          {user.respondsQuickly && (
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              <span className="text-white text-xs" style={{ fontWeight: 600 }}>Responde rápido</span>
            </div>
          )}
        </div>
      </div>

      {/* Activity Stats */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-gray-800" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                {user.itemsDiscarded}
              </p>
              <p className="text-gray-400 text-xs">Descartados</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Truck className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-gray-800" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                {user.itemsCollected}
              </p>
              <p className="text-gray-400 text-xs">Coletados</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-green-700" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                {user.wasteAvoided}kg
              </p>
              <p className="text-green-500 text-xs">Resíduos evitados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact Message */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200 flex items-start gap-3">
          <div className="text-2xl">🌱</div>
          <div>
            <p className="text-green-800 text-sm" style={{ fontWeight: 700 }}>Seu impacto no planeta!</p>
            <p className="text-green-700 text-xs mt-0.5 leading-relaxed">
              Você já ajudou a evitar o descarte de{" "}
              <span style={{ fontWeight: 700 }}>{user.wasteAvoided}kg de resíduos</span> no meio
              ambiente. Continue assim!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-5">
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
                <p className="text-gray-500 text-sm">Nenhum item sendo descartado</p>
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
                📦 Itens descartados
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
            <div className="grid grid-cols-2 gap-3">
              {user.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 ${badge.color}`}
                  style={{ borderColor: "transparent" }}
                >
                  <span className="text-3xl">{badge.icon}</span>
                  <p className="text-sm text-center" style={{ fontWeight: 700 }}>{badge.label}</p>
                  <span className="text-xs opacity-70 text-center">Conquistado ✓</span>
                </div>
              ))}

              {/* Locked badges */}
              <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center gap-2">
                <span className="text-3xl grayscale opacity-40">🏆</span>
                <p className="text-sm text-gray-400 text-center" style={{ fontWeight: 600 }}>Super Eco</p>
                <span className="text-xs text-gray-400 text-center">Descarte 20 itens</span>
              </div>
              <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center gap-2">
                <span className="text-3xl grayscale opacity-40">⭐</span>
                <p className="text-sm text-gray-400 text-center" style={{ fontWeight: 600 }}>5 Estrelas</p>
                <span className="text-xs text-gray-400 text-center">Alcance 50 avaliações</span>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-4 bg-white rounded-xl p-4 border border-gray-100">
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
