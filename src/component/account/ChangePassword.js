import React, {useState} from 'react';
import AccountService from "../../service/AccountService";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik, validateYupSchema} from "formik";
import * as Yup from "yup";

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
   const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const changeInput = (event) => {
        const {name, value} = event.target;
        if (name === 'currentPassword') {
            setCurrentPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmNewPassword') {
            setConfirmNewPassword(value);
         }
    }

    const navigate = useNavigate();
    const editPassword = () => {
        AccountService.changePassword(currentPassword, newPassword)
            .then(() => {
                toast.success('Change Password Success !');
                localStorage.removeItem("token")
                navigate('/');
            })
            .catch(() => {
                toast.error('Change Password Fail !');
                navigate("/");
            });
    }

    const validateSchema= Yup.object().shape({
        currentPassword: Yup.string()
            .min(6, 'Password must contain at least 6 characters')
            .max(32, 'Password must not exceed 32 characters')
            .required('Password is required')
            .matches(/^[a-zA-Z0-9]*$/, 'Password must not contain special characters'),
        newPassword: Yup.string()
            .required('Password is required')
            .min(6, 'Password must contain at least 6 characters')
            .max(32, 'Password must not exceed 32 characters')
            .matches(/^[a-zA-Z0-9]*$/, 'Password must not contain special characters'),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Password must match')
            .required('Password is required')
            .min(6, 'Password must contain at least 6 characters')
            .max(32, 'Password must not exceed 32 characters')
            .matches(/^[a-zA-Z0-9]*$/, 'Password must not contain special characters'),
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
                                    <h4 className="text-dark text-center mb-5">Change Password</h4>
                                    <Formik initialValues={{
                                        currentPassword: '',
                                        newPassword: '',
                                        confirmNewPassword: '',
                                    }}
                                            validationSchema={validateSchema}
                                            onSubmit={(values) => {
                                                editPassword();
                                            }}>
                                        <Form>
                                            <div className="row">
                                                <div className="form-group col-md-12">
                                                    <Field
                                                        type="text"
                                                        className="form-control input-lg"
                                                        id="currentPassword"
                                                        name="currentPassword"
                                                        placeholder="Current Password"
                                                        onInput={changeInput}
                                                    />
                                                    <ErrorMessage name="currentPassword" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group col-md-12">
                                                    <Field
                                                        type="text"
                                                        className="form-control input-lg"
                                                        id="newPassword"
                                                        name="newPassword"
                                                        placeholder="New Password"
                                                        onInput={changeInput}
                                                    />
                                                    <ErrorMessage name="newPassword" component="div" className="text-danger" />
                                                </div>

                                                <div className="form-group col-md-12">
                                                    <Field
                                                        type="text"
                                                        className="form-control input-lg"
                                                        id="confirmNewPassword"
                                                        name="confirmNewPassword"
                                                        placeholder="Confirm New Password"
                                                        onInput={changeInput}
                                                    />
                                                    <ErrorMessage name="confirmNewPassword" component="div" className="text-danger" />
                                                </div>

                                                <div className="col-md-12">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-pill mb-4"
                                                        style={{ marginLeft: '24%' }}
                                                    >
                                                        Change Password
                                                    </button>
                                                    <p>
                                                        Do you want to return to the home page?
                                                        <Link to="/" className="text-blue" style={{ color: 'mediumpurple' }}>
                                                            go back?
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

export default ChangePassword;