import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";

const API_URL = "http://localhost:5000/user";
const roles = [
  { value: "client", label: "Client", description: "Post projects and hire freelancers." },
  { value: "freelancer", label: "Freelancer", description: "Find work and manage your gigs." },
];

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "client", profileImage: null });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const value = event.target.type === "file" ? event.target.files[0] : event.target.value;
    setForm({ ...form, [event.target.name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("role", form.role);
      if (form.profileImage) formData.append("profileImage", form.profileImage);

      const { data } = await axios.post(`${API_URL}/signup`, formData);
      login(data);
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not create your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-81px)] bg-slate-50 px-4 py-12">
      <section className="mx-auto w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold text-[#3263E8]">CREATE ACCOUNT</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Join FreelanceHub</h1>
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <label className="block text-sm font-medium text-slate-700">Full name<input name="name" value={form.name} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#3263E8] focus:ring-2 focus:ring-blue-100" /></label>
          <label className="block text-sm font-medium text-slate-700">Email<input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#3263E8] focus:ring-2 focus:ring-blue-100" /></label>
          <label className="block text-sm font-medium text-slate-700">Password<input name="password" type="password" minLength="6" value={form.password} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#3263E8] focus:ring-2 focus:ring-blue-100" /></label>
          <label className="block text-sm font-medium text-slate-700">Profile photo <span className="font-normal text-slate-400">(optional)</span><input name="profileImage" type="file" accept="image/*" onChange={handleChange} className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-[#3263E8] hover:file:bg-blue-100" /></label>

          <fieldset>
            <legend className="text-sm font-medium text-slate-700">Choose your role</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {roles.map((role) => (
                <label key={role.value} className={`cursor-pointer rounded-xl border p-3 transition ${form.role === role.value ? "border-[#3263E8] bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}>
                  <input className="sr-only" type="radio" name="role" value={role.value} checked={form.role === role.value} onChange={handleChange} />
                  <span className="block text-sm font-bold text-slate-800">{role.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">{role.description}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={loading} className="w-full rounded-lg bg-[#3263E8] py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Creating account..." : "Create account"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">Already have an account? <Link to="/login" className="font-semibold text-[#3263E8]">Login</Link></p>
      </section>
    </main>
  );
}

export default Signup;
