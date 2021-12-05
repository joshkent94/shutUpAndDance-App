import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { submitSignUp } from '../../../utils/state/userSlice';
import { passwordCheck } from '../../../utils/helperFunctions/passwordCheck';
import { showMessage } from '../../../utils/helperFunctions/showMessage';
import Logo from '../../../assets/inverted-logo.png';
import './SignUp.css';

export default function SignUp() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [validatedPassword, setValidatedPassword] = useState(null);
    const navigate = useNavigate();

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

    const handleSignUpRequest = e => {
        e.preventDefault();
        if (password === validatedPassword) {
            if (passwordCheck(password)) {
                dispatch(submitSignUp({
                    firstName,
                    lastName,
                    email,
                    password
                }))
                    .unwrap()
                    .then(() => {
                        if (document.cookie) {
                            navigate("/dashboard");
                        };
                    });
            } else {
                showMessage('Password must meet criteria');
            };
        } else {
            showMessage(`Passwords don't match`);
        };
    };

    return (
        <div id="sign-up">
            <div id="pre-login-branding">
                <img src={Logo} alt="logo" />
                <div id="pre-login-wording">
                    <h1>Shut Up And Dance</h1>
                    <h4>For the love of music</h4>
                </div>
            </div>
            <div id="pre-login-main">
                <h2>Sign Up</h2>
                <form id="sign-up-form" onSubmit={handleSignUpRequest}>
                    <label className="form-element">
                        First Name
                        <input name="first name" type="text" placeholder="Josh" className="form-control sign-up-element" onChange={updateFirstName} required />
                    </label>
                    <label className="form-element">
                        Last Name
                        <input name="last name" type="text" placeholder="Kent" className="form-control sign-up-element" onChange={updateLastName} required />
                    </label>
                    <label className="form-element">
                        Email
                        <input name="email" type="email" placeholder="josh@example.com" className="form-control sign-up-element" onChange={updateEmail} required />
                    </label>
                    <label className="form-element">
                        Password
                        <input name="password" type="password" className="form-control sign-up-element" onChange={updatePassword} required autoComplete="new-password" />
                        <p className="pre-login-prompt">1 upper, 1 lower, 1 special char, 1 number, min 8 chars</p>
                    </label>
                    <label className="form-element">
                        Retype Password
                        <input name="retype password" type="password" className="form-control sign-up-element" onChange={updateValidatedPassword} required />
                    </label>
                    <button id="sign-up-button" type="submit" className="coolBeans">
                        Sign Up
                    </button>
                </form>
                <p className="pre-login-prompt">Already have an account? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    );
};