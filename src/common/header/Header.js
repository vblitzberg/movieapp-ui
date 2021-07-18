import React, { useState } from 'react';
import './Header.css'
import logo from '../../assets/logo.svg'
import Button from "@material-ui/core/Button";
import SessionModal from '../SessionModal/SessionModal'; 


const Header = ({ onReleasedMoviePage, ...props }) => {
    const getUserInfoFromSessionStorage = function () {
        const userInStorage = sessionStorage.getItem('user') ? true : false;
        return userInStorage;
    }
    const [userLoggedIn, updateUserLoggedIn] = useState(getUserInfoFromSessionStorage());
    const [sessionModalIsOpen, setSessionModalIsOpen] = useState(false);

    const openSessionModal = () => setSessionModalIsOpen(true);
    const closeSessionModal = () => setSessionModalIsOpen(false);

    function setUserLoggedIn(value) {
        sessionStorage.setItem('user', value);
        updateUserLoggedIn(value);
    }

    const loginHandler = () => {
        openSessionModal();
    }
    const logoutHandler = () => {
        sessionStorage.removeItem('user');
        updateUserLoggedIn(false);
    }
    const bookShowButtonHandler = () => {
        if (userLoggedIn)
            props.history.push(`/book/${props.movieID}`);
        else
            openSessionModal();
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
                    <SessionModal isModelOpen={sessionModalIsOpen} closeModal={closeSessionModal} setUserLoggedIn={setUserLoggedIn}  {...props} />
                </React.Fragment>
            </div>
        </div>
    )
}

export default Header;