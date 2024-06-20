import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { toast } from "react-toastify";


const Header = () => {
    const [auth, setAuth] = useAuth(); // custom hooks ...
    const handleSignOut = () => {
        setAuth({
            token: null,
            email: ''
        });
        localStorage.removeItem('auth');
        toast.success('user logout successfully!!!', {
            theme: 'colored',
            'position': 'top-center'
        });
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'lightsalmon' }}>
                <div className="container-fluid">
                    <a className="navbar-brand active text-white" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) =>
                                    isActive ? "nav-link active text-black" : "nav-link active text-white"
                                } aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) =>
                                    isActive ? "nav-link active text-black" : "nav-link active text-white"
                                } to="/aboutUs">About Us</NavLink>
                            </li>
                            {
                                auth?.token ? (<>
                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) =>
                                            isActive ? "nav-link active text-black" : "nav-link active text-white"
                                        } to="/aboutUs">Hi! {auth.email.split('.')[0]}</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) =>
                                            isActive ? "nav-link active text-black" : "nav-link active text-white"
                                        } onClick={handleSignOut}>Sign Out</NavLink>
                                    </li>
                                </>) : (<>
                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) =>
                                            isActive ? "nav-link active text-black" : "nav-link active text-white"
                                        } to="/signUp">Sign Up</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) =>
                                            isActive ? "nav-link active text-black" : "nav-link active text-white"
                                        } to="/signIn">Sign In</NavLink>
                                    </li>
                                </>)
                            }
                            <li className="nav-item">
                                <NavLink className={({ isActive }) =>
                                    isActive ? "nav-link active text-black" : "nav-link active text-white"
                                } to="/contactUs">Contact Us</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header