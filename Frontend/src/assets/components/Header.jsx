import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, Menu, MessageCircle, UserRound, X } from "lucide-react";
import { useAuth } from "../../context/auth";

const navItems = [
  { name: "Find Talent", path: "/find-talent" },
  { name: "Find Projects", path: "/find-projects" },
  { name: "Categories", path: "/categories" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/login");
  }

  const navLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-50 hover:text-blue-800"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        <Link to="/" className="text-lg font-bold tracking-tight text-[#3263E8] sm:text-xl" onClick={closeMenu}>
          Freelancer Hub <span className="text-amber-500">Somalia</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => <NavLink key={item.name} to={item.path} className={navLinkClass} end={item.path === "/find-talent"}>{item.name}</NavLink>)}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-blue-800"><Bell size={19} /></button>
          <button aria-label="Messages" className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-blue-800"><MessageCircle size={19} /></button>
          {user ? (
            <div className="relative">
              <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Open user menu" className="grid h-10 w-10 place-items-center rounded-full bg-blue-50 text-[#2C65F4] transition hover:bg-blue-100"><UserRound size={22}/></button>
              {open && <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl"><p className="truncate text-lg font-bold text-slate-800">{user.name}</p><p className="mt-1 truncate text-sm text-slate-500">{user.email}</p><div className="mt-5 space-y-2"><Link onClick={() => setOpen(false)} to={`/profile/${user._id}`} className="block rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-bold text-[#2C65F4] hover:bg-blue-100">Profile</Link><Link onClick={() => setOpen(false)} to={`/profile/${user._id}`} className="block rounded-xl bg-slate-50 px-4 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-100">Settings</Link>{user.role === "admin" && <Link onClick={() => setOpen(false)} to="/admin/dashboard" className="block rounded-xl bg-[#2C65F4] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700">Admin Dashboard</Link>}</div><button onClick={handleLogout} className="mt-3 w-full rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100">Logout</button></div>}
            </div>
          ) : (
            <>
              <Link to="/login" className="hidden px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#2C65F4] sm:block">Login</Link>
              <Link to="/signup" className="rounded-lg bg-[#2C65F4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">Sign Up</Link>
            </>
          )}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden">
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {menuOpen && <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg lg:hidden">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => <NavLink key={item.name} to={item.path} className={navLinkClass} onClick={closeMenu} end={item.path === "/find-talent"}>{item.name}</NavLink>)}
        </nav>
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
          <button aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100"><Bell size={19} /></button>
          <button aria-label="Messages" className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100"><MessageCircle size={19} /></button>
          {user ? <button onClick={handleLogout} className="ml-auto rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600">Logout</button> : <>
            <Link to="/login" onClick={closeMenu} className="ml-auto px-3 py-2 text-sm font-semibold text-slate-700">Login</Link>
            <Link to="/signup" onClick={closeMenu} className="rounded-lg bg-[#3263E8] px-4 py-2 text-sm font-semibold text-white">Sign Up</Link>
          </>}
        </div>
      </div>}
    </header>
  );
}

export default Header;
