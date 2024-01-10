import React, {useEffect, useState} from 'react';
import Header from "../homeMain/header";
import {useParams} from "react-router-dom";
import productService from "../../service/ProductService";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {toast} from "react-toastify";
import categoryService from "../../service/categoryService";

const ProductByShop = () => {

    const [load, setLoad] = useState(false);
    const [listProductByShop, setListProductByShop] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        productService.getProductByShop(id).then(res => {
            setListProductByShop(res);
        }).catch(err => {
            console.log(err);
        });
    }, [id, load]);

    const [listCategory, setListCategory] = useState([]);
    useEffect(() => {
        categoryService.getAllCategory().then(res => {
            setListCategory(res);
        }).catch(err => {
            console.log(err);
        });

    }, [load]);

    const [nameProduct, setNameProduct] = useState('');
    const [titleProduct, setTitleProduct] = useState('');
    const [statusProduct, setStatusProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState(0);
    const [quantityProduct, setQuantityProduct] = useState(0);
    const [imageMainProduct, setImageMainProduct] = useState('');
    const [categoryProduct, setCategoryProduct] = useState({});
    const [categoryProductId, setCategoryProductId] = useState(0);

    const addProduct = (product, id) => {
        if (product) {

            const productSave = {
                name: product.name,
                title: product.title,
                status: product.status,
                price: product.price,
                quantity: product.quantity,
                imageMainProduct: product.imageMainProduct,
                category: {id: categoryProductId}
            }
            console.log(productSave);
            productService.createProductByShop(productSave, id).then(res => {
                toast.success('Create Success');
                document.getElementById('closeModal').click()
                setLoad(!load);
            }).catch(err => {
                toast.error('You can not create shop');
            })
        } else {
            setNameProduct('');
            setTitleProduct('');
            setStatusProduct('');
            setPriceProduct(null);
            setQuantityProduct(null);
            setImageMainProduct('');
            setCategoryProduct(null);
        }
    }
    const handleCategoryId = (e) => {
        console.log(e.target.value);
        setCategoryProductId(e.target.value)
    }

    const removeProduct = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this board?");
        if (confirm === true) {
            productService.removeProduct(id).then(res => {
                toast.success('Delete Success');
                setLoad(!load);
            }).catch(err => {
                toast.error('You can not delete product');
            })
        } else {
            setLoad(!load);
        }
    }

    const [productEdit, setProductEdit] = useState({});
    const getProductById = (id) => {
        productService.getProductById(id).then(res => {
            setProductEdit(res);
        }).catch(err => {
            console.log(err);
        });
    }

    const editProduct = (product, id) => {
        productService.editProductByIdProduct(product, id).then(res => {
            toast.success('Edit Success');
            document.getElementById('closeModal').click()
            setLoad(!load);
        }).catch(err => {
            toast.error('You can not edit product');
        })
    }

        return (
            <>

                <div className="modal fade" id="modalEditProduct" tabIndex="-1" role="dialog"
                     style={{position: "fixed", zIndex: 9999}}
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create Product</h5>
                                <button type="button" id={'closeModal'} className="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Formik
                                    initialValues={productEdit}
                                    enableReinitialize={true}
                                    onSubmit={
                                        (values) => {
                                            editProduct(values, productEdit.id);
                                        }}>
                                    <Form>
                                        <div className="modal-footer">

                                            <Field type="text" className="form-control" name={'name'} id="name"
                                                   placeholder="Input name"
                                                   onInput={(e) => setNameProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="name" component="div" className="text-danger"/>

                                            <Field type="text" className="form-control" name={'title'} id="title"
                                                   placeholder="Input title"
                                                   onInput={(e) => setTitleProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="title" component="div" className="text-danger"/>

                                            <Field type="text" className="form-control" name={'status'} id="status"
                                                   placeholder="Input status"
                                                   onInput={(e) => setStatusProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="status" component="div" className="text-danger"/>

                                            <Field type="price" className="form-control" name={'price'} id="price"
                                                   placeholder="Input price"
                                                   onInput={(e) => setPriceProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="price" component="div" className="text-danger"/>

                                            <Field type="price" className="form-control" name={'quantity'} id="quantity"
                                                   placeholder="Input quantity"
                                                   onInput={(e) => setQuantityProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="quantity" component="div" className="text-danger"/>

                                            <Field type="text" className="form-control" name={'imageMainProduct'}
                                                   id="imageMainProduct"
                                                   placeholder="Input imageMainProduct"
                                                   onInput={(e) => setImageMainProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="imageMainProduct" component="div"
                                                          className="text-danger"/>

                                            <Field as="select" onChange={handleCategoryId} name="category"
                                                   className="form-control">
                                                {listCategory.map((category, index) => {
                                                    return (
                                                        <option
                                                            key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    )
                                                })}
                                            </Field>
                                            <ErrorMessage name="category" component="div"></ErrorMessage>

                                            <button type="submit" className="btn btn-primary">
                                                Save changes
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modalAddProduct" tabIndex="-1" role="dialog"
                     style={{position: "fixed", zIndex: 9999}}
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create Product</h5>
                                <button type="button" id={'closeModal'} className="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Formik
                                    initialValues={{
                                        name: nameProduct,
                                        title: titleProduct,
                                        status: statusProduct,
                                        price: priceProduct,
                                        quantity: quantityProduct,
                                        imageMainProduct: imageMainProduct,

                                    }}
                                    enableReinitialize={true}
                                    onSubmit={
                                        (values) => {
                                            addProduct(values, id);
                                        }}>
                                    <Form>
                                        <div className="modal-footer">

                                            <Field type="text" className="form-control" name={'name'} id="name"
                                                   placeholder="Input name"
                                                   onInput={(e) => setNameProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="name" component="div" className="text-danger"/>

                                            <Field type="text" className="form-control" name={'title'} id="title"
                                                   placeholder="Input title"
                                                   onInput={(e) => setTitleProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="title" component="div" className="text-danger"/>

                                            <Field type="text" className="form-control" name={'status'} id="status"
                                                   placeholder="Input status"
                                                   onInput={(e) => setStatusProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="status" component="div" className="text-danger"/>

                                            <Field type="price" className="form-control" name={'price'} id="price"
                                                   placeholder="Input price"
                                                   onInput={(e) => setPriceProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="price" component="div" className="text-danger"/>

                                            <Field type="price" className="form-control" name={'quantity'} id="quantity"
                                                   placeholder="Input quantity"
                                                   onInput={(e) => setQuantityProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="quantity" component="div" className="text-danger"/>

                                            <Field type="text" className="form-control" name={'imageMainProduct'}
                                                   id="imageMainProduct"
                                                   placeholder="Input imageMainProduct"
                                                   onInput={(e) => setImageMainProduct(e.target.value)}
                                            ></Field>
                                            <ErrorMessage name="imageMainProduct" component="div"
                                                          className="text-danger"/>

                                            <Field as="select" onChange={handleCategoryId} name="category"
                                                   className="form-control">
                                                {listCategory.map((category, index) => {
                                                    return (
                                                        <option
                                                            key={category.id} value={category.id}>
                                                            {category.name}
                                                        </option>
                                                    )
                                                })}
                                            </Field>
                                            <ErrorMessage name="category" component="div"></ErrorMessage>

                                            <button type="submit" className="btn btn-primary">
                                                Save changes
                                            </button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <Header/>
                    <div className="cotainer">
                        <div className="row px-xl-5">
                            <div className="col-lg-12 col-md-12">
                                <button className="btn btn-primary"
                                        style={{height: "2rem", padding: "0.4rem", fontSize: "0.8rem"}}
                                        data-toggle="modal" data-target="#modalAddProduct">
                                    Add Product
                                </button>
                                <div className="container-fluid pt-5">

                                    <div className="row pb-3">
                                        {listProductByShop.length > 0 ? listProductByShop.map((product, index) => {
                                            return (
                                                <>
                                                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                                                        <div className="card product-item border-0 mb-2">
                                                            <div
                                                                className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                                                <img className="img-fluid w-100"
                                                                     src={product.imageMainProduct}
                                                                     alt=""/>
                                                            </div>
                                                            <div
                                                                className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                                                <h6 className="text-truncate mb-3">{product.name}</h6>
                                                                <div className="d-flex justify-content-center">
                                                                    <h6>{product.price}</h6>
                                                                    <h6 className="text-muted ml-2">
                                                                        <del>{product.price}</del>
                                                                    </h6>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="card-footer d-flex justify-content-between bg-light border">
                                                                <button className="btn btn-pill btn-primary" style={{
                                                                    height: "2rem",
                                                                    padding: "0.4rem",
                                                                    fontSize: "0.8rem"
                                                                }}
                                                                        data-target="#modalEditProduct"
                                                                        data-toggle="modal"
                                                                        onClick={() => getProductById(product.id)}
                                                                >Edit
                                                                </button>
                                                                <button className="btn btn-pill btn-danger" style={{
                                                                    height: "2rem",
                                                                    padding: "0.4rem",
                                                                    fontSize: "0.8rem"
                                                                }}
                                                                        onClick={() => removeProduct(product.id)}
                                                                >Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }) : <h1>Không có sản phẩm nào</h1>}

                                        <div className="col-12 pb-1">
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination justify-content-center mb-3">
                                                    <li className="page-item disabled">
                                                        <a className="page-link" href="#" aria-label="Previous">
                                                            <span aria-hidden="true">&laquo;</span>
                                                            <span className="sr-only">Previous</span>
                                                        </a>
                                                    </li>
                                                    <li className="page-item active"><a className="page-link"
                                                                                        href="#">1</a>
                                                    </li>
                                                    <li className="page-item"><a className="page-link"
                                                                                 href="#">2</a></li>
                                                    <li className="page-item"><a className="page-link"
                                                                                 href="#">3</a></li>
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
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    export default ProductByShop;