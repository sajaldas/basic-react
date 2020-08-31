import React, { Component } from 'react'

class Navigation extends Component {
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
                            <a className="nav-link" href=":;">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href=":;">Pricing</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" href=":;" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">Dropdown</a>
                            <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href=":;">Action</a>
                            <a className="dropdown-item" href=":;">Another action</a>
                            <a className="dropdown-item" href=":;">Something else here</a>
                            </div>
                        </li>
                    </ul>

                    <form className="form-inline">
                        <div className="md-form my-0">
                            <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light btn-md my-2 my-sm-0 ml-3" type="submit">Search</button>
                        </div>
                    </form>
                </div>


            </nav>

        )
    }
}

export default Navigation;