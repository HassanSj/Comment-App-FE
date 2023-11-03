import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      history.push("/login");
    }, 100);
  }, [history]);

  return <div>Logging out...</div>;
}

export default Logout;
