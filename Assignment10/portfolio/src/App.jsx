import {BrowserRouter ,Routes,Route} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {lazy,Suspense} from "react";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Journey = lazy(() => import("./pages/Journey"));
const Stats = lazy(() => import("./pages/Stats"));
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/stats" element={<Stats/>}></Route> 
        <Route path="/projects" element={<Projects/>}></Route>
        <Route path="/journey" element={<Journey/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
      </Routes>
      </Suspense>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;