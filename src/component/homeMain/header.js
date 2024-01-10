import React, {useEffect, useState} from 'react';
import categoryService from "../../service/categoryService";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const [listCategory, setListCategory] = useState([]);
    const [load, setLoad] = useState(true);

    useEffect(() => {
            categoryService.getAllCategory().then(res => {
                setLoad(false)
                setListCategory(res);
            }).catch(err => {
                console.log(err);
            });
        }, [load]
    );

    const [status, setStatus] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setStatus(true);
        }

    }, [status]);

    const navigate = useNavigate();
    const Logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    const accountLogin = JSON.parse(localStorage.getItem('account'));

    const cart = localStorage.getItem('cart') == null ? [] : JSON.parse(localStorage.getItem('cart'));

    return (
        <>
            <div className="row align-items-center py-3 px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                    <a href="" className="text-decoration-none">
                        <h1 className="m-0 display-5 font-weight-semi-bold"><span
                            className="text-primary font-weight-bold border px-3 mr-1">E</span>Hean</h1>
                    </a>
                </div>
                <div className="col-lg-6 col-6 text-left">
                    <form action="/productNameSearch/nameSearch=:nameSearch">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for products"/>
                            <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                                <i className="fa fa-search"></i>
                            </span>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="col-lg-3 col-6 text-right">

                    <a href="/cart" className="btn border">
                        <i className="fas fa-shopping-cart text-primary">{cart.length}</i>
                        <span className="badge">0</span>
                    </a>
                </div>

            </div>

            <div className="container-fluid mb-5">
                <div className="row border-top px-xl-5">

                    <div className="col-lg-3 d-none d-lg-block">

                        <a className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                           data-toggle="collapse" href="#navbar-vertical"
                           style={{height: "65px", marginTop: "-1px", padding: "0 30px"}}>
                            <h6 className="m-0">Categories</h6>
                            <i className="fa fa-angle-down text-dark"></i>
                        </a>

                        {listCategory.map((category, index) => {
                            return (
                                <>
                                    <nav
                                        className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0"
                                        id="navbar-vertical">
                                        <div className="navbar-nav w-100 overflow-hidden">
                                            <a href={"/productBy/" + category.id} className="nav-item nav-link">{category.name}</a>
                                        </div>
                                    </nav>
                                </>
                            )
                        })}
                    </div>

                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold"><span
                                    className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                            </a>
                            <button type="button" className="navbar-toggler" data-toggle="collapse"
                                    data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                <div className="navbar-nav mr-auto py-0">

                                    <a href="/" className="nav-item nav-link active">Home</a>
                                    <a href="/getAllShop" className="nav-item nav-link">Shop</a>
                                    <a href="/product" className="nav-item nav-link">Product</a>
                                    <a href="/order" className="nav-item nav-link">Order</a>

                                    {
                                        status ? <div className="nav-item dropdown">
                                            <a href="#" className="nav-link dropdown-toggle"
                                               data-toggle="dropdown">Account</a>
                                            <div className="dropdown-menu rounded-0 m-0">
                                                <a href="/accountInformation" className="dropdown-item">Account
                                                    Information</a>
                                                <a href="/changePassword" className="dropdown-item">Change Password</a>
                                                <a href="/shop" className="dropdown-item">My Shop</a>
                                                <a href="" className="dropdown-item" onClick={
                                                    Logout
                                                }>Logout</a>
                                            </div>
                                        </div> : <></>
                                    }

                                </div>

                                {
                                    !status ? <div className="navbar-nav ml-auto py-0">
                                            <a href="/login" className="nav-item nav-link">Login</a>
                                            <a href="/register" className="nav-item nav-link">Register</a>
                                        </div> :
                                        <>
                                            <a href="/accountInformation">
                                            <img src={accountLogin.avatar} alt="Image"
                                                 style={{width: "45px", height: "45px"}}/>
                                            </a>
                                        </>
                                }

                            </div>
                        </nav>


                        <div id="header-carousel" className="carousel slide" data-ride="carousel">


                            <div className="carousel-inner">

                                <div className="carousel-item active" style={{height: "410px"}}>
                                    <img className="img-fluid" src="img/carousel-1.jpg" alt="Image"/>
                                    <div
                                        className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{maxWidth: "700px"}}>
                                            <h4 className="text-light text-uppercase font-weight-medium mb-3">10%
                                                Off Your First Order</h4>
                                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">Fashionable
                                                Dress</h3>
                                            <a href="" className="btn btn-light py-2 px-3">Shop Now</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="carousel-item" style={{height: "410px"}}>
                                    <img className="img-fluid" src="img/carousel-2.jpg" alt="Image"/>
                                    <div
                                        className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                        <div className="p-3" style={{maxWidth: "700px"}}>
                                            <h4 className="text-light text-uppercase font-weight-medium mb-3">10%
                                                Off Your First Order</h4>
                                            <h3 className="display-4 text-white font-weight-semi-bold mb-4">Reasonable
                                                Price</h3>
                                            <a href="" className="btn btn-light py-2 px-3">Shop Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <a className="carousel-control-prev" href="#header-carousel" data-slide="prev">
                                <div className="btn btn-dark" style={{width: "45px", height: "45px"}}>
                                    <span className="carousel-control-prev-icon mb-n2"></span>
                                </div>
                            </a>
                            <a className="carousel-control-next" href="#header-carousel" data-slide="next">
                                <div className="btn btn-dark" style={{width: "45px", height: "45px"}}>
                                    <span className="carousel-control-next-icon mb-n2"></span>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;