import { BrowserRouter } from "react-router-dom";

import AppRouter from "./App.routes";
import QueryProvider from "./config/QueryProvider.jsx";

import Sidebar from "./components/layout/Sidebar";
import BottomNavbar from "./components/layout/BottomNavbar";
import SubNav from "./components/layout/SubNav.jsx";
import GridDeco from "./components/layout/GridDeco.jsx";

function App() {

	return (
		<>
			<BrowserRouter>
				<QueryProvider>

				<main className="flex flex-col md:flex-row md:flex-1 h-screen overflow-hidden">
				    <Sidebar />

				    <section id="scroll-container" className="flex flex-col flex-1 page overflow-y-auto h-full w-full">
				    	<SubNav />
				        <div className="mt-10 h-full w-full" >
				        	<AppRouter />
				        </div>
				    </section>
				    
				    <BottomNavbar />

					<GridDeco />				    
				</main>

				</QueryProvider>
			</BrowserRouter>
		</>
	);
}



export default App;
