import PropTypes from 'prop-types'
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RedirectUser = ({ children }) => {
    const [auth] = useAuth(); // custom hooks ...
    const navigate = useNavigate();
    useEffect(() => {
        if (!(auth?.token && auth?.email?.length !== 0)) {
            // setTimeout(() => {
            //     navigate('/signIn');
            // }, 1000);
            navigate('/signIn');
        }
    }, [auth, navigate]);

    return <>{children}</>;
}


RedirectUser.propTypes = {
    children: PropTypes.any
}

export default RedirectUser