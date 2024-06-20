import { useFormik } from "formik"
import * as Yup from 'yup';

import Layout from '../../components/layouts/Layout'
import { doAuthentication } from "../../utils/doAuthentication";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('@Invalid Email Id').required(' **EmailId is required'),
            password: Yup.string().required(' **Password is required')
        }),
        onSubmit: async ({ email, password }, action) => {
            try {
                setLoader(true);
                const formData = {
                    email,
                    password
                };
                const data = await doAuthentication(formData, 'register');
                if (data && data?.token) {
                    toast.success('user registration successful!!!', {
                        theme: 'colored',
                        position: 'top-center'
                    });
                    setTimeout(() => {
                        navigate('/signIn'); // redirect to login page ...
                    }, 2000);
                    // navigate('/signIn'); // redirect to login page ...
                } else {
                    toast.error('user registration failed', {
                        theme: 'colored',
                        position: 'top-center'
                    });
                }
            } catch (error) {
                toast.error(error?.message, {
                    theme: 'colored',
                    position: 'top-center'
                });
            } finally {
                setLoader(false);
            }
            action.resetForm();
        }
    })
    return (
        <Layout title={'Sign-Up Form'}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="row">
                    <div className="col-12">
                        <div className="card" style={{ width: '20rem', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <div className="card-body">
                                <h5 className="card-title">Registration form</h5>
                                <div className="card-text mt-4">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                id="email"
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                placeholder="name@example.com" />
                                        </div>
                                        <span className="my-2 text-danger">
                                            {
                                                formik.errors?.email && formik.touched?.email && formik.errors?.email
                                            }
                                        </span>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                id="password"
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                                placeholder="your password" />
                                        </div>
                                        <span className="my-2 text-danger">
                                            {
                                                formik.errors?.password && formik.touched?.password && formik.errors?.password
                                            }
                                        </span>
                                        <div className="d-flex justify-content-around my-4">
                                            {
                                                loader ? (<div className="spinner-border text-success" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>) : (<button
                                                    className="btn btn-outline-success"
                                                    type="submit">sign up</button>)
                                            }
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                value={'reset'}
                                                onClick={formik.handleReset}>reset</button>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="mx-2">Already have an account?</div>
                                            <Link to='/signIn'>Sign In</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SignUp