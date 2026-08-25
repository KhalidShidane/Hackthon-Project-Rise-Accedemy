import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const footerLinks = {
  Explore: [["Find Talent", "/find-talent"], ["Find Projects", "/find-projects"], ["Categories", "/categories"]],
  Company: [["About", "/about"], ["Careers", "#"], ["Contact", "/contact"]],
  Support: [["Help Center", "#"], ["FAQ", "#"], ["Privacy Policy", "#"]],
};

function Footer() {
  return (
    <footer className="bg-[#3263E8] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="text-2xl font-bold text-white">Freelancer Hub <span className="text-amber-400">Somalia</span></Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-blue-100/75">Connecting Somali talent with global opportunities.</p>
          <div className="mt-6 flex items-center gap-3">
            {[FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => <a key={index} href="#" aria-label="Social media" className="grid h-9 w-9 place-items-center rounded-full border border-blue-100/20 text-blue-100 transition hover:bg-blue-100 hover:text-[#3263E8]"><Icon size={17} /></a>)}
          </div>
        </div>
        {Object.entries(footerLinks).map(([title, links]) => <div key={title}><h2 className="font-semibold text-white">{title}</h2><ul className="mt-4 space-y-3 text-sm">{links.map(([label, path]) => <li key={label}>{path === "#" ? <a href="#" className="transition hover:text-white">{label}</a> : <Link to={path} className="transition hover:text-white">{label}</Link>}</li>)}</ul></div>)}
      </div>
      <div className="border-t border-blue-100/15"><div className="mx-auto max-w-7xl px-5 py-5 text-center text-sm text-blue-100/60 sm:px-6 sm:text-left">© 2026 Freelancer Hub Somalia. All rights reserved.</div></div>
    </footer>
  );
}

export default Footer;
