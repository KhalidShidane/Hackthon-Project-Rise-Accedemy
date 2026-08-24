function SectionOne() {
  const steps = [
    {
      number: "01",
      title: "Create your profile",
      description: "Tell clients about your skills, experience, and the services you offer.",
    },
    {
      number: "02",
      title: "Find the right opportunity",
      description: "Browse jobs that match your skills or post a project and receive proposals.",
    },
    {
      number: "03",
      title: "Work and grow",
      description: "Connect, collaborate, and build your career with Somali talent worldwide.",
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#2C65F4]">
            Simple and fast
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need to get started
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Whether you are looking for work or searching for talent, FreelanceHub makes it easy.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-gray-100 bg-[#f8faff] p-7 shadow-sm"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#2C65F4] text-sm font-bold text-white">
                {step.number}
              </span>
              <h3 className="mt-5 text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="mt-3 leading-7 text-gray-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SectionOne;
