import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Suggestions from "../Suggestions/Suggestions";
import Forum from "../Forum/Forum";
import NewThread from '../NewThread/NewThread';
import ThreadExpanded from '../ThreadExpanded/ThreadExpanded';
import Account from "../Account/Account";
import { getGenres } from '../../utils/helperFunctions/getGenres';
import { updateGenres } from '../../utils/helperFunctions/updateGenres';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectFirstName, selectLastName, selectGenres, setGenres, resetUserDetails } from "../../utils/state/userSlice";
import { getAccessToken, getAvailableGenres, getSuggestions, selectAccessToken,resetSuggestionsDetails } from "../../utils/state/suggestionsSlice";
import logo from '../../assets/inverted-logo.png';
import { logout } from '../../utils/state/preLoginSlice';
import './SignedIn.css';

export default function SignedIn() {
  const dispatch = useDispatch();
  const genres = useSelector(selectGenres);
  const userEmail = useSelector(selectEmail);
  const userFirstName = useSelector(selectFirstName);
  const userLastName = useSelector(selectLastName);
  const accessToken = useSelector(selectAccessToken);
  const isFirstRenderForUpdate = useRef(true);
  const isFirstRenderForFetch = useRef(true);

  const handleLogout = e => {
    e.preventDefault();
    dispatch(logout());
    dispatch(resetUserDetails());
    dispatch(resetSuggestionsDetails());
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
    if (userEmail !== '') {
      dispatch(getAccessToken());
    };
  }, [userEmail, dispatch]);

  useEffect(() => {
    if (accessToken !== '') {
      dispatch(getAvailableGenres({
        accessToken: accessToken
      }));
    };
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (isFirstRenderForFetch.current) {
      getGenres()
        .then(data => {
          let equality = true;
          for (let i = 0; i < data.length; i++) {
            if (data[i] !== genres[i]) {
              equality = false;
            };
          };
          if (data.length === genres.length & equality) {
            return;
          } else {
            for (let i = 0; i < data.length; i++) {
              dispatch(setGenres(data[i]));
            };
          };
        });
      isFirstRenderForFetch.current = false;
    };
  }, [dispatch, genres]);

  useEffect(() => {
    if (accessToken !== '') {
      dispatch(getSuggestions({
        accessToken: accessToken,
        genres: genres
      }));
    };
  }, [genres, accessToken, dispatch]);

  useEffect(() => {
    if (isFirstRenderForUpdate.current) {
      isFirstRenderForUpdate.current = false;
    } else {
      updateGenres(genres);
    };
  }, [genres]);

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
          <ForumRoutes />
        </Route>
      
        <Route path="/Account">
          <Account />
        </Route>
      </Switch>

    </Router>
  );
};

function ForumRoutes() {
  const match = useRouteMatch();
  
  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <NewThread />
      </Route>
      <Route path={`${match.path}/:threadId`}>
        <ThreadExpanded />
      </Route>
      <Route path={`${match.path}`}>
        <Forum />
      </Route>
    </Switch>
  );
};