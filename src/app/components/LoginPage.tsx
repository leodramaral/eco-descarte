import { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { ArrowLeft, Leaf, LockKeyhole, Phone } from "lucide-react";
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
  const [error, setError] = useState("");

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
      setError("Telefone nao encontrado.");
      return;
    }

    dispatch(loginByPhone(phone));
    setError("");
    navigate(nextPath, { replace: true });
  };

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
              Entrar com telefone
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Use o seu telefone para entrar localmente e continuar anunciando no EcoDescarte.
            </p>
          </div>
          <div className="rounded-2xl border border-green-100 bg-white/80 p-3">
            <LockKeyhole className="h-5 w-5 text-green-700" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm text-gray-700">
              Telefone
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(92) 99123-4567"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-800 outline-none transition-all focus:border-green-400 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>
          </div>

          {error && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-green-600 py-3 text-white transition-colors hover:bg-green-700"
            style={{ fontWeight: 700 }}
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full rounded-2xl border border-gray-200 bg-white py-3 text-gray-700 transition-colors hover:bg-gray-50"
            style={{ fontWeight: 600 }}
          >
            Continuar no catalogo
          </button>
        </form>
      </div>
    </div>
  );
}
