import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound } from "lucide-react";
import { useAuth } from "../../context/auth";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="text-2xl font-bold text-[#2C65F4]">
          FreelanceHub
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-[#2C65F4]">Home</Link>
          <Link to="/jobs" className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]">Find Work</Link>
          <Link to="/freelancers" className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]">Find Talents</Link>
          <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]">About</Link>
          <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
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
      </div>
    </header>
  );
}

export default Header;
