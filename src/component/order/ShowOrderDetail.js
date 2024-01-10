import React, {useEffect, useState} from 'react';
import orderDetailService from "../../service/OrderDetailService";
import {useParams} from "react-router-dom";

const ShowOrderDetail = () => {

    const [listOrderDetail, setListOrderDetail] = useState([]);
    const [load, setLoad] = useState(false);

    const {id} = useParams();

    useEffect(() => {
        orderDetailService.getOderDetailByOrder(id).then(res => {
            setListOrderDetail(res);
        }).catch(err => {
            console.log(err);
        });
    }, [load]);

    return (
        <div>
            <>
                <style>
                    {`
             body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        ul {
            list-style: none;
            padding: 0;
        }

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ddd;
            padding: 10px 0;
        }

        .total {
            text-align: right;
            font-size: 18px;
            font-weight: bold;
            margin-top: 10px;
        }
            `}
                </style>

                <a href="/order" type="submit" className="btn btn-primary"
                   style={{marginTop: "30px", marginLeft: "150px"}}>
                    Come back order
                </a>

                <div className="container">
                    <h4 style={{textAlign: "center", fontWeight: "bold"}}>Your Order List</h4>

                            <>
                                <div className="container">
                                    <ul>

                                        <li>
                                            <span>Name</span>
                                            <span>Image</span>
                                            <span>Quantity</span>
                                            <span>Price</span>
                                        </li>

                                        {listOrderDetail.length > 0 ? listOrderDetail.map((order, index) => {
                                            return (
                                                <>
                                                    <li className="total">
                                                        <span>{order.nameProduct}</span>
                                                        <span>
                                                 <img
                                                     src={order.imageProduct}
                                                     style={{
                                                         width: "70px", height: "70px", objectFit: "cover",
                                                         borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
                                                     }}/>
                                            </span>
                                                        <span>{order.quantity}</span>
                                                        <span> {order.price}</span>
                                                    </li>
                                                </>
                                            )
                                        }) : ""}

                                    </ul>
                                </div>
                            </>

                </div>
            </>

        </div>
    );
};

export default ShowOrderDetail;