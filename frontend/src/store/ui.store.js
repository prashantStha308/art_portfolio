import {create} from "zustand";

const useUIStore = create((set)=>({
	mouseX: 0,
	mouseY: 0,

	// modal
	isModalOpen: false,
	modalPostId: "",

	toggleModalVisbility: () => set( state => ({ isModalOpen: !state.isModalOpen }) ),
	setModalPostId: (id) => set({modalPostId: id}),


}))

if (typeof window !== "undefined") {
	window.addEventListener("mousemove", (e) => {
		useUIStore.setState({ mouseX: e.clientX, mouseY: e.clientY });
	});
}

export const toggleModalVisbility = useUIStore.getState().toggleModalVisbility;
export const setModalPostId = useUIStore.getState().setModalPostId;

export default useUIStore;