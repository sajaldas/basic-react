import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//import { hashHistory } from 'react-router;'
import { Auth } from 'aws-amplify';

import { logoutSuccess } from '../../redux/actions/user-actions'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: null,
            isLoggedIn: false
        }
        this.authListener()
    }

    authListener = async () => {
        try {
            //const response = await Auth.currentSession();
            console.log('called');
            const user = await Auth.currentAuthenticatedUser();
            this.setState({ user: user, isLoggedIn: true })
        } catch (err) {
            console.log(err);
            //this.props.history.push("/signin");
        }
    }

    handleLogout = async () => {
        console.log('logout called');

        try {
            await Auth.signOut({ global: true });
            this.setState({ isLoggedIn: false })
            this.props.actions.logoutSuccess();
            this.props.history.push("/signin");
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    render() {
        console.log('is logged in = ', this.state.isLoggedIn)
        if (this.state.isLoggedIn)
            return (
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark primary-color">
                        <a className="navbar-brand" href=":;">Site Logo</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse"
                            aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="generalMenuOptions">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <NavLink to="/" activeClassName="active" className="nav-link">Home</NavLink>
                                </li>
                                <li className={'nav-item ' + (this.state.isLoggedIn ? 'showmenu' : 'hidemenu')}>
                                    <NavLink to="/report" activeClassName="active" className="nav-link">Report</NavLink>
                                </li>
                                {}
                                <li className="nav-item">
                                    <NavLink to="/chart" activeClassName="active" className="nav-link">Chart</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" href=":;" data-toggle="dropdown"
                                        aria-haspopup="true" aria-expanded="false">Features</a>
                                    <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                                        <a className="dropdown-item" href=":;">Feature 1</a>
                                        <a className="dropdown-item" href=":;">Another Feature</a>
                                        <a className="dropdown-item" href=":;">Other Fature</a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="collapse navbar-collapse" id="userMenuItems">
                            <ul className="navbar-nav form-inline">
                                <li className="nav-item">
                                    <span className="nav-link clink">Welcome User</span>
                                </li>
                                <li className="nav-item">
                                    <span className="nav-link clink" role="button" onClick={() => this.handleLogout()}>Logout</span>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

            )
        else
            return null;
    }
}

const HeaderContainer = connect(
    (storeState) => {
        //console.log('hey sajal ', storeState.userReducer.isUserLoggedIn);
        console.log(storeState);

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
)(Header);

export default HeaderContainer;