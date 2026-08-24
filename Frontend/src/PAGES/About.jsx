import React from "react";
import {
  Users,
  Briefcase,
  ShieldCheck,
  Star,
  Target,
  Eye,
  CheckCircle,
  ArrowRight,
  Code,
  Palette,
  Megaphone,
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "1,000+", label: "Freelancers" },
    { number: "500+", label: "Projects Completed" },
    { number: "300+", label: "Happy Clients" },
    { number: "95%", label: "Success Rate" },
  ];

  const services = [
    {
      icon: Users,
      title: "Find Skilled Freelancers",
      description:
        "Connect with talented Somali freelancers who can help bring your projects to life.",
    },
    {
      icon: Briefcase,
      title: "Post Your Projects",
      description:
        "Clients can easily post projects and find the right professional for their needs.",
    },
    {
      icon: ShieldCheck,
      title: "Trusted Platform",
      description:
        "We focus on creating a safe and professional environment for clients and freelancers.",
    },
    {
      icon: Star,
      title: "Ratings & Reviews",
      description:
        "Build trust through transparent ratings and reviews from completed projects.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description:
        "Showcase your skills, experience, services and portfolio.",
    },
    {
      number: "02",
      title: "Find Opportunities",
      description:
        "Browse projects that match your skills and interests.",
    },
    {
      number: "03",
      title: "Connect & Work",
      description:
        "Connect with clients, discuss requirements and complete the project.",
    },
    {
      number: "04",
      title: "Build Your Reputation",
      description:
        "Receive reviews and grow your professional profile.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white" />
          <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">

            <span className="mb-5 inline-block rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
              🇸🇴 Built for Somali Talent
            </span>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Empowering Somali
              <span className="block text-blue-200">
                Freelancers & Businesses
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">
              Freelancer Hub Somalia is a platform that connects talented
              Somali freelancers with clients looking for professional
              digital services.
            </p>

            {/* Design-only buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 shadow-lg transition hover:bg-blue-50"
              >
                Find Freelancers
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="rounded-xl border border-white/40 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Start Freelancing
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-b bg-gray-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4 lg:px-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-3xl font-extrabold text-blue-600">
                {stat.number}
              </h3>

              <p className="mt-1 text-sm font-medium text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Who We Are
            </span>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Connecting talent with opportunity
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Freelancer Hub Somalia is designed to create a professional
              digital marketplace where Somali freelancers can showcase
              their talents and connect with clients locally and globally.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Whether you are a developer, designer, marketer, writer,
              photographer or another professional, our platform gives you
              the opportunity to turn your skills into real opportunities.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Professional freelancer profiles",
                "Easy project discovery",
                "Transparent ratings and reviews",
                "Opportunities for Somali talent",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle
                    className="text-blue-600"
                    size={21}
                  />

                  <span className="font-medium text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 lg:p-12">
            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <Code className="mb-4 text-blue-600" size={32} />

                <h3 className="font-bold">
                  Technology
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Developers & IT professionals
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <Palette className="mb-4 text-purple-600" size={32} />

                <h3 className="font-bold">
                  Creative
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Designers & creative experts
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <Megaphone className="mb-4 text-orange-500" size={32} />

                <h3 className="font-bold">
                  Marketing
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Marketing professionals
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <Briefcase className="mb-4 text-green-600" size={32} />

                <h3 className="font-bold">
                  Business
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Professional services
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 md:grid-cols-2 lg:px-8">

          {/* Mission */}
          <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:shadow-md">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <Target
                className="text-blue-600"
                size={28}
              />
            </div>

            <h3 className="text-2xl font-bold">
              Our Mission
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              Our mission is to empower Somali professionals by creating
              accessible online opportunities where skills, businesses and
              clients can connect and grow together.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:shadow-md">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
              <Eye
                className="text-indigo-600"
                size={28}
              />
            </div>

            <h3 className="text-2xl font-bold">
              Our Vision
            </h3>

            <p className="mt-4 leading-7 text-gray-600">
              We envision a future where Somali talent can compete in the
              global digital economy and build successful careers through
              freelancing.
            </p>
          </div>

        </div>
      </section>

      {/* ================= WHAT WE OFFER ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
            What We Offer
          </span>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Everything you need to freelance
          </h2>

          <p className="mt-4 text-gray-600">
            A simple platform designed to make finding work and hiring
            professionals easier.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 transition group-hover:bg-blue-600">
                  <Icon
                    size={25}
                    className="text-blue-600 group-hover:text-white"
                  />
                </div>

                <h3 className="text-lg font-bold">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {service.description}
                </p>

              </div>
            );
          })}

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-wider text-blue-400">
              How It Works
            </span>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Start your journey in four simple steps
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {steps.map((step, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:border-blue-500"
              >

                <span className="text-4xl font-black text-blue-500">
                  {step.number}
                </span>

                <h3 className="mt-5 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-400">
                  {step.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-14 text-center shadow-xl md:px-16">

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to grow with Freelancer Hub?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Whether you are looking for professional talent or want to
            showcase your skills, Freelancer Hub Somalia is here for you.
          </p>

          {/* Design-only buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <button
              type="button"
              className="rounded-xl bg-white px-7 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Join Now
            </button>

            <button
              type="button"
              className="rounded-xl border border-white/40 px-7 py-3 font-bold text-white transition hover:bg-white/10"
            >
              Explore Projects
            </button>

          </div>

        </div>
      </section>

    </div>
  );
};

export default About;