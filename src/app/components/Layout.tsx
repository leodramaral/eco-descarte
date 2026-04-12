import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Plus, User, Leaf } from "lucide-react";
import { useAppSelector } from "../store/hooks";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUserId, users } = useAppSelector((state) => state.appData);
  const currentUser = users.find((user) => user.id === currentUserId) ?? null;
  const profileTarget = currentUser ? "/profile" : "/login?next=%2Fprofile";
  const addTarget = currentUser ? "/add" : "/login?next=%2Fadd";

  const navItems = [
    { path: "/", target: "/", icon: Home, label: "Início" },
    { path: "/add", target: addTarget, icon: Plus, label: "Anunciar" },
    { path: "/profile", target: profileTarget, icon: User, label: "Perfil" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 shadow-[0_10px_30px_rgba(56,45,34,0.06)] backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate("/")} className="flex items-center gap-3">
              <div className="brand-mark flex h-9 w-9 items-center justify-center rounded-xl">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="brand-wordmark">
                <span className="brand-wordmark-base">Recolhe </span>
                <span className="brand-wordmark-highlight">Aí</span>
              </span>
            </button>
            <button
              onClick={() => navigate(profileTarget)}
              aria-label={currentUser ? `Abrir perfil de ${currentUser.name}` : "Entrar ou abrir perfil"}
              className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 transition-colors ${
                currentUser
                  ? "border-brand-primary bg-brand-primary-soft text-brand-primary-strong"
                  : "border-border bg-brand-earth-soft text-brand-earth"
              }`}
            >
              {currentUser ? (
                <img
                  src={currentUser.photo}
                  alt={`Perfil de ${currentUser.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white/95 shadow-[0_-10px_30px_rgba(56,45,34,0.08)] backdrop-blur-sm">
        <div className="max-w-2xl mx-auto flex">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.target)}
                className={`flex flex-1 flex-col items-center gap-0.5 py-2 transition-colors ${
                  active ? "nav-active" : "text-[#8b8177]"
                }`}
              >
                {item.path === "/add" ? (
                  <div
                    className={`-mt-6 flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                      active ? "cta-secondary" : "cta-primary"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <Icon className={`w-5 h-5 ${active ? "text-brand-primary-strong" : "text-[#9a9188]"}`} />
                )}
                <span
                  className="text-xs"
                  style={{
                    fontWeight: active ? 600 : 400,
                    marginTop: item.path === "/add" ? "2px" : "0",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
