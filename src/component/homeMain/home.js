import React, {useEffect, useState} from 'react';
import Header from "./header";
import categoryService from "../../service/categoryService";
import productService from "../../service/ProductService";

const Home = () => {

    const [listNewCategory, setNewListCategory] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
            categoryService.getNewCategory().then(res => {
                setNewListCategory(res);
            }).catch(err => {
                console.log(err);
            });
        }, [load]
    );

    const [listNewProduct, setListNewProduct] = useState([]);

    useEffect(() => {
            productService.getNewProduct().then(res => {
                setListNewProduct(res);
            }).catch(err => {
                console.log(err);
            });
        }, [load]
    );

    return (
        <>
            <div>
                <Header/>

                <div className="container-fluid pt-5">
                    <div className="text-center mb-4">
                        <h2 className="section-title px-5"><span className="px-2">Category Outstanding</span></h2>
                    </div>
                    <div className="row px-xl-5 pb-3">
                        {listNewCategory.map((category, index) => {
                            return (
                                <div className="col-lg-4 col-md-6 pb-1">
                                    <div className="cat-item d-flex flex-column border mb-4" style={{padding: "30px"}}>
                                        <p className="text-right"> ?? Products</p>
                                        <a href={"/productBy/" + category.id} className="cat-img position-relative overflow-hidden mb-3">
                                            <img className="img-fluid" src={category.imageMainCategory} alt=""
                                                 style={{width: '300px', height: '250px'}}/>
                                        </a>

                                        <h5 className="font-weight-semi-bold m-0">
                                            {category.name}
                                        </h5>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="container-fluid pt-5">

                    <div className="text-center mb-4">
                        <h2 className="section-title px-5"><span className="px-2">New Products</span></h2>
                    </div>

                    <div className="row px-xl-5 pb-3">
                        {listNewProduct.map((product, index) => {
                            return (
                                <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                                    <div className="card product-item border-0 mb-4">
                                        <div
                                            className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                            <img className="img-fluid w-100" src={product.imageMainProduct} alt=""
                                                 style={{width: '300px', height: '250px'}}/>
                                        </div>
                                        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                            <h6 className="text-truncate mb-3">{product.name}</h6>
                                            <div className="d-flex justify-content-center">
                                                <h6>{product.price}</h6>
                                                <h6 className="text-muted ml-2">
                                                    <del>{product.price}</del>
                                                </h6>
                                            </div>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between bg-light border">
                                            <a href={"/productDetail/" + product.id} className="btn btn-sm text-dark p-0"><i
                                                className="fas fa-eye text-primary mr-1"></i>View Detail</a>
                                            <a href="" className="btn btn-sm text-dark p-0"><i
                                                className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                                        </div>
                                    </div>
                                </div>
                            )})}
                    </div>

                </div>

            </div>
        </>
    );
};

export default Home;