import Home from "./PAGES/Home";
import About from "./PAGES/About";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
function App() {
    return (
        <>
            <Header />

            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>

        </>
    )
}
export default App;
