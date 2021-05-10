import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Header from './Header';
import Footer from './Footer';
import SignIn from './../SignIn'
import SignUp from './../SignUp'
import Home from './Home'
import NotFound from '../NotFound'
import Report from './../Report'
import Chart from './../Chart'

import {logoutSuccess} from '../../redux/actions/user-actions'
import { Auth } from 'aws-amplify';

import history from '../../history'


class Container extends Component 
{
    constructor(props)
    {        
        super(props)
        this.state= {
            isLogin: this.props.user.isUserLoggedIn
        }
    }

    componentDidMount() {
        this.authListener();  
    }

    componentDidUpdate(prevProps, prevState){
        // console.log('prevProps = ', prevProps.user.isUserLoggedIn)
        // console.log('new prop = ', this.props.user.isUserLoggedIn)
        if (prevProps.user.isUserLoggedIn !== this.props.user.isUserLoggedIn) 
        {
            this.setState({ isLogin: this.props.user.isUserLoggedIn })
        }
    }

    authListener = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            //console.log('user = ', user);
            if(user)
            this.setState({ isLogin: true })
        } catch (err) {
            console.log(err);
            history.push('/signin');
        }
    }

    handleLogout = async () => {
        try {
            await Auth.signOut({ global: true });
            this.setState({ isLogin: false })
            this.props.actions.logoutSuccess();            
            history.push('/signin');
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    render()
    {
        return (
            <>
            <Header isLogin={this.state.isLogin} handleLogout={this.handleLogout} />
            <div className="container-fluid app-container">   
                <Switch>
                    <Route exact path="/report" component={Report}></Route>
                    <Route exact path="/chart" component={Chart}></Route>
                    <Route exact path="/signin" component={SignIn}></Route>
                    <Route exact path="/signup" component={SignUp}></Route>                   
                    <Route exact path="/" component={Home}></Route>
                    <Route exact component={NotFound} />
                </Switch>
            </div>
            <Footer />
            </>
        )
    }
}

const WrapperContainer = connect(
    (storeState) => {
        return {
            user: storeState.user,
        };
    },
    (dispatch) => {
        return {
            actions: bindActionCreators({
                logoutSuccess
            }, dispatch)
        };
    }
)(Container);

export default WrapperContainer;