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
            console.log('called');
            const user = await Auth.currentAuthenticatedUser();
            
        } catch (err) {
            console.log(err);
            this.props.history.push("/signin");
        }
    }

    handleLogout = async () =>{
        console.log('logout called');
        try {
            await Auth.signOut({ global: true });
            this.setState({isLoggedIn: false})
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    render() {
        return (
            <div>
                <div>Hello home</div>
                {/* <div onClick={() => this.handleLogout()}>Logout</div> */}
            </div>
        )
    }
}

export default Home