import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import BottomNavbar from "./components/BottomNavbar";

import AppRouter from "./App.routes";
import QueryProvider from "./config/QueryProvider.jsx";

function App() {

	return (
		<>
			<BrowserRouter>
				<QueryProvider>

				<main className="flex flex-col md:flex-row md:flex-1 h-screen overflow-hidden">
				    <Sidebar />

				    <section className="flex-1 page px-2 overflow-y-auto">
				        <AppRouter />
				    </section>
				    
				    <BottomNavbar />
				</main>

				</QueryProvider>
			</BrowserRouter>
		</>
	);
}



export default App;
