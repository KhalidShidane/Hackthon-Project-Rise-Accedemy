import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import { ProtectedRoute } from "./assets/components/RouteGuards";
import Gigs from "./Dashbod/Gigs";
import Home from "./PAGES/Home";
import Jobs from "./PAGES/Jobs";
import Contact from "./PAGES/contact";
import Login from "./PAGES/Login";
import Signup from "./PAGES/Signup";

const dashboardPaths = new Set(["/dashboard", "/gigs", "/projects", "/messages", "/profile"]);

function App() {
  const location = useLocation();
  const isDashboard = dashboardPaths.has(location.pathname);

  return (
    <>
      {!isDashboard && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Gigs />} />
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/projects" element={<Gigs />} />
          <Route path="/messages" element={<Gigs />} />
          <Route path="/profile" element={<Gigs />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!isDashboard && <Footer />}
    </>
  );
}

export default App;
