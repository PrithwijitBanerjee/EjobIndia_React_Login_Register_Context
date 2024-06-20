import { useFormik } from "formik"
import * as Yup from 'yup';

import Layout from '../../components/layouts/Layout'
import { doAuthentication } from "../../utils/doAuthentication";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/context/AuthProvider";

const SignIn = () => {
    const [loader, setLoader] = useState(false);
    const [auth, setAuth] = useAuth(); // custom hooks ...
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
                const data = await doAuthentication(formData, 'login');
                if (data && data?.token) {
                    toast.success('user login successful!!!', {
                        theme: 'colored',
                        position: 'top-center'
                    });
                    setAuth({
                        ...auth,
                        token: data?.token,
                        email,
                    });
                    localStorage.setItem('auth', JSON.stringify({
                        ...auth,
                        token: data?.token,
                        email
                    }));
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    toast.error('unauthenticated user', {
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
        <Layout title={'Sign-In Form'}>
            <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="row">
                    <div className="col-12">
                        <div className="card" style={{ width: '20rem', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                            <div className="card-body">
                                <h5 className="card-title">Login form</h5>
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
                                                    type="submit">sign in</button>)
                                            }
                                            <button
                                                className="btn btn-outline-secondary"
                                                type="button"
                                                value={'reset'}
                                                onClick={formik.handleReset}>reset</button>
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <div className="mx-2">New User?</div>
                                            <Link to='/signUp'>Sign Up</Link>
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

export default SignIn