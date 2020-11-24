import React, { Component } from 'react'

class Navigation extends Component {

    constructor(props)
    {
        super(props)
        this.state = {
            isLoggedin: false
        }
    }

    componentDidMount()
    {
        // this.state = {
        //     isLoggedin: false
        // }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark primary-color">

                <a className="navbar-brand" href=":;">Jupiter</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse"
                    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="basicExampleNav">

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href=":;">Home
                      <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href=":;">About Us</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href=":;">Pricing</a>
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

                    {/* <form className="form-inline">
                        <div className="md-form my-0">
                           <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light btn-md my-2 my-sm-0 ml-3" type="submit">Search</button>
                            <a href=":;">Logout</a>
                        </div>
                    </form> */}

                </div>

                <ul className="navbar-nav form-inline">
                    <li className="nav-item">
                        <a href=":;" className="nav-link">Welcome user</a>                        
                    </li>
                    <li className="nav-item">
                        <a href=":;" className="nav-link">Logout</a>
                    </li>                    
                </ul>
            </nav>

        )
    }
}

export default Navigation;