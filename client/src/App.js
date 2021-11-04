import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import SignedIn from "./components/SignedIn/SignedIn";
import { useSelector } from "react-redux";
import { selectFirstName } from "./utils/state/userSlice";

export default function App() {
  const firstName = useSelector(selectFirstName);

  if (window.location.protocol !== 'https:') {
    window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
  };

  return (
    <Router>

      {firstName && <Redirect to="/signedin" />}
      {!firstName && <Redirect to="/login" />}

      <Route exact path="/login">
        <Login />
      </Route>
      
      <Route exact path="/signedin">
        <SignedIn />
      </Route>

      <Route exact path="/register">
        <Register />
      </Route>

    </Router>
  );
};