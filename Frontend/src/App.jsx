import Home from "./assets/PAGES/Home";
import About from "./assets/PAGES/About";
import {Routes, Route} from "react-router-dom";
import Header from "./assets/components/Header";
function App(){
    return(
        <>
<Header/>

<Routes>

    <Route  path="/" element={ <Home/>} />
    <Route  path="/about" element={ <About/>} />
</Routes>
        
       </>
    )
}
export default App;