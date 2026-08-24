import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/auth";
const API = "http://localhost:5000";
export default function AdminSettings() {
  const { token, login } = useAuth(); const [form, setForm] = useState({ name:"", email:"", username:"", password:"" }); const [notice, setNotice] = useState("");
  useEffect(() => { axios.get(`${API}/api/admin/profile`, { headers:{ Authorization:`Bearer ${token}` } }).then(({data}) => setForm({ name:data.user.name||"", email:data.user.email||"", username:data.user.username||"", password:"" })); }, [token]);
  const save = async (event) => { event.preventDefault(); const body={...form}; if(!body.password) delete body.password; try { const {data}=await axios.patch(`${API}/api/admin/profile`,body,{headers:{Authorization:`Bearer ${token}`}}); login(data); setForm({...form,password:""}); setNotice("Settings saved."); } catch(err) { setNotice(err.response?.data?.message||"Unable to save settings."); } };
  const input=(label,key,type="text")=><label className="block text-sm font-bold text-slate-700">{label}<input type={type} value={form[key]} required={key!=="password"} onChange={e=>setForm({...form,[key]:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#2C65F4]"/></label>;
  return <><p className="text-sm font-semibold text-blue-600">ADMIN SETTINGS</p><h1 className="mt-1 text-3xl font-bold">Account settings</h1><form onSubmit={save} className="mt-7 max-w-2xl rounded-2xl bg-white p-6 shadow-sm"><div className="grid gap-5 sm:grid-cols-2">{input("Full name","name")}{input("Email","email","email")}{input("Username","username")}{input("New password","password","password")}</div><p className="mt-3 text-xs text-slate-500">Leave password empty to keep it unchanged.</p>{notice&&<p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">{notice}</p>}<button className="mt-6 rounded-xl bg-[#2C65F4] px-5 py-3 font-bold text-white">Save changes</button></form></>;
}
