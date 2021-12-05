import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectFirstName, selectLastName } from "./utils/state/userSlice";
import { getAccessToken } from "./utils/state/suggestionsSlice";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Suggestions from "./components/Suggestions/Suggestions";
import Account from "./components/Account/Account";
import NewThread from "./components/NewThread/NewThread";
import ThreadExpanded from "./components/ThreadExpanded/ThreadExpanded";
import Forum from "./components/Forum/Forum";
import AuthCheck from "./components/AuthCheck/AuthCheck";
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectEmail);
  const userFirstName = useSelector(selectFirstName);
  const userLastName = useSelector(selectLastName);

  // redirect to https if try to access via http
  if (window.location.protocol !== 'https:') {
    window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
  };

  // initialise Pendo if logged in
  useEffect(() => {
    if (document.cookie) {
      window.pendo.initialize({
        disableCookies: true,
        visitor: {
          id: userEmail,
          email: userEmail,
          full_name: `${userFirstName} ${userLastName}`,
          return_url: 'https://shutupanddance.io/dashboard'
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
    if (document.cookie) {
      dispatch(getAccessToken());
    };
  }, [userEmail, dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="*"
          element={
            <Navigate to="/dashboard" replace />
          }
        />

        <Route path="/signup"
          element={
            <SignUp />
          }
        />

        <Route path="/login"
          element={
            <Login />
          }
        />

        <Route path="/dashboard"
          element={
            <AuthCheck>
              <Navbar />
              <Dashboard />
            </AuthCheck>
          }
        />

        <Route path="/suggestions"
          element={
            <AuthCheck>
              <Navbar />
              <Suggestions />
            </AuthCheck>
          }
        />

        <Route path="/forum/*"
          element={
            <AuthCheck>
              <Navbar />
              <ForumRoutes />
            </AuthCheck>
          }
        />

        <Route path="/account"
          element={
            <AuthCheck>
              <Navbar />
              <Account />
            </AuthCheck>
          }
        />
      </Routes>
    </Router>
  );
};

function ForumRoutes() {
  return (
    <Routes>
      <Route path="new"
        element={
          <NewThread />
        }
      />
      
      <Route path=":threadId"
        element={
          <ThreadExpanded />
        }
      />
      
      <Route path=""
        element={
          <Forum />
        }
      />
    </Routes>
  );
};