<<<<<<< HEAD
import Home from "./assets/PAGES/Home";
import About from "./assets/PAGES/About";
import contact from "./"
import {Routes, Route} from "react-router-dom";
import Header from "./assets/components/Header";
function App(){
    return(
=======
import Home from "./PAGES/Home";
import About from "./PAGES/About";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
function App() {
    return (
>>>>>>> 762a22a056466aa5f9faa6da8b30404038492604
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
