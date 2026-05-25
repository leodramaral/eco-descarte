import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import {
  Camera,
  ChevronDown,
  CheckCircle,
  Leaf,
  AlertCircle,
} from "lucide-react";
import {
  IconArmchair,
  IconSnowflake,
  IconDeviceTv,
  IconBolt,
  IconPackage,
  IconGift,
  IconCoin,
  IconMapPin,
  IconTruckDelivery,
  IconFlame,
  IconSeedling,
} from "@tabler/icons-react";
import type { TablerIcon } from "@tabler/icons-react";
import { type Category, type Item } from "../data/mockData";
import { addItem } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showItemPublishedToast } from "../utils/toast";
import { ConfettiCelebration } from "./ConfettiCelebration";

const CATEGORIES: { value: Category; label: string; icon: TablerIcon }[] = [
  { value: "moveis", label: "Móveis", icon: IconArmchair },
  { value: "geladeiras", label: "Geladeiras", icon: IconSnowflake },
  { value: "tvs", label: "TVs", icon: IconDeviceTv },
  { value: "eletrodomesticos", label: "Eletrodomésticos", icon: IconBolt },
  { value: "outros", label: "Outros", icon: IconPackage },
];

const NEIGHBORHOODS = [
  "Adrianópolis", "Aleixo", "Alvorada", "Centro", "Chapada",
  "Flores", "Japiim", "Nossa Senhora das Graças", "Parque 10",
  "Petrópolis", "São Geraldo", "Vieiralves",
];

const CATEGORY_PLACEHOLDERS: Record<Category, string> = {
  moveis:
    "https://images.unsplash.com/photo-1617104678098-de229db51175?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  geladeiras:
    "https://images.unsplash.com/photo-1758488438758-5e2eedf769ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  tvs:
    "https://images.unsplash.com/photo-1593784991095-a205069470b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  eletrodomesticos:
    "https://images.unsplash.com/photo-1754732693535-7ffb5e1a51d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  outros:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

type ItemFormState = {
  name: string;
  description: string;
  timeOfUse: string;
  material: string;
  weight: string;
  height: string;
  width: string;
  depth: string;
  category: Category | "";
  neighborhood: string;
  type: "doacao" | "pago";
  price: string;
  transport: "retirada" | "entrega";
  urgent: boolean;
};

function createInitialForm(): ItemFormState {
  return {
    name: "",
    description: "",
    timeOfUse: "",
    material: "",
    weight: "",
    height: "",
    width: "",
    depth: "",
    category: "",
    neighborhood: "",
    type: "doacao",
    price: "",
    transport: "retirada",
    urgent: false,
  };
}

export function AddItemPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUserId, users } = useAppSelector((state) => state.appData);
  const currentUser = users.find((user) => user.id === currentUserId) ?? null;
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<ItemFormState>(createInitialForm());

  if (!currentUser) {
    return <Navigate to="/login?next=%2Fadd" replace />;
  }

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    form.name &&
    form.description &&
    form.category &&
    form.neighborhood &&
    (form.type === "doacao" || form.price);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || !form.category) return;

    const weight = Number(form.weight) || 0;
    const dimensions = {
      height: Number(form.height) || 0,
      width: Number(form.width) || 0,
      depth: Number(form.depth) || 0,
    };
    const largestDimension = Math.max(dimensions.height, dimensions.width, dimensions.depth);

    const newItem: Item = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category,
      images: [CATEGORY_PLACEHOLDERS[form.category]],
      neighborhood: form.neighborhood,
      distance: 0,
      type: form.type,
      price: form.type === "pago" ? Number(form.price) : undefined,
      transport: form.transport,
      fitsInCar: weight <= 20 && largestDimension <= 100,
      urgent: form.urgent,
      userId: currentUser.id,
      timeOfUse: form.timeOfUse.trim() || "Não informado",
      material: form.material.trim() || "Não informado",
      weight,
      dimensions,
      wasteWeight: weight,
      postedAt: "Agora",
    };

    dispatch(addItem(newItem));
    setSubmitted(true);
    showItemPublishedToast();
  };

  if (submitted) {
    return (
      <>
        <ConfettiCelebration trigger={true} />
        <div className="px-4 pt-16 flex flex-col items-center text-center">
        <div className="surface-soft mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <CheckCircle className="h-10 w-10 text-brand-primary-strong" />
        </div>
        <h2 className="mb-2 text-foreground" style={{ fontSize: "1.3rem" }}>Anúncio publicado!</h2>
        <p className="mb-3 max-w-xs text-sm text-muted-foreground">
          Seu item foi anunciado com sucesso. Pessoas no modo coletor poderão entrar em contato pelo chat.
        </p>
        <div className="impact-card mb-8 w-full max-w-xs rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="h-4 w-4 text-brand-primary-strong" />
            <span className="text-sm text-brand" style={{ fontWeight: 600 }}>Impacto positivo!</span>
          </div>
          <p className="text-xs text-brand-primary-strong">
            Ao descartar corretamente, você ajuda a reduzir o impacto ambiental e contribui para a comunidade.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => {
              setSubmitted(false);
              setForm(createInitialForm());
            }}
            className="cta-primary w-full rounded-xl py-3"
            style={{ fontWeight: 700 }}
          >
            Anunciar outro item
          </button>
          <button
            onClick={() => navigate("/")}
            className="surface-earth w-full rounded-xl py-3 text-brand-earth"
            style={{ fontWeight: 600 }}
          >
            Ver catálogo
          </button>
        </div>
      </div>
      </>
    );
  }

  return (
    <div className="px-4 pt-4 pb-8">
      <div className="mb-6">
        <h1 className="text-foreground" style={{ fontSize: "1.3rem" }}>Anunciar item</h1>
        <p className="mt-1 text-sm text-muted-foreground">Preencha os dados do item que deseja descartar</p>
        <div className="surface-earth mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1">
          <span className="text-[11px] text-brand-earth" style={{ fontWeight: 600 }}>
            Seu perfil também pode coletar itens no catálogo
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Photo Upload */}
        <div>
          <label className="mb-2 block text-sm text-foreground">Fotos do item</label>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`flex h-24 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
                  i === 0
                    ? "border-brand-primary bg-brand-primary-soft"
                    : "border-border bg-[#fbf8f4]"
                }`}
              >
                <Camera className={`mb-1 h-5 w-5 ${i === 0 ? "text-brand-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs ${i === 0 ? "text-brand" : "text-muted-foreground"}`} style={{ fontWeight: 500 }}>
                  {i === 0 ? "Principal" : "Adicionar"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="mb-1.5 block text-sm text-foreground">
            Nome do item <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Ex: Geladeira duplex 340L"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="field-brand w-full rounded-xl bg-white px-4 py-3 text-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1.5 block text-sm text-foreground">
            Descrição <span className="text-red-400">*</span>
          </label>
          <textarea
            placeholder="Descreva o estado do item, defeitos, por que está descartando..."
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="field-brand w-full resize-none rounded-xl bg-white px-4 py-3 text-sm"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-1.5 block text-sm text-foreground">
            Categoria <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleChange("category", cat.value)}
                className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-xs transition-colors ${
                  form.category === cat.value
                    ? "border-brand-primary bg-brand-primary-soft text-brand"
                    : "border-border bg-white text-muted-foreground"
                }`}
                style={{ fontWeight: form.category === cat.value ? 600 : 400 }}
              >
                <cat.icon size={20} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Details Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm text-foreground">Tempo de uso</label>
            <input
              type="text"
              placeholder="Ex: 2 anos"
              value={form.timeOfUse}
              onChange={(e) => handleChange("timeOfUse", e.target.value)}
              className="field-brand w-full rounded-xl bg-white px-3 py-3 text-sm"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-foreground">Material</label>
            <input
              type="text"
              placeholder="Ex: Aço e plástico"
              value={form.material}
              onChange={(e) => handleChange("material", e.target.value)}
              className="field-brand w-full rounded-xl bg-white px-3 py-3 text-sm"
            />
          </div>
        </div>

        {/* Weight & Dimensions */}
        <div>
          <label className="mb-1.5 block text-sm text-foreground">Peso e dimensões (cm)</label>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <input
                type="number"
                placeholder="Ex: 25 kg"
                value={form.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                className="field-brand w-full rounded-xl bg-white px-3 py-3 text-center text-sm"
              />
              <p className="mt-1 text-center text-xs text-muted-foreground">Peso</p>
            </div>
            <div>
              <input
                type="number"
                placeholder="Ex: 120 cm"
                value={form.height}
                onChange={(e) => handleChange("height", e.target.value)}
                className="field-brand w-full rounded-xl bg-white px-3 py-3 text-center text-sm"
              />
              <p className="mt-1 text-center text-xs text-muted-foreground">Altura</p>
            </div>
            <div>
              <input
                type="number"
                placeholder="Ex: 60 cm"
                value={form.width}
                onChange={(e) => handleChange("width", e.target.value)}
                className="field-brand w-full rounded-xl bg-white px-3 py-3 text-center text-sm"
              />
              <p className="mt-1 text-center text-xs text-muted-foreground">Largura</p>
            </div>
            <div>
              <input
                type="number"
                placeholder="Ex: 45 cm"
                value={form.depth}
                onChange={(e) => handleChange("depth", e.target.value)}
                className="field-brand w-full rounded-xl bg-white px-3 py-3 text-center text-sm"
              />
              <p className="mt-1 text-center text-xs text-muted-foreground">Profund.</p>
            </div>
          </div>
        </div>

        {/* Neighborhood */}
        <div>
          <label className="mb-1.5 block text-sm text-foreground">
            Bairro <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={form.neighborhood}
              onChange={(e) => handleChange("neighborhood", e.target.value)}
              className="field-brand w-full appearance-none rounded-xl bg-white px-4 py-3 text-sm"
              required
            >
              <option value="">Selecione o bairro</option>
              {NEIGHBORHOODS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="mb-2 block text-sm text-foreground">
            Tipo <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChange("type", "doacao")}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 text-sm transition-colors ${
                form.type === "doacao"
                  ? "border-brand-primary bg-brand-primary-soft text-brand"
                  : "border-border bg-white text-muted-foreground"
              }`}
              style={{ fontWeight: form.type === "doacao" ? 700 : 400 }}
            >
              <span className="flex items-center gap-1"><IconGift size={16} /> Doação</span>
              <span className="text-xs opacity-70">Sem custo</span>
            </button>
            <button
              type="button"
              onClick={() => handleChange("type", "pago")}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 text-sm transition-colors ${
                form.type === "pago"
                  ? "border-brand-earth bg-brand-earth-soft text-brand-earth"
                  : "border-border bg-white text-muted-foreground"
              }`}
              style={{ fontWeight: form.type === "pago" ? 700 : 400 }}
            >
              <span className="flex items-center gap-1"><IconCoin size={16} /> Remunerado</span>
              <span className="text-xs opacity-70">Com valor</span>
            </button>
          </div>
          {form.type === "pago" && (
            <div className="mt-2">
              <input
                type="number"
                placeholder="Valor em R$"
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className="field-brand w-full rounded-xl bg-white px-4 py-3 text-sm"
                required={form.type === "pago"}
              />
            </div>
          )}
        </div>

        {/* Transport */}
        <div>
          <label className="mb-2 block text-sm text-foreground">Transporte</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChange("transport", "retirada")}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 text-sm transition-colors ${
                form.transport === "retirada"
                  ? "border-brand-accent bg-brand-accent-soft text-brand-accent"
                  : "border-border bg-white text-muted-foreground"
              }`}
              style={{ fontWeight: form.transport === "retirada" ? 700 : 400 }}
            >
              <span className="flex items-center gap-1"><IconMapPin size={16} /> Retirada no local</span>
              <span className="text-xs opacity-70">Coletor busca</span>
            </button>
            <button
              type="button"
              onClick={() => handleChange("transport", "entrega")}
              className={`flex flex-col items-center gap-1 rounded-xl border-2 py-3 text-sm transition-colors ${
                form.transport === "entrega"
                  ? "border-brand-earth bg-brand-earth-soft text-brand-earth"
                  : "border-border bg-white text-muted-foreground"
              }`}
              style={{ fontWeight: form.transport === "entrega" ? 700 : 400 }}
            >
              <span className="flex items-center gap-1"><IconTruckDelivery size={16} /> Posso entregar</span>
              <span className="text-xs opacity-70">Você entrega</span>
            </button>
          </div>
        </div>

        {/* Urgent Checkbox */}
        <div>
          <button
            type="button"
            onClick={() => handleChange("urgent", !form.urgent)}
            className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
              form.urgent
                ? "border-brand-accent bg-brand-accent-soft"
                : "border-border bg-white"
            }`}
          >
            <div
              className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
                form.urgent ? "border-brand-accent bg-brand-accent" : "border-[#cabeb4]"
              }`}
            >
              {form.urgent && <CheckCircle className="w-3.5 h-3.5 text-white" />}
            </div>
            <div className="flex-1 text-left">
              <p className={`text-sm ${form.urgent ? "text-accent" : "text-foreground"}`} style={{ fontWeight: 600 }}>
                <span className="flex items-center gap-1"><IconFlame size={14} /> Precisa retirar com urgência</span>
              </p>
              <p className={`text-xs ${form.urgent ? "text-brand-accent" : "text-muted-foreground"}`}>
                O item aparecerá com destaque "Retirar hoje"
              </p>
            </div>
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid || !currentUser}
          className={`w-full rounded-2xl py-4 text-white transition-all ${
            isFormValid && currentUser
              ? "cta-primary active:scale-95"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          style={{ fontWeight: 700, fontSize: "1rem" }}
        >
          {currentUser
            ? isFormValid
              ? <span className="flex items-center justify-center gap-1.5"><IconSeedling size={18} /> Publicar Anúncio</span>
              : "Preencha os campos obrigatórios"
            : "Perfil necessário para publicar"}
        </button>
      </form>
    </div>
  );
}
