import { useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import {
  ArrowLeft,
  Camera,
  Leaf,
  Upload,
  User,
  Phone,
  AlertCircle,
  Check,
} from "lucide-react";
import { createUser } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { normalizePhone } from "../utils/phone";

function getNextPath(search: string) {
  const params = new URLSearchParams(search);
  const next = params.get("next");

  if (!next || !next.startsWith("/")) {
    return "/profile";
  }

  return next;
}

export function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { currentUserId, users } = useAppSelector((state) => state.appData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState(
    () => new URLSearchParams(location.search).get("phone") || ""
  );
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextPath = useMemo(() => getNextPath(location.search), [location.search]);
  const currentUser = users.find((user) => user.id === currentUserId) ?? null;

  // If user is already logged in, redirect
  if (currentUser) {
    return <Navigate to={nextPath} replace />;
  }

  const handlePhotoSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const normalizedPhone = normalizePhone(phone);

      // Validate phone uniqueness
      const existingUser = users.find(
        (user) =>
          normalizePhone(user.phone) === normalizedPhone
      );

      if (existingUser) {
        setError("Telefone já cadastrado no sistema.");
        setIsSubmitting(false);
        return;
      }

      dispatch(
        createUser({
          name: name.trim(),
          phone: phone.trim(),
          photo: photo || undefined,
        })
      );

      setSuccess(true);

      // Redirect after success
      setTimeout(() => {
        navigate(nextPath, { replace: true });
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao criar usuário. Tente novamente."
      );
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="px-4 pt-6 pb-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Cadastro realizado com sucesso!
          </h2>
          <p className="text-sm text-gray-600">
            Redirecionando para seu perfil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-600"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="rounded-[28px] border border-green-100 bg-gradient-to-br from-green-50 via-white to-emerald-50 p-5 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-gray-900" style={{ fontSize: "1.45rem", fontWeight: 700 }}>
              Criar cadastro
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Complete seus dados para começar a anunciar no Recolhe Aí.
            </p>
          </div>
          <div className="rounded-2xl border border-green-100 bg-white/80 p-3">
            <User className="h-5 w-5 text-green-700" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Section */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Foto de perfil
              <span className="ml-1 text-xs text-gray-500">(opcional)</span>
            </label>

            {photo ? (
              <div className="relative mb-3 h-32 w-32 rounded-2xl overflow-hidden border-2 border-green-200 bg-gray-100">
                <img
                  src={photo}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mb-3 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-green-200 bg-green-50 py-6 text-center transition-colors hover:border-green-400 hover:bg-green-100"
              >
                <div>
                  <Camera className="mx-auto h-6 w-6 text-green-600 mb-2" />
                  <p className="text-sm font-medium text-green-700">
                    Enviar foto
                  </p>
                  <p className="mt-1 text-xs text-green-600">
                    PNG, JPG até 5MB
                  </p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoSelect}
              className="hidden"
              disabled={isSubmitting}
            />
          </div>

          {/* Name Field */}
          <div>
            <label className="mb-1.5 block text-sm text-gray-700">
              Nome <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition-all focus:border-green-400 focus:ring-2 focus:ring-green-100"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Phone Field (Read-only) */}
          <div>
            <label className="mb-1.5 block text-sm text-gray-700">
              Telefone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                inputMode="tel"
                placeholder="(92) 99123-4567"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition-all focus:border-green-400 focus:ring-2 focus:ring-green-100"
                required
                disabled={isSubmitting}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Seu telefone será usado como identificador único.
            </p>
          </div>

          {error && (
            <div className="flex gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-600 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!name.trim() || !phone.trim() || isSubmitting}
            className="w-full rounded-2xl bg-green-600 py-3 font-medium text-white transition-all hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Criando cadastro...
              </span>
            ) : (
              "Criar cadastro"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full rounded-2xl border border-gray-200 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
