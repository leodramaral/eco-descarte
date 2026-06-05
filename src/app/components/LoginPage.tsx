import { useMemo } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { loginByPhone } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { normalizePhone } from "../utils/phone";
import { usePhoneInput } from "../hooks/usePhoneInput";
import { PhoneInput } from "./PhoneInput";

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
  const phone = usePhoneInput();

  const nextPath = useMemo(() => getNextPath(location.search), [location.search]);
  const currentUser = users.find((user) => user.id === currentUserId) ?? null;
  if (currentUser) {
    return <Navigate to={nextPath} replace />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedPhone = normalizePhone(phone.rawDigits);
    const matchingUser = users.find((candidate) => normalizePhone(candidate.phone) === normalizedPhone);

    if (!matchingUser) {
      navigate(
        `/register?next=${encodeURIComponent(nextPath)}&phone=${encodeURIComponent(phone.rawDigits)}`
      );
      return;
    }

    dispatch(loginByPhone(phone.rawDigits));
    navigate(nextPath, { replace: true });
  };

  return (
    <div className="px-4 pt-6 pb-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-1 text-sm text-[#655b53] focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded px-2 py-1"
        aria-label="Voltar para página anterior"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </button>

      <div className="rounded-[28px] border border-border bg-gradient-to-br from-brand-primary-soft via-white to-brand-earth-soft p-5 shadow-[0_20px_45px_rgba(56,45,34,0.08)]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[#201814]" style={{ fontSize: "1.45rem", fontWeight: 700 }}>
              Entrar com telefone
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#655b53]">
              Use o seu telefone para logar e continuar anunciando no Recolhe Aí.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
            <PhoneInput
              maskedValue={phone.maskedValue}
              onChange={phone.handleChange}
              onBlur={phone.handleBlur}
              error={phone.validationError}
            />

            <button
              type="submit"
              disabled={!phone.isValid}
              className="cta-primary group w-full rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              aria-label="Entrar no sistema"
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
              className="surface-accent group w-full rounded-2xl p-4 font-medium text-brand-accent-strong transition-colors hover:bg-[#f1d9c8] focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
              aria-label="Criar nova conta"
              style={{ color: '#a85d2e' }}
            >
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="h-5 w-5" />
                <span>Criar cadastro</span>
              </div>
            </button>
          </form>
      </div>
    </div>
  );
}
