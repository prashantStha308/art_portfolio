import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./App.routes";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Sidebar and Main Content */}
        <div className="grid md:flex md:flex-1 h-screen">
          <Navbar />
          <div className="flex-1 overflow-hidden">
            <section className="page">
              {/* Main router of app */}
              <AppRouter />
            </section>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}



export default App;
