import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';


class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            first_name: '',
            last_name: '',
            user_email: '',
            user_pass: '',
            confirmationCode: '',
            signedUp: false,
            thankyouSignUp: false,
            errorMsg: ''
        }
    }

    handleChange = (e) => {
        console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleFormSubmit = () => {
        const { first_name, last_name, user_email, user_pass, signedUp, confirmationCode } = this.state

        //console.log('email = ', user_email, ', password = ', user_pass);
        if (!signedUp) {
            Auth.signUp({
                'username': user_email,
                'password': user_pass,
                'attributes': {
                    'email': user_email,
                    //'phone_number': '+12135555555',
                    'custom:first_name': first_name,
                    'custom:last_name': last_name
                }
            })
                .then((data) => {
                    console.log('data = ', data);
                    if (data.codeDeliveryDetails)
                        this.setState({ signedUp: true });
                });
        }
        else {
            Auth.confirmSignUp(user_email, confirmationCode)
                .then(() => {
                    console.log('signup success')
                    this.setState({ thankyouSignUp: true });
                })
                .catch(err => console.log(err));
        }
    }


    render() {
        if (this.state.signedUp) {
            if (this.state.thankyouSignUp) {
                return (
                    <div className="row loginbg justify-content-center">
                        <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                            <form className="form-confirm-signup">
                                <img src="/react_logo.png" alt="logo" />
                                <h1 className="h3 mb-5 mt-3 font-weight-normal">Sign Up</h1>
                                <div><p>Successfully Signed up</p></div>
                                <div>Click <Link to="/signin">here</Link> to continue to login</div>
                            </form>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="row loginbg justify-content-center">
                        <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                            <form className="form-confirm-signup">
                                <img src="/react_logo.png" alt="logo" />
                                <h1 className="h3 mb-5 mt-3 font-weight-normal">Confirm Sign Up</h1>

                                <label htmlFor="user_email" className="sr-only">Email address</label>
                                <input type="email" id="user_email" className="form-control mb-3" value={this.state.user_email} disabled="disabled" onChange={this.handleChange} />

                                <label htmlFor="confirmationCode" className="sr-only">Confirmation Code</label>
                                <input type="text" id="confirmationCode" className="form-control mb-3" placeholder="Confirmation Code" onChange={this.handleChange} />

                                <button className="btn btn-lg btn-primary btn-block" type="button" onClick={() => this.handleFormSubmit()}>Sign Up</button>
                            </form>
                        </div>
                    </div>
                )
            }
        }
        else {
            return (
                <div className="row loginbg justify-content-center">
                    <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                        <form className="form-signup">
                            <img src="/react_logo.png" alt="logo" />
                            <h1 className="h3 mb-5 mt-3 font-weight-normal">Sign Up</h1>
                            <label htmlFor="first_name" className="sr-only">First Name</label>
                            <input type="text" id="first_name" className="form-control mb-3" placeholder="First Name" onChange={this.handleChange} />

                            <label htmlFor="last_name" className="sr-only">Last Name</label>
                            <input type="text" id="last_name" className="form-control mb-3" placeholder="Last Name" onChange={this.handleChange} />

                            <label htmlFor="user_email" className="sr-only">Email address</label>
                            <input type="email" id="user_email" className="form-control mb-3" placeholder="Email address" onChange={this.handleChange} />

                            <label htmlFor="user_pass" className="sr-only">Password</label>
                            <input type="password" id="user_pass" className="form-control mb-3" placeholder="Password" onChange={this.handleChange} />
                            {/* <div className="checkbox mb-3">
                            <label><input type="checkbox" value="remember-me" /> Remember me</label>
                        </div> */}
                            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={() => this.handleFormSubmit()}>Sign Up</button>
                            <p className="mt-3 mb-0 text-muted">Already have an account? <Link to="/signin">Sign in</Link></p>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default SignUp;