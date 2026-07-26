import {create} from "zustand";

const useUIStore = create((set)=>({
	mouseX: 0,
	mouseY: 0,

	// for home scroller

}))

if (typeof window !== "undefined") {
	window.addEventListener("mousemove", (e) => {
		useUIStore.setState({ mouseX: e.clientX, mouseY: e.clientY });
	});
}

export default useUIStore;