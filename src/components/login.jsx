import React, {useContext, useState} from 'react';
import {Link, useHistory, useLocation} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {loginWithEmail, loginWithFacebook, loginWithGoogle} from "../helper/auth";
import {UserContext} from "../app";
import {emailIsValid, passwordIsValid} from "../helper/validation";

const Login = () => {
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [, setUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const {from} = location.state || {from: {pathname: "/"}}

    const validateLoginForm = event => {
        if (event.target.name === 'email'){
            emailIsValid(event.target.value) ? setValidEmail(true) : setValidEmail(false)
        }
        if (event.target.name === 'password'){
            passwordIsValid(event.target.value) ? setValidPassword(true) : setValidPassword(false)
        }
    }
    const redirectPage = () => {
        history.replace(from);
    }
    const handleLogin = event =>{
        event.preventDefault();
        const email = event.target[0].value
        const password = event.target[1].value
        if (emailIsValid(email) && passwordIsValid(password)){
            loginWithEmail(email,password,setUser,redirectPage)
        } else {
        }
    }
    const googleLogin = () => {
        loginWithGoogle(setUser, redirectPage);
    }
    const facebookLogin = () => {
        loginWithFacebook(setUser, redirectPage);
    }
    return (
        <div className="d-flex flex-column align-items-center">
            <div className="loginform card mt-5">
                <h3>Login</h3>
                <br/>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">Email address</label>
                        <input onBlur={validateLoginForm} name="email" type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp"/>
                        {!validEmail && <div className="text-danger">Invalid Email</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <input onBlur={validateLoginForm} name="password" type="password" className="form-control" id="loginPassword"/>
                        {!validPassword && <div className="text-danger">Password must contain at least 6 characters</div>}
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
                <div className="d-flex flex-column align-items-center mt-3">
                    <h6>Don't have an account? <Link to="/signup">Create an account</Link></h6>
                </div>
                <div className="separator">OR</div>
                <button onClick={googleLogin} className="loginbutton google">
                    <FontAwesomeIcon className="float-left" icon={faGoogle} />
                    Login with Google
                </button>
                <button onClick={facebookLogin} className="loginbutton facebook">
                    <FontAwesomeIcon className="float-left" icon={faFacebook} />
                    Login with Facebook
                </button>

            </div>
        </div>
    );
};

export default Login;