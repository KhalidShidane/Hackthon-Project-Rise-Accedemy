import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function CompanyDashboard() {
  const { user, token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`${API_URL}/project`).then((response) => response.json()).then((data) => {
      setProjects((Array.isArray(data) ? data : []).filter((project) => (project.client?._id || project.client) === user._id));
    }).finally(() => setLoading(false));
  }, [user]);

  if (user?.role !== "company") return <Navigate to="/" replace />;
  const active = projects.filter((project) => project.status === "Available").length;
  return <main className="min-h-screen bg-slate-50 p-6 md:p-10"><div className="mx-auto max-w-6xl"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold text-[#2C65F4]">COMPANY DASHBOARD</p><h1 className="mt-1 text-3xl font-bold text-slate-900">Welcome, {user.name}</h1></div><Link to="/jobs" className="rounded-lg bg-[#2C65F4] px-4 py-2 text-sm font-semibold text-white">Post a Project</Link></div><div className="mt-8 grid gap-4 sm:grid-cols-3">{[["Total Projects", projects.length],["Active Projects", active],["Pending Proposals", "0"]].map(([label,value])=><div key={label} className="rounded-xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{loading ? "…" : value}</p></div>)}</div><section className="mt-8 rounded-xl bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Recent Projects</h2>{projects.length ? <div className="mt-4 space-y-3">{projects.slice(0,5).map((project)=><div key={project._id} className="flex justify-between border-b py-3"><span>{project.name}</span><span className="text-sm text-slate-500">{project.status}</span></div>)}</div> : <p className="mt-4 text-slate-500">No projects found.</p>}</section></div></main>;
}
export default CompanyDashboard;
