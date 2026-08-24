import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, Menu, MessageCircle, X } from "lucide-react";
import { useAuth } from "../../context/auth";

const navItems = [
  { name: "Find Talent", path: "/find-talent" },
  { name: "Find Projects", path: "/jobs" },
  { name: "Categories", path: "/find-talent#categories" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/login");
  }

  const navLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-semibold transition ${isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        <Link to="/" className="text-lg font-bold tracking-tight text-[#0d3d93] sm:text-xl" onClick={closeMenu}>
          Freelancer Hub <span className="text-amber-500">Somalia</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => item.name === "Categories" ? (
            <Link key={item.name} to={item.path} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700">{item.name}</Link>
          ) : <NavLink key={item.name} to={item.path} className={navLinkClass} end={item.path === "/find-talent"}>{item.name}</NavLink>)}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-blue-700"><Bell size={19} /></button>
          <button aria-label="Messages" className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-blue-700"><MessageCircle size={19} /></button>
          {user ? (
            <button onClick={handleLogout} className="ml-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Logout</button>
          ) : <>
            <Link to="/login" className="ml-2 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-blue-700">Login</Link>
            <Link to="/signup" className="rounded-lg bg-[#0d3d93] px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800">Sign Up</Link>
          </>}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden">
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {menuOpen && <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg lg:hidden">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => item.name === "Categories" ? (
            <Link key={item.name} to={item.path} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-600" onClick={closeMenu}>{item.name}</Link>
          ) : <NavLink key={item.name} to={item.path} className={navLinkClass} onClick={closeMenu} end={item.path === "/find-talent"}>{item.name}</NavLink>)}
        </nav>
        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4">
          <button aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100"><Bell size={19} /></button>
          <button aria-label="Messages" className="grid h-10 w-10 place-items-center rounded-lg text-slate-600 hover:bg-slate-100"><MessageCircle size={19} /></button>
          {user ? <button onClick={handleLogout} className="ml-auto rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600">Logout</button> : <>
            <Link to="/login" onClick={closeMenu} className="ml-auto px-3 py-2 text-sm font-semibold text-slate-700">Login</Link>
            <Link to="/signup" onClick={closeMenu} className="rounded-lg bg-[#0d3d93] px-4 py-2 text-sm font-semibold text-white">Sign Up</Link>
          </>}
        </div>
      </div>}
    </header>
  );
}

export default Header;
