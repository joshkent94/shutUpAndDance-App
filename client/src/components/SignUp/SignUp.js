import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { submitRegistration } from '../../utils/state/userSlice';
import './SignUp.css';

export default function SignUp() {
    const dispatch = useDispatch();
    const history = useHistory();
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

    const handleRegRequest = async (e) => {
        e.preventDefault();
        dispatch(submitRegistration({
            firstName,
            lastName,
            email,
            password,
            validatedPassword
        }));
    };

    const handleLoginRedirect = () => {
        history.push('/login');
    };

    return (
        <div id="reg">
            <form id="reg-form" onSubmit={handleRegRequest}>
                <input type="text" placeholder="Enter your first name" className="form-control reg-element" onChange={updateFirstName} required />
                <input type="text" placeholder="Enter your last name" className="form-control reg-element" onChange={updateLastName} required />
                <input type="email" placeholder="Enter your email address" className="form-control reg-element" onChange={updateEmail} required />
                <input type="password" placeholder="Enter your password" className="form-control reg-element" onChange={updatePassword} required />
                <input type="password" placeholder="Validate your password" className="form-control reg-element" onChange={updateValidatedPassword} required />
                <button id="reg-button" type="submit" className="btn btn-outline-light">
                    Sign Up
                </button>
            </form>
            <button id="login-link" className="btn btn-outline-light reg-element" onClick={handleLoginRedirect}>Already have an account? Click here to log in.</button>
        </div>
    );
};