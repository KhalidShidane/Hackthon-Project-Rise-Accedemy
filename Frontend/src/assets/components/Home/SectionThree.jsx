import { Link } from "react-router-dom";

function SectionThree() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl bg-[#3263E8] px-7 py-12 text-center text-white sm:px-12 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">Join FreelanceHub Somalia</p>
          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
            Ready to turn your skills into opportunities?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-blue-100">
            Build your profile today and connect with clients looking for Somali talent.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#3263E8] transition hover:bg-blue-50">
              Create a Profile
            </Link>
            <Link to="/jobs" className="rounded-lg border border-white px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SectionThree;
