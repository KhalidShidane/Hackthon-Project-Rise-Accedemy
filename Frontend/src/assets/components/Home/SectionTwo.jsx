import { Link } from "react-router-dom";

function SectionTwo() {
  const services = [
    ["💻", "Web & Software", "Websites, mobile apps, and digital solutions for your business."],
    ["🎨", "Design & Creative", "Branding, graphics, video editing, and social media content."],
    ["📈", "Marketing", "Reach more customers with digital marketing and content support."],
    ["✍️", "Writing & Translation", "Professional writing, Somali translation, and data entry services."],
  ];

  return (
    <section className="bg-[#f6f8ff] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#3263E8]">Explore talent</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Find help for every project</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Hire skilled Somali freelancers for the work that moves your business forward.
            </p>
          </div>
          <Link to="/freelancers" className="text-sm font-semibold text-[#3263E8] hover:text-blue-700">
            View all categories →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([icon, title, description]) => (
            <article key={title} className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-3xl" aria-hidden="true">{icon}</span>
              <h3 className="mt-5 text-xl font-bold text-gray-900">{title}</h3>
              <p className="mt-3 leading-7 text-gray-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SectionTwo;
