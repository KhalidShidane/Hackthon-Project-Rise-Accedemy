import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="text-2xl font-bold text-[#2C65F4]">
          FreelanceHub
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-[#2C65F4]"
          >
            Home
          </Link>

          <Link
            to="/gigs"
            className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]"
          >
Dashboard          </Link>

          <Link
            to="/jobs"
            className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]"
          >
            Find Work
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="text-sm font-medium text-gray-600 hover:text-[#2C65F4]"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#2C65F4] sm:block"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-[#2C65F4] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;