import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const fetchData = () =>{
        fetch(`${process.env.REACT_APP_BASE_URL}/products`).then(res=>res.json())
            .then(data=> {
                setProducts(data)
            })
    }
    useEffect(()=>{
        fetchData()
    },[])
    const deleteProduct = id => {
        fetch(`${process.env.REACT_APP_BASE_URL}/removeProduct/${id}`,{
            method: 'DELETE'
        }).then(res=>res.json()).then(data=>{
            if (data.deletedCount === 1){
                fetchData()
            }
        });
    }
    return (
        <div className="m-5">
            <h1>Manage Product</h1>
            {
                products.length <= 0 &&
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden"/>
                    </div>
                </div>
            }
            <table className="table">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">Product Name</th>
                        <th scope="col">Wight</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product =>(
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.weight}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button className="btn btn-sm btn-dark"> <FontAwesomeIcon icon={faEdit}/> </button>
                                    <button onClick={()=>deleteProduct(product._id)} className="btn btn-sm btn-danger ml-2"><FontAwesomeIcon icon={faTrashAlt}/></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageProduct;