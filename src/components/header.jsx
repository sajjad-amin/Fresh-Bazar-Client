import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import {UserContext} from "../app";
import {logOut} from "../helper/auth";

const Header = () => {
    const [user, setUser] = useContext(UserContext)
    return (
        <nav className="navbar sticky-top bg-light">
            <h2 className="text-success">FRESH BAZAR</h2>
            <div className="d-flex align-items-center flex-row-reverse">
                {
                    user.name ? <button onClick={()=>logOut(setUser)} className="btn btn-danger">
                            Logout
                            <figcaption className="blockquote-footer d-inline text-white font-weight-lighter">
                                {`(${user.name})`}
                            </figcaption>
                    </button>:
                        <Link to="/login" className="btn btn-primary">Login</Link>
                }
                <Link to="/" className="mr-4">Deals</Link>
                <Link to="/admin" className="mr-4">Admin</Link>
                <Link to="/orders" className="mr-4">Orders</Link>
                <Link to="/home" className="mr-4">Home</Link>
            </div>
        </nav>
    );
};

export default Header;