import React, {useContext, useState} from 'react';
import {Link, useHistory, useLocation} from "react-router-dom";
import {emailIsValid, nameIsValid, passwordIsMatched, passwordIsValid} from "../helper/validation";
import {UserContext} from "../app";
import {createUserWithEmail} from "../helper/auth";

const Signup = () => {

    const [, setUser] = useContext(UserContext)
    const history = useHistory()
    const location = useLocation()
    const {from} = location.state || {from: {pathname: "/"}}
    const [validName, setValidName] = useState(true)
    const [validEmail, setValidEmail] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [validConfirmPassword, setValidConfirmPassword] = useState(true)
    let pwd = ''

    const redirectPage = () => {
        history.replace(from);
    }

    const handleSignup = event =>{
        event.preventDefault();
        const name = event.target[0].value
        const email = event.target[1].value
        const password = event.target[2].value
        const confirmPassword = event.target[3].value
        if (nameIsValid(name) && emailIsValid(email) && passwordIsValid(password) && passwordIsMatched(password, confirmPassword)){
            createUserWithEmail(name,email,password,setUser,redirectPage)
        }
    }

    const validateSignupForm = event => {
        if (event.target.name === 'name'){
            nameIsValid(event.target.value) ? setValidName(true) : setValidName(false)
        }
        if (event.target.name === 'email'){
            emailIsValid(event.target.value) ? setValidEmail(true) : setValidEmail(false)
        }
        if (event.target.name === 'password'){
            pwd = event.target.value
            passwordIsValid(event.target.value) ? setValidPassword(true) : setValidPassword(false)
        }
        if (event.target.name === 'confirmPassword'){
            passwordIsMatched(pwd,event.target.value) ? setValidConfirmPassword(true) : setValidConfirmPassword(false)
        }
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="loginform card mt-5">
                <h3>Create an Account</h3>
                <br/>
                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input onBlur={validateSignupForm} name="name" type="text" className="form-control" id="name" />
                        {!validName && <div className="text-danger">Name is required</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input onBlur={validateSignupForm} name="email" type="email" className="form-control" id="email" />
                        {!validEmail && <div className="text-danger">Invalid Email</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onBlur={validateSignupForm} name="password" type="password" className="form-control" id="password" />
                        {!validPassword && <div className="text-danger">Password must contain at least 6 characters</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input onBlur={validateSignupForm} name="confirmPassword" type="password" className="form-control" id="confirmPassword"/>
                        {!validConfirmPassword && <div className="text-danger">Password not matched</div>}
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Create an Account</button>
                </form>
                <div className="d-flex flex-column align-items-center mt-3">
                    <h6>Already have an account? <Link to="/login">Login</Link></h6>
                </div>
            </div>
        </div>
    );
};

export default Signup;