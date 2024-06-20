import { useParams } from "react-router-dom"
import Layout from "../components/layouts/Layout";
import { useEffect, useState } from "react";
import { getProductById } from "../utils/getProductById";
import { RotatingTriangles } from "react-loader-spinner";


const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getSingleProduct = async () => {
            try {
                const data = await getProductById('products', id);
                setProduct(data);
                setError(false);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        const timerId = setTimeout(() => {
            getSingleProduct();
        }, 2000);

        return () => {
            clearTimeout(timerId);
            setLoading(true);
            setProduct({});
            setError(false);
        }
    }, []);

    if (error) {
        return (<div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}>
            <div className="row">
                <div className="col-12">
                    <h2>Something Went Wrong</h2>
                </div>
            </div>
        </div>)
    }
    return (
        <Layout title={`Product-${id} Detail Page`}>
            <div
                className="container d-flex justify-content-center align-items-center my-5"
                style={{ height: '100vh' }}>
                <div className="row">
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
                        {
                            Object.keys(product).length !== 0 && (
                                <div className="card" style={{ width: '30rem' }}>
                                    <img src={product?.thumbnail} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{product?.title}</h5>
                                        <h5 className="card-title">Price: {product?.price}</h5>
                                        <h5 className="card-title">Rating: {product?.rating}</h5>
                                        <h5 className="card-title">Stock Items: {product?.stock}</h5>
                                        <p className="card-text">{product?.description}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetail