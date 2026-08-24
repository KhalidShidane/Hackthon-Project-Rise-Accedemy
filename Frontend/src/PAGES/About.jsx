import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Code, Palette, Users } from "lucide-react";

const categories = [
  [Code, "Technology", "Developers and IT professionals"],
  [Palette, "Creative", "Designers and creative experts"],
  [Briefcase, "Business", "Professional services"],
];

function About() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] pb-20 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase tracking-widest text-[#2C65F4]">About FreelanceHub</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Better work begins with the right people.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">FreelanceHub connects clients with trusted talent and helps freelancers find meaningful opportunities.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/jobs" className="inline-flex items-center gap-2 rounded-lg bg-[#2C65F4] px-5 py-3 text-sm font-semibold text-white">Find work <ArrowRight size={17} /></Link>
            <Link to="/freelancers" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700">Find talent <Users size={17} /></Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {categories.map(([Icon, title, description]) => <article key={title} className="rounded-2xl bg-blue-50 p-6"><Icon className="text-blue-600" size={30} /><h2 className="mt-4 font-bold">{title}</h2><p className="mt-2 text-sm text-slate-600">{description}</p></article>)}
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
