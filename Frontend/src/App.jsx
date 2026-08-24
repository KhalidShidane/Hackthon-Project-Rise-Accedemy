import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import { ProtectedRoute } from "./assets/components/RouteGuards";
import Gigs from "./Dashbod/Gigs";
import Contact from "./PAGES/contact";
import Home from "./PAGES/Home";
import Jobs from "./PAGES/Jobs";
import Login from "./PAGES/Login";
import Signup from "./PAGES/Signup";
import ViewProfile from "./PAGES/View Profile";
import Freelancers from "./Dashbod/Freelancers";
import About from "./PAGES/About";

function App() {
  const location = useLocation();
  const isDashboard = ["/dashboard", "/gigs"].includes(location.pathname);

  return (
    <>
      {!isDashboard && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/freelancers" element={<Freelancers />} />
        <Route path="/profile/:id" element={<ViewProfile />} />
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
