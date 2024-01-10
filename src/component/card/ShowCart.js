import React, {useState} from 'react';
import {toast} from "react-toastify";
import oderService from "../../service/OderService";

const ShowCart = () => {

    const cart = localStorage.getItem('cart') == null ? [] : JSON.parse(localStorage.getItem('cart'));
    const [listCart, setListCart] = useState(cart);

    const deleteCart = (id) => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const newCart = cart.filter(item => item.id !== id);
        toast.success('Delete cart success!');
        localStorage.setItem('cart', JSON.stringify(newCart));
        setListCart(newCart);
    }

    const total = () => {
        let total = 0;
        for (let i = 0; i < listCart.length; i++) {
            total += listCart[i].price * listCart[i].quantity;
        }
        return total;
    }

    const Oder = (cart) => {
        oderService.createOder(cart).then((res) => {
            toast.success('Create Success');
            localStorage.removeItem('cart');
            setListCart([]);
            window.location.href = "/cart";
        }).catch((err) => {
            console.log(err);
            toast.error('Oder fail!');
        })
    }

    return (
        <div>
            <>
                <div className="container" style={{marginTop: "50px"}}>


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
                                <a href="/" className="btn btn-warning" style={{marginTop: "20px"}}>
                                    Come back home
                                </a>
                            </div>

                        </div>
                    </div>

                    <div className="cotainer">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>name</th>
                                <th>avatar shop</th>
                                <th>quantity</th>
                                <th>price</th>

                                <th className="action">Delete</th>
                            </tr>
                            </thead>
                            <tbody>


                            <>
                                {listCart.length > 0 ? listCart.map((product, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td style={{
                                                    padding: "10px", fontSize: "16px", color: "#333",
                                                    backgroundColor: "#f4f4f4", borderRadius: "8px", marginTop: "50px"
                                                }}>
                                                    <strong>{product.name}</strong>
                                                </td>

                                                <td>
                                                    <a href="">
                                                        <img
                                                            src={product.imageMainProduct}
                                                            style={{
                                                                width: "150px",
                                                                height: "150px",
                                                                objectFit: "cover",
                                                                borderRadius: "8px",
                                                                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
                                                            }}/>
                                                    </a>
                                                </td>

                                                <td style={{
                                                    padding: "10px", fontSize: "16px", color: "#333",
                                                    backgroundColor: "#f4f4f4", borderRadius: "8px", marginTop: "50px"
                                                }}>
                                                    <strong>{product.quantity}</strong>
                                                </td>

                                                <td style={{
                                                    padding: "10px", fontSize: "16px", color: "#333",
                                                    backgroundColor: "#f4f4f4", borderRadius: "8px", marginTop: "50px"
                                                }}>
                                                    <strong>{product.price}</strong>
                                                </td>

                                                <td>
                                                    <button className="btn btn-danger"
                                                            style={{marginTop: "50px"}}
                                                            onClick={() => deleteCart(product.id)}
                                                    >delete
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                }) : <h1>Không có sản phẩm nào</h1>}

                            </>

                            </tbody>
                        </table>
                    </div>

                    <div className="total" style={{backgroundColor: "#f4f4f4", borderRadius: "8px"}}>
                        Tổng tiền: {total()} VND
                    </div>

                    <button type={"button"} className="btn btn-success" style={{marginTop: "20px"}}
                            onClick={() => Oder(cart)}>
                        Oder
                    </button>

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
        </div>
    );
};

export default ShowCart;