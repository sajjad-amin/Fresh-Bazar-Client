import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from "../app";

const Orders = () => {
    const [user] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BASE_URL}/orders`,{
            method: 'GET',
            headers: {
                email: user.email
            }
        }).then(res=>res.json())
            .then(data =>{
                setOrders(data)
            })
    },[user])
    return (
        <div>
            <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">Orders</h3>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Ordered Date</th>
                                <th scope="col">Shipping Address</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                orders.map((product, index)=>(
                                    <tr key={product._id}>
                                        <th>{index+1}</th>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{`${new Date(product.date).toDateString()}, ${new Date(product.date).toLocaleTimeString()}`}</td>
                                        <td>{product.email}</td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        {
                            orders.length <= 0 &&
                            <div className="d-flex justify-content-center mt-5 mb-5">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden"/>
                            </div>
                        </div>}
                    </div>
            </div>
        </div>
    );
};

export default Orders;