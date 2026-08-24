import Home from "./PAGES/Home";
import About from "./PAGES/About";
import Contact from "./PAGES/Contact";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Gigs from "./Dashbod/Gigs";
import { ProtectedRoute } from "./components/RouteGuards";
import Login from "./PAGES/Login";
import Signup from "./PAGES/Signup";

function App() {
    const location = useLocation();
    const isDashboard = location.pathname === "/dashboard" || location.pathname === "/gigs";

    return (
        <>
            {!isDashboard && <Header />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Gigs />} />
                    <Route path="/gigs" element={<Gigs />} />
                </Route>

            </Routes>
            {!isDashboard && <Footer />}

        </>
    )
}
export default App;
