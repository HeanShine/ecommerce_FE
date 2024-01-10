import React, {useEffect, useState} from 'react';
import Header from "../homeMain/header";
import productService from "../../service/ProductService";
import {Link, useNavigate, useParams} from "react-router-dom";
import imageDetailService from "../../service/ImageDetailService";
import commentService from "../../service/CommentService";
import {toast} from "react-toastify";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

const ProductDetail = () => {

    const navigate = useNavigate(); // tao ra 1 cai link de chuyen trang

    const [product, setProduct] = useState([]);
    const [load, setLoad] = useState(false);

    const {id} = useParams();

    useEffect(() => {
            productService.getProductById(id).then(res => {
                setProduct(res);
            }).catch(err => {
                console.log(err);
            });
        }, [id, load]
    );

    const [listImageDetailProduct, setListImageDetailProductProduct] = useState([]);
    useEffect(() => {
            imageDetailService.getImageDetail(id).then(res => {
                setListImageDetailProductProduct(res);
            }).catch(err => {
                console.log(err);
            });
        }, [id, load]
    );

    const [listComment, setListComment] = useState([]);
    useEffect(() => {
            commentService.getCommentByProduct(id).then(res => {
                setListComment(res);
            }).catch(err => {
                console.log(err);
            });
        }, [id]
    );

    const [newContent, setNewContent] = useState('');
    const addComment = (comment) => {
        if (comment) {
            commentService.addCommentByProduct(id, comment).then(res => {
                if (res.data) {
                    setLoad(!load);
                    toast.success('Create Success');
                }
            }).catch(err => {
                toast.error('You can not create comment');
            })
        } else {
            setNewContent('');
        }
    }

    const validationSchema = Yup.object({
        content: Yup.string()
            .required('Comment is required')
            .min(6, 'Name must be at least 6 characters')
            .max(15, 'Name must be less than 15 characters')
    });

    return (
        <>
            <div className="modal fade" id="modalAddComment" tabIndex="-1" role="dialog"
                 style={{position: "fixed", zIndex: 9999}}
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Comment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Formik
                                initialValues={{
                                    content : newContent,
                                }}
                                enableReinitialize={true}
                                validationSchema={validationSchema}
                                onSubmit={
                                    (values) => {
                                        addComment(values);
                                    }}>
                                <Form>
                                    <div className="modal-footer">

                                        <Field type="text" className="form-control" name={'content'} id="content"
                                               onInput={(e) => setNewContent(e.target.value)}
                                        ></Field>
                                        <ErrorMessage name="content" component="div" className="text-danger"/>

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

            <div className="container-fluid py-5">
                <div className="row px-xl-5">
                    <div className="col-lg-5 pb-5">
                        <div id="product-carousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner border">

                                <div className="carousel-item active">
                                    <img className="w-100 h-100" src={product.imageMainProduct} alt="Image"/>
                                </div>

                                {listImageDetailProduct?.length > 0 ? listImageDetailProduct.map((imageDetailProduct, index) => {
                                    return (
                                        <>
                                            <div className="carousel-item">
                                                <img className="w-100 h-100"
                                                     src={imageDetailProduct.imageDetailProduct} alt="Image"/>
                                            </div>
                                        </>
                                    )
                                }) : ""}

                            </div>
                            <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                <i className="fa fa-2x fa-angle-left text-dark"></i>
                            </a>
                            <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                                <i className="fa fa-2x fa-angle-right text-dark"></i>
                            </a>
                        </div>

                    </div>

                    <div className="col-lg-7 pb-5">
                        <h3 className="font-weight-semi-bold">{product.name}</h3>
                        <div className="d-flex mb-3">
                            <div className="text-primary mr-2">
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star"></small>
                                <small className="fas fa-star-half-alt"></small>
                                <small className="far fa-star"></small>
                            </div>
                            <small className="pt-1">(50 Reviews)</small>
                        </div>
                        <h3 className="font-weight-semi-bold mb-4">${product.price}</h3>
                        <p className="mb-4">{product.title}</p>

                        <div className="d-flex mb-3">
                            <p className="text-dark font-weight-medium mb-0 mr-3">Quantity:</p>
                            <form>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <p>{product.quantity}</p>
                                </div>
                            </form>
                        </div>

                        <div className="d-flex mb-3">
                            <p className="text-dark font-weight-medium mb-0 mr-3">Category:</p>
                            <form>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <p>{product.nameCategory}</p>
                                </div>
                            </form>
                        </div>

                        <div className="d-flex mb-3">
                            <p className="text-dark font-weight-medium mb-0 mr-3">Shop:</p>
                            <form>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <p>Hean Shop</p>
                                </div>
                            </form>
                        </div>

                        <div className="d-flex mb-3">
                            <p className="text-dark font-weight-medium mb-0 mr-3">Status:</p>
                            <form>
                                <div className="custom-control custom-radio custom-control-inline">
                                    <p>{product.status}</p>
                                </div>
                            </form>
                        </div>

                        <div className="d-flex align-items-center mb-4 pt-2">
                            <div className="input-group quantity mr-3" style={{width: "130px"}}>
                                <div className="input-group-btn">
                                    <button className="btn btn-primary btn-minus">
                                        <i className="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" className="form-control bg-secondary text-center" value="1"/>
                                <div className="input-group-btn">
                                    <button className="btn btn-primary btn-plus">
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button className="btn btn-primary px-3"><i
                                className="fa fa-shopping-cart mr-1"></i> Add To
                                Cart
                            </button>
                        </div>
                        <div className="d-flex pt-2">
                            <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                            <div className="d-inline-flex">
                                <a className="text-dark px-2" href="">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a className="text-dark px-2" href="">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a className="text-dark px-2" href="">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a className="text-dark px-2" href="">
                                    <i className="fab fa-pinterest"></i>
                                </a>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="row px-xl-5">
                    <div className="col">
                        <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                            {/*<a className="nav-item nav-link active" data-toggle="tab"*/}
                            {/*   href="#tab-pane-1">Description</a>*/}
                            {/*<a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Information</a>*/}
                            <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Reviews
                                ({listComment.length})</a>
                        </div>
                        <div className="tab-content">
                            {/*<div className="tab-pane fade show active" id="tab-pane-1">*/}
                            {/*    <h4 className="mb-3">Product Description</h4>*/}
                            {/*    <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero*/}
                            {/*        aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum,*/}
                            {/*        dolor*/}
                            {/*        rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing*/}
                            {/*        kasd*/}
                            {/*        ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd*/}
                            {/*        ipsum*/}
                            {/*        accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit*/}
                            {/*        sanctus*/}
                            {/*        diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos*/}
                            {/*        consetetur at*/}
                            {/*        sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod*/}
                            {/*        takimata dolor ea invidunt.</p>*/}
                            {/*    <p>Dolore magna est eirmod sanctus dolor, amet diam et eirmod et ipsum. Amet dolore*/}
                            {/*        tempor consetetur sed lorem dolor sit lorem tempor. Gubergren amet amet labore*/}
                            {/*        sadipscing clita clita diam clita. Sea amet et sed ipsum lorem elitr et, amet et*/}
                            {/*        labore voluptua sit rebum. Ea erat sed et diam takimata sed justo. Magna*/}
                            {/*        takimata*/}
                            {/*        justo et amet magna et.</p>*/}
                            {/*</div>*/}
                            {/*<div className="tab-pane fade" id="tab-pane-2">*/}
                            {/*    <h4 className="mb-3">Additional Information</h4>*/}
                            {/*    <p>Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero*/}
                            {/*        aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum,*/}
                            {/*        dolor*/}
                            {/*        rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr, sadipscing*/}
                            {/*        kasd*/}
                            {/*        ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod. Takimata kasd*/}
                            {/*        ipsum*/}
                            {/*        accusam sadipscing, eos dolores sit no ut diam consetetur duo justo est, sit*/}
                            {/*        sanctus*/}
                            {/*        diam tempor aliquyam eirmod nonumy rebum dolor accusam, ipsum kasd eos*/}
                            {/*        consetetur at*/}
                            {/*        sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr sanctus eirmod*/}
                            {/*        takimata dolor ea invidunt.</p>*/}
                            {/*    <div className="row">*/}
                            {/*        <div className="col-md-6">*/}
                            {/*            <ul className="list-group list-group-flush">*/}
                            {/*                <li className="list-group-item px-0">*/}
                            {/*                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.*/}
                            {/*                </li>*/}
                            {/*                <li className="list-group-item px-0">*/}
                            {/*                    Amet kasd gubergren sit sanctus et lorem eos sadipscing at.*/}
                            {/*                </li>*/}
                            {/*                <li className="list-group-item px-0">*/}
                            {/*                    Duo amet accusam eirmod nonumy stet et et stet eirmod.*/}
                            {/*                </li>*/}
                            {/*                <li className="list-group-item px-0">*/}
                            {/*                    Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.*/}
                            {/*                </li>*/}
                            {/*            </ul>*/}
                            {/*        </div>*/}
                            {/*        <div className="col-md-6">*/}
                            {/*            <ul className="list-group list-group-flush">*/}
                            {/*                <li className="list-group-item px-0">*/}
                            {/*                    Sit erat duo lorem duo ea consetetur, et eirmod takimata.*/}
                            {/*                </li>*/}
                            {/*                <li className="list-group-item px-0">*/}
                            {/*                    Amet kasd gubergren sit sanctus et lorem eos sadipscing at.*/}
                            {/*                </li>*/}
                            {/*                <li className="list-group-item px-0">*/}
                            {/*                    Duo amet accusam eirmod nonumy stet et et stet eirmod.*/}
                            {/*                </li>*/}
                            {/*                <li className="list-group-item px-0">*/}
                            {/*                    Takimata ea clita labore amet ipsum erat justo voluptua. Nonumy.*/}
                            {/*                </li>*/}
                            {/*            </ul>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className="tab-pane fade" id="tab-pane-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h4 className="mb-4">{listComment.length} review for "{product.name}"</h4>

                                        {listComment?.length > 0 ? listComment.map((comment, index) => {
                                            return (
                                                <>
                                                    <div className="media mb-4">
                                                        <img src={comment.avatar} alt="Image"
                                                             className="img-fluid mr-3 mt-1"
                                                             style={{width: "45px"}}/>
                                                        <div className="media-body">
                                                            <h6>{comment.name}<small> - <i>{comment.date}</i></small>
                                                            </h6>
                                                            <p>{comment.content}</p>
                                                        </div>
                                                    </div>

                                                </>
                                            )
                                        }) : ""}


                                    </div>
                                    <div className="col-md-6">
                                        <h4 className="mb-4">Leave a review</h4>
                                        {/*<small>Your email address will not be published. Required fields are marked*/}
                                        {/*    *</small>*/}

                                        <button className="btn btn-primary" style={{height: "2rem", padding: "0.4rem", fontSize: "0.8rem"}}
                                                data-toggle="modal" data-target="#modalAddComment">
                                            Add Comment
                                        </button>

                                        {/*<form>*/}

                                        {/*    <div className="form-group">*/}
                                        {/*        <label htmlFor="message">Your Review *</label>*/}
                                        {/*        <textarea id="message" cols="30" rows="5"*/}
                                        {/*                  className="form-control"></textarea>*/}
                                        {/*    </div>*/}

                                        {/*    <div className="form-group mb-0">*/}
                                        {/*        <input type="submit" value="Leave Your Review"*/}
                                        {/*               className="btn btn-primary px-3"/>*/}
                                        {/*    </div>*/}

                                        {/*</form>*/}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ProductDetail;