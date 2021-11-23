import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestLogin } from '../../utils/state/userSlice';
import './Login.css';

export default function Login() {
    const dispatch = useDispatch();
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

    return (
        <div id="login">
            <form id="login-form" onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="Enter your email address" className="form-control login-element" onChange={updateEmail} required />
                <input type="password" placeholder="Enter your password" className="form-control login-element" onChange={updatePassword} required autoComplete="new-password" />
                <button id="login-button" type="submit" className="btn btn-outline-light login-element">
                    Log In
                </button>
            </form>
        </div>
    );
};