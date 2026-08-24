
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#10182b] text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link to="/" className="text-2xl font-bold text-white">FreelanceHub Somalia</Link>
          <p className="mt-4 max-w-md leading-7 text-gray-400">
            A simple place for Somali professionals and businesses to connect, collaborate, and grow.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-white">For freelancers</h3>
          <div className="mt-4 space-y-3 text-sm">
            <Link to="/jobs" className="block hover:text-white">Find Work</Link>
            <Link to="/signup" className="block hover:text-white">Create Profile</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">For clients</h3>
          <div className="mt-4 space-y-3 text-sm">
            <Link to="/signup" className="block hover:text-white">Post a Job</Link>
            <Link to="/freelancers" className="block hover:text-white">Find Talent</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-sm text-gray-400 sm:flex-row sm:justify-between">
          <p>© 2026 FreelanceHub Somalia. All rights reserved.</p>
          <Link to="/about" className="hover:text-white">About us</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
