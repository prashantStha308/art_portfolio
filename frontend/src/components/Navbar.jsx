import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='min-h-dvh w-1/6 bg-gray-100 grid py-4 px-8'>
        <div>
            {/* Image Container */}
        </div>
        <nav>
            <ul id='navbarList' className='grid gap-2 text-lg text-gray-700'>
                <li>
                    <Link to={'/'}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to={'/project'}>
                        Projects
                    </Link>
                </li>
                <li>
                    <Link to={'/service'}>
                        Services
                    </Link>
                </li>
                <li>
                    <Link to={'/contact'}>
                        Contacts
                    </Link>
                </li>
                <li>
                    <Link to={'/about'}>
                        About
                    </Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar