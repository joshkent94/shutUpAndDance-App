import { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { requestLogin } from '../../utils/state/userSlice';
import './Login.css';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

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

    const handleRegRedirect = () => {
        history.push('/register');
    };

    return (
        <div id="login">
            <div className="overlay"></div>
            <form id="login-form" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="Enter your email address" className="form-control login-element" onChange={updateEmail} required />
                <input type="password" placeholder="Enter your password" className="form-control login-element" onChange={updatePassword} required />
                <button id="login-button" type="submit" className="btn btn-outline-light login-element">
                    Log In
                </button>
            </form>
            <button onClick={handleRegRedirect} id="reg-link" className="btn btn-outline-light login-element">Don't have an account? Click here to sign up.</button>
        </div>
    );
};