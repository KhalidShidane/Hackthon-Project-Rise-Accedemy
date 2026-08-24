import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BadgeCheck, BriefcaseBusiness, MapPin, MessageCircle, Star } from "lucide-react";
import { freelancers } from "../data/freelancers";
import InviteModal from "../components/InviteModal";
import { API_BASE_URL, freelancerApi } from "../services/api";

function FreelancerProfile() {
  const { id } = useParams();
  const staticFreelancer = freelancers.find((person) => person.id === Number(id));
  const [freelancer, setFreelancer] = useState(staticFreelancer);
  const [inviteOpen, setInviteOpen] = useState(false);

  useEffect(() => {
    setFreelancer(staticFreelancer);
    freelancerApi.getById(id).then((data) => setFreelancer(data.freelancer || data)).catch(() => {});
  }, [id, staticFreelancer]);

  if (!freelancer) {
    return <main className="min-h-screen bg-[#f7faf8] px-5 py-20 text-center"><h1 className="text-2xl font-bold text-slate-900">Freelancer not found</h1><Link to="/find-talent" className="mt-4 inline-block font-semibold text-blue-800">Back to Find Talent</Link></main>;
  }

  const portfolio = ["Business website", "Mobile app design", "Brand project"];
  const reviews = [
    { name: "Abdiwali A.", text: "Excellent communication and high-quality work. I would gladly work with them again.", rating: 5 },
    { name: "Fadumo M.", text: "Delivered the project on time and understood our requirements very well.", rating: 5 },
  ];
  const imageUrl = freelancer.image?.startsWith("/") ? `${API_BASE_URL}${freelancer.image}` : freelancer.image;

  return <main className="min-h-screen bg-[#f7faf8] py-8 sm:py-12">
    <div className="mx-auto max-w-6xl px-5 sm:px-6">
      <Link to="/find-talent" className="text-sm font-semibold text-blue-800 hover:text-blue-950">Back to Find Talent</Link>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4"><img src={imageUrl} alt={freelancer.name} className="h-20 w-20 rounded-full object-cover" /><div><h1 className="flex items-center gap-1 text-2xl font-bold text-slate-900">{freelancer.name}{freelancer.verified && <BadgeCheck size={20} className="fill-blue-700 text-white" />}</h1><p className="mt-1 text-slate-600">{freelancer.title}</p><p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><MapPin size={15} />{freelancer.location}, Somalia</p></div></div>
              <div className="flex flex-col gap-3 sm:flex-row"><Link to={`/contact?freelancer=${freelancer.id}`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-700 px-4 py-2.5 text-sm font-semibold text-blue-800 hover:bg-blue-50"><MessageCircle size={16} />Contact</Link><button onClick={() => setInviteOpen(true)} className="rounded-lg bg-[#3263E8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800">Invite to Job</button></div>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-4"><div><p className="text-sm text-slate-500">Hourly rate</p><p className="mt-1 font-bold text-slate-900">${freelancer.hourlyRate}/hr</p></div><div><p className="text-sm text-slate-500">Rating</p><p className="mt-1 flex items-center gap-1 font-bold text-slate-900"><Star size={15} className="fill-amber-400 text-amber-400" />{freelancer.rating}</p></div><div><p className="text-sm text-slate-500">Jobs completed</p><p className="mt-1 font-bold text-slate-900">{freelancer.jobsCompleted}</p></div><div><p className="text-sm text-slate-500">Status</p><p className="mt-1 font-bold text-blue-600">Available</p></div></div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-slate-900">About</h2><p className="mt-3 leading-7 text-slate-600">{freelancer.description}</p><h2 className="mt-7 text-xl font-bold text-slate-900">Skills</h2><div className="mt-3 flex flex-wrap gap-2">{freelancer.skills.map((skill) => <span key={skill} className="rounded-md bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-800">{skill}</span>)}</div></section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-slate-900">Portfolio</h2><div className="mt-4 grid gap-4 sm:grid-cols-3">{portfolio.map((project, index) => <div key={project} className="overflow-hidden rounded-xl border border-slate-200"><div className={`h-28 ${["bg-blue-100", "bg-amber-100", "bg-blue-100"][index]} p-4 text-sm font-bold text-slate-700`}>{project}</div><p className="p-3 text-sm font-semibold text-slate-700">{project}</p></div>)}</div></section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-bold text-slate-900">Reviews</h2><div className="mt-4 space-y-5">{reviews.map((review) => <div key={review.name} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"><div className="flex items-center justify-between"><p className="font-semibold text-slate-800">{review.name}</p><p className="flex items-center gap-1 text-sm font-semibold"><Star size={14} className="fill-amber-400 text-amber-400" />{review.rating}.0</p></div><p className="mt-2 text-sm leading-6 text-slate-600">{review.text}</p></div>)}</div></section>
        </div>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="font-bold text-slate-900">Hire {freelancer.name.split(" ")[0]}</h2><p className="mt-2 text-sm leading-6 text-slate-600">Send a message or invite this freelancer to your project.</p><button onClick={() => setInviteOpen(true)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#3263E8] py-3 text-sm font-semibold text-white hover:bg-blue-800"><BriefcaseBusiness size={16} />Invite to Job</button><Link to={`/contact?freelancer=${freelancer.id}`} className="mt-3 block rounded-lg border border-blue-700 py-3 text-center text-sm font-semibold text-blue-800 hover:bg-blue-50">Contact Freelancer</Link></aside>
      </div>
      {inviteOpen && <InviteModal freelancer={freelancer} onClose={() => setInviteOpen(false)} />}
    </div>
  </main>;
}

export default FreelancerProfile;
