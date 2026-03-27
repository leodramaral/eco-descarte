import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Star,
  MapPin,
  CheckCircle,
  ChevronRight,
  Truck,
  Car,
  Clock,
  X,
} from "lucide-react";
import { ITEMS, USERS, type Category, type ItemType } from "../data/mockData";

type ViewMode = "grid" | "list";

const CATEGORIES: { value: Category | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "moveis", label: "Móveis" },
  { value: "geladeiras", label: "Geladeiras" },
  { value: "tvs", label: "TVs" },
  { value: "eletrodomesticos", label: "Eletrodomésticos" },
  { value: "outros", label: "Outros" },
];

export function CatalogPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "todos">("todos");
  const [selectedType, setSelectedType] = useState<ItemType | "todos">("todos");
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = useMemo(() => {
    return ITEMS.filter((item) => {
      const matchSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.neighborhood.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selectedCategory === "todos" || item.category === selectedCategory;
      const matchType = selectedType === "todos" || item.type === selectedType;
      return matchSearch && matchCategory && matchType;
    });
  }, [search, selectedCategory, selectedType]);

  const getUser = (userId: string) => USERS.find((u) => u.id === userId)!;

  const clearFilters = () => {
    setSelectedCategory("todos");
    setSelectedType("todos");
    setSearch("");
  };

  const hasActiveFilters =
    selectedCategory !== "todos" || selectedType !== "todos" || search !== "";

  return (
    <div className="px-4 pt-4 pb-4">
      {/* Search Bar */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar item ou bairro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value as Category | "todos")}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs transition-colors border ${
                selectedCategory === cat.value
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
              style={{ fontWeight: selectedCategory === cat.value ? 600 : 400 }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border transition-colors ${
            showFilters || selectedType !== "todos"
              ? "bg-green-600 border-green-600 text-white"
              : "bg-white border-gray-200 text-gray-600"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Extra Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-2" style={{ fontWeight: 600 }}>Tipo</p>
            <div className="flex gap-2">
              {[
                { value: "todos", label: "Todos" },
                { value: "doacao", label: "Doação" },
                { value: "pago", label: "Pago" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedType(opt.value as ItemType | "todos")}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                    selectedType === opt.value
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-gray-50 text-gray-600 border-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-red-500 flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Limpar filtros
            </button>
          )}
        </div>
      )}

      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">
          <span style={{ fontWeight: 600 }} className="text-gray-800">{filteredItems.length}</span>{" "}
          {filteredItems.length === 1 ? "item encontrado" : "itens encontrados"}
        </span>
        <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
              viewMode === "grid" ? "bg-green-600 text-white" : "text-gray-400"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
              viewMode === "list" ? "bg-green-600 text-white" : "text-gray-400"
            }`}
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Items Grid/List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🌿</div>
          <p className="text-gray-500 text-sm">Nenhum item encontrado</p>
          <button onClick={clearFilters} className="mt-3 text-green-600 text-sm" style={{ fontWeight: 600 }}>
            Limpar filtros
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item) => {
            const user = getUser(item.userId);
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/item/${item.id}`)}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer active:scale-95 transition-transform"
              >
                <div className="relative">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        item.type === "doacao"
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                      style={{ fontWeight: 600 }}
                    >
                      {item.type === "doacao" ? "Doação" : `R$ ${item.price}`}
                    </span>
                    {item.urgent && (
                      <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs" style={{ fontWeight: 600 }}>
                        🔥 Urgente
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-gray-800 text-sm mb-1 line-clamp-2" style={{ fontWeight: 600, lineHeight: 1.3 }}>
                    {item.name}
                  </p>
                  <div className="flex items-center gap-1 text-gray-400 mb-2">
                    <MapPin className="w-3 h-3 text-green-500" />
                    <span className="text-xs">{item.neighborhood} • {item.distance}km</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="flex items-center gap-0.5 text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded">
                      {item.transport === "entrega" ? (
                        <><Truck className="w-2.5 h-2.5" /> Entrega</>
                      ) : (
                        <><MapPin className="w-2.5 h-2.5" /> Retirada</>
                      )}
                    </span>
                    <span className="flex items-center gap-0.5 text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded">
                      {item.fitsInCar ? (
                        <><Car className="w-2.5 h-2.5" /> Cabe no carro</>
                      ) : (
                        <><Truck className="w-2.5 h-2.5" /> Transporte necessário</>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-600" style={{ fontWeight: 600 }}>{user.rating}</span>
                      {user.verified && (
                        <CheckCircle className="w-3 h-3 text-blue-500" />
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{item.postedAt}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const user = getUser(item.userId);
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/item/${item.id}`)}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm cursor-pointer active:scale-95 transition-transform flex"
              >
                <div className="relative w-28 flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-xs ${
                        item.type === "doacao"
                          ? "bg-green-500 text-white"
                          : "bg-blue-500 text-white"
                      }`}
                      style={{ fontWeight: 600 }}
                    >
                      {item.type === "doacao" ? "Doação" : `R$${item.price}`}
                    </span>
                  </div>
                </div>
                <div className="p-3 flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-gray-800 text-sm flex-1 pr-2" style={{ fontWeight: 600 }}>
                      {item.name}
                    </p>
                    {item.urgent && (
                      <span className="text-xs text-orange-500" style={{ fontWeight: 600 }}>
                        🔥 Urgente
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 mb-2">
                    <MapPin className="w-3 h-3 text-green-500" />
                    <span className="text-xs">{item.neighborhood} • {item.distance}km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5 text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded">
                      {item.transport === "entrega" ? (
                        <><Truck className="w-2.5 h-2.5" /> Entrega</>
                      ) : (
                        <><MapPin className="w-2.5 h-2.5" /> Retirada</>
                      )}
                    </span>
                    <span className="flex items-center gap-0.5 text-xs bg-gray-50 text-gray-600 px-1.5 py-0.5 rounded">
                      {item.fitsInCar ? (
                        <><Car className="w-2.5 h-2.5" /> No carro</>
                      ) : (
                        <><Truck className="w-2.5 h-2.5" /> Transporte</>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <img src={user.photo} alt={user.name} className="w-4 h-4 rounded-full object-cover" />
                      <span className="text-xs text-gray-500">{user.name.split(" ")[0]}</span>
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs text-gray-600" style={{ fontWeight: 600 }}>{user.rating}</span>
                      {user.verified && <CheckCircle className="w-3 h-3 text-blue-500" />}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
