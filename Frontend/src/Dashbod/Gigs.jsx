<<<<<<< HEAD
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> 69adec74eff2a25ca5f0c90b479e6e2f137e2016
import {
  LayoutDashboard,
  Store,
  BriefcaseBusiness,
  Users,
  MessageSquare,
  BarChart3,
  FileText,
  Download,
  UserRound,
  Wallet,
  ChevronLeft,
} from "lucide-react";

<<<<<<< HEAD
const menuItems = [
  {
    title: "MAIN",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, active: true },
      { name: "Gigs", icon: Store },
      { name: "Projects", icon: BriefcaseBusiness },
      { name: "Freelancers", icon: Users },
      { name: "Messages", icon: MessageSquare, badge: 1 },
    ],
  },
  {
    title: "TOOLS",
    items: [
      { name: "Analytics", icon: BarChart3 },
      { name: "Invoices", icon: FileText },
      { name: "Export", icon: Download },
      { name: "Profile", icon: UserRound },
    ],
  },
];
=======
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
>>>>>>> 69adec74eff2a25ca5f0c90b479e6e2f137e2016

 function Gigs() {
  return (
<<<<<<< HEAD
    <aside className="fixed left-0 top-0 flex h-screen w-[255px] flex-col border-r border-gray-200 bg-white">
      <div className="flex h-[72px] items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
            <BriefcaseBusiness size={21} />
          </div>

=======
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
>>>>>>> 69adec74eff2a25ca5f0c90b479e6e2f137e2016
          <div>
            <h1 className="text-[18px] font-bold leading-tight text-gray-900">
              FreelanceHub
            </h1>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-400">
              WEB3 MARKETPLACE
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100">
          <ChevronLeft size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pt-2">
        {menuItems.map((section, sectionIndex) => (
          <div
            key={section.title}
            className={sectionIndex !== 0 ? "mt-4" : ""}
          >
            <p className="mb-2 px-3 text-[12px] font-bold tracking-wide text-gray-400">
              {section.title}
            </p>

            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    className={`group relative flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-[15px] font-medium transition-all ${
                      item.active
                        ? "bg-emerald-50 text-emerald-500"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {item.active && (
                      <span className="absolute left-0 top-2 h-7 w-1 rounded-r-full bg-emerald-500" />
                    )}

                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      className={
                        item.active
                          ? "text-emerald-500"
                          : "text-gray-600 group-hover:text-gray-900"
                      }
                    />

                    <span>{item.name}</span>

                    {item.badge && (
                      <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[11px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {sectionIndex === 0 && (
              <div className="mt-3 border-t border-gray-200" />
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-3">
        <div className="mb-3 flex h-9 items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="text-[12px] font-semibold text-amber-700">
            Demo Mode
          </span>
        </div>

        <button className="flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-[14px] font-medium text-white transition hover:bg-gray-800">
          <Wallet size={17} />
          Connect Wallet
        </button>
      </div>
    </aside>
  );
}
export default Gigs;
=======
export default FreelancerDashboard;
>>>>>>> 69adec74eff2a25ca5f0c90b479e6e2f137e2016
