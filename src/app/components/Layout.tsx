import { Outlet, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { Home, Plus, User, PackageOpen } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useClarityContext } from "./ClarityProvider";
import { useClarityTags } from "./clarity";
import { hashPhone } from "../utils/clarity";
import { showImpactNudge } from "../utils/toast";
import { updateImpactNudgeShown, updateStreak } from "../store/appSlice";

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { currentUserId, users, lastImpactNudgeDate } = useAppSelector((state) => state.appData);
  const currentUser = users.find((user) => user.id === currentUserId) ?? null;
  const profileTarget = currentUser ? "/profile" : "/login?next=%2Fprofile";
  const addTarget = currentUser ? "/add" : "/login?next=%2Fadd";
  const { setUserStatus } = useClarityTags();
  const { identifyUser } = useClarityContext();
  const navItems = [
    { path: "/", target: "/", icon: Home, label: "Início" },
    { path: "/add", target: addTarget, icon: Plus, label: "Anunciar" },
    { path: "/profile", target: profileTarget, icon: User, label: "Perfil" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (currentUser) {
      setUserStatus("logged_in");
      identifyUser(hashPhone(currentUser.phone));
      dispatch(updateStreak());
    } else {
      setUserStatus("guest");
    }
  }, [currentUser, setUserStatus, identifyUser, dispatch]);

  // Show impact nudge if user hasn't seen it today
  useEffect(() => {
    if (!currentUser) return;

    const today = new Date().toDateString();
    const shouldShowNudge = lastImpactNudgeDate !== today && (currentUser.wasteAvoided > 0 || currentUser.itemsDiscarded > 0);

    if (shouldShowNudge && location.pathname === "/") {
      setTimeout(() => {
        showImpactNudge({
          wasteAvoided: currentUser.wasteAvoided,
          itemsDiscarded: currentUser.itemsDiscarded,
        });
        dispatch(updateImpactNudgeShown(today));
      }, 2000);
    }
  }, [currentUser, lastImpactNudgeDate, location.pathname, dispatch]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 shadow-[0_10px_30px_rgba(56,45,34,0.06)] backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate("/")} className="cursor-pointer flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded px-2 py-1" aria-label="Voltar para a página inicial">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D7E4D9] bg-[#EDF4EE]">
                <PackageOpen className="h-[17px] w-[17px] text-[#2F6B3D]" />
              </div>
              <span
                className="text-[1.08rem] leading-none tracking-[-0.02em] sm:text-[1.2rem]"
                style={{ fontFamily: "'Nunito Sans', sans-serif", fontWeight: 700 }}
              >
                <span className="text-[#2F6B3D]">Recolhe </span>
                <span className="text-[#C96E2E]">Aí</span>
              </span>
            </button>
            <button
              onClick={() => navigate(profileTarget)}
              aria-label={currentUser ? `Abrir perfil de ${currentUser.name}` : "Entrar ou abrir perfil"}
              aria-current={location.pathname === "/profile" || location.pathname.startsWith("/profile/") ? "page" : undefined}
              className={`cursor-pointer flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
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
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`cursor-pointer flex flex-1 flex-col items-center gap-0.5 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
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
