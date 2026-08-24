import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import { ProtectedRoute } from "./assets/components/RouteGuards";
import Gigs from "./Dashbod/Gigs";
import About from "./PAGES/About";
import Contact from "./PAGES/Contact";
import Home from "./PAGES/Home";
import Jobs from "./PAGES/Jobs";
import Freelancers from "./PAGES/Freelancers";
import FindTalent from "./PAGES/FindTalent";
import FindProjects from "./PAGES/FindProjects";
import FreelancerProfile from "./PAGES/FreelancerProfile";
import Login from "./PAGES/Login";
import Signup from "./PAGES/Signup";

function App() {
  const location = useLocation();
  const isDashboard = ["/dashboard", "/gigs"].includes(location.pathname);

  return (
    <>
      {!isDashboard && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/freelancers" element={<Freelancers />} />
        <Route path="/find-talent" element={<FindTalent />} />
        <Route path="/find-projects" element={<FindProjects />} />
        <Route path="/categories" element={<FindTalent />} />
        <Route path="/freelancer/:id" element={<FreelancerProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Gigs />} />
          <Route path="/gigs" element={<Gigs />} />
        </Route>
      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
}

export default App;
