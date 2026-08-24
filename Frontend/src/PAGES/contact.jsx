import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("project") || "";
  const clientId = searchParams.get("client") || "";
  const projectName = searchParams.get("projectName") || "";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: projectId ? "Job Application" : "General",
    message: projectName ? `I would like to apply for: ${projectName}.` : "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          project: projectId || undefined,
          receiver: clientId || undefined,
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Farriinta lama diri karin.");

      setStatus({ type: "success", message: "Farriintaada waa la diray. Waad mahadsan tahay!" });
      setFormData({ name: "", email: "", subject: "General", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Waxbaa qaldamay. Fadlan mar kale isku day." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="bg-blue-600 p-8 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Nala Soo Xiriir
            </h2>

            <p className="text-blue-100 mb-6">
              Ma leedahay wax su'aal ah ama ma u baahan tahay caawinaad?
              Nagala soo xiriir foomka ama macluumaadka hoose.
            </p>

            <div className="space-y-4">
              <p className="flex items-center gap-3">
                <span>📍</span>
                Mogadishu, Somalia
              </p>

              <p className="flex items-center gap-3">
                <span>✉️</span>
                support@freelancehub.com
              </p>

              <p className="flex items-center gap-3">
                <span>📞</span>
                +252 61 XXXXXXX
              </p>
            </div>
          </div>

          <div className="mt-8 text-sm text-blue-200">
            Saacadaha shaqada: Sabti - Khamiis (8:00 AM - 5:00 PM)
          </div>
        </div>

        <div className="p-8">
          {projectName && (
            <p className="mb-5 rounded-lg bg-blue-50 p-3 text-sm font-medium text-blue-700">
              Applying for: {projectName}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Magacaaga
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ahmad Ali"
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email-kaaga
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="ahmad@example.com"
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mawduuca
              </label>

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="General">Su'aal Guud</option>
                <option value="Freelancer">U baahan Freelancer</option>
                <option value="Work">Shaqo Raadin</option>
                <option value="Support">Cillad Bixin / Caawinaad</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Farriintaada
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                required
                placeholder="Halkan ku qor farriintaada..."
                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              {isSending ? "Waa la dirayaa..." : "Dir Farriinta"}
            </button>
            {status.message && (
              <p className={`rounded-lg p-3 text-sm ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
