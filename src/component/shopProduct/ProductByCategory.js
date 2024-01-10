import React, {useEffect, useState} from 'react';
import Header from "../homeMain/header";
import {useParams} from "react-router-dom";
import productService from "../../service/ProductService";

const ProductByCategory = () => {

    const [load, setLoad] = useState(false);
    const [listProductByCategory, setListProductByCategory] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        productService.getAllProductByCategory(id).then(res => {
            setListProductByCategory(res);
        }).catch(err => {
            console.log(err);
        });
    }, [id, load]);

    return (
        <>
            <div>

                <Header/>

                <div className="container-fluid pt-5">
                    <div className="row px-xl-5">

                        <div className="col-lg-12 col-md-12">
                            <div className="row pb-3">
                                {listProductByCategory.length > 0 ? listProductByCategory.map((product, index) => {
                                    return (
                                        <>
                                            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                                                <div className="card product-item border-0 mb-2">
                                                    <div
                                                        className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                                        <img className="img-fluid w-100" src={product.imageMainProduct}
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
                                                        <a href={"/productDetail/" + product.id}
                                                           className="btn btn-sm text-dark p-0"><i
                                                            className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                                        <a href="" className="btn btn-sm text-dark p-0"><i
                                                            className="fas fa-shopping-cart text-primary mr-1"></i>Add
                                                            To Cart</a>
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
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductByCategory;