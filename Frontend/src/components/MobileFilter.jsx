import { SlidersHorizontal } from "lucide-react";

export default function MobileFilter({ onClick }) {
  return <div className="flex justify-end md:hidden"><button onClick={onClick} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"><SlidersHorizontal size={16} />Filters</button></div>;
}
