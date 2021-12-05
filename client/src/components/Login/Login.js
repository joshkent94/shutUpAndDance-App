import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestLogin } from '../../utils/state/userSlice';
import Logo from '../../assets/inverted-logo.png';
import './Login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const { state } = useLocation();

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
        }))
            .unwrap()
            .then(() => {
                if (document.cookie) {
                    if (state) {
                        navigate(state.path || "/dashboard");
                    } else {
                        navigate("/dashboard");
                    };
                };
            });
    };

    return (
        <div id="login">
            <div id="pre-login-branding">
                <img src={Logo} alt="logo" />
                <div id="pre-login-wording">
                    <h1>Shut Up And Dance</h1>
                    <h4>For the love of music</h4>
                </div>
            </div>
            <div id="pre-login-main">
                <h2>Log In</h2>
                <form id="login-form" onSubmit={handleLoginSubmit}>
                    <label className="form-element">
                        Email
                        <input name="email" type="email" placeholder="josh@example.com" className="form-control login-element" onChange={updateEmail} required />
                    </label>
                    <label className="form-element">
                        Password
                        <input name="password" type="password" className="form-control login-element" onChange={updatePassword} required />
                    </label>
                    <button id="login-button" type="submit" className="coolBeans">
                        Log In
                    </button>
                </form>
                <p className="pre-login-prompt">Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
        </div>
    );
};