import { useState, useEffect } from "react";

const Modal = ({ status, setClose, message = "This is a message" }) => {
  const [color, setColor] = useState("");

  // Set the color based on the status
  useEffect(() => {
    if (status === "success") {
      setColor("bg-green-500");
    } else if (status === "failed") {
      setColor("bg-red-500");
    }
  }, [status]);

  return (
    <main className="bg-gray-800 text-white px-8 py-4 rounded-lg flex flex-col gap-2 items-center justify-center">
      <header className="text-lg md:text-2xl font-bold">
        <h1>Attention Required</h1>
      </header>

      <main>
        <p>{message}</p>
      </main>

      <footer className="flex justify-end w-full p-4">
        <button
          className={`${color} text-white px-4 py-2 rounded-sm`}
          onClick={setClose}
        >
          Close
        </button>
      </footer>
    </main>
  );
};

export default Modal;
