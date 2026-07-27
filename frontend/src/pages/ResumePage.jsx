import {useState} from "react";
import {ChevronUp, ChevronDown} from "lucide-react";


export default function ResumePage() {
    const [ visible, setVisible ] = useState(true);

    const toggleVisibility = ()=> setVisible(prev => !prev);

    return (
        <section className="relative" >
            <div
                className={`absolute top-10 right-0 bg-amber-200 text-neutral-900 px-4 py-2 rounded-lg text-xs w-44 border border-amber-900/45 ${visible ? "flex" : "hidden"} flex-col gap-2`}
            >
                <p>
                    Some fields are censored to protect myself from spam   
                </p>

                <button
                    className="bg-amber-100 w-fit rounded-sm hover:opacity-75"
                    onClick={toggleVisibility}
                >
                    <ChevronUp />
                </button>
            </div>

            <button
                className={`${visible ? "hidden" : "block"} text-neutral-900 absolute top-10 right-4 bg-amber-100 w-fit rounded-sm hover:opacity-75`}
                onClick={toggleVisibility}
            >
                <ChevronDown />
            </button>

            <iframe
                src="/assets/resume.pdf"
                className="w-full h-screen"
                title="Resume"
            />
        </section>
    );
}