import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext(); // create an context using context api ... 
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        email: ''
    });

    useEffect(() => {
        const parsedData = JSON.parse(localStorage.getItem('auth'));
        if (parsedData && parsedData?.token) {
            setAuth({
                ...auth,
                token: parsedData?.token,
                email: parsedData?.email
            });
        }
    }, []);
    return (
        <>
            <AuthContext.Provider value={[auth, setAuth]}>
                {
                    children
                }
            </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext); // custom hook...

AuthProvider.propTypes = {
    children: PropTypes.any
}
export default AuthProvider