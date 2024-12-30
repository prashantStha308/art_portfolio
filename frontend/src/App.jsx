import { BrowserRouter , Routes , Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Services from "./pages/Services"
import Projects from "./pages/Projects"
import About from "./pages/About"
import Upload from "./pages/Upload";
import Gallery from "./pages/Gallery";


function App() {
  return (
    <>
    <BrowserRouter>
      {/* Sidebar and Main Content */}
      <div className="grid md:flex md:flex-1 h-screen">
        <Navbar />

        <div className="grid md:flex-1">

          <section className="page">
            <Routes>
              <Route path="/" element = {<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/project" element= {<Projects />} />
              <Route path="/about" element= {<About />} />
              <Route path="/service" element= {<Services />} />

              {/* Hidden from users */}
              <Route path="/upload" element={<Upload />} />
            </Routes>
          </section>

        </div>

      </div>
    </BrowserRouter>
    </>
  )
}

export default App
