import React, { Component } from 'react'
import { Auth } from 'aws-amplify';
import { NavLink } from 'react-router-dom';

class Home extends Component {

    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            <div>
                <div>Hello home</div>                
            </div>
        )
    }
}

export default Home