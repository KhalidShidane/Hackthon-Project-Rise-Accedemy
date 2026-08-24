import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  BriefcaseBusiness,
  Download,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Search,
  Store,
  UserRound,
  Users,
} from "lucide-react";
import { useAuth } from "../context/auth";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, active: true },
  { name: "Gigs", icon: Store },
  { name: "Projects", icon: BriefcaseBusiness },
  { name: "Freelancers", icon: Users },
  { name: "Messages", icon: MessageSquare, badge: 1 },
  { name: "Analytics", icon: BarChart3 },
  { name: "Invoices", icon: FileText },
  { name: "Export", icon: Download },
];

function ProfileAvatar({ user }) {
  const imageUrl = user?.profileImage ? `http://localhost:5000/images/${user.profileImage}` : "";

  if (imageUrl) {
    return <img src={imageUrl} alt={`${user.name} profile`} className="h-10 w-10 rounded-full object-cover" />;
  }

  return <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-[#3263E8]">{(user?.name || "U").charAt(0).toUpperCase()}</div>;
}

function Gigs() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:pl-[255px]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[255px] flex-col border-r border-gray-200 bg-white lg:flex">
        <div className="flex h-[72px] items-center gap-3 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3263E8] text-white shadow-sm"><BriefcaseBusiness size={21} /></div>
          <div><h1 className="text-[18px] font-bold text-gray-900">FreelanceHub</h1><p className="text-[10px] font-medium tracking-wider text-gray-400">WEB3 MARKETPLACE</p></div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return <button key={item.name} className={`relative flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-[15px] font-medium transition-colors ${item.active ? "bg-blue-50 text-[#3263E8]" : "text-gray-600 hover:bg-blue-50 hover:text-[#3263E8]"}`}>
              <Icon size={20} /><span>{item.name}</span>{item.badge && <span className="ml-auto rounded-full bg-orange-500 px-1.5 text-[11px] text-white">{item.badge}</span>}
            </button>;
          })}
          <button className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-[15px] font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-[#3263E8]"><UserRound size={20} />Profile</button>
        </nav>

        <div className="border-t border-gray-200 p-3">
          <button onClick={handleLogout} className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 text-[14px] font-medium text-white hover:bg-gray-800"><LogOut size={17} />Logout</button>
        </div>
      </aside>

      <main>
        <header className="flex h-[72px] items-center justify-between border-b border-gray-200 bg-white px-5 md:px-8">
          <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
          <div className="flex items-center gap-4">
            <label className="hidden items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 md:flex"><Search size={18} className="text-gray-400" /><input placeholder="Search..." className="w-36 bg-transparent text-sm outline-none" /></label>
            <div className="flex items-center gap-2"><ProfileAvatar user={user} /><div className="hidden sm:block"><p className="text-sm font-semibold text-gray-800">{user?.name || "User"}</p><p className="text-xs capitalize text-gray-500">{user?.role || "Member"}</p></div></div>
          </div>
        </header>

        <section className="p-5 md:p-8"><h3 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name || "User"}!</h3><p className="mt-1 text-gray-500">Manage your freelance work from one place.</p></section>
      </main>
    </div>
  );
}

export default Gigs;
