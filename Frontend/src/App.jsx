import Home from "./PAGES/Home";
import About from "./PAGES/About";
import Contact from "./PAGES/Contact";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
function App() {
    return (
        <>
            <Header />

            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/Contact" element={<Contact />} />
            </Routes>

        </>
    )
}
export default App;
