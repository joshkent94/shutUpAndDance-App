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
        if (newPassword !== '') {
            if (passwordCheck(newPassword)) {
                if (newPassword === confirmedPassword) {
                    const details = {
                        firstName: newFirstName,
                        lastName: newLastName,
                        email: newEmail,
                        password: newPassword
                    };
                    dispatch(updateUserDetails(details))
                        .unwrap()
                        .then(() => {
                            document.getElementById("password-input").value = '';
                            document.getElementById("confirm-password-input").value = '';
                        });
                } else {
                    showMessage("Passwords don't match");
                };
            } else {
                showMessage("Password must meet criteria");
            };
        } else {
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
        };
    };

    return (
        <div className="page">
            <div className="page-header">
                <h5 className="page-header-h5">
                    My Account
                </h5>
            </div>
            <div className="page-content">
                <div id="account-page" className="content-container">
                    <h6 id="account-form-heading" className="sub-heading">
                        Amend your account details below:
                    </h6>
                    <form id="account-form" onSubmit={handleDetailsSave}>
                        <label className="form-element">
                            First Name
                            <input name="first name" type="text" value={newFirstName} className="form-control sign-up-element" onChange={handleFirstNameChange} required />
                        </label>
                        <label className="form-element">
                            Last Name
                            <input name="last name" type="text" value={newLastName} className="form-control sign-up-element" onChange={handleLastNameChange} required />
                        </label>
                        <label className="form-element">
                            Email
                            <input name="email" type="email" value={newEmail} className="form-control sign-up-element" onChange={handleEmailChange} required />
                        </label>
                        <label className="form-element">
                            Reset Password
                            <input name="password" type="password" id="password-input" className="form-control sign-up-element" placeholder="Optional" onChange={handlePasswordChange} autoComplete="new-password" />
                            <p className="pre-login-prompt">1 upper, 1 lower, 1 special char, 1 number, min 8 chars</p>
                        </label>
                        <label className="form-element">
                            Confirm New Password
                            <input name="retype password" type="password" id="confirm-password-input" className="form-control sign-up-element" placeholder="Optional" onChange={handleConfirmedPasswordChange} />
                        </label>

                        <button id="save-details-button" className="coolBeans" type="submit">
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};