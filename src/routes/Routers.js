import {
  BrowserRouter,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import Login from "../components/Login/Login";
import Logout from "../components/Logout/Logout";
import Signup from "../components/Signup/Signup";
import Product from "../components/Product/Product";
import Review from "../components/Review/Review";
const Routers = () => {
  const authPaths = [
    { path: "/products", component: Product },
    { path: "/review/:id", component: Review },
  ];

  return (
    <>
      <BrowserRouter>
        <Switch>
          {authPaths?.map((route, index) => (
            <AuthRoute
              key={index}
              path={route.path}
              component={route.component}
            />
          ))}
          <Route path="/signup" component={Signup} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routers;
