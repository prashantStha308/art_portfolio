import { Link } from "react-router-dom"

const Home = () => {
  return (
    <main className="min-h-screen flex place-content-center items-center">
        <div className="grid gap-8 bg-gray-900/90 rounded-lg p-8 justify-center ">
            <div>

                <h1 className="text-center text-xl" >
                    Welcome to <span className="text-purple-600 text-2xl font-bold" >Admin Panel </span>
                </h1>

                <p className="text-center" > Select a Category to edit </p>

            </div>

            <div className="grid gap-4 rounded-lg px-8 py-4 justify-center" >
                <Link to={"/post"} className="text-center" >
                    <button className=" bg-blue-600 hover:bg-blue-700 rounded-sm text-center text-white font-bold text-lg px-4 py-2" >
                        Post Manager
                    </button>
                </Link>

                <Link to={"/project"} className="text-center" >
                    <button className=" bg-purple-600 hover:bg-purple-700 rounded-sm text-center text-white font-bold text-lg px-4 py-2" >
                        Project Manager
                    </button>
                </Link>
            </div>

        </div>
    </main>
  )
}

export default Home