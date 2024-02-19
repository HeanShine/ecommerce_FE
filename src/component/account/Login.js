import React, {useState} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import axios from "axios";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const initialValues = {
    username: '',
    password: ''
}

const validationSchema = Yup.object({
    username: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, 'Tên tài khoản không được chứa ký tự đặc biệt')
        .required('Vui lòng nhập tên đăng nhập')
        .min(6, 'Tên đăng nhập phải có ít nhất 6 ký tự')
        .max(15, 'Tên đăng nhập không được quá 15 ký tự'),

    password: Yup.string()
        .matches(/^[a-zA-Z0-9]*$/, 'Mật khẩu không được chứa ký tự đặc biệt')
        .required('Vui lòng nhập mật khẩu')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .max(32, 'Mật khẩu không được quá 32 ký tự'),
});

const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = async (values, {setSubmitting, setErrors}) => {
        axios.post('http://localhost:8080/login', values)
            .then(function (response) {
                if (response.data.roles[0].name === "ROLE_ADMIN") {
                    localStorage.setItem("tokenAdmin", response.data.token);
                    navigate("/admin");
                } else {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("account", JSON.stringify(response.data));
                    toast.success("Login Success !");
                    navigate("/");
                }
            }).catch((error) => {
            console.log(error)
            toast.error("Wrong Username Or Password !")
        });
    }

    return (
        <>
            <style>
                {`
            
.container {
    background-color: #f8f9fa;
}

.card {
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: transparent;
}

.card-body {
    padding: 40px;
}

.form-group {
    margin-bottom: 1.5rem;
}

.btn-primary {
    background-color: #007bff;
    border: none;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.text-blue {
    color: #007bff;
}

            `}
            </style>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <div>
                    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: 100, paddingTop: 100 }}>
                        <div className="col-lg-6 col-md-10">
                            <div className="card card-default mb-0">
                                <div className="card-header pb-0">
                                    <div className="app-brand w-100 d-flex justify-content-center border-bottom-0">
                                        <div className="w-auto pl-0">
                                            <span className="brand-name text-dark">Login Ecommerce</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body px-5 pb-5 pt-0">
                                    <h4 className="text-dark mb-6 text-center">Sign in for free</h4>
                                    <Form>

                                        <div className="form-group mb-4">
                                            <label htmlFor="username">Username</label>
                                            <Field type="username" className="form-control input-lg" id="username" name="username" placeholder="Username" />
                                            <ErrorMessage name="username" component="div" className="text-danger" />
                                        </div>

                                        <div className="form-group mb-4">
                                            <label htmlFor="password">Password</label>
                                            <Field type="password" className="form-control input-lg" id="password" name="password" placeholder="Password" />
                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                        </div>

                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary btn-pill mb-4">
                                                Sign In
                                            </button>
                                            <p>Don't have an account yet? <Link className="text-blue" to={"/register"}>Sign Up</Link></p>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Formik>
        </>
    );
};
export default Login;