import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  useRouteMatch
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectFirstName, selectGenres, selectLastName } from "./utils/state/userSlice";
import { getAccessToken, getAvailableGenres, getSuggestions, selectAccessToken } from "./utils/state/suggestionsSlice";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Suggestions from "./components/Suggestions/Suggestions";
import Account from "./components/Account/Account";
import NewThread from "./components/NewThread/NewThread";
import ThreadExpanded from "./components/ThreadExpanded/ThreadExpanded";
import Forum from "./components/Forum/Forum";

export default function App() {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectEmail);
  const userFirstName = useSelector(selectFirstName);
  const userLastName = useSelector(selectLastName);
  const genres = useSelector(selectGenres);
  const accessToken = useSelector(selectAccessToken);

  // redirect to https if try to access via http
  if (window.location.protocol !== 'https:') {
    window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
  };

  // initialise Pendo if logged in
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

  // get Spotify access token if logged in
  useEffect(() => {
    if (userEmail !== '') {
      dispatch(getAccessToken());
    };
  }, [userEmail, dispatch]);


  // to move to appropriate components
  useEffect(() => {
    if (accessToken !== '') {
      dispatch(getAvailableGenres({
        accessToken: accessToken
      }));
    };
  }, [dispatch, accessToken]);
  
  useEffect(() => {
    if (accessToken !== '') {
      dispatch(getSuggestions({
        accessToken: accessToken,
        genres: genres
      }));
    };
  }, [genres, accessToken, dispatch]);


  return (
    <Router>

      {userFirstName && <Redirect to="/dashboard" />}
      {!userFirstName && <Redirect to="/login" />}

      <Switch>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
      
        <Route path="/dashboard">
          <Navbar/>
          <Dashboard />
        </Route>
      
        <Route path="/suggestions">
          <Navbar/>
          <Suggestions />
        </Route>
      
        <Route path="/forum">
          <Navbar/>
          <ForumRoutes />
        </Route>
      
        <Route path="/account">
          <Navbar/>
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