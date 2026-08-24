import Home from "./PAGES/Home";
import About from "./PAGES/About";
import Contact from "./PAGES/Contact";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
<<<<<<< HEAD
import Footer from "./components/Footer";
=======
import Gigs from "./Dashbod/Gigs";
>>>>>>> 4ddcedf08a092e4b92e2a221e9e49cedf1ab9fb6
function App() {
    return (
        <>
            <Header />

            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gigs" element={<Gigs />} />

            </Routes>
            <Footer />

        </>
    )
}
export default App;
