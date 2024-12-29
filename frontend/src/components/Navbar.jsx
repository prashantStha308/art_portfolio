import { Link } from 'react-router-dom'
import pfp from '../assets/digital/KLEE.png'

const Navbar = () => {
  return (
    <>
        <header className='hidden md:grid gap-4 min-h-dvh w-1/6 bg-gray-200 p-8 box-border'>
            <div className='grid gap-4 h-4/6'>
                <div>
                    <img src={pfp} alt="pfp" className='rounded-full w-72 aspect-square object-cover object-top' />
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
            </div>
        </header>

        <header className='flex sm:hidden '>
            <div>
                asdklfhjsdlkfj
            </div>
        </header>
    </>
  )
}

export default Navbar;