import { Link } from "react-router-dom";

function About() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-800">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm md:p-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#2C65F4]">
          FreelanceHub Somalia
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">About us</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600">
          We connect Somali freelancers with clients looking for professional digital services.
        </p>
        <p className="mt-4 leading-7 text-slate-600">
          Create a profile, discover projects that suit your skills, and build lasting professional relationships.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/signup" className="rounded-lg bg-[#2C65F4] px-5 py-3 font-semibold text-white hover:bg-blue-700">
            Join FreelanceHub
          </Link>
          <Link to="/jobs" className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100">
            Browse jobs
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
