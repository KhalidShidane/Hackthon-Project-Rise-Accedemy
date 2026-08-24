import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Search, SlidersHorizontal, Star } from "lucide-react";

// Demo freelancers. Later, these can be loaded from MongoDB with Axios.
const freelancers = [
  { id: 1, name: "Hassan Mohamed", job: "Full Stack Developer", location: "Mogadishu", rate: 28, rating: 4.9, category: "Software Development", skills: ["React", "Node.js", "MongoDB"], color: "bg-blue-500" },
  { id: 2, name: "Farhia Ali", job: "UI/UX Designer", location: "Hargeisa", rate: 24, rating: 4.8, category: "Design & Creative", skills: ["Figma", "UI Design", "Prototype"], color: "bg-pink-500" },
  { id: 3, name: "Abdirahman Nur", job: "Digital Marketer", location: "Mogadishu", rate: 20, rating: 4.9, category: "Marketing", skills: ["SEO", "Social Media", "Content"], color: "bg-amber-500" },
  { id: 4, name: "Hodan Yusuf", job: "Graphic Designer", location: "Garowe", rate: 18, rating: 4.7, category: "Design & Creative", skills: ["Branding", "Photoshop", "Illustration"], color: "bg-emerald-500" },
  { id: 5, name: "Ismail Abdullahi", job: "Mobile App Developer", location: "Beledweyne", rate: 30, rating: 4.8, category: "Software Development", skills: ["Flutter", "React Native", "Firebase"], color: "bg-indigo-500" },
  { id: 6, name: "Sahra Osman", job: "Content Writer", location: "Hargeisa", rate: 16, rating: 4.9, category: "Writing & Translation", skills: ["Copywriting", "English", "Arabic"], color: "bg-orange-500" },
];

const categories = ["Software Development", "Design & Creative", "Writing & Translation"];
const locations = ["Anywhere in Somalia", "Mogadishu", "Hargeisa", "Garowe", "Kismayo", "Baidoa", "Beledweyne"];

function Freelancers() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["Software Development"]);
  const [location, setLocation] = useState("Anywhere in Somalia");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [savedUsers, setSavedUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("Top Rated");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const perPage = 3;

  // Search by name, job, or skill and filter by category.
  const filteredFreelancers = freelancers.filter((freelancer) => {
    const text = `${freelancer.name} ${freelancer.job} ${freelancer.skills.join(" ")}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(freelancer.category);
    const matchesLocation = location === "Anywhere in Somalia" || freelancer.location === location;
    const matchesMinRate = !minRate || freelancer.rate >= Number(minRate);
    const matchesMaxRate = !maxRate || freelancer.rate <= Number(maxRate);
    return matchesSearch && matchesCategory && matchesLocation && matchesMinRate && matchesMaxRate;
  });

  // Sort the results before showing them on the current page.
  const sortedFreelancers = [...filteredFreelancers].sort((a, b) => {
    if (sortBy === "Lowest Rate") return a.rate - b.rate;
    if (sortBy === "Highest Rate") return b.rate - a.rate;
    return b.rating - a.rating;
  });

  const totalPages = Math.ceil(sortedFreelancers.length / perPage) || 1;
  const visibleFreelancers = sortedFreelancers.slice((page - 1) * perPage, page * perPage);

  function toggleCategory(category) {
    if (selectedCategories.includes(category)) setSelectedCategories(selectedCategories.filter((item) => item !== category));
    else setSelectedCategories([...selectedCategories, category]);
    setPage(1);
  }

  function clearFilters() {
    setSelectedCategories([]);
    setLocation("Anywhere in Somalia");
    setMinRate("");
    setMaxRate("");
    setSearch("");
    setPage(1);
  }

  function toggleSaved(id) {
    if (savedUsers.includes(id)) setSavedUsers(savedUsers.filter((userId) => userId !== id));
    else setSavedUsers([...savedUsers, id]);
  }

  return (
    <main className="min-h-screen bg-[#f7f9fd] pb-16">
      <section className="bg-[#0d3d93] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6">
          <p className="text-sm font-semibold tracking-wide text-blue-200">FREELANCER HUB SOMALIA</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">Find the right talent for your next project.</h1>
          <p className="mt-4 max-w-2xl leading-7 text-blue-100">Find skilled Somali professionals for your business or project.</p>
          <div className="mt-8 flex max-w-3xl flex-col gap-3 rounded-xl bg-white p-2 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 px-3"><Search size={20} className="text-slate-400" /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} className="w-full py-2.5 text-sm text-slate-800 outline-none" placeholder="Search by name, skill, or service" /></div>
            <button className="rounded-lg bg-amber-500 px-7 py-3 text-sm font-bold text-white">Search</button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6"><div className="flex flex-col gap-6 md:flex-row">
        <div className="flex items-center justify-between md:hidden">
          <p className="text-sm text-slate-500"><b className="text-slate-800">{filteredFreelancers.length}</b> freelancers found</p>
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"><SlidersHorizontal size={16} />Filters</button>
        </div>
        <aside id="categories" className={`${filtersOpen ? "block" : "hidden"} rounded-xl border border-slate-200 bg-white p-5 md:block md:w-48 md:shrink-0 md:self-start lg:w-60`}>
          <h2 className="font-bold text-slate-900">Filters</h2>
          <div className="mt-5 border-t border-slate-100 pt-5"><h3 className="text-sm font-semibold text-slate-800">Category</h3><div className="mt-3 space-y-3">{categories.map((category) => <label key={category} className="flex cursor-pointer items-start gap-2 text-sm text-slate-600"><input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleCategory(category)} className="mt-0.5 h-4 w-4 rounded accent-blue-600" />{category}</label>)}</div></div>
          <div className="mt-6 border-t border-slate-100 pt-5"><label className="block text-sm font-semibold text-slate-800">Location<select value={location} onChange={(event) => { setLocation(event.target.value); setPage(1); }} className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-normal text-slate-600 outline-none">{locations.map((place) => <option key={place}>{place}</option>)}</select></label></div>
          <div className="mt-6 border-t border-slate-100 pt-5"><h3 className="text-sm font-semibold text-slate-800">Hourly Rate</h3><div className="mt-3 grid grid-cols-2 gap-2"><label className="text-xs text-slate-500">Min<input value={minRate} onChange={(event) => { setMinRate(event.target.value); setPage(1); }} type="number" min="0" placeholder="$" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none" /></label><label className="text-xs text-slate-500">Max<input value={maxRate} onChange={(event) => { setMaxRate(event.target.value); setPage(1); }} type="number" min="0" placeholder="$" className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none" /></label></div></div>
          <button onClick={clearFilters} className="mt-6 w-full rounded-lg border border-blue-600 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white">Clear Filters</button>
        </aside>

        <section className="min-w-0 flex-1">
          <div className="hidden items-center justify-between md:flex"><p className="text-sm text-slate-500"><b className="text-slate-800">{filteredFreelancers.length}</b> freelancers found</p><label className="text-sm text-slate-500">Sort by <select value={sortBy} onChange={(event) => { setSortBy(event.target.value); setPage(1); }} className="ml-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none"><option>Top Rated</option><option>Lowest Rate</option><option>Highest Rate</option></select></label></div>
          <label className="mt-4 block text-sm text-slate-500 md:hidden">Sort by <select value={sortBy} onChange={(event) => { setSortBy(event.target.value); setPage(1); }} className="ml-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 outline-none"><option>Top Rated</option><option>Lowest Rate</option><option>Highest Rate</option></select></label>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visibleFreelancers.map((freelancer) => {
            const isSaved = savedUsers.includes(freelancer.id);
            const initials = freelancer.name.split(" ").map((word) => word[0]).join("");
            return <article key={freelancer.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className={`grid h-14 w-14 place-items-center rounded-full ${freelancer.color} font-bold text-white`}>{initials}</div><div><h2 className="font-bold text-slate-900">{freelancer.name}</h2><p className="text-sm text-slate-500">{freelancer.job}</p></div></div><button onClick={() => toggleSaved(freelancer.id)} className={isSaved ? "text-rose-500" : "text-slate-400"} aria-label="Save freelancer"><Heart size={20} fill={isSaved ? "currentColor" : "none"} /></button></div>
              <div className="mt-5 flex flex-wrap gap-2">{freelancer.skills.map((skill) => <span key={skill} className="rounded-md bg-blue-50 px-2.5 py-1 text-xs text-blue-700">{skill}</span>)}</div>
              <p className="mt-5 flex items-center gap-1 text-sm"><Star size={16} className="fill-amber-400 text-amber-400" /><b>{freelancer.rating}</b><span className="text-slate-400">Top rated</span></p>
              <div className="mt-4 flex justify-between border-t border-slate-100 pt-4 text-sm"><span className="flex items-center gap-1 text-slate-500"><MapPin size={15} />{freelancer.location}</span><b>${freelancer.rate}/hr</b></div>
              <Link to={`/contact?freelancer=${freelancer.id}`} className="mt-5 block rounded-lg border border-blue-600 py-2.5 text-center text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white">View profile</Link>
            </article>;
          })}</div>
          {!visibleFreelancers.length && <p className="mt-6 rounded-xl bg-white p-10 text-center text-slate-500">No freelancers found. Try another search.</p>}
          {totalPages > 1 && <div className="mt-8 flex justify-center gap-2">{Array.from({ length: totalPages }, (_, index) => <button key={index} onClick={() => setPage(index + 1)} className={`h-9 w-9 rounded-lg text-sm font-semibold ${page === index + 1 ? "bg-blue-600 text-white" : "bg-white text-slate-600"}`}>{index + 1}</button>)}</div>}
        </section>
      </div></div>
    </main>
  );
}

export default Freelancers;
