import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Header from "../homeMain/header";
import shopService from "../../service/ShopService";

const Shop = () => {

    const [listShop, setListShop] = useState([]);

    const getAllShop = () => {
        shopService.getAllShop().then(res => {
            if (res.length > 0) {
                setListShop(res)
            } else {
                setListShop([]);
            }

        }).catch(err => {
            console.log(err);
        });
    }
    getAllShop();

    return (
        <>
            <Header/>

            <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <form action="">
                        <div className="input-group">

                            <input type="text" className="form-control"
                                   placeholder="Search by name"/>
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

            <div className="cotainer">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>name</th>
                        <th>avatar shop</th>
                        {/*<th className="action">Edit</th>*/}
                        {/*<th className="action">Delete</th>*/}
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

                                    {/*<td>*/}
                                    {/*    <Link to={"/"}>*/}
                                    {/*        <button className="btn btn-warning" style={{marginTop: "50px"}}>Edit*/}
                                    {/*        </button>*/}
                                    {/*    </Link>*/}
                                    {/*</td>*/}
                                    {/*<td>*/}
                                    {/*    <button className="btn btn-danger" style={{marginTop: "50px"}}>delete*/}
                                    {/*    </button>*/}
                                    {/*</td>*/}
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
        </>
    );
};

export default Shop;