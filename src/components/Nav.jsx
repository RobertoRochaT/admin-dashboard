import React, { useState, useEffect } from "react";
import "./nav.css";
import NavAvatar from "./NavAvatar";

const Nav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <nav className="header-nav ms-auto">
      <ul className="d-flex align-items-center">
        <NavAvatar user={user} />
      </ul>
    </nav>
  );
};

export default Nav;
