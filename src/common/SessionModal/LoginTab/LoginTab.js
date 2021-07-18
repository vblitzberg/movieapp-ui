import React, { useState } from 'react';
import Button from "@material-ui/core/Button";
import MaterialTextFieldFormControl from '../../MaterialTextFieldFormControl/MaterialTextFieldFormControl';
import '../Tab.css'
const LoginTab = ({ setUserLoggedIn, closeModal, ...props}) => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [message, setMessage] = useState('');

    function loginButtonHandler() {
        const auth = 'Basic ' + btoa(`${username}:${password}`)
        fetch(`${props.baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'authorization': auth
            }
        }
        ).then(async (response) => {
            if (response.status === 200)
                {
                    setUserLoggedIn((await response.json()))
                    closeModal();
                }
            else {
                setMessage((await response.json()).message)
            }
        })
        .catch((response) => console.log(response))
    }
    return (
        <form className="tab-container" onSubmit={(e)=>{e.preventDefault(); loginButtonHandler(); }}>
            <br />
            <MaterialTextFieldFormControl name="username" label="Username" value={username} setValue={setUsername} />
            <br />
            <MaterialTextFieldFormControl name="password" label="Password" value={password} setValue={setPassword} />
            <br />
            <div style={{ display: message.length > 0 ? 'block' : 'none' }}>{message}</div><br />
            <br />
            <br />
            <Button variant="contained" color="primary"  type="submit">Login</Button>
        </form>
    )
}
export default LoginTab;