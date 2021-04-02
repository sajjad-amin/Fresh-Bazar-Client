import React, {useContext} from 'react';
import {Redirect, Route} from "react-router-dom";
import {UserContext} from "../app";

const PrivateRoute = ({children, ...rest}) => {
    const [user] = useContext(UserContext)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.name ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;