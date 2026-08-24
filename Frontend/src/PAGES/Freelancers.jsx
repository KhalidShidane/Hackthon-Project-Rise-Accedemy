import { useEffect, useMemo, useState } from "react";
import { UsersRound } from "lucide-react";
import { freelancers as defaultFreelancers } from "../data/freelancers";
import { freelancerApi } from "../services/api";
import FilterSidebar from "../components/FilterSidebar";
import FreelancerCard from "../components/FreelancerCard";
import InviteModal from "../components/InviteModal";
import MobileFilter from "../components/MobileFilter";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";

function Freelancers() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["Software Development"]);
  const [location, setLocation] = useState("Anywhere in Somalia");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [sortBy, setSortBy] = useState("Recommended");
  const [page, setPage] = useState(1);
  const [savedUsers, setSavedUsers] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [invitedFreelancer, setInvitedFreelancer] = useState(null);
  const [freelancerData, setFreelancerData] = useState(defaultFreelancers);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const perPage = 6;

  useEffect(() => {
    freelancerApi.getAll().then((data) => {
      const apiFreelancers = Array.isArray(data) ? data : data.freelancers;
      if (Array.isArray(apiFreelancers) && apiFreelancers.length) setFreelancerData(apiFreelancers);
    }).catch(() => {
      setApiError("Live freelancer data is unavailable. Showing demo profiles.");
    }).finally(() => setIsLoading(false));
  }, []);

  const results = useMemo(() => freelancerData.filter((freelancer) => {
    const searchText = `${freelancer.name} ${freelancer.title} ${freelancer.description} ${freelancer.skills.join(" ")}`.toLowerCase();
    return searchText.includes(search.toLowerCase()) &&
      (selectedCategories.length === 0 || selectedCategories.includes(freelancer.category)) &&
      (location === "Anywhere in Somalia" || freelancer.location === location) &&
      (!minRate || freelancer.hourlyRate >= Number(minRate)) &&
      (!maxRate || freelancer.hourlyRate <= Number(maxRate));
  }).sort((a, b) => {
    if (sortBy === "Highest Rated") return b.rating - a.rating;
    if (sortBy === "Lowest Rate") return a.hourlyRate - b.hourlyRate;
    if (sortBy === "Highest Rate") return b.hourlyRate - a.hourlyRate;
    if (sortBy === "Most Experienced") return b.jobsCompleted - a.jobsCompleted;
    if (sortBy === "Newest") return b.id - a.id;
    return a.id - b.id;
  }), [freelancerData, search, selectedCategories, location, minRate, maxRate, sortBy]);

  const totalPages = Math.max(1, Math.ceil(results.length / perPage));
  const visibleFreelancers = results.slice((page - 1) * perPage, page * perPage);
  const updatePage = (nextPage) => setPage(Math.min(Math.max(nextPage, 1), totalPages));
  const resetPage = (action) => { action(); setPage(1); };

  function toggleCategory(category) {
    resetPage(() => setSelectedCategories((items) => items.includes(category) ? items.filter((item) => item !== category) : [...items, category]));
  }

  function clearFilters() {
    setSelectedCategories([]); setLocation("Anywhere in Somalia"); setMinRate(""); setMaxRate(""); setSearch(""); setPage(1);
  }

  function toggleSaved(id) {
    setSavedUsers((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  }

  return <main className="min-h-screen bg-[#f7faf8] pb-16">
    <section className="bg-[#3263E8] text-white"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-6"><p className="text-sm font-semibold tracking-wide text-blue-200">FREELANCER HUB SOMALIA</p><h1 className="mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">Find the right talent for your next project.</h1><p className="mt-4 max-w-2xl leading-7 text-blue-100">Find skilled Somali professionals for your business or project.</p></div></section>
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6"><div className="flex flex-col gap-6 md:flex-row">
      <MobileFilter onClick={() => setFiltersOpen(!filtersOpen)} />
      <FilterSidebar open={filtersOpen} selectedCategories={selectedCategories} location={location} minRate={minRate} maxRate={maxRate} onToggleCategory={toggleCategory} onLocationChange={(value) => resetPage(() => setLocation(value))} onMinRateChange={(value) => resetPage(() => setMinRate(value))} onMaxRateChange={(value) => resetPage(() => setMaxRate(value))} onClear={clearFilters} onClose={() => setFiltersOpen(false)} />
      <section className="min-w-0 flex-1"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><SearchBar value={search} onChange={(value) => resetPage(() => setSearch(value))} /><SortDropdown value={sortBy} onChange={(value) => resetPage(() => setSortBy(value))} /></div><p className="mt-4 text-sm text-slate-500"><b className="text-slate-800">{results.length}</b> freelancers found</p>
        {apiError && <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">{apiError}</p>}
        {isLoading ? <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{[1, 2, 3].map((item) => <div key={item} className="h-80 animate-pulse rounded-2xl border border-slate-200 bg-white" />)}</div> : visibleFreelancers.length ? <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visibleFreelancers.map((freelancer) => <FreelancerCard key={freelancer.id} freelancer={freelancer} isSaved={savedUsers.includes(freelancer.id)} onSave={() => toggleSaved(freelancer.id)} onInvite={() => setInvitedFreelancer(freelancer)} />)}</div> : <div className="mt-5 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center"><UsersRound className="mx-auto text-slate-300" /><p className="mt-3 text-slate-500">No freelancers found. Try another search.</p></div>}
        {!isLoading && <Pagination page={page} totalPages={totalPages} onPageChange={updatePage} />}
      </section>
    </div></div>
    {invitedFreelancer && <InviteModal freelancer={invitedFreelancer} onClose={() => setInvitedFreelancer(null)} />}
  </main>;
}

export default Freelancers;
