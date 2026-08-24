import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
          {user && <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]">Dashboard</Link>}
          <Link to="/jobs" className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]">Find Work</Link>
          <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]">About</Link>
          <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-right text-sm sm:block">
                <span className="block font-semibold text-gray-700">{user.name}</span>
                <span className="capitalize text-xs text-[#2C65F4]">{user.role}</span>
              </span>
              <button onClick={handleLogout} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50">Logout</button>
            </>
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
