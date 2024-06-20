import { useEffect, useState } from "react"
import Layout from "../components/layouts/Layout"
import { getProductsData } from "../utils/getProductsData";
import { RotatingTriangles } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await getProductsData('products');
                setProducts(data);
                setError(false);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false)
            }
        }
        const timerId = setTimeout(() => {
            getProducts();
        }, 2000);

        return () => { // clean up function same as componentWillUnmount()...
            console.log('Home page leaves');
            clearTimeout(timerId);
            setProducts([]);
            setError(false);
            setLoading(true);
        }
    }, []);

    if (error) {
        return (<>
            <div
                className="container d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}>
                <div className="row">
                    <div className="col-12">
                        <h2>Something Went Wrong</h2>
                    </div>
                </div>
            </div>
        </>)
    }
    return (
        <Layout>
            <div className="my-5">
                <h1 className="text-center">List Of Products</h1>
            </div>
            <div className="container d-flex justify-content-center align-items-center"
                style={{
                    minHeight: '60vh', // Set a minimum height to prevent overlapping with the header and footer
                    overflowY: 'auto', // Add vertical scrollbar if needed
                }}>
                <div className="row my-5">
                    <div className="col-12">
                        {
                            loading && (<div className="text-center">
                                <RotatingTriangles
                                    visible={true}
                                    height="80"
                                    width="80"
                                    color="#4fa94d"
                                    ariaLabel="rotating-triangles-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>)
                        }
                    </div>
                    {
                        products?.length !== 0 && products?.map(product => (
                            <div key={product?.id} className="col">
                                <div className="card" style={{ width: '20rem', height: '500px', margin: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                    <img src={product?.thumbnail} style={{ height: '200px', width: '100%' }} className="card-img-top img-fluid" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{product?.title}</h5>
                                        <p className="card-text">{product?.description?.slice(0, 50)}...</p>
                                        <p className="card-text">Price: {product?.price}</p>
                                        <p className="card-text">Ratings: {product?.rating}</p>
                                        <Link to={`/productDetail/${product?.id}`} className="btn btn-primary">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Home