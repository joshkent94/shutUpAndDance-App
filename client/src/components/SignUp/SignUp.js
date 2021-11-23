import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { submitSignUp } from '../../utils/state/userSlice';
import PasswordCriteria from '../PasswordCriteria/PasswordCriteria';
import { showMessage } from '../../utils/helperFunctions/showMessage';
import './SignUp.css';

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
            <form id="sign-up-form" onSubmit={handleSignUpRequest}>
                <input name="first name" type="text" placeholder="First name" className="form-control sign-up-element" onChange={updateFirstName} required />
                <input name="last name" type="text" placeholder="Last name" className="form-control sign-up-element" onChange={updateLastName} required />
                <input name="email" type="email" placeholder="Email address" className="form-control sign-up-element" onChange={updateEmail} required />
                {password && <PasswordCriteria password={password} setLengthBool={setLengthBool} setCasingBool={setCasingBool} setNumberBool={setNumberBool} setSpecialBool={setSpecialBool} />}
                <input name="password" type="password" placeholder="Password" className="form-control sign-up-element" onChange={updatePassword} required autoComplete="new-password" />
                <input name="retype password" type="password" placeholder="Retype password" className="form-control sign-up-element" onChange={updateValidatedPassword} required />
                <button id="sign-up-button" type="submit" className="btn btn-outline-light">
                    Sign Up
                </button>
            </form>
        </div>
    );
};