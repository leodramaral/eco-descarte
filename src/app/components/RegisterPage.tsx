import { useMemo, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import {
  ArrowLeft,
  Camera,
  Leaf,
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
            <div className="surface-soft rounded-full p-3">
              <Check className="h-8 w-8 text-brand-primary-strong" />
            </div>
          </div>
          <h2 className="mb-2 text-xl font-bold text-[#201814]">
            Cadastro realizado com sucesso!
          </h2>
          <p className="text-sm text-[#655b53]">
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
        className="mb-4 inline-flex items-center gap-1 text-sm text-[#655b53]"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="rounded-[28px] border border-border bg-gradient-to-br from-brand-primary-soft via-white to-brand-earth-soft p-5 shadow-[0_20px_45px_rgba(56,45,34,0.08)]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="brand-mark mb-3 flex h-11 w-11 items-center justify-center rounded-2xl">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-[#201814]" style={{ fontSize: "1.45rem", fontWeight: 700 }}>
              Criar cadastro
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#655b53]">
              Complete seus dados para começar a anunciar no Recolhe Aí.
            </p>
          </div>
          <div className="surface-earth rounded-2xl p-3">
            <User className="h-5 w-5 text-brand-earth" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Photo Section */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#584d45]">
              Foto de perfil
              <span className="ml-1 text-xs text-[#8d8379]">(opcional)</span>
            </label>

            {photo ? (
              <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-2xl border-2 border-brand-primary bg-[#f2f0ec]">
                <img
                  src={photo}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute right-1 top-1 rounded-full bg-brand-accent p-1 text-white transition-colors hover:bg-[#b95f2c]"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mb-3 flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-brand-primary bg-brand-primary-soft py-6 text-center transition-colors hover:border-brand-primary-strong hover:bg-[#dae8d5]"
              >
                <div>
                  <Camera className="mx-auto mb-2 h-6 w-6 text-brand-primary-strong" />
                  <p className="text-sm font-medium text-brand">
                    Enviar foto
                  </p>
                  <p className="mt-1 text-xs text-[#4d6f46]">
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
            <label className="mb-1.5 block text-sm text-[#584d45]">
              Nome <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9188]" />
              <input
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="field-brand w-full rounded-2xl bg-white py-3 pl-10 pr-4 text-sm text-gray-800"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Phone Field (Read-only) */}
          <div>
            <label className="mb-1.5 block text-sm text-[#584d45]">
              Telefone <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9188]" />
              <input
                type="tel"
                inputMode="tel"
                placeholder="(92) 99123-4567"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="field-brand w-full rounded-2xl bg-white py-3 pl-10 pr-4 text-sm text-gray-800"
                required
                disabled={isSubmitting}
              />
            </div>
            <p className="mt-1 text-xs text-[#8d8379]">
              Seu telefone será usado como identificador único.
            </p>
          </div>

          {error && (
            <div className="surface-accent flex gap-2 rounded-2xl px-4 py-3">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-accent" />
              <p className="text-sm text-accent">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!name.trim() || !phone.trim() || isSubmitting}
            className="cta-primary w-full rounded-2xl py-3 font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
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
            className="surface-earth w-full rounded-2xl py-3 font-medium text-brand-earth transition-colors hover:bg-[#ecddcf]"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}
