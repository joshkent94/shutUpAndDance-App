import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectEmail, selectFirstName, selectLastName } from "./utils/state/userSlice";
import SignUp from "./components/Authentication/SignUp/SignUp";
import Login from "./components/Authentication/Login/Login";
import Dashboard from "./components/DashboardFeature/Dashboard/Dashboard";
import Forum from "./components/ForumFeature/Forum/Forum";
import ThreadExpanded from "./components/ForumFeature/ThreadExpanded/ThreadExpanded";
import Suggestions from "./components/SuggestionsFeature/Suggestions/Suggestions";
import Account from "./components/Account/Account";
import AuthCheck from "./components/Authentication/AuthCheck/AuthCheck";
import TopNav from "./components/Navigation/TopNav/TopNav";
import ScreenSizePrompt from "./components/ScreenSizePrompt/ScreenSizePrompt";
import Footer from "./components/Footer/Footer";
import SpotifyAuthentication from "./components/Authentication/SpotifyAuthentication/SpotifyAuthentication";
import './App.css';

export default function App() {
  const userEmail = useSelector(selectEmail);
  const userFirstName = useSelector(selectFirstName);
  const userLastName = useSelector(selectLastName);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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
          return_url: 'https://app.shutupanddance.io/dashboard'
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

  // add event listener to set state of app whenever screen size changes
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
  });

  // display a prompt to user if screen size is too small
  let content;
  if (viewportWidth < 992) {
    content = <ScreenSizePrompt />;
  } else {
    content =
      <Router>
        <Routes>
          <Route
            path="*"
            element={
              <Navigate to="/dashboard" />
            }
          />

          <Route
            path="/signup"
            element={
              <AuthCheck>
                <SignUp />
              </AuthCheck>
            }
          />

          <Route
            path="/login"
            element={
              <AuthCheck>
                <Login />
              </AuthCheck>
            }
          />

          <Route
            path="/spotify"
            element={
              <SpotifyAuthentication />
            }
          />

          <Route
            path="/dashboard"
            element={
              <AuthCheck>
                <TopNav />
                <div className="main">
                  <Dashboard />
                  <Footer />
                </div>
              </AuthCheck>
            }
          />

          <Route
            path="/suggestions"
            element={
              <AuthCheck>
                <TopNav />
                <div className="main">
                  <Suggestions />
                  <Footer />
                </div>
              </AuthCheck>
            }
          />

          <Route
            path="/forum/*"
            element={
              <AuthCheck>
                <TopNav />
                <div className="main">
                  <ForumRoutes />
                  <Footer />
                </div>
              </AuthCheck>
            }
          />

          <Route
            path="/account"
            element={
              <AuthCheck>
                <TopNav />
                <div className="main">
                  <Account />
                  <Footer />
                </div>
              </AuthCheck>
            }
          />
        </Routes>
      </Router>
  };

  return (
    content
  );
};

function ForumRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <Forum />
        }
      />

      <Route
        path="/:threadId"
        element={
          <ThreadExpanded />
        }
      />
    </Routes>
  );
}