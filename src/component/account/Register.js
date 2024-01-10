import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {toast} from "react-toastify";
import accountService from "../../service/AccountService";

const Register = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const register = () => {
        let data = new FormData();
        let name = document.getElementById("name").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        data.append('name', name); // data.append la them vao data 1 key value
        data.append('username', username);
        data.append('password', password);


        accountService.register(data).then((response) => {
            toast.success("Register Success !")
            console.log(response)
            setIsLoggedIn(true);
            navigate('/login');
        }).catch((error) => {
            console.log(error)
            toast.error("Register Fail. Try Again !")
        })
    }


    const validateSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'name does not contain special characters')
            .min(6, "name has at least 6 characters!")
            .required("name is not empty"),
        username: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'username does not contain special characters')
            .min(6, "username has at least 6 characters!")
            .required("username is not empty"),
        password: Yup.string()
            .matches(/^[a-zA-Z0-9]*$/, 'password does not contain special characters')
            .min(6, "password has at least 6 characters!")
            .max(32, "password is not longer than 32 characters!")
            .required("password is not empty"),

    });

    return (
        <div>
            <div className="container d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
                <div className="d-flex flex-column justify-content-between">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-xl-5 col-md-10 ">
                            <div className="card card-default mb-0">
                                <div className="card-header pb-0">
                                    <div className="app-brand w-100 d-flex justify-content-center border-bottom-0">
                                        <div className="w-auto pl-0">
                                            <span className="brand-name text-dark">Register Ecommerce</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body px-5 pb-5 pt-0">
                                    <h4 className="text-dark text-center mb-5">Sign Up</h4>

                                    <Formik initialValues={{
                                        name: '',
                                        username: '',
                                        password: '',
                                    }}
                                            validationSchema={validateSchema}
                                            onSubmit={(values) => {
                                                register();
                                            }}>
                                        <Form>
                                            <div className="row">

                                                <div className="form-group col-md-12 ">
                                                    <Field type="text" className="form-control input-lg" id="name"
                                                           name={'name'}  required="required"
                                                           placeholder="Name"/>
                                                    <ErrorMessage name="name"  component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group col-md-12 ">
                                                    <Field type="text" className="form-control input-lg" id="username"
                                                           name={'username'} placeholder="Username"/>
                                                    <ErrorMessage name="username"  component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group col-md-12 ">
                                                    <Field type="password" className="form-control input-lg"
                                                           id="password" name={'password'} placeholder="Password"/>
                                                    <ErrorMessage name="password"  component="div" className="text-danger" />
                                                </div>

                                                <div className="col-md-12">
                                                    <button type="submit" className="btn btn-primary btn-pill mb-4"
                                                            style={{marginLeft: '37%'}}
                                                    >Sign Up
                                                    </button>
                                                    <p>Already have an account?
                                                        <Link to={"/login"}>
                                                            <a className="text-blue">Sign in</a>
                                                        </Link>
                                                    </p>
                                                </div>

                                            </div>
                                        </Form>
                                    </Formik>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;