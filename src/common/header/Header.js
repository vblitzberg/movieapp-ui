import React, { useState } from 'react';
import './Header.css'
import logo from '../../assets/logo.svg'
import Button from "@material-ui/core/Button";


const Header = ({ onReleasedMoviePage, ...props }) => {
    const getUserInfoFromSessionStorage = function () {
        const userInStorage = sessionStorage.getItem('user') ? true : false;
        return userInStorage;
    }
    const [userLoggedIn, updateUserLoggedIn] = useState(getUserInfoFromSessionStorage());    

    const loginHandler = () => {
        
    }
    const logoutHandler = () => {
        sessionStorage.removeItem('user');
        updateUserLoggedIn(false);
    }
    const bookShowButtonHandler = () => {
        
    }

    return (
        <div className="header">
            <img className="logo-icon" src={logo} alt="BookMyMovie"></img>
            <div className="header-buttons">
                {onReleasedMoviePage ? <Button variant="contained" style={{ marginRight: '5px' }} color="primary" onClick={bookShowButtonHandler}>Book Show</Button> : null}
                <React.Fragment>
                    {userLoggedIn ?
                        <Button variant="contained" color="default" onClick={logoutHandler}>Logout</Button>
                        :
                        <Button variant="contained" color="default" onClick={loginHandler}>Login</Button>
                    }
                    
                </React.Fragment>
            </div>
        </div>
    )
}

export default Header;