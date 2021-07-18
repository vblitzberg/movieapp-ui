import React, { useState } from 'react';
import './Header.css'
import logo from '../../assets/logo.svg'
import Button from "@material-ui/core/Button";
import SessionModal from '../SessionModal/SessionModal';

/**
 * This function creates a header to be reused across the application
 *
 * @param {*} onReleasedMoviePage used as flag to show bookshow button on details page
 * @param {*} redirectToBookShow redirect handler on clicking book show button by loggedin user.
 * @param {*} baseUrl baseUrl for backend endpoint
 * @returns Header UI component JSX
 */
const Header = ({ onReleasedMoviePage, redirectToBookShow, ...props }) => {
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
            redirectToBookShow();
        else
            openSessionModal();
    }

    return (
        <div className="header">
            <img className="logo-icon" src={logo} alt="BookMyMovie"></img>
            <div className="header-buttons">
                {/* Book Show Button (only on details view) */}
                {onReleasedMoviePage ? <Button variant="contained" color="primary" style={{ marginRight: '5px' }} onClick={bookShowButtonHandler}>Book Show</Button> : null}

                {/* Login / Logout Button */}
                {userLoggedIn ?
                    <Button variant="contained" color="default" onClick={logoutHandler}>Logout</Button>
                    :
                    <Button variant="contained" color="default" onClick={loginHandler}>Login</Button>
                }
                
                {/* Login / Logout Modal */}
                <SessionModal isModelOpen={sessionModalIsOpen} closeModal={closeSessionModal} setUserLoggedIn={setUserLoggedIn}  {...props} />

            </div>
        </div>
    )
}

export default Header;