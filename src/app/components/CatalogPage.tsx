import { useState, useMemo, useEffect } from "react";
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
import { type Category, type ItemType } from "../data/mockData";
import { useAppSelector } from "../store/hooks";
import { useClarityEvents } from "./clarity/events";
import { debounce } from "../utils/clarity";

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
  const { items, users } = useAppSelector((state) => state.appData);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "todos">("todos");
  const [selectedType, setSelectedType] = useState<ItemType | "todos">("todos");
  const [showFilters, setShowFilters] = useState(false);
  const { catalog_search, catalog_filter_category, catalog_view_mode_change, catalog_item_click, page_view_home } = useClarityEvents();

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.neighborhood.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selectedCategory === "todos" || item.category === selectedCategory;
      const matchType = selectedType === "todos" || item.type === selectedType;
      return matchSearch && matchCategory && matchType;
    });
  }, [items, search, selectedCategory, selectedType]);

  const debouncedSearch = useMemo(() => debounce((query: string) => {
    if (query.trim()) {
      catalog_search(query, filteredItems.length);
    }
  }, 500), [catalog_search, filteredItems.length]);

  useMemo(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  useEffect(() => {
    page_view_home();
  }, []);

  const getUser = (userId: string) => users.find((user) => user.id === userId) ?? null;

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
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-primary-strong" />
        <input
          type="text"
          placeholder="Buscar item ou bairro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="field-brand w-full rounded-xl bg-white py-3 pl-10 pr-10 text-sm text-gray-800"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <X className="h-4 w-4 text-brand-primary-strong" />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value as Category | "todos");
                  if (cat.value !== "todos") {
                    catalog_filter_category(cat.value);
                  }
                }}
                aria-label={`Filtrar por ${cat.label}`}
                aria-pressed={selectedCategory === cat.value}
                className={`flex-shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
                  selectedCategory === cat.value
                    ? "border-brand-primary-strong bg-brand-primary-strong text-white shadow-[0_10px_22px_rgba(47,90,51,0.16)]"
                    : "bg-white text-brand-primary border-border"
                }`}
              style={{ fontWeight: selectedCategory === cat.value ? 600 : 400 }}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          aria-label={showFilters ? "Fechar filtros" : "Abrir filtros"}
          aria-expanded={showFilters}
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
            showFilters || selectedType !== "todos"
              ? "border-brand-earth bg-brand-earth text-white"
              : "border-border bg-white text-brand-primary-strong"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Extra Filters Panel */}
      {showFilters && (
        <div className="mb-4 space-y-3 rounded-xl border border-border bg-white p-4 shadow-[0_10px_30px_rgba(56,45,34,0.06)]">
          <div>
            <p className="mb-2 text-xs text-[#7e7369]" style={{ fontWeight: 600 }}>Tipo</p>
            <div className="flex gap-2">
              {[
                { value: "todos", label: "Todos" },
                { value: "doacao", label: "Doação" },
                { value: "pago", label: "Pago" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedType(opt.value as ItemType | "todos")}
                  aria-label={`Filtrar por ${opt.label}`}
                  aria-pressed={selectedType === opt.value}
                  className={`rounded-lg border px-3 py-1.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
                    selectedType === opt.value
                      ? "border-brand-primary-strong bg-brand-primary-strong text-white"
                      : "bg-white text-brand-primary-strong border-border"
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
              className="flex items-center gap-1 text-xs text-accent"
            >
              <X className="w-3 h-3" />
              Limpar filtros
            </button>
          )}
        </div>
      )}

      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-[#7e7369]">
          <span style={{ fontWeight: 600 }} className="text-[#2a211c]">{filteredItems.length}</span>{" "}
          {filteredItems.length === 1 ? "item encontrado" : "itens encontrados"}
        </span>
        <div className="flex items-center gap-1 rounded-lg border border-border bg-white p-1">
          <button
            onClick={() => {
              setViewMode("grid");
              catalog_view_mode_change("grid");
            }}
            aria-label="Visualização em grade"
            aria-pressed={viewMode === "grid"}
            className={`flex h-7 w-7 items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
              viewMode === "grid" ? "bg-brand-primary-strong text-white" : "text-brand-primary-strong"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              setViewMode("list");
              catalog_view_mode_change("list");
            }}
            aria-label="Visualização em lista"
            aria-pressed={viewMode === "list"}
            className={`flex h-7 w-7 items-center justify-center rounded transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
              viewMode === "list" ? "bg-brand-primary-strong text-white" : "text-brand-primary-strong"
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
          <p className="text-sm text-[#7e7369]">Nenhum item encontrado</p>
          <button onClick={clearFilters} className="mt-3 text-sm text-brand" style={{ fontWeight: 600 }}>
            Limpar filtros
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item, index) => {
            const user = getUser(item.userId);

            if (!user) {
              return null;
            }

            return (
              <div
                key={item.id}
                onClick={() => {
                  catalog_item_click(item.id, index + 1);
                  navigate(`/item/${item.id}`);
                }}
                className="cursor-pointer overflow-hidden rounded-xl border border-border bg-white shadow-[0_10px_28px_rgba(56,45,34,0.06)] transition-transform active:scale-95"
              >
                <div className="relative">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        item.type === "doacao" ? "tone-donation" : "tone-paid"
                      }`}
                      style={{ fontWeight: 600 }}
                    >
                      {item.type === "doacao" ? "Doação" : `R$ ${item.price}`}
                    </span>
                    {item.urgent && (
                      <span className="tone-urgent rounded-full px-2 py-0.5 text-xs" style={{ fontWeight: 600 }}>
                        🔥 Urgente
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="mb-1 line-clamp-2 text-sm text-[#2a211c]" style={{ fontWeight: 600, lineHeight: 1.3 }}>
                    {item.name}
                  </p>
                  <div className="mb-2 flex items-center gap-1 text-[#9a9188]">
                    <MapPin className="h-3 w-3 text-brand-primary" />
                    <span className="text-xs">{item.neighborhood} • {item.distance}km</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <span className="chip-earth px-1.5 py-0.5 text-[11px]">
                      {item.transport === "entrega" ? (
                        <><Truck className="w-2.5 h-2.5" /> Entrega</>
                      ) : (
                        <><MapPin className="w-2.5 h-2.5" /> Retirada</>
                      )}
                    </span>
                    <span className="chip-brand px-1.5 py-0.5 text-[11px]">
                      {item.fitsInCar ? (
                        <><Car className="w-2.5 h-2.5" /> Cabe no carro</>
                      ) : (
                        <><Truck className="w-2.5 h-2.5" /> Transporte necessário</>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-brand-accent text-brand-accent" />
                      <span className="text-xs text-[#645a52]" style={{ fontWeight: 600 }}>{user.rating}</span>
                      {user.verified && (
                        <CheckCircle className="h-3 w-3 text-brand-earth" />
                      )}
                    </div>
                    <span className="text-xs text-[#9a9188]">{item.postedAt}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map((item, index) => {
            const user = getUser(item.userId);
            return (
              <div
                key={item.id}
                onClick={() => {
                  catalog_item_click(item.id, index + 1);
                  navigate(`/item/${item.id}`);
                }}
                className="flex cursor-pointer overflow-hidden rounded-xl border border-border bg-white shadow-[0_10px_28px_rgba(56,45,34,0.06)] transition-transform active:scale-95"
              >
                <div className="relative w-28 flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-xs ${
                        item.type === "doacao" ? "tone-donation" : "tone-paid"
                      }`}
                      style={{ fontWeight: 600 }}
                    >
                      {item.type === "doacao" ? "Doação" : `R$${item.price}`}
                    </span>
                  </div>
                </div>
                <div className="p-3 flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <p className="flex-1 pr-2 text-sm text-[#2a211c]" style={{ fontWeight: 600 }}>
                      {item.name}
                    </p>
                    {item.urgent && (
                      <span className="text-xs text-accent" style={{ fontWeight: 600 }}>
                        🔥 Urgente
                      </span>
                    )}
                  </div>
                  <div className="mb-2 flex items-center gap-1 text-[#9a9188]">
                    <MapPin className="h-3 w-3 text-brand-primary" />
                    <span className="text-xs">{item.neighborhood} • {item.distance}km</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="chip-earth px-1.5 py-0.5 text-[11px]">
                      {item.transport === "entrega" ? (
                        <><Truck className="w-2.5 h-2.5" /> Entrega</>
                      ) : (
                        <><MapPin className="w-2.5 h-2.5" /> Retirada</>
                      )}
                    </span>
                    <span className="chip-brand px-1.5 py-0.5 text-[11px]">
                      {item.fitsInCar ? (
                        <><Car className="w-2.5 h-2.5" /> No carro</>
                      ) : (
                        <><Truck className="w-2.5 h-2.5" /> Transporte</>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <img src={user?.photo} alt={user?.name} className="w-4 h-4 rounded-full object-cover" />
                      <span className="text-xs text-[#7e7369]">{user?.name?.split(" ")[0]}</span>
                      <Star className="h-3 w-3 fill-brand-accent text-brand-accent" />
                      <span className="text-xs text-[#645a52]" style={{ fontWeight: 600 }}>{user?.rating}</span>
                      {user?.verified && <CheckCircle className="h-3 w-3 text-brand-earth" />}
                    </div>
                    <ChevronRight className="h-4 w-4 text-[#c8bdb2]" />
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
