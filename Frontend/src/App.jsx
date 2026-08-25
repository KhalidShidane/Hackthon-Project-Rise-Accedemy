import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import { AdminRoute, ProtectedRoute } from "./assets/components/RouteGuards";
import AdminLayout from "./Admin/AdminLayout";
import AdminLogin from "./Admin/AdminLogin";
import { ComingSoon, Dashboard, ResourceList, UserDetails, UserList } from "./Admin/AdminPages";
import AdminProjects from "./Admin/AdminProjects";
import AdminClients from "./Admin/AdminClients";
import AdminFreelancers from "./Admin/AdminFreelancers";
import AdminUsers from "./Admin/AdminUsers";
import AdminPayments from "./Admin/AdminPayments";
import AdminSettings from "./Admin/AdminSettings";
import AdminProposals from "./Admin/AdminProposals";
import AppErrorBoundary from "./assets/components/AppErrorBoundary";
import Gigs from "./Dashbod/Gigs";
import About from "./PAGES/About";
import Contact from "./PAGES/Contact";
import Home from "./PAGES/Home";
import Jobs from "./PAGES/Jobs";
import Login from "./PAGES/Login";
import Signup from "./PAGES/Signup";
import Freelancers from "./Dashbod/Freelancers";
import ViewProfile from "./PAGES/View Profile";

function App() {
  const location = useLocation();
  const isDashboard = ["/dashboard", "/gigs"].includes(location.pathname) || location.pathname.startsWith("/admin");

  return (
    <AppErrorBoundary>
      {!isDashboard && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/freelancers" element={<Freelancers />} />
        <Route path="/profile/:id" element={<ViewProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Gigs />} />
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/projects" element={<Gigs />} />
          <Route path="/messages" element={<Gigs />} />
          <Route path="/profile" element={<Gigs />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/:id" element={<UserDetails />} />
            <Route path="/admin/freelancers" element={<AdminFreelancers />} />
            <Route path="/admin/clients" element={<AdminClients />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/proposals" element={<AdminProposals />} />
            <Route path="/admin/payments" element={<AdminPayments />} />
            <Route path="/admin/reviews" element={<ResourceList type="reviews" />} />
            <Route path="/admin/messages" element={<ResourceList type="messages" />} />
            <Route path="/admin/activity" element={<ResourceList type="activity" />} />
            <Route path="/admin/reports" element={<ComingSoon title="Reports" />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>

      {!isDashboard && <Footer />}
    </AppErrorBoundary>
  );
}

export default App;
