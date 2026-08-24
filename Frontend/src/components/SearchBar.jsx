import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return <div className="flex flex-1 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3"><Search size={19} className="shrink-0 text-slate-400" /><input value={value} onChange={(event) => onChange(event.target.value)} className="w-full py-3 text-sm text-slate-800 outline-none" placeholder="Search skills, names, or keywords…" /></div>;
}
