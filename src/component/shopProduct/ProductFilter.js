import React, {useEffect, useState} from 'react';
import Header from "../homeMain/header";
import productService from "../../service/ProductService";
import {toast} from "react-toastify";
const ProductFilter = () => {

    const cart = localStorage.getItem('cart') == null ? [] : JSON.parse(localStorage.getItem('cart'));

    const addCard = (id) => {
        productService.getProductById(id).then(res => {
            let quantityToCart = 1;
            let index = checkProductToCart(id);
            if (index !== -1) {
                quantityToCart = cart[index].quantity + 1;
                cart[index].quantity = quantityToCart;
            }
            else {
                res.quantity = quantityToCart;
                cart.push(res);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            toast.success('Add to cart success!');
        }).catch(err => {
            console.log(err);
        });
        }


    const checkProductToCart = (idProduct) => {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === idProduct) {
                return i;
            }
        }
        return -1;
    }

    const [listProduct, setListProduct] = useState([]);
    const [load, setLoad] = useState(false);

    const [nameSearch, setNameSearch] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0)

    useEffect(() => {
        productService.findAllByFilters(nameSearch, minPrice, maxPrice).then(res => {
            setListProduct(res);
        }).catch(err => {
            console.log(err);
        });
    }, [nameSearch, minPrice, maxPrice, load]);

    const handleSearch = (even) => {
        setNameSearch(even.target.value);
    }

    const handlePriceSearch = (even) => {
        const searchPrice = even.target.value;
        switch (searchPrice) {
            case "price-1":
                setMinPrice(0);
                setMaxPrice(100000);
                break;
            case "price-2":
                setMinPrice(100000);
                setMaxPrice(200000);
                break;

            case "price-3":
                setMinPrice(200000);
                setMaxPrice(300000);
                break;

            case "price-4":
                setMinPrice(300000);
                setMaxPrice(400000);
                break;

            case "price-5":
                setMinPrice(400000);
                setMaxPrice(500000);
        }
    }

    return (
        <>

            <div>

                <Header/>

                <div className="container-fluid pt-5">
                    <div className="row px-xl-5">

                        <div className="col-lg-3 col-md-12">

                            <div className="border-bottom mb-4 pb-4">
                                <h5 className="font-weight-semi-bold mb-4">Filter by price</h5>

                                <form>
                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" className="custom-control-input" id="price-all"
                                               name="price" value="price-all" onChange={handlePriceSearch}/>
                                        <label className="custom-control-label" htmlFor="price-all">All Price</label>
                                        <span className="badge border font-weight-normal">1000</span>
                                    </div>
                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" className="custom-control-input" id="price-1"
                                               name="price" value="price-1" onChange={handlePriceSearch}/>
                                        <label className="custom-control-label" htmlFor="price-1">$0 - $100000</label>
                                        <span className="badge border font-weight-normal">150</span>
                                    </div>
                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" className="custom-control-input" id="price-2"
                                               name="price" value="price-2" onChange={handlePriceSearch}/>
                                        <label className="custom-control-label" htmlFor="price-2">$100000 -
                                            $200000</label>
                                        <span className="badge border font-weight-normal">295</span>
                                    </div>
                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" className="custom-control-input" id="price-3"
                                               name="price" value="price-3" onChange={handlePriceSearch}/>
                                        <label className="custom-control-label" htmlFor="price-3">$200000 -
                                            $300000</label>
                                        <span className="badge border font-weight-normal">246</span>
                                    </div>
                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" className="custom-control-input" id="price-4"
                                               name="price" value="price-4" onChange={handlePriceSearch}/>
                                        <label className="custom-control-label" htmlFor="price-4">$300000 -
                                            $400000</label>
                                        <span className="badge border font-weight-normal">145</span>
                                    </div>
                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between">
                                        <input type="radio" className="custom-control-input" id="price-5"
                                               name="price" value="price-5" onChange={handlePriceSearch}/>
                                        <label className="custom-control-label" htmlFor="price-5">$400000 -
                                            $500000</label>
                                        <span className="badge border font-weight-normal">168</span>
                                    </div>
                                </form>
                            </div>


                            <div className="border-bottom mb-4 pb-4">
                                <h5 className="font-weight-semi-bold mb-4">Filter by category</h5>
                                <form>
                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" className="custom-control-input" checked id="color-all"/>
                                        <label className="custom-control-label" htmlFor="price-all">All Category</label>
                                        <span className="badge border font-weight-normal">1000</span>
                                    </div>

                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" className="custom-control-input" id="color-1"/>
                                        <label className="custom-control-label" htmlFor="color-1">Black</label>
                                        <span className="badge border font-weight-normal">150</span>
                                    </div>

                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" className="custom-control-input" id="color-2"/>
                                        <label className="custom-control-label" htmlFor="color-2">White</label>
                                        <span className="badge border font-weight-normal">295</span>
                                    </div>
                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" className="custom-control-input" id="color-3"/>
                                        <label className="custom-control-label" htmlFor="color-3">Red</label>
                                        <span className="badge border font-weight-normal">246</span>
                                    </div>
                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between mb-3">
                                        <input type="radio" className="custom-control-input" id="color-4"/>
                                        <label className="custom-control-label" htmlFor="color-4">Blue</label>
                                        <span className="badge border font-weight-normal">145</span>
                                    </div>
                                    <div
                                        className="custom-control custom-radio d-flex align-items-center justify-content-between">
                                        <input type="radio" className="custom-control-input" id="color-5"/>
                                        <label className="custom-control-label" htmlFor="color-5">Green</label>
                                        <span className="badge border font-weight-normal">168</span>
                                    </div>
                                </form>
                            </div>


                        </div>


                        <div className="col-lg-9 col-md-12">
                            <div className="row pb-3">

                                <div className="col-12 pb-1">
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <form action="">
                                            <div className="input-group">

                                                <input type="text" className="form-control"
                                                       placeholder="Search by name" onChange={handleSearch}/>
                                                <div className="input-group-append">

                                        <span className="input-group-text bg-transparent text-primary">
                                            <i className="fa fa-search"></i>
                                        </span>
                                                </div>
                                            </div>
                                        </form>
                                        <div className="dropdown ml-4">
                                            <button className="btn border dropdown-toggle" type="button" id="triggerId"
                                                    data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                Sort by
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right"
                                                 aria-labelledby="triggerId">
                                                <a className="dropdown-item" href="#">Latest</a>
                                                <a className="dropdown-item" href="#">Popularity</a>
                                                <a className="dropdown-item" href="#">Best Rating</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {listProduct.map((product, index) => {
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

                                                            <a  className="btn btn-sm text-dark p-0">
                                                                <button className="fas fa-shopping-cart text-primary mr-1"
                                                                   onClick={() => addCard(product.id)}>
                                                                </button>Add To Cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}

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

export default ProductFilter;