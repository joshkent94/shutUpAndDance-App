import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Suggestions from "../Suggestions/Suggestions";
import Forum from "../Forum/Forum";
import Account from "../Account/Account";
import './SignedIn.css';
import { getGenres } from '../../utils/helperFunctions/getGenres';
import { updateGenres } from '../../utils/helperFunctions/updateGenres';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectFirstName, selectLastName, selectGenres, setGenres } from "../../utils/state/userSlice";
import { getAccessToken, getAvailableGenres, getSuggestions, selectAccessToken } from "../../utils/state/musicSlice";
import logo from '../../assets/inverted-logo.png';
import { logout, selectSignedIn } from '../../utils/state/preLoginSlice';
import { resetUserDetails } from '../../utils/state/userSlice';
import { resetMusicDetails } from '../../utils/state/musicSlice';

export default function SignedIn() {
  const dispatch = useDispatch();
  const SignedIn = useSelector(selectSignedIn);
  const genres = useSelector(selectGenres);
  const userEmail = useSelector(selectEmail);
  const userFirstName = useSelector(selectFirstName);
  const userLastName = useSelector(selectLastName);
  const accessToken = useSelector(selectAccessToken);

  const handleLogout = e => {
    e.preventDefault();
    dispatch(resetUserDetails());
    dispatch(resetMusicDetails());
    dispatch(logout());
  };

  useEffect(() => {
    if (userEmail !== '') {
      window.pendo.initialize({
        disableCookies: true,
        visitor: {
          id: userEmail,
          email: userEmail,
          full_name: `${userFirstName} ${userLastName}`,
          return_url: 'https://shut-up-and-dance.herokuapp.com/dashboard'
        },
        account: {
          id: userEmail,
          name: userEmail,
          is_paying: false,
          monthly_value: 0
        }
      });
    };
  }, [userEmail, userFirstName, userLastName]);

  useEffect(() => {
    if (accessToken === '' & userEmail !== '') {
      dispatch(getAccessToken());
    };
    if (accessToken !== '') {
      dispatch(getAvailableGenres({
        accessToken: accessToken
      }));
    };
  }, [accessToken, dispatch, userEmail]);

  useEffect(() => {
    if (userEmail !== '' & SignedIn) {
      getGenres()
        .then(data => {
          for (let i = 0; i < data.length; i++) {
            dispatch(setGenres(data[i]));
          };
        });
    };
  }, [dispatch, userEmail, SignedIn]);

  useEffect(() => {
    if (accessToken !== '') {
      dispatch(getSuggestions({
        accessToken: accessToken,
        genres: genres
      }));
    };
  }, [genres, accessToken, dispatch]);

  useEffect(() => {
    if (userEmail !== '') {
      updateGenres(genres);
    };
  }, [genres, userEmail]);

  return (
    <Router>

      <Redirect to="/dashboard" />

      <nav id="sidebar">
        <ul id="nav-list">
          <li className="icon-element">
            <NavLink to="/dashboard">
              <img src={logo} alt="logo" id="logo" />
            </NavLink>
          </li>
          <li className="nav-element">
            <NavLink to="/dashboard" className="nav-option">
              <i className="bi bi-house-fill nav-icon dashboard-button"></i>
              <p className="nav-title">Dashboard</p>
            </NavLink>
          </li>
          <li className="nav-element">
            <NavLink to="/suggestions" className="nav-option">
              <i className="bi bi-music-note-beamed nav-icon suggestions-button"></i>
              <p className="nav-title">Suggestions</p>
            </NavLink>
          </li>
          <li className="nav-element">
            <NavLink to="/forum" className="nav-option">
              <i className="bi bi-chat-fill nav-icon forum-button"></i>
              <p className="nav-title">Forum</p>
            </NavLink>
          </li>
          <li className="nav-element">
            <NavLink to="/account" className="nav-option">
              <i className="bi bi-person-fill nav-icon account-button"></i>
              <p className="nav-title">Account</p>
            </NavLink>
          </li>
        </ul>

        <button className="nav-option" id="logout" onClick={handleLogout}>
          <i className="bi bi-box-arrow-left nav-icon"></i>
          <p className="nav-title">Log Out</p>
        </button>
      </nav>
        
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      
        <Route path="/suggestions">
          <Suggestions />
        </Route>
      
        <Route path="/forum">
          <Forum />
        </Route>
      
        <Route path="/Account">
          <Account />
        </Route>
      </Switch>

    </Router>
  );
};