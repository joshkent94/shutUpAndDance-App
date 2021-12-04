import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { passwordCheck } from '../../utils/helperFunctions/passwordCheck';
import { showMessage } from '../../utils/helperFunctions/showMessage';
import { selectEmail, selectFirstName, selectLastName, updateUserDetails } from '../../utils/state/userSlice';
import './Account.css';

export default function Account() {
    const dispatch = useDispatch();
    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newEmail, setNewEmail] = useState(email);
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const handleFirstNameChange = e => {
        e.preventDefault();
        setNewFirstName(e.target.value);
    };

    const handleLastNameChange = e => {
        e.preventDefault();
        setNewLastName(e.target.value);
    };
    
    const handleEmailChange = e => {
        e.preventDefault();
        setNewEmail(e.target.value);
    };

    const handlePasswordChange = e => {
        e.preventDefault();
        setNewPassword(e.target.value);
    };

    const handleConfirmedPasswordChange = e => {
        e.preventDefault();
        setConfirmedPassword(e.target.value);
    };

    const handleDetailsSave = e => {
        e.preventDefault();
        if(passwordCheck(newPassword)) {
            if (newPassword === confirmedPassword) {
                const details = {
                    firstName: newFirstName,
                    lastName: newLastName,
                    email: newEmail,
                    password: newPassword
                };
                dispatch(updateUserDetails(details));
            } else {
                showMessage("Passwords don't match");
            };
        } else {
            showMessage("Password must meet criteria");
        };
    };

    return (
        <div id="account">
            <div className="heading">
                <h3>{firstName}'s Account</h3>
            </div>
            <div className="account-content">
                <form id="account-form" onSubmit={handleDetailsSave}>
                    <div className="account-form-element">
                        <label htmlFor="first-name">First Name:</label>
                        <input className="account-input form-control" type="text" value={newFirstName} id="first-name" onChange={handleFirstNameChange} required></input>
                    </div>
                    <div className="account-form-element">
                        <label htmlFor="last-name">Last Name:</label>
                        <input className="account-input form-control" type="text" value={newLastName} id="last-name" onChange={handleLastNameChange} required></input>
                    </div>
                    <div className="account-form-element">
                        <label htmlFor="email">Email Address:</label>
                        <input className="account-input form-control" type="email" value={newEmail} id="email" onChange={handleEmailChange} required></input>
                    </div>
                    <div className="account-form-element">
                        <label htmlFor="password">New Password:</label>
                        <input className="account-input form-control" type="password" id="password" onChange={handlePasswordChange} autoComplete="new-password" placeholder="Optional"></input>
                    </div>
                    <div className="account-form-element">
                        <label htmlFor="confirmed-password">Confirm Password:</label>
                        <input className="account-input form-control" type="password" id="confirmed-password" onChange={handleConfirmedPasswordChange} placeholder="Optional"></input>
                    </div>

                    <button className="account-submit btn" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};