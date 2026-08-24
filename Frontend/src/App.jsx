import Home from "./PAGES/Home";
import About from "./PAGES/About";
import Contact from "./PAGES/Contact";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Gigs from "./Dashbod/Gigs";
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

        </>
    )
}
export default App;
