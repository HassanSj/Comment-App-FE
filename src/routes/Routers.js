import {
  BrowserRouter,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import FeedbackPage from "../components/Feedback/FeedbackPage";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";
import Logout from "../components/Logout/Logout";
import Signup from "../components/Signup/Signup";
const Routers = () => {
  const authPaths = [
    { path: "/home", component: Home },
    { path: "/feedback", component: FeedbackPage },
  ];

  return (
    <>
      <BrowserRouter>
        <Switch>
          {authPaths.map((route, index) => (
            <AuthRoute key={index} path={route} component={route.component} />
          ))}
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Route path="/" component={Login} />
          <Route path="/feedback" component={FeedbackPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routers;
