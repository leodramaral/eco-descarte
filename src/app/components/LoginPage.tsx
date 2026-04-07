import { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { ArrowLeft, Leaf, LockKeyhole, Phone, LogIn, UserPlus, Home, ChevronRight } from "lucide-react";
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
              {userNotFound ? "Criar cadastro" : "Entrar com telefone"}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {userNotFound
                ? "Não encontramos uma conta com este telefone. Crie uma agora para começar!"
                : "Use o seu telefone para entrar localmente e continuar anunciando no EcoDescarte."}
            </p>
          </div>
          <div className="rounded-2xl border border-green-100 bg-white/80 p-3">
            <LockKeyhole className="h-5 w-5 text-green-700" />
          </div>
        </div>

        {userNotFound ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
              Para continuar com o telefone <strong>{phone}</strong>, você precisa criar uma conta nova.
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/register?next=${encodeURIComponent(nextPath)}&phone=${encodeURIComponent(phone)}`
                )
              }
              className="group w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white transition-all hover:shadow-lg hover:from-blue-700 hover:to-cyan-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-white/20 p-2.5">
                    <UserPlus className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm">Criar cadastro</div>
                    <div className="text-xs opacity-90">Nova conta no EcoDescarte</div>
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
              className="w-full rounded-2xl border-2 border-green-200 bg-white py-3.5 px-4 font-medium text-green-700 transition-all hover:bg-green-50"
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

            <button
              type="submit"
              className="group w-full rounded-2xl bg-green-600 p-4 text-white transition-all hover:bg-green-700 hover:shadow-lg"
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
              className="group w-full rounded-2xl border-2 border-blue-200 bg-blue-50 p-4 font-medium text-blue-700 transition-all hover:bg-blue-100 hover:border-blue-300"
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
