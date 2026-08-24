import { Component } from "react";
import { Link } from "react-router-dom";

export default class AppErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error) { console.error("Application render error:", error); }
  render() {
    if (!this.state.error) return this.props.children;
    return <main className="grid min-h-screen place-items-center bg-slate-50 p-6"><section className="w-full max-w-lg rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm"><h1 className="text-2xl font-bold text-slate-900">This page could not load</h1><p className="mt-3 text-sm text-slate-600">The application stayed available instead of showing a blank screen.</p><Link to="/admin/dashboard" className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white">Return to dashboard</Link></section></main>;
  }
}
