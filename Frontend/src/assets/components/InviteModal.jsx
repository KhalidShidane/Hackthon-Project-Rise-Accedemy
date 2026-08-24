import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { invitationApi } from "../../services/api";

const jobs = ["E-commerce Website Development", "Mobile Application Design", "Company Branding Project", "Social Media Campaign"];

function InviteModal({ freelancer, onClose }) {
  const [job, setJob] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function sendInvitation(event) {
    event.preventDefault();
    if (!job) return;
    setSending(true);
    try {
      await invitationApi.create({ freelancerId: freelancer.id, job, message });
    } catch {
      // Keep the demo usable until POST /api/invitations is connected.
    } finally {
      setSending(false);
      setSent(true);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/45 p-4" role="dialog" aria-modal="true" aria-labelledby="invite-title">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4"><div><h2 id="invite-title" className="text-xl font-bold text-slate-900">Invite Freelancer to a Job</h2><p className="mt-1 text-sm text-slate-500">Send an invitation to <b className="text-slate-700">{freelancer.name}</b>.</p></div><button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close modal"><X /></button></div>

        {sent ? <div className="py-10 text-center"><CheckCircle2 size={48} className="mx-auto text-blue-500" /><h3 className="mt-4 text-lg font-bold text-slate-900">Invitation sent!</h3><p className="mt-2 text-sm text-slate-600">Your invitation has been sent to {freelancer.name}.</p><button onClick={onClose} className="mt-6 rounded-lg bg-[#3263E8] px-5 py-2.5 text-sm font-semibold text-white">Done</button></div> : <form onSubmit={sendInvitation} className="mt-6 space-y-5">
          <label className="block text-sm font-semibold text-slate-700">Choose a job<select required value={job} onChange={(event) => setJob(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-normal text-slate-700 outline-none focus:border-blue-600"><option value="">Select a job</option>{jobs.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label className="block text-sm font-semibold text-slate-700">Message <span className="font-normal text-slate-400">(optional)</span><textarea value={message} onChange={(event) => setMessage(event.target.value)} rows="4" placeholder="Tell the freelancer about your project..." className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm font-normal text-slate-700 outline-none focus:border-blue-600" /></label>
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cancel</button><button disabled={sending} type="submit" className="rounded-lg bg-[#3263E8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60">{sending ? "Sending..." : "Send Invitation"}</button></div>
        </form>}
      </div>
    </div>
  );
}

export default InviteModal;
