import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiBriefcase, FiClock } from "react-icons/fi";
import { sampleProjects } from "../../../data/sampleProjects";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getImageUrl(image) {
  if (!image) return null;
  if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("data:")) return image;
  if (image.startsWith("/")) return `${API_URL}${image}`;
  return `${API_URL}/images/${image}`;
}

function getStatusClasses(status) {
  if (status === "Available") return "bg-blue-50 text-blue-700";
  if (status === "Pending") return "bg-amber-50 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

function isAvailable(status) {
  return status?.trim().toLowerCase() === "available";
}

function RecentWorks() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProjects() {
      try {
        const response = await fetch(`${API_URL}/project`, { signal: controller.signal });
        if (!response.ok) throw new Error("Could not load projects");
        const data = await response.json();
        setProjects(Array.isArray(data) && data.length ? data.slice(0, 3) : sampleProjects);
      } catch (error) {
        if (error.name !== "AbortError") setProjects(sampleProjects);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadProjects();
    return () => controller.abort();
  }, []);

  return (
    <section className="border-y border-blue-100 bg-[#f8faff] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#3263E8]">Fresh opportunities</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">Most Recent Work</h2>
            <p className="mt-3 text-lg text-gray-600">Discover projects recently posted by clients.</p>
          </div>
          <Link to="/jobs" className="inline-flex items-center gap-2 text-sm font-semibold text-[#3263E8] hover:text-blue-700">
            View all jobs <FiArrowRight aria-hidden="true" />
          </Link>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => <div key={item} className="h-72 animate-pulse rounded-2xl bg-white" />)}
          </div>
        ) : projects.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <article key={project._id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                {getImageUrl(project.image) ? (
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.name}
                    className="h-44 w-full object-cover"
                    onError={(event) => { event.currentTarget.style.display = "none"; }}
                  />
                ) : null}
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#3263E8]"><FiBriefcase size={21} /></span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(project.status)}`}>{project.status}</span>
                  </div>
                  <p className="mt-5 text-sm font-semibold text-[#3263E8]">{project.category}</p>
                  <h3 className="mt-2 text-xl font-bold text-gray-900">{project.name}</h3>
                  <p className="mt-3 flex-1 leading-7 text-gray-600">{project.description}</p>
                  {isAvailable(project.status) && (
                    <Link to={`/contact?project=${project._id}&client=${project.client?._id || ""}&projectName=${encodeURIComponent(project.name)}`} className="mt-5 rounded-lg bg-[#3263E8] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700">
                      Apply for Job
                    </Link>
                  )}
                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                    <span className="font-bold text-gray-900">Budget: {project.Budget}</span>
                    <span className="inline-flex items-center gap-1 text-gray-500"><FiClock /> {project.deadline} days</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-blue-200 bg-white px-6 py-12 text-center">
            <FiBriefcase className="mx-auto text-[#3263E8]" size={30} />
            <h3 className="mt-4 text-xl font-bold text-gray-900">No projects posted yet</h3>
            <p className="mt-2 text-gray-600">Check back soon for new freelance opportunities.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentWorks;
