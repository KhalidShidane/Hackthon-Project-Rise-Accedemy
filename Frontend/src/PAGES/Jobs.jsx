import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiBriefcase, FiClock } from "react-icons/fi";
import { sampleProjects } from "../data/sampleProjects";

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
  return "bg-gray-100 text-gray-700";
}

function isAvailable(status) {
  return status?.trim().toLowerCase() === "available";
}

function Jobs() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    async function loadJobs() {
      try {
        const response = await fetch(`${API_URL}/project`, { signal: controller.signal });
        if (!response.ok) throw new Error("Could not load jobs");
        const data = await response.json();
        setProjects(Array.isArray(data) && data.length ? data : sampleProjects);
      } catch (error) {
        if (error.name !== "AbortError") setProjects(sampleProjects);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadJobs();
    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8faff] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#3263E8]">FreelanceHub Somalia</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">All Jobs</h1>
        <p className="mt-4 text-lg text-gray-600">Browse projects and invite the jobs that are available.</p>

        {loading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-72 animate-pulse rounded-2xl bg-white" />)}</div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article key={project._id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                {getImageUrl(project.image) && (
                  <img
                    src={getImageUrl(project.image)}
                    alt={project.name}
                    className="h-44 w-full object-cover"
                    onError={(event) => { event.currentTarget.style.display = "none"; }}
                  />
                )}
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#3263E8]"><FiBriefcase size={21} /></span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(project.status)}`}>{project.status}</span>
                </div>
                {isAvailable(project.status) && (
                  <Link to={`/contact?project=${project._id}`} className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-[#3263E8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
                    Invite Job
                  </Link>
                )}
                <p className="mt-5 text-sm font-semibold text-[#3263E8]">{project.category}</p>
                <h2 className="mt-2 text-xl font-bold text-gray-900">{project.name}</h2>
                <p className="mt-3 flex-1 leading-7 text-gray-600">{project.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-sm"><span className="font-bold text-gray-900">{project.Budget}</span><span className="inline-flex items-center gap-1 text-gray-500"><FiClock /> {project.deadline} days</span></div>
                {!isAvailable(project.status) && (
                  <span className="mt-5 rounded-lg bg-gray-100 px-4 py-2.5 text-center text-sm font-semibold text-gray-500">{project.status}</span>
                )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Jobs;
