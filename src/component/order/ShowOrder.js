import React, {useEffect, useState} from 'react';
import oderService from "../../service/OderService";

const ShowOrder = () => {

    const [listOrder, setListOrder] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        oderService.getOderByAccount().then(res => {
            setListOrder(res);
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

                <a href="/" type="submit" className="btn btn-primary"
                   style={{marginTop: "30px", marginLeft: "150px"}}>
                    Come back home
                </a>

                <div className="container">
                    <h4 style={{textAlign: "center", fontWeight: "bold"}}>Your Order List</h4>

                    {listOrder.length > 0 ? listOrder.map((order, index) => {
                        return (
                            <>
                                <div className="container">
                                    <ul>

                                        <li>
                                            <span>Purchase Time</span>
                                            <span></span>
                                            <span></span>
                                            <span>{order.datetime}</span>
                                        </li>

                                        <li className="total">
                                            <span>Total Bill:</span>
                                            <span></span>
                                            <span>{order.totalPayment} VNĐ</span>
                                        </li>

                                        <li>
                                            <a href={"/orderDetail/" + order.id} type="button" className="btn btn-warning">Order Detail</a>
                                            <button type="button" className="btn btn-danger">Cancel Order</button>
                                        </li>

                                    </ul>
                                </div>
                            </>
                        )
                    }) : <h4 style={{textAlign: "center", fontWeight: "bold"}}>Bạn chưa có đơn hàng nào</h4>}


                </div>
            </>

        </div>
    );
};

export default ShowOrder;