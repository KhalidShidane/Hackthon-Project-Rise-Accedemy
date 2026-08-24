import Home from "./PAGES/Home";
import About from "./PAGES/About";
import Contact from "./PAGES/Contact";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
<<<<<<< HEAD
<<<<<<< HEAD
import Footer from "./components/Footer";
=======
import Gigs from "./Dashbod/Gigs";
>>>>>>> 4ddcedf08a092e4b92e2a221e9e49cedf1ab9fb6
=======
import { ProtectedRoute, PublicOnlyRoute } from "./components/RouteGuards";
import Gigs from "./Dashbod/Gigs";
import Login from "./PAGES/Login";
import Signup from "./PAGES/Signup";
>>>>>>> c763b0b (Wxaaan kusoo Daray Login+Sing Up)
function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route element={<PublicOnlyRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Gigs />} />
                    <Route path="/gigs" element={<Gigs />} />
                </Route>

            </Routes>
            <Footer />

        </>
    )
}
export default App;
