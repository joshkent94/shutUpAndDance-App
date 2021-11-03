import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignedIn from "./components/SignedIn/SignedIn";
import Login from "./components/Login/Login";
import { selectRegistering } from "./utils/state/preLoginSlice";
import { useSelector } from "react-redux";
import Register from "./components/Register/Register";
import { selectFirstName } from "./utils/state/userSlice";

export default function App() {
  const registering = useSelector(selectRegistering);
  const firstName = useSelector(selectFirstName);

  if (window.location.protocol !== 'https:') {
    window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
  };

  return (
    <Router>

      {firstName && <Redirect to="/signedin" />}
      {registering && <Redirect to="/register" />}
      {!firstName && !registering && <Redirect to="/login" />}

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