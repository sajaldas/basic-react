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
            errorMsg: '',
            validationErr: {
                first_name: '',
                last_name: '',
                user_email: '',
                user_pass: '',
            }
        }
    }

    handleChange = (e) => {
        //console.log(e.target.id);
        const elemId = e.target.id
        const validationErr = this.state.validationErr
        //console.log('elemId = ', elemId, ', value = ', e.target.value);

        if(e.target.value != null)
        {
            console.log('validationErr = ', validationErr);
            validationErr[elemId] = ''
        }

        this.setState({
            [elemId]: e.target.value
        })
        this.setState({validationErr: validationErr})
        
    }

    validateForm = (stateObj) => {
        var errors = {}
        let formIsValid = true;

        if(stateObj.first_name === '')
        {
            formIsValid = false
            errors['first_name'] = 'First name is required'
        }
        

        if(stateObj.last_name === '')
        {
            formIsValid = false
            errors['last_name'] = 'Last name is required'
        }

        if(stateObj.user_email === '')
        {
            formIsValid = false
            errors['user_email'] = 'Email Address is required'
        }

        if(stateObj.user_pass === '')
        {
            formIsValid = false
            errors['user_pass'] = 'Password is required'
        }

        this.setState({validationErr: errors})
        
        return formIsValid
    }

    handleFormSubmit = () => {
        
        const { first_name, last_name, user_email, user_pass, signedUp, confirmationCode } = this.state
        //console.log('email = ', user_email, ', password = ', user_pass);
        //console.log('err = ', this.state.validationErr);

        if(this.validateForm(this.state))
        {
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
                    })
                    .catch((err) => {
                        console.log(err)
                        if (err.message) {
                            console.log('error');
                            this.setState({ errorMsg: err.message })
                            //console.log(this.state.errorMsg)
                        }
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

                                <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.handleFormSubmit()}>Sign Up</button>
                                {/*  */}
                            </form>
                        </div>
                    </div>
                )
            }
        }
        else {
            //const errors = this.state.validationErr.fname
            return (
                <div className="row loginbg justify-content-center">
                    <div className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3">
                        <form className="form-signup">
                            <img src="/react_logo.png" alt="logo" />
                            <h1 className="h3 mb-5 mt-3 font-weight-normal">Sign Up</h1>
                            <div className="form-group">
                                <label htmlFor="first_name" className="sr-only">First Name</label>
                                <input type="text" id="first_name" className="form-control" placeholder="First Name*" autoComplete="off" onChange={this.handleChange} />
                                <span className="err">{this.state.validationErr.first_name}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="last_name" className="sr-only">Last Name</label>
                                <input type="text" id="last_name" className="form-control" placeholder="Last Name*" autoComplete="off" onChange={this.handleChange} />
                                <span className="err">{this.state.validationErr.last_name}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="user_email" className="sr-only">Email address</label>
                                <input type="email" id="user_email" className="form-control" placeholder="Email address*" autoComplete="off" onChange={this.handleChange} />
                                <span className="err">{this.state.validationErr.user_email}</span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="user_pass" className="sr-only">Password</label>
                                <input type="password" id="user_pass" className="form-control" placeholder="Password*" onChange={this.handleChange} />
                                <span className="err">{this.state.validationErr.user_pass}</span>
                            </div>

                            {/* <div className="checkbox">
                            <label><input type="checkbox" value="remember-me" /> Remember me</label>
                            </div> */}
                            <span className="formerr err">{this.state.errorMsg}</span>

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