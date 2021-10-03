import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../../utils/helperFunctions/updateUserDetails';
import { getUserDetails, selectEmail, selectFirstName, selectLastName } from '../../utils/state/userSlice';
import './Account.css';

export default function Account() {
    const firstName = useSelector(selectFirstName);
    const lastName = useSelector(selectLastName);
    const email = useSelector(selectEmail);
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newEmail, setNewEmail] = useState(email);
    const dispatch = useDispatch();

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

    const handleDetailsSave = e => {
        e.preventDefault();
        const details = {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail
        };
        updateUserDetails(details)
            .then(() => {
                dispatch(getUserDetails());
            });
    };

    return (
        <div id="account">
            <div className="heading">
                <h3>{firstName}'s Account</h3>
            </div>
            <div className="content">
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

                    <button className="account-submit btn" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};