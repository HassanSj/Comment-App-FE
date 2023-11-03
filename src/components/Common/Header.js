import React from "react";
import "../../assets/css/header.css";
import { Dropdown, Image } from 'react-bootstrap';
function Header() {
  const name = localStorage.getItem("userName");
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <h2 style={{color:"white"}}>Review App</h2>
          <p style={{left:"45%",color:"white",position:"absolute"}}>{name}</p>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-md-auto gap-2">
              <li className="nav-item rounded">
                <a className="nav-link active" aria-current="page" href="#">
                  <i className="bi bi-house-fill me-2"></i>Home
                </a>
              </li>
            
              <li className="nav-item rounded">
                <a className="nav-link" href="/logout">
                <i className="bi bi-person-fill me-2"></i>LogOut
                </a>
              </li>
            
            </ul>
          </div>
        </div>
      </nav>
      
    </>
  );
}

export default Header;
