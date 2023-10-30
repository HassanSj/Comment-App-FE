import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    // Delay for 100 milliseconds
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("hasShownAlert");
      localStorage.removeItem("name");
      history.push("/login");
    }, 100);
  }, [history]);

  return <div>Logging out...</div>;
}

export default Logout;
