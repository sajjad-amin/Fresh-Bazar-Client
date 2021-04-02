import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";

const AddProduct = () => {
    const [product] = useState({
        name: '',
        wight: '',
        price: '',
        image: '',
    });
    const history = useHistory();
    const [uploading, setUploading] = useState({status: ''});
    const handleChange = event => {
        product[event.target.id] = event.target.value
    }
    const uploadPhoto = event => {
        const photo = event.target.files[0]
        const imageData = new FormData();
        imageData.set('key', process.env.REACT_APP_IMAGE_API);
        imageData.append('image', photo);
        setUploading({status: 'uploading'});
        fetch(process.env.REACT_APP_IMAGE_UPLOAD_URL,{
            method: 'POST',
            body: imageData
        }).then(res=>res.json()).then(data=>{
            product.image = data.data.display_url;
            setUploading({status: 'complete'});
        })
    }
    const handleSubmit = event =>{
        event.preventDefault();
        if (product.image){
            fetch(`${process.env.REACT_APP_BASE_URL}/addProduct`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            }).then(res=>res.json()).then(data=>{
                if (data.insertedCount === 1){
                    history.push('/admin/manage')
                }
            }).catch(err=>console.log(err))
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="m-5">
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="name" className="form-label">Product Name</label>
                        <input onChange={handleChange} type="text" className="form-control" id="name" placeholder="Enter product name"/>
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="wight" className="form-label">Wight</label>
                        <input onChange={handleChange} type="text" className="form-control" id="wight" placeholder="Enter product wight"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input onChange={handleChange} type="text" className="form-control" id="price" placeholder="Enter product price"/>
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="wight" className="form-label">Add Photo</label>
                        <br/>
                        <input onChange={uploadPhoto} type="file" />
                        {uploading.status === 'uploading'&&<div className="spinner-border text-success" role="status">
                            <span className="visually-hidden"/>
                        </div>}
                        {uploading.status === 'complete'&&<FontAwesomeIcon className="text-success" icon={faCheckCircle}/>}
                    </div>
                </div>
                <button type="submit" className="btn btn-success mt-5 float-lg-right">Save</button>
            </form>
        </div>
    );
};

export default AddProduct;