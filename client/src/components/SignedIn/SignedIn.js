import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Recommendations from "../Recommendations/Recommendations";
import Forum from "../Forum/Forum";
import Account from "../Account/Account";
import { toggleSidebar } from "../../utils/helperFunctions/toggleSidebar";
import './SignedIn.css';
import { getGenres } from '../../utils/helperFunctions/getGenres';
import { updateGenres } from '../../utils/helperFunctions/updateGenres';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectFirstName, selectLastName, selectGenres, setGenres } from "../../utils/state/userSlice";
import { getAccessToken, getAvailableGenres, getRecommendations, selectAccessToken } from "../../utils/state/musicSlice";
import logo from '../../assets/inverted-logo.png';

export default function SignedIn() {
  const dispatch = useDispatch();
  const genres = useSelector(selectGenres);
  const userEmail = useSelector(selectEmail);
  const userFirstName = useSelector(selectFirstName);
  const userLastName = useSelector(selectLastName);
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    if (userEmail !== '') {
      window.pendo.initialize({
        disableCookies: true,
        visitor: {
          id: userEmail,
          first_name: userFirstName,
          last_name: userLastName
        },
        account: {
          id: userEmail
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
    if (userEmail !== '') {
      getGenres().then(data => {
        for (let i = 0; i < data.length; i++) {
          dispatch(setGenres(data[i]));
        };
      });
    };
  }, [dispatch, userEmail]);

  useEffect(() => {
    if (accessToken !== '') {
      dispatch(getRecommendations({
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

      <nav id="sidebar" className="active">
        <ul id="nav-list">
          <li className="nav-element">
            <NavLink to="/dashboard"><img src={logo} alt="logo" id="logo" /></NavLink>
          </li>
          <li className="nav-element">
            <NavLink to="/dashboard"><i className="bi bi-house-fill nav-icon dashboard-button"></i><h2 className="nav-heading hide dashboard-button">Dashboard</h2></NavLink>
          </li>
          <li className="nav-element">
            <NavLink to="/recommendations"><i className="bi bi-music-note-beamed nav-icon recommendations-button"></i><h2 className="nav-heading hide recommendations-button">Recommendations</h2></NavLink>
          </li>
          <li className="nav-element">
            <NavLink to="/forum"><i className="bi bi-chat-fill nav-icon forum-button"></i><h2 className="nav-heading hide forum-button">Forum</h2></NavLink>
          </li>
          <li className="nav-element">
            <NavLink to="/account"><i className="bi bi-person-fill nav-icon account-button"></i><h2 className="nav-heading hide account-button">Account</h2></NavLink>
          </li>
        </ul>

        <button id="toggle-button" className="rotate" onClick={toggleSidebar}>
          <i className="bi bi-arrow-left-circle-fill" id="toggle-arrow"></i>
        </button>
      </nav>
        
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      
        <Route path="/recommendations">
          <Recommendations />
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