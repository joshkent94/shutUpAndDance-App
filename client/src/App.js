import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignedIn from "./components/SignedIn/SignedIn";
import Login from "./components/Login/Login";
import { selectSignedIn, requestLogin, selectRegistering } from "./utils/state/preLoginSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Register from "./components/Register/Register";
import { getUserDetails } from "./utils/state/userSlice";

export default function App() {
  const dispatch = useDispatch();
  const registering = useSelector(selectRegistering);
  const signedIn = useSelector(selectSignedIn);

  useEffect(() => {
    if (document.cookie !== "" & !signedIn) {
      dispatch(requestLogin());
    };
  });

  useEffect(() => {
    if (signedIn) {
      dispatch(getUserDetails());
    };
  });

  return (
    <Router>

      {signedIn && <Redirect to="/signedin" />}
      {registering && <Redirect to="/register" />}
      {!signedIn && !registering && <Redirect to="/login" />}

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
      
        <Route path="/signedin">
          <SignedIn />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>

    </Router>
  );
};