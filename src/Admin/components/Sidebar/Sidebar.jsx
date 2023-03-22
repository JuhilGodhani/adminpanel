import React from "react";

import { NavLink } from "react-router-dom";
// import navLinks from "../../assets/dummy-data/navLinks";
import "../../../style/sidebar.css";
import AdminProtectedRoute from "../../AdminProtectedRoute";

const navLinks = [
  {
    path: "/dashboard",
    display: "Dashboard",
  },
  {
    path: "/userregidata",
    display: "User Register History",
  },
  {
    path: "/userlogindata",
    display: "User Login History",
  },
  {
    path: "/userbookingdata",
    display: "User Booking Information",
  },
  {
    path: "/usermsg",
    display: "User Contact",
  },
  {
    path: "/adminlogindata",
    display: "Admin Login Data",
  },
];
const Sidebar = () => {
  return (
    <div classNameName="sidebar">
      <div classNameName="sidebar__content">
        <div classNameName="menu">
          <ul classNameName="nav__list">
            {navLinks.map((item, index) => (
              <li classNameName="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  classNameName={(navclassName) =>
                    navclassName.isActive
                      ? "nav__active nav__link"
                      : "nav__link"
                  }
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
