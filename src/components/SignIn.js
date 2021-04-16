import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Auth } from 'aws-amplify';

import {loginSuccess} from '../redux/actions/user-actions'

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
            user_pass: '',
            errorMsg: '',
        }        
    }

    componentDidMount() {
        this.authListener()
    }

    authListener = async () => {       
        try {           
            const user = await Auth.currentAuthenticatedUser();
            if(user)
            this.props.history.push("/");

        } catch (err) {
            console.log(err);            
        }
    }

    handleChange = (e) => {
        //console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleFormSubmit = () => {
        const { user_email, user_pass } = this.state
        // console.log('email = ', email)
        // console.log('password = ', password)

        Auth.signIn({
            username: user_email,
            password: user_pass
        })
        .then((data) => {
            console.log('after login data = ', data);
            const user = {
                username : data.username,
                //name : data.attributes.'custom:first_name +''+ data.attributes.custom:last_name,
                email : data.attributes.email
            }
            this.props.actions.loginSuccess(user);
            this.props.history.push("/"); //send to home or report page
        })
        .catch((err) => {
            console.log(err)
            if (err.message) {
                console.log('error');
                this.setState({ errorMsg: err.message })
                //console.log(this.state.errorMsg)
            }
        })
    }

    render() {
        return (
            <div className="row loginbg justify-content-center">
                <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                    <form className="form-signin">
                        <img src="/react_logo.png" alt="logo" />
                        <h1 className="h3 mb-5 mt-3 font-weight-normal">Sign In</h1>
                        <div className="err"><span>{this.state.errorMsg}</span></div>
                        <label htmlFor="user_email" className="sr-only">Email address</label>
                        <input type="email" id="user_email" className="form-control mb-3" placeholder="Email address" onChange={this.handleChange} />
                        <label htmlFor="user_pass" className="sr-only">Password</label>
                        <input type="password" id="user_pass" className="form-control mb-3" placeholder="Password" onChange={this.handleChange} />
                        <div className="checkbox mb-3 float-left">
                            <label><input type="checkbox" value="remember-me" /> Remember me</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="button" onClick={() => this.handleFormSubmit()}>Sign in</button>
                        <p className="mt-3 mb-0 text-muted">Not a member? <Link to="/signup">Sign up now</Link></p>
                    </form>
                </div>
            </div>
        )
    }
}

const SignInContainer = connect(
    (storeState) => {
        return {
            user: storeState.userReducer,
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({
                loginSuccess
            }, dispatch)
        };
    }
)(SignIn);

export default SignInContainer;