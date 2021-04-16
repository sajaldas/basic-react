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


class Container extends Component 
{
    constructor(props)
    {        
        super(props)
        console.log('container constructor');
        this.state= {
            isLogin: this.props.user.isUserLoggedIn
        }
    }

    async componentDidMount() {
        console.log('container mount called');
        try{
            const user = await Auth.currentAuthenticatedUser();
            console.log('auth user = ', user);
            if(user.username)
            {
                this.setState({isLogin:true})                
            }            
        } catch(err){
            console.log('err: ', err);
            this.props.history.push("/signin");
        }  
    }

    //componentDidUpdate

    handleLogout = async () => {
        //console.log('handle logout');
        try {
            await Auth.signOut({ global: true });
            this.setState({ isLogin: false })
            this.props.actions.logoutSuccess();
            this.props.history.push("/signin");
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
                {/* {this.state.isLogin ? 
                <Switch>                                        
                    <Route path="/" component={Home}></Route>
                    <Route path="/report" component={Report}></Route>
                    <Route path="/chart" component={Chart}></Route>                    
                    <Route component={NotFound} />
                </Switch> : 
                <Switch>
                    <Route path="/signin" component={SignIn}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                </Switch>} */}
                <Switch>                                        
                    <Route path="/" component={Home}></Route>
                    <Route path="/report" component={Report}></Route>
                    <Route path="/chart" component={Chart}></Route>   
                    <Route path="/signin" component={SignIn}></Route>
                    <Route path="/signup" component={SignUp}></Route>                 
                    <Route component={NotFound} />
                </Switch>
            </div>
            <Footer />
            </>
        )
    }
}

const WrapperContainer = connect(
    (storeState) => {
        //console.log('all store available here ', storeState);
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