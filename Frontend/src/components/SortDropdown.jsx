export default function SortDropdown({ value, onChange }) {
  return <label className="whitespace-nowrap text-sm text-slate-500">Sort by: <select value={value} onChange={(event) => onChange(event.target.value)} className="ml-1 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 outline-none"><option>Recommended</option><option>Highest Rated</option><option>Lowest Rate</option><option>Highest Rate</option><option>Most Experienced</option><option>Newest</option></select></label>;
}
