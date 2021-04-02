import React from 'react';
import {Switch, Link, useRouteMatch} from "react-router-dom";
import PrivateRoute from "../../helper/PrivateRoute";
import AddProduct from "./AddProduct";
import ManageProduct from "./ManageProduct";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faThLarge} from "@fortawesome/free-solid-svg-icons";
import EditProduct from "./EditProduct";

const Admin = ({load}) => {
    const { url } = useRouteMatch();
    return (
        <div>
            <nav className="sidebar">
                <ul className="nav flex-column mt-5 ml-3">
                    <li className="nav-item">
                        <Link to={`${url}/manage`} className="nav-link admin-nav" href="#"><FontAwesomeIcon icon={faThLarge}/> Manage Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`${url}`} className="nav-link admin-nav" href="#"><FontAwesomeIcon icon={faPlus}/> Add Product</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`${url}/edit`} className="nav-link admin-nav" href="#"><FontAwesomeIcon icon={faEdit}/> Edit Product</Link>
                    </li>
                </ul>
            </nav>
            <div className="admin-panel">
                <Switch>
                    <PrivateRoute exact path={url}>
                        <AddProduct/>
                    </PrivateRoute>
                    <PrivateRoute path={`${url}/manage`}>
                        <ManageProduct/>
                    </PrivateRoute>
                    <PrivateRoute path={`${url}/edit`}>
                        <EditProduct/>
                    </PrivateRoute>
                </Switch>
            </div>
        </div>
    );
};

export default Admin;