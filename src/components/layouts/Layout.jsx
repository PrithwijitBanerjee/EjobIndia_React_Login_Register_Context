import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Header from '../commons/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../commons/Footer';

const Layout = ({ children, title, description, author, keywords }) => {
    return (
        <>
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{minHeight: '70vh'}}>
                <ToastContainer />
                {children}
            </main>
            <Footer />
        </>
    )
}

Layout.defaultProps = {
    title: "Ecommerce app - shop now",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Prithwijit",
}

Layout.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    author: PropTypes.string,
    keywords: PropTypes.string,
    children: PropTypes.any
}

export default Layout