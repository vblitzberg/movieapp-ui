import React, { useState } from 'react';
import MaterialTextFieldFormControl from '../../MaterialTextFieldFormControl/MaterialTextFieldFormControl';
import Button from "@material-ui/core/Button";
import '../Tab.css'

const RegisterTab = (props) => {
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [contact, setContact] = useState('');
    let [message, setMessage] = useState('');

    function registerButtonHandler() {
        var data = JSON.stringify({
            "email_address": email,
            "first_name": firstName,
            "last_name": lastName,
            "mobile_number": contact,
            "password": password
        });
        console.log(data);
        fetch(`${props.baseUrl}/signup`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        ).then(async (response) => {
            if (response.status === 201)
                return 'Registration Successful. Please Login'
            else
                return (await response.json()).message
        })
            .then((response) => setMessage(response))
            .catch((response) => setMessage(response))
    }
    return (
        <form className="tab-container" onSubmit={(e) => { e.preventDefault(); registerButtonHandler(); }}>
            <br />
            <MaterialTextFieldFormControl name="firstName" label="First Name" value={firstName} setValue={setFirstName} /><br />
            <MaterialTextFieldFormControl name="lastName" label="Last Name" value={lastName} setValue={setLastName} /><br />
            <MaterialTextFieldFormControl name="email" label="Email" value={email} setValue={setEmail} /><br />
            <MaterialTextFieldFormControl name="password" label="Password" value={password} setValue={setPassword} /><br />
            <MaterialTextFieldFormControl name="contact" label="Contact No" value={contact} setValue={setContact} /><br />
            <div style={{ display: message.length > 0 ? 'block' : 'none' }}>{message}</div><br />
            <Button variant="contained" color="primary" type="submit">Register</Button>
        </form>
    )
}
export default RegisterTab;