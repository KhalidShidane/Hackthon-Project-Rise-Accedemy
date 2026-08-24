import React from "react";
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

function Gigs() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[255px] flex-col border-r border-gray-200 bg-white">
      <div className="flex h-[72px] items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-sm">
            <BriefcaseBusiness size={21} />
          </div>

          <div>
            <h1 className="text-[18px] font-bold leading-tight text-gray-900">
              FreelanceHub
            </h1>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-400">
              WEB3 MARKETPLACE
            </p>
          </div>
        </div>

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