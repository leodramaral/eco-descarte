import { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { ArrowLeft, Phone, LogIn, UserPlus, ChevronRight } from "lucide-react";
import { loginByPhone } from "../store/appSlice";
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

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { currentUserId, users } = useAppSelector((state) => state.appData);
  const [phone, setPhone] = useState("");
  const [userNotFound, setUserNotFound] = useState(false);

  const nextPath = useMemo(() => getNextPath(location.search), [location.search]);
  const currentUser = users.find((user) => user.id === currentUserId) ?? null;
  if (currentUser) {
    return <Navigate to={nextPath} replace />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedPhone = normalizePhone(phone);
    const matchingUser = users.find((candidate) => normalizePhone(candidate.phone) === normalizedPhone);

    if (!matchingUser) {
      setUserNotFound(true);
      return;
    }

    dispatch(loginByPhone(phone));
    navigate(nextPath, { replace: true });
  };

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
            <h1 className="text-[#201814]" style={{ fontSize: "1.45rem", fontWeight: 700 }}>
              {userNotFound ? "Criar cadastro" : "Entrar com telefone"}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#655b53]">
              {userNotFound
                ? "Não encontramos uma conta com este telefone. Crie uma agora para começar!"
                : "Use o seu telefone para logar e continuar anunciando no Recolhe Aí."}
            </p>
          </div>
        </div>

        {userNotFound ? (
          <div className="space-y-4">
            <div className="surface-earth rounded-2xl px-4 py-3 text-sm text-brand-earth">
              Para continuar com o telefone <strong>{phone}</strong>, você precisa criar uma conta nova.
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/register?next=${encodeURIComponent(nextPath)}&phone=${encodeURIComponent(phone)}`
                )
              }
              className="cta-secondary group w-full rounded-2xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/20 p-2.5">
                    <UserPlus className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">Criar cadastro</div>
                    <div className="text-xs opacity-90">Nova conta no Recolhe Aí</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setPhone("");
                setUserNotFound(false);
              }}
              className="w-full rounded-2xl border border-brand-primary bg-white px-4 py-3.5 font-medium text-brand transition-colors hover:bg-brand-primary-soft"
            >
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Tentar outro telefone
              </div>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm text-[#584d45]">
                Telefone
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9a9188]" />
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(92) 99123-4567"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="field-brand w-full rounded-2xl bg-white py-3 pl-10 pr-4 text-sm text-gray-800"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="cta-primary group w-full rounded-2xl p-4"
            >
              <div className="flex items-center justify-center gap-2">
                <LogIn className="h-5 w-5" />
                <span style={{ fontWeight: 700 }}>Entrar</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/register?next=${encodeURIComponent(nextPath)}`
                )
              }
              className="surface-accent group w-full rounded-2xl p-4 font-medium text-accent transition-colors hover:bg-[#f1d9c8]"
            >
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="h-5 w-5" />
                <span>Criar cadastro</span>
              </div>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
