import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navigation-container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/auth">Auth</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/add-challenge">Add Challenge</Link>
        </li>
        <li>
          <Link to="/challenge?id=1">Challenge 1</Link>
        </li>
        <li>
          <Link to="/challenges">All Challenges</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
