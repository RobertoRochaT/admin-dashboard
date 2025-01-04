import React from "react";
import profilepic from "../images/user.jpg";

const NavAvatar = ({ user }) => {
  return (
    <li className="nav-item dropdown pe-3">
      <a
        className="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <img
          src={user?.picture || profilepic}
          alt="profile"
          className="rounded-circle"
          width="40"
        />
        <span className="d-none d-md-block dropdown-toggle ps-2">
          {user?.name || "Guest"}
        </span>
      </a>

      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
        <li className="dropdown-header">
          <h6>{user?.name || "Guest"}</h6>
          <span>{user?.email || "No email available"}</span>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="/user-profile"
          >
            <i className="bi bi-person"></i>
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <a
            className="dropdown-item d-flex align-items-center"
            href="/login"
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </a>
        </li>
      </ul>
    </li>
  );
};

export default NavAvatar;
