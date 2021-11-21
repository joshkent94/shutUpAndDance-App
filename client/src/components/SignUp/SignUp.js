import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { submitSignUp } from '../../utils/state/userSlice';
import './SignUp.css';

export default function SignUp() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [validatedPassword, setValidatedPassword] = useState(null);

    const updateFirstName = e => {
        e.preventDefault();
        setFirstName(e.target.value);
    };

    const updateLastName = e => {
        e.preventDefault();
        setLastName(e.target.value);
    };

    const updateEmail = e => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const updatePassword = e => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const updateValidatedPassword = e => {
        e.preventDefault();
        setValidatedPassword(e.target.value);
    };

    const handleSignUpRequest = async (e) => {
        e.preventDefault();
        dispatch(submitSignUp({
            firstName,
            lastName,
            email,
            password,
            validatedPassword
        }));
    };

    return (
        <div id="sign-up">
            <form id="sign-up-form" onSubmit={handleSignUpRequest}>
                <input type="text" placeholder="Enter your first name" className="form-control sign-up-element" onChange={updateFirstName} required />
                <input type="text" placeholder="Enter your last name" className="form-control sign-up-element" onChange={updateLastName} required />
                <input type="email" placeholder="Enter your email address" className="form-control sign-up-element" onChange={updateEmail} required />
                <input type="password" placeholder="Enter your password" className="form-control sign-up-element" onChange={updatePassword} required />
                <input type="password" placeholder="Validate your password" className="form-control sign-up-element" onChange={updateValidatedPassword} required />
                <button id="sign-up-button" type="submit" className="btn btn-outline-light">
                    Sign Up
                </button>
            </form>
        </div>
    );
};