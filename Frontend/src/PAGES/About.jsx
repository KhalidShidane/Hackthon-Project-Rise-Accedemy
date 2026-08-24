import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] pb-20 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#2C65F4]">About FreelanceHub</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">Better work begins with the right people.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">FreelanceHub is a simple place for clients to find trusted talent and for freelancers to find meaningful opportunities.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/jobs" className="inline-flex items-center gap-2 rounded-lg bg-[#2C65F4] px-5 py-3 text-sm font-semibold text-white">Find work <ArrowRight size={17} /></Link>
              <Link to="/freelancers" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700">Find talents <Users size={17} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-widest text-[#2C65F4]">What we believe</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Work should feel clear, human, and worth doing.</h2><p className="mt-5 leading-7 text-slate-600">We remove the friction from finding the right match, so good ideas can move from conversation to finished work with confidence.</p></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["People first", "Meet skilled professionals through real profiles, clear experience, and direct communication."],
            ["Work that matters", "Find projects that match your skills, goals, and the kind of work you want to be known for."],
            ["Built on trust", "Create strong working relationships with simple tools for introductions, messages, and collaboration."],
          ].map(([title, text]) => <article key={title} className="border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8"><div className="grid gap-8 rounded-xl bg-slate-900 p-8 text-white sm:p-12 md:grid-cols-[1fr_auto] md:items-center"><div><h2 className="text-2xl font-bold sm:text-3xl">A better project is one good conversation away.</h2><p className="mt-3 max-w-2xl leading-7 text-slate-300">Start with a job, a skill, or an idea. FreelanceHub helps you take the next step.</p></div><div className="flex items-center gap-2 text-sm font-semibold text-emerald-300"><CheckCircle2 size={19} /> Ready to connect</div></div></section>
    </main>
  );
}

export default About;
