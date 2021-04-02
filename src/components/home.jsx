import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BASE_URL}/products`).then(res=>res.json())
            .then(data=> {
                setProducts(data)
            })
    },[])
    return (
        <div>
            {
                products.length <= 0 &&
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden"/>
                    </div>
                </div>
            }
            <div className="d-flex m-5 justify-content-around flex-wrap">
                {
                    products.map(product =>(
                        <div key={product._id} className="card m-3" style={{width: '18rem'}}>
                            <img style={{height: '250px'}} src={product.image} className="card-img-top" alt={product.image}/>
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h5 className="card-title">{product.name} - {product.wight}</h5>
                                <div className="d-flex align-items-center justify-content-between">
                                    <h5 className="font-weight-bold text-success">${product.price}</h5>
                                    <Link to={`/checkout/${product._id}`} className="btn btn-success">Buy Now</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Home;