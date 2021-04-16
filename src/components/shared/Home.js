import React, { Component } from 'react'
import { Auth } from 'aws-amplify';

class Home extends Component {

    constructor(props)
    {
        super(props);
        this.setState= {
            isLoggedIn: true
        }
    }

    componentDidMount() {        
        this.authListener();
    }

    authListener = async () => {
        try {
            //const response = await Auth.currentSession();
            console.log('home called');
            const user = await Auth.currentAuthenticatedUser();
            
        } catch (err) {
            console.log(err);
            this.props.history.push("/signin");
        }
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