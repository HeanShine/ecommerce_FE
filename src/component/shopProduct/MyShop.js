import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Header from "../homeMain/header";
import shopService from "../../service/ShopService";
import {toast} from "react-toastify";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

const MyShop = () => {

    const [listShop, setListShop] = useState([]);
    const [load, setLoad] = useState(false);

    const getAllShopMyAccount = (idBoard) => {
        shopService.getShopByAccount().then(res => {
            if (res.length > 0) {
                setListShop(res)
            } else {
                setListShop([]);
            }

        }).catch(err => {
            console.log(err);
        });
    }

    getAllShopMyAccount();

    const [newShopName, setNewShopName] = useState('');
    const addShop = (shop) => {
        if (shop) {
            shopService.createShop(shop).then(res => {
                if (res.data) {
                    toast.success('Create Success');
                    getAllShopMyAccount();
                }
            }).catch(err => {
                toast.error('You can not create shop');
            })
        } else {
            setNewShopName('');
        }
    }

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Comment is required')
            .min(6, 'Name must be at least 6 characters')
            .max(15, 'Name must be less than 15 characters')
    });


    return (
        <>
            <div className="modal fade" id="modalAddShop" tabIndex="-1" role="dialog"
                 style={{position: "fixed", zIndex: 9999}}
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Shop</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Formik
                                initialValues={{
                                    name: newShopName,
                                }}
                                enableReinitialize={true}
                                validationSchema={validationSchema}
                                onSubmit={
                                    (values) => {
                                        addShop(values);
                                    }}>
                                <Form>
                                    <div className="modal-footer">

                                        <Field type="text" className="form-control" name={'name'} id="name"
                                               onInput={(e) => setNewShopName(e.target.value)}
                                        ></Field>
                                        <ErrorMessage name="name" component="div" className="text-danger"/>

                                        <button type="submit" className="btn btn-primary"
                                        >Save changes
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>

            <Header/>

            <div className="container">
                <div className="cotainer">

                    <button className="btn btn-primary" style={{height: "2rem", padding: "0.4rem", fontSize: "0.8rem"}}
                            data-toggle="modal" data-target="#modalAddShop">
                        Add Shop
                    </button>

                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>name</th>
                            <th>avatar shop</th>
                            <th className="action">Edit</th>
                            <th className="action">Delete</th>
                        </tr>
                        </thead>
                        <tbody>

                        {listShop.length > 0 ? listShop.map((shop, index) => {
                            return (
                                <>
                                    <tr>
                                        <td style={{
                                            padding: "10px", fontSize: "16px", color: "#333",
                                            backgroundColor: "#f4f4f4", borderRadius: "8px", marginTop: "50px"
                                        }}>
                                            <strong>{shop.id}</strong>
                                        </td>

                                        <td style={{
                                            padding: "10px", fontSize: "16px", color: "#333",
                                            backgroundColor: "#f4f4f4", borderRadius: "8px", marginTop: "50px"
                                        }}>
                                            <strong>{shop.name}</strong>
                                        </td>

                                        <td>
                                            <a href={"/productByShop/" + shop.id}>
                                                <img
                                                    src={shop.imageShop}
                                                    style={{
                                                        width: "150px", height: "150px", objectFit: "cover",
                                                        borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
                                                    }}/>
                                            </a>
                                        </td>

                                        <td>
                                            <Link to={"/"}>
                                                <button className="btn btn-warning" style={{marginTop: "50px"}}>Edit
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" style={{marginTop: "50px"}}>delete
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            )
                        }) : ""}

                        </tbody>
                    </table>
                </div>

                <div className="col-12 pb-1">
                    <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-center mb-3">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#">1</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>

        </>
    );
};

export default MyShop;