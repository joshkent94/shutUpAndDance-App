import { useEffect, useState } from 'react';
import './Login.css';
import { requestLogin, setRegistering, selectMessage, setMessage } from '../../utils/state/preLoginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { showMessages } from '../../utils/helperFunctions/showMessages';

export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const message = useSelector(selectMessage);

    const updateEmail = e => {
        e.preventDefault();
        setEmail(e.target.value);
    };

    const updatePassword = e => {
        e.preventDefault();
        setPassword(e.target.value);
    };

    const handleLoginSubmit = e => {
        e.preventDefault();
        dispatch(requestLogin({
            email: email,
            password: password
        }));
    };

    const handleRegSwitch = e => {
        e.preventDefault();
        dispatch(setRegistering(true));
        dispatch(setMessage({
            message: ''
        }));
    };

    useEffect(() => {
        showMessages();
    }, [message]);

    return (
        <div id="login">
            <div className="overlay"></div>
            <p id="message">{message}</p>
            <form id="login-form" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="Enter your email address" className="form-control login-element" onChange={updateEmail} required />
                <input type="password" placeholder="Enter your password" className="form-control login-element" onChange={updatePassword} required />
                <button id="login-button" type="submit" className="btn btn-outline-light login-element">
                    Log In
                </button>
            </form>
            <button onClick={handleRegSwitch} id="reg-link" className="btn btn-outline-light login-element">Don't have an account? Click here to sign up.</button>
        </div>
    );
};