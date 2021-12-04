import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { submitSignUp } from '../../utils/state/userSlice';
import PasswordCriteria from '../PasswordCriteria/PasswordCriteria';
import { showMessage } from '../../utils/helperFunctions/showMessage';
import './SignUp.css';
import Logo from '../../assets/inverted-logo.png';
import {Link} from 'react-router-dom';

export default function SignUp() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [validatedPassword, setValidatedPassword] = useState(null);
    const [lengthBool, setLengthBool] = useState(false);
    const [casingBool, setCasingBool] = useState(false);
    const [numberBool, setNumberBool] = useState(false);
    const [specialBool, setSpecialBool] = useState(false);

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
        if (lengthBool && casingBool && numberBool && specialBool) {
            dispatch(submitSignUp({
                firstName,
                lastName,
                email,
                password,
                validatedPassword
            }));
        } else {
            showMessage("Password must meet criteria");
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
                    <label>
                        First Name
                        <input name="first name" type="text" placeholder="Josh" className="form-control sign-up-element" onChange={updateFirstName} required />
                    </label>
                    <label>
                        Last Name
                        <input name="last name" type="text" placeholder="Kent" className="form-control sign-up-element" onChange={updateLastName} required />
                    </label>
                    <label>
                        Email
                        <input name="email" type="email" placeholder="josh@example.com" className="form-control sign-up-element" onChange={updateEmail} required />
                    </label>
                    <label>
                        Password
                        {password && <PasswordCriteria password={password} setLengthBool={setLengthBool} setCasingBool={setCasingBool} setNumberBool={setNumberBool} setSpecialBool={setSpecialBool} />}
                        <input name="password" type="password" className="form-control sign-up-element" onChange={updatePassword} required autoComplete="new-password" />
                    </label>
                    <label>
                        Retype Password
                        <input name="retype password" type="password" className="form-control sign-up-element" onChange={updateValidatedPassword} required />
                    </label>
                    <button id="sign-up-button" type="submit" className="coolBeans">
                        Sign Up
                    </button>
                </form>
                <p id="pre-login-prompt">Already have an account? <Link to="/login">Log in</Link></p>
            </div>
        </div>
    );
};