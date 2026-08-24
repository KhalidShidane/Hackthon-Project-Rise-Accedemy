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
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "client", profileImage: null, companyName: "", businessType: "", website: "", bio: "" });
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
      formData.append("name", form.role === "client" ? form.companyName : form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("role", form.role);
      if (form.role === "client") {
        formData.append("companyName", form.companyName);
        formData.append("businessType", form.businessType);
        formData.append("website", form.website);
      } else {
        formData.append("bio", form.bio);
      }
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
        <p className="text-sm font-semibold text-[#2C65F4]">CREATE ACCOUNT</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Join FreelanceHub</h1>
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          {form.role === "freelancer" && <label className="block text-sm font-medium text-slate-700">Full name<input name="name" value={form.name} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#2C65F4] focus:ring-2 focus:ring-blue-100" /></label>}
          <label className="block text-sm font-medium text-slate-700">Email<input name="email" type="email" value={form.email} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#2C65F4] focus:ring-2 focus:ring-blue-100" /></label>
          <label className="block text-sm font-medium text-slate-700">Password<input name="password" type="password" minLength="6" value={form.password} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-[#2C65F4] focus:ring-2 focus:ring-blue-100" /></label>
          <label className="block text-sm font-medium text-slate-700">Profile photo <span className="font-normal text-slate-400">(optional)</span><input name="profileImage" type="file" accept="image/*" onChange={handleChange} className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-[#2C65F4] hover:file:bg-blue-100" /></label>

          <fieldset>
            <legend className="text-sm font-medium text-slate-700">Choose your role</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {roles.map((role) => (
                <label key={role.value} className={`cursor-pointer rounded-xl border p-3 transition ${form.role === role.value ? "border-[#2C65F4] bg-blue-50" : "border-slate-200 hover:border-blue-300"}`}>
                  <input className="sr-only" type="radio" name="role" value={role.value} checked={form.role === role.value} onChange={handleChange} />
                  <span className="block text-sm font-bold text-slate-800">{role.label}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">{role.description}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {form.role === "client" && <div className="space-y-5 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <div><h2 className="text-sm font-bold text-slate-800">Company details</h2><p className="mt-1 text-xs text-slate-500">Use your company information to create the client account.</p></div>
            <label className="block text-sm font-medium text-slate-700">Company name<input name="companyName" value={form.companyName} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-[#2C65F4] focus:ring-2 focus:ring-blue-100" /></label>
            <label className="block text-sm font-medium text-slate-700">Business type<select name="businessType" value={form.businessType} onChange={handleChange} required className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-[#2C65F4] focus:ring-2 focus:ring-blue-100"><option value="">Select business type</option><option>Technology</option><option>Retail & E-commerce</option><option>Marketing & Media</option><option>Education</option><option>Other</option></select></label>
            <label className="block text-sm font-medium text-slate-700">Company website <span className="font-normal text-slate-400">(optional)</span><input name="website" type="url" value={form.website} onChange={handleChange} placeholder="https://example.com" className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-[#2C65F4] focus:ring-2 focus:ring-blue-100" /></label>
          </div>}

          {form.role === "freelancer" && <label className="block rounded-xl border border-violet-100 bg-violet-50/50 p-4 text-sm font-medium text-slate-700">Professional description<textarea name="bio" value={form.bio} onChange={handleChange} required rows="4" maxLength="500" placeholder="Tell clients about your experience, services, and the work you do." className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-[#2C65F4] focus:ring-2 focus:ring-blue-100" /></label>}

          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button disabled={loading} className="w-full rounded-lg bg-[#2C65F4] py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Creating account..." : "Create account"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">Already have an account? <Link to="/login" className="font-semibold text-[#2C65F4]">Login</Link></p>
      </section>
    </main>
  );
}

export default Signup;
