
import { ArrowRight, MapPin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { demoFreelancers } from "../data/freelancers";

function Freelancers() {
    return (
        <main className="min-h-screen bg-[#f7f9fc] px-5 py-14 sm:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="max-w-2xl">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#2C65F4]">Find talents</p>
                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Meet the people who make work happen.</h1>
                    <p className="mt-4 text-lg leading-7 text-slate-600">Browse trusted freelancers, explore their experience, and start a conversation when you find the right fit.</p>
                </div>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                    {demoFreelancers.map((freelancer) => (
                        <article key={freelancer._id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex gap-4">
                                <img src={freelancer.profileImage} alt={freelancer.name} className="h-16 w-16 rounded-xl object-cover" />
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{freelancer.name}</h2>
                                    <p className="mt-1 text-sm font-medium text-[#2C65F4]">{freelancer.title}</p>
                                    <p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><MapPin size={15} /> {freelancer.location}</p>
                                </div>
                            </div>
                            <p className="mt-5 leading-6 text-slate-600">{freelancer.bio}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                                {freelancer.skills.slice(0, 4).map((skill) => <span key={skill} className="rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">{skill}</span>)}
                            </div>
                            <div className="mt-6 flex gap-3 border-t border-slate-100 pt-5">
                                <Link to={`/contact?client=${freelancer._id}&subject=Invite%20to%20job`} className="inline-flex items-center gap-2 rounded-lg bg-[#2C65F4] px-4 py-2.5 text-sm font-semibold text-white"><Send size={15} /> Invite to job</Link>
                                <Link to={`/profile/${freelancer._id}`} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">View profile <ArrowRight size={15} /></Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Freelancers;
