import { BrowserRouter} from "react-router-dom";
import AppRoutes from "./Routes";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
    <BrowserRouter>
      {/* Sidebar and Main Content */}
      <div className="flex flex-1 gap-3">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <section className="page">
            <AppRoutes />
          </section>
        </div>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
