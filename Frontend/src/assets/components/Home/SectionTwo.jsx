import { Link } from "react-router-dom";
import freelancersTeam from "../../somali-freelancers-team.png";

export default function SectionTwo() {
  return <section className="bg-[#f6f8ff] py-16 md:py-24"><div className="mx-auto max-w-7xl px-6"><div className="grid items-center gap-10 lg:grid-cols-2"><div><p className="text-sm font-semibold uppercase tracking-wider text-[#2C65F4]">Explore talent</p><h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Find help for every project</h2><p className="mt-4 text-lg leading-8 text-gray-600">Hire skilled Somali freelancers for the work that moves your business forward.</p><Link to="/freelancers" className="mt-7 inline-flex rounded-xl bg-[#2C65F4] px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">View all categories →</Link></div><img src={freelancersTeam} alt="Somali freelancers collaborating in a modern workspace" className="h-72 w-full rounded-3xl object-cover shadow-lg md:h-96"/></div></div></section>;
}
