import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  Wallet,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const imageUrl = user.profileImage
    ? `http://localhost:5000/images/${user.profileImage}`
    : "";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/login");
  };

  const pages = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "My Projects", icon: Briefcase },
    { name: "Proposals", icon: FileText },
    { name: "Messages", icon: MessageSquare },
    { name: "Earnings", icon: Wallet },
    { name: "Profile", icon: User },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static z-50 top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b">
          <h1 className="text-2xl font-bold text-blue-600">
            FreeLance
          </h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {pages.map((page, index) => {
            const Icon = page.icon;

            return (
              <button
                key={page.name}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <Icon size={19} />
                {page.name}
              </button>
            );
          })}

          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50">
            <LogOut size={19} />
            Logout
          </button>
        </nav>

        <div className="absolute bottom-5 left-4 right-4 bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-3">
            {imageUrl ? (
              <img src={imageUrl} alt={`${user.name || "User"} profile`} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">{(user.name || "U").charAt(0).toUpperCase()}</div>
            )}

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {user.name || "User"}
              </p>
              <p className="text-xs text-gray-500">
                {user.role || "Member"}
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="h-20 bg-white border-b flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600"
            >
              <Menu size={24} />
            </button>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Dashboard
              </h2>
              <p className="text-sm text-gray-500 hidden sm:block">
                Welcome back
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none px-2 text-sm"
              />
            </div>

            <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {imageUrl ? (
              <img src={imageUrl} alt={`${user.name || "User"} profile`} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">{(user.name || "U").charAt(0).toUpperCase()}</div>
            )}
          </div>
        </header>

        <section className="p-4 md:p-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Welcome Back 👋
            </h3>
            <p className="text-gray-500 mt-1">
              Manage your freelance work
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FreelancerDashboard;
