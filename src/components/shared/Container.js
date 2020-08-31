import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'

import SignIn from './../SignIn'
import SignUp from './../SignUp'
import Home from './Home'

class Container extends Component {
    render()
    {
        return (
            <div className="container-fluid">                
                <Switch>
                    <Route path="/signin" component={SignIn}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <Route path="/" component={Home}></Route>
                </Switch>
            </div>
        )
    }
}

export default Container;