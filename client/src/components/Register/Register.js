import './Register.css';
import { selectMessage, setRegistering, setMessage } from '../../utils/state/preLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { submitRegistration } from '../../utils/helperFunctions/submitRegistration';
import { showMessages } from '../../utils/helperFunctions/showMessages';

export default function Register() {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [validatedPassword, setValidatedPassword] = useState(null);
    const message = useSelector(selectMessage);

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
        const response = await submitRegistration(firstName, lastName, email, password, validatedPassword);
        dispatch(setMessage({
            message: response.message
        }));
    };

    const handleLoginSwitch = e => {
        e.preventDefault();
        dispatch(setRegistering(false));
        dispatch(setMessage({
            message: ''
        }));
    };

    useEffect(() => {
        if (message === 'Account created successfully.') {
            dispatch(setRegistering(false));
        } else {
            showMessages();
        };
    }, [message, dispatch]);

    return (
        <div id="reg">
            <div className="overlay"></div>
            <p id="message">{message}</p>
            <form id="reg-form" onSubmit={handleRegRequest}>
                <input type="text" placeholder="Enter your first name" className="form-control reg-element" onChange={updateFirstName} required />
                <input type="text" placeholder="Enter your last name" className="form-control reg-element" onChange={updateLastName} required />
                <input type="email" placeholder="Enter your email address" className="form-control reg-element" onChange={updateEmail} required />
                <input type="password" placeholder="Enter your password" className="form-control reg-element" onChange={updatePassword} required />
                <input type="password" placeholder="Validate your password" className="form-control reg-element" onChange={updateValidatedPassword} required />
                <button id="reg-button" type="submit" className="btn btn-outline-light">
                    Register
                </button>
            </form>
            <button id="login-link" className="btn btn-outline-light reg-element" onClick={handleLoginSwitch}>Already have an account? Click here to log in.</button>
        </div>
    );
};