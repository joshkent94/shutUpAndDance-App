import {
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
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
import { selectEmail, selectFirstName, selectLastName, selectGenres, setGenres } from "../../utils/state/userSlice";
import { getAccessToken, getAvailableGenres, getSuggestions, selectAccessToken } from "../../utils/state/suggestionsSlice";
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
    <div>
      <Redirect to="/dashboard" />
      <Route>
        <Navbar />
      </Route>
        
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      
      <Route exact path="/suggestions">
        <Suggestions />
      </Route>
      
      <Route exact path="/forum">
        <ForumRoutes />
      </Route>
      
      <Route exact path="/Account">
        <Account />
      </Route>
    </div>
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