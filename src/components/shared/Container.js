import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'

import SignIn from './../SignIn'
import SignUp from './../SignUp'
import Home from './Home'
import Report from './../Report'
import Chart from './../Chart'

class Container extends Component {
    render()
    {
        return (
            <div className="container-fluid app-container">                
                <Switch>
                    <Route path="/signin" component={SignIn}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <Route path="/report" component={Report}></Route>
                    <Route path="/chart" component={Chart}></Route>
                    <Route path="/" component={Home}></Route>
                </Switch>
            </div>
        )
    }
}

export default Container;