export default function Loading({ styles, inline = false }) {
    return (
        <div
            className={`flex justify-center items-center ${
                inline ? 'h-6 w-full' : 'h-40 w-40 fixed top-1/2'
            } ${styles}`}
        >
            <div
                className="spinner-border animate-spin inline-block w-10 h-10 border-4 border-gray-200 border-r-pink-800 rounded-full"
                role="status"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
  }