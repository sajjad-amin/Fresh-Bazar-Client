import React, {useContext, useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {UserContext} from "../app";
const Checkout = () => {
    const {productId} = useParams();
    const [user] = useContext(UserContext)
    const [product, setProduct] = useState([]);
    const history = useHistory();
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BASE_URL}/product/${productId}`).then(res=>res.json())
            .then(data=>{
                setProduct(data)
            })
    },[productId])
    const placeOrder = () => {
        const orderedProduct = {
            ...product[0],
            date: Date.now(),
            email: user.email
        }
        fetch(`${process.env.REACT_APP_BASE_URL}/addOrder`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderedProduct)
        }).then(res=>res.json()).then(data=>{
            if (data.insertedCount === 1){
                history.push('/orders')
            }
        }).catch(err=>console.log(err))
    }
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title mt-2 mb-5">Checkout</h3>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        product.map(info =>(
                            <tr key={info._id}>
                                <td>{info.name}</td>
                                <td>{product.length}</td>
                                <td>{info.price}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                {
                    product.length <= 0 &&
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden"/>
                        </div>
                    </div>
                }
                <button onClick={placeOrder} className="btn btn-success float-right">Checkout</button>
            </div>
        </div>
    );
};

export default Checkout;