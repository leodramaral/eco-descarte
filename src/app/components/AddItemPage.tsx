import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Camera,
  X,
  ChevronDown,
  CheckCircle,
  Leaf,
  AlertCircle,
} from "lucide-react";
import { type Category } from "../data/mockData";

const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: "moveis", label: "Móveis", icon: "🪑" },
  { value: "geladeiras", label: "Geladeiras", icon: "🧊" },
  { value: "tvs", label: "TVs", icon: "📺" },
  { value: "eletrodomesticos", label: "Eletrodomésticos", icon: "⚡" },
  { value: "outros", label: "Outros", icon: "📦" },
];

const NEIGHBORHOODS = [
  "Adrianópolis", "Aleixo", "Alvorada", "Centro", "Chapada",
  "Flores", "Japiim", "Nossa Senhora das Graças", "Parque 10",
  "Petrópolis", "São Geraldo", "Vieiralves",
];

export function AddItemPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    timeOfUse: "",
    material: "",
    weight: "",
    height: "",
    width: "",
    depth: "",
    category: "" as Category | "",
    neighborhood: "",
    type: "doacao" as "doacao" | "pago",
    price: "",
    transport: "retirada" as "retirada" | "entrega",
    urgent: false,
  });

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
    if (!isFormValid) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="px-4 pt-16 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-gray-800 mb-2" style={{ fontSize: "1.3rem" }}>Anúncio publicado!</h2>
        <p className="text-gray-500 text-sm max-w-xs mb-3">
          Seu item foi anunciado com sucesso. Você receberá contatos pelo WhatsApp.
        </p>
        <div className="bg-green-50 rounded-xl p-4 w-full max-w-xs mb-8 border border-green-200">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="w-4 h-4 text-green-600" />
            <span className="text-green-700 text-sm" style={{ fontWeight: 600 }}>Impacto positivo!</span>
          </div>
          <p className="text-green-600 text-xs">
            Ao descartar corretamente, você ajuda a reduzir o impacto ambiental e contribui para a comunidade.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={() => {
              setSubmitted(false);
              setForm({
                name: "", description: "", timeOfUse: "", material: "",
                weight: "", height: "", width: "", depth: "",
                category: "", neighborhood: "", type: "doacao", price: "",
                transport: "retirada", urgent: false,
              });
            }}
            className="w-full bg-green-600 text-white py-3 rounded-xl"
            style={{ fontWeight: 700 }}
          >
            Anunciar outro item
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl"
            style={{ fontWeight: 600 }}
          >
            Ver catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-8">
      <div className="mb-6">
        <h1 className="text-gray-900" style={{ fontSize: "1.3rem" }}>Anunciar item</h1>
        <p className="text-gray-500 text-sm mt-1">Preencha os dados do item que deseja descartar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Photo Upload */}
        <div>
          <label className="text-gray-700 text-sm mb-2 block">Fotos do item</label>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors ${
                  i === 0
                    ? "border-green-400 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <Camera className={`w-5 h-5 mb-1 ${i === 0 ? "text-green-500" : "text-gray-300"}`} />
                <span className={`text-xs ${i === 0 ? "text-green-600" : "text-gray-300"}`} style={{ fontWeight: 500 }}>
                  {i === 0 ? "Principal" : "Adicionar"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="text-gray-700 text-sm mb-1.5 block">
            Nome do item <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Ex: Geladeira Brastemp 340L"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm transition-all"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-gray-700 text-sm mb-1.5 block">
            Descrição <span className="text-red-400">*</span>
          </label>
          <textarea
            placeholder="Descreva o estado do item, defeitos, por que está descartando..."
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm resize-none transition-all"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-gray-700 text-sm mb-1.5 block">
            Categoria <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => handleChange("category", cat.value)}
                className={`py-2.5 px-2 rounded-xl border text-xs flex flex-col items-center gap-1 transition-colors ${
                  form.category === cat.value
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-600"
                }`}
                style={{ fontWeight: form.category === cat.value ? 600 : 400 }}
              >
                <span className="text-lg">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Details Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-gray-700 text-sm mb-1.5 block">Tempo de uso</label>
            <input
              type="text"
              placeholder="Ex: 2 anos"
              value={form.timeOfUse}
              onChange={(e) => handleChange("timeOfUse", e.target.value)}
              className="w-full px-3 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm transition-all"
            />
          </div>
          <div>
            <label className="text-gray-700 text-sm mb-1.5 block">Material</label>
            <input
              type="text"
              placeholder="Ex: Aço e plástico"
              value={form.material}
              onChange={(e) => handleChange("material", e.target.value)}
              className="w-full px-3 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm transition-all"
            />
          </div>
        </div>

        {/* Weight & Dimensions */}
        <div>
          <label className="text-gray-700 text-sm mb-1.5 block">Peso e dimensões (cm)</label>
          <div className="grid grid-cols-4 gap-2">
            <div>
              <input
                type="number"
                placeholder="Peso (kg)"
                value={form.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                className="w-full px-3 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm text-center transition-all"
              />
              <p className="text-center text-xs text-gray-400 mt-1">Peso</p>
            </div>
            <div>
              <input
                type="number"
                placeholder="Alt"
                value={form.height}
                onChange={(e) => handleChange("height", e.target.value)}
                className="w-full px-3 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm text-center transition-all"
              />
              <p className="text-center text-xs text-gray-400 mt-1">Altura</p>
            </div>
            <div>
              <input
                type="number"
                placeholder="Larg"
                value={form.width}
                onChange={(e) => handleChange("width", e.target.value)}
                className="w-full px-3 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm text-center transition-all"
              />
              <p className="text-center text-xs text-gray-400 mt-1">Largura</p>
            </div>
            <div>
              <input
                type="number"
                placeholder="Prof"
                value={form.depth}
                onChange={(e) => handleChange("depth", e.target.value)}
                className="w-full px-3 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm text-center transition-all"
              />
              <p className="text-center text-xs text-gray-400 mt-1">Profund.</p>
            </div>
          </div>
        </div>

        {/* Neighborhood */}
        <div>
          <label className="text-gray-700 text-sm mb-1.5 block">
            Bairro <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={form.neighborhood}
              onChange={(e) => handleChange("neighborhood", e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm appearance-none transition-all"
              required
            >
              <option value="">Selecione o bairro</option>
              {NEIGHBORHOODS.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="text-gray-700 text-sm mb-2 block">
            Tipo <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChange("type", "doacao")}
              className={`py-3 rounded-xl border-2 text-sm flex flex-col items-center gap-1 transition-colors ${
                form.type === "doacao"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
              style={{ fontWeight: form.type === "doacao" ? 700 : 400 }}
            >
              🎁 Doação
              <span className="text-xs opacity-70">Sem custo</span>
            </button>
            <button
              type="button"
              onClick={() => handleChange("type", "pago")}
              className={`py-3 rounded-xl border-2 text-sm flex flex-col items-center gap-1 transition-colors ${
                form.type === "pago"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
              style={{ fontWeight: form.type === "pago" ? 700 : 400 }}
            >
              💰 Remunerado
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
                className="w-full px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm transition-all"
                required={form.type === "pago"}
              />
            </div>
          )}
        </div>

        {/* Transport */}
        <div>
          <label className="text-gray-700 text-sm mb-2 block">Transporte</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleChange("transport", "retirada")}
              className={`py-3 rounded-xl border-2 text-sm flex flex-col items-center gap-1 transition-colors ${
                form.transport === "retirada"
                  ? "border-amber-500 bg-amber-50 text-amber-700"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
              style={{ fontWeight: form.transport === "retirada" ? 700 : 400 }}
            >
              📍 Retirada no local
              <span className="text-xs opacity-70">Receptor busca</span>
            </button>
            <button
              type="button"
              onClick={() => handleChange("transport", "entrega")}
              className={`py-3 rounded-xl border-2 text-sm flex flex-col items-center gap-1 transition-colors ${
                form.transport === "entrega"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-600"
              }`}
              style={{ fontWeight: form.transport === "entrega" ? 700 : 400 }}
            >
              🚚 Posso entregar
              <span className="text-xs opacity-70">Você entrega</span>
            </button>
          </div>
        </div>

        {/* Urgent Checkbox */}
        <div>
          <button
            type="button"
            onClick={() => handleChange("urgent", !form.urgent)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
              form.urgent
                ? "border-orange-400 bg-orange-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 transition-colors ${
                form.urgent ? "border-orange-500 bg-orange-500" : "border-gray-300"
              }`}
            >
              {form.urgent && <CheckCircle className="w-3.5 h-3.5 text-white" />}
            </div>
            <div className="flex-1 text-left">
              <p className={`text-sm ${form.urgent ? "text-orange-700" : "text-gray-700"}`} style={{ fontWeight: 600 }}>
                🔥 Precisa retirar com urgência
              </p>
              <p className={`text-xs ${form.urgent ? "text-orange-500" : "text-gray-400"}`}>
                O item aparecerá com destaque "Retirar hoje"
              </p>
            </div>
          </button>
        </div>

        {/* Validation Warning */}
        {!isFormValid && (
          <div className="flex items-center gap-2 bg-amber-50 rounded-xl px-4 py-3 border border-amber-200">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="text-xs text-amber-700">Preencha os campos obrigatórios (marcados com *)</span>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-4 rounded-2xl text-white transition-all ${
            isFormValid
              ? "bg-green-600 hover:bg-green-700 active:scale-95 shadow-lg shadow-green-200"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          style={{ fontWeight: 700, fontSize: "1rem" }}
        >
          {isFormValid ? "🌱 Publicar Anúncio" : "Preencha os campos obrigatórios"}
        </button>
      </form>
    </div>
  );
}
