

import { Link } from "react-router-dom";
import jobSeekerImage from "../../assets/job-seeker-hero.png";

function Hero() {
  return (
    <section className="bg-[#f6f8ff]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#2C65F4]">
            Somalia&apos;s freelance marketplace
          </p>
          <h1 className="max-w-xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            Find Somali Talent For Your Next Project.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
            Connect with skilled freelancers, get great work donej, and grow your ideas with confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/signup"
              className="rounded-lg bg-[#2C65F4] px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Post a Job
            </Link>
            <Link
              to="/jobs"
              className="rounded-lg border border-[#2C65F4] px-6 py-3 text-sm font-semibold text-[#2C65F4] transition hover:bg-blue-50"
            >
              Find Work
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl shadow-lg">
          <img
            src={jobSeekerImage}
            alt="Somali job seeker looking for freelance work online"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
