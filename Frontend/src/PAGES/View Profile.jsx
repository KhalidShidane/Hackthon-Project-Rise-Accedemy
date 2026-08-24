import { ArrowLeft, BriefcaseBusiness, GraduationCap, MapPin, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { demoFreelancers } from "../data/freelancers";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ViewProfile() {
	const { id } = useParams();
	const [profile, setProfile] = useState(() => demoFreelancers.find((item) => item._id === id) || demoFreelancers[0]);

	useEffect(() => {
		let active = true;
		fetch(`${API_URL}/user/${id}`)
			.then((response) => (response.ok ? response.json() : Promise.reject(new Error("Profile unavailable"))))
			.then(({ user }) => {
				if (active && user) {
					setProfile((current) => ({ ...current, ...user, title: user.title || current.title }));
				}
			})
			.catch(() => undefined);
		return () => { active = false; };
	}, [id]);

	const skills = profile.skills?.length ? profile.skills : demoFreelancers[0].skills;

	return (
		<main className="min-h-screen bg-[#f7f9fc] pb-20 text-slate-900">
			<section className="border-b border-slate-200 bg-white">
				<div className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
					<Link to="/freelancers" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#2C65F4]"><ArrowLeft size={17} /> Back to talents</Link>
					<div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-5">
							<img src={profile.profileImage || demoFreelancers[0].profileImage} alt={profile.name} className="h-24 w-24 rounded-2xl object-cover ring-4 ring-blue-50" />
							<div>
								<p className="mb-1 text-sm font-semibold uppercase tracking-wider text-[#2C65F4]">Available freelancer</p>
								<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{profile.name}</h1>
								<p className="mt-2 text-lg text-slate-600">{profile.title || "Full Stack Developer"}</p>
								<p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500"><MapPin size={16} /> {profile.location || "Somalia"}</p>
							</div>
						</div>
						<div className="flex gap-3">
							<Link to={`/contact?client=${profile._id}&subject=Hire%20me`} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2C65F4] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"><BriefcaseBusiness size={17} /> Hire me</Link>
							<Link to={`/contact?client=${profile._id}`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#2C65F4] hover:text-[#2C65F4]"><MessageCircle size={17} /> Message</Link>
						</div>
					</div>
				</div>
			</section>

			<div className="mx-auto grid max-w-6xl gap-6 px-5 pt-8 sm:px-8 lg:grid-cols-[1.5fr_1fr]">
				<div className="space-y-6">
					<section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
						<h2 className="text-xl font-bold">About me</h2>
						<p className="mt-4 leading-7 text-slate-600">{profile.about || profile.bio || demoFreelancers[0].about}</p>
						<p className="mt-4 leading-7 text-slate-600">{profile.background || demoFreelancers[0].background}</p>
					</section>
					<section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
						<h2 className="text-xl font-bold">Core skills</h2>
						<div className="mt-5 flex flex-wrap gap-2">{skills.map((skill) => <span key={skill} className="rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-[#2C65F4]">{skill}</span>)}</div>
					</section>
				</div>
				<aside className="space-y-6">
					<section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
						<h2 className="flex items-center gap-2 text-lg font-bold"><GraduationCap size={20} className="text-[#2C65F4]" /> Background</h2>
						<dl className="mt-5 space-y-5 text-sm"><div><dt className="font-semibold text-slate-400">Education</dt><dd className="mt-1 text-slate-700">{profile.education || demoFreelancers[0].education}</dd></div><div><dt className="font-semibold text-slate-400">Experience</dt><dd className="mt-1 text-slate-700">{profile.experience || demoFreelancers[0].experience}</dd></div></dl>
					</section>
				</aside>
			</div>
		</main>
	);
}

export default ViewProfile;
