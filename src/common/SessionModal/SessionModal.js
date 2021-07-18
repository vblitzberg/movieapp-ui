import React from "react";
import Modal from 'react-modal'
import LoginTab from './LoginTab/LoginTab';
import RegisterTab from './RegisterTab/RegisterTab';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "../TabPanel/TabPanel";

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

/**
 * This function creates a component to render a modal for login/register
 *
 * @param {*} isModelOpen status of modal - open/close
 * @param {*} closeModal handler to close modal
 * @param {*} setUserLoggedIn handler to change user login status.
 * @param {*} baseUrl baseUrl for backend endpoint
 * @returns modal JSX for login/register functionality.
 */
const SessionModal = ({ isModelOpen, closeModal, setUserLoggedIn, ...props }) => {
    const [currentTab, setCurrentTab] = React.useState(0);
    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };
    return (
        <Modal
            isOpen={isModelOpen}
            onRequestClose={closeModal}
            style={modalStyle}
        >
            <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab label="Login" value={0} />
                <Tab label="Register" value={1} />
            </Tabs>

            {/* Login Tab */}
            <TabPanel value={currentTab} index={0} >
                <LoginTab setUserLoggedIn={setUserLoggedIn} closeModal={closeModal} baseUrl={props.baseUrl} />
            </TabPanel>

            {/* Register Tab */}
            <TabPanel value={currentTab} index={1}>
                <RegisterTab baseUrl={props.baseUrl} />
            </TabPanel>
        </Modal>
    )
}
export default SessionModal;