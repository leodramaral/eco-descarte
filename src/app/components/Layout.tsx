import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Plus, User, Leaf } from "lucide-react";
import { CURRENT_USER } from "../data/mockData";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Início" },
    { path: "/add", icon: Plus, label: "Anunciar" },
    { path: `/profile/${CURRENT_USER.id}`, icon: User, label: "Perfil" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 space-y-3">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate("/")} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-green-700" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                Eco<span className="text-green-500">Descarte</span>
              </span>
            </button>
            <button
              onClick={() => navigate(`/profile/${CURRENT_USER.id}`)}
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-green-500"
            >
              <img
                src="https://images.unsplash.com/photo-1710357956769-232ef8e9e1aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80"
                alt="Perfil"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl mx-auto w-full pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
        <div className="max-w-2xl mx-auto flex">
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${
                  active ? "text-green-600" : "text-gray-400"
                }`}
              >
                {item.path === "/add" ? (
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center -mt-6 shadow-lg transition-colors ${
                      active ? "bg-green-700" : "bg-green-600"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <Icon className={`w-5 h-5 ${active ? "text-green-600" : "text-gray-400"}`} />
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
