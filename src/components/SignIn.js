import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SignIn extends Component {
    render() {
        return (
            <div className="row loginbg justify-content-center">
                <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                    <form className="form-signin">
                        <img src="/react_logo.png" alt="logo" />
                        <h1 className="h3 mb-5 mt-3 font-weight-normal">Sign In</h1>
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control mb-3" placeholder="Email address" required="" autoFocus="" />
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control mb-3" placeholder="Password" required="" />
                        <div className="checkbox mb-3">
                            <label><input type="checkbox" value="remember-me" /> Remember me</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        <p className="mt-3 mb-0 text-muted">Not a member? <Link to="/signup">Sign up now</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}

export default SignIn;