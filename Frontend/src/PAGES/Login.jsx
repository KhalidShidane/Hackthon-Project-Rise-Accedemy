import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/auth";

const API_URL = "http://localhost:5000/user";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/login`, form);
      login(data);
      navigate(data.user.role === "admin" ? "/admin/dashboard" : "/dashboard");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-81px)] bg-slate-50 px-4 py-12">
      <section className="mx-auto w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold text-[#3263E8]">WELCOME BACK</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Login to your account</h1>
        <p className="mt-2 text-sm text-slate-500">Continue as a client, freelancer, or admin.</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#3263E8] focus:ring-2 focus:ring-blue-100" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input name="password" type="password" value={form.password} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#3263E8] focus:ring-2 focus:ring-blue-100" />
          </label>

          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          <button disabled={loading} className="w-full rounded-lg bg-[#3263E8] py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">Don't have an account? <Link to="/signup" className="font-semibold text-[#3263E8]">Sign up</Link></p>
      </section>
    </main>
  );
}

export default Login;
