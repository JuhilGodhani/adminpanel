import React, { useState, Fragment, useEffect } from "react";
import "../Style/dashboard.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Dashboard_under from "../components/Dashboard_under";
import Adminrouters from "../routes/Adminrouters";
import { UserBookingFormdata } from "../components/BookingFormData";
// import { RegisterData } from "../components/UserRegisterdata";
import UserRegisterdata from "../components/UserRegisterdata";
import { UserLogindata } from "../components/UserLogindata";
import Profile from "../components/Profile";
import Addcar_under from "../components/Addcar_under";
import Caritem_under from "../components/Caritem_under";
import { ContactDatas } from "../components/Contactdata";
import { AdminLogindata } from "../components/AdminLogindata";
import { AiFillCar } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { FaRegistered } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { MdContactMail } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaListAlt } from "react-icons/fa";
import { FaBloggerB } from "react-icons/fa";
import Addblogs_under from "../components/Addblogs_under";

import Navbar from "../components/Navbar";
import {
  ref,
  child,
  onValue,
  set,
  get,
  update,
  remove,
} from "firebase/database";
import { dbs } from "../Admin/userfirebase/userfirebase";

const Addblogs = () => {
  const [isHide, setisHide] = useState(true);
  const [checkboxclick, setCheckboxclick] = useState("Unchecked");
  const [tab, setTab] = useState("blogs");
  const [Heading, setHeading] = useState("Blogs");
  const [SubHeading, setSubHeading] = useState("Add blogs");
  // const [Search, setSearch] = useState();
  const [Usercon, setUsercon] = useState("");

  const navigate = useNavigate();

  const hidesidebar = () => {
    // console.log("has bhai clcik karu 6u");
    setisHide(!isHide);
  };

  const change = () => {
    if (checkboxclick === "Checked") {
      setCheckboxclick("Unchecked");
      document.body.classList.remove("dark");
    } else {
      setCheckboxclick("Checked");
      document.body.classList.add("dark");
    }

    // console.log("dark click");
  };

  const deletenotinum = () => {
    const dbref = ref(dbs);
    const address = "notification/";
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(dbs, address));
      }
    });
  };
  useEffect(() => {
    const dbRef = ref(dbs, "notification");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      // console.log("records", records.count());
      setUsercon(records.length);
    });
  }, []);

  return (
    <div className="main_dashboard">
      {/* <!-- SIDEBAR --> */}
      <section id="sidebar" style={{ width: isHide ? "280px" : "60px" }}>
        <a
          href="#"
          className="brand"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <i className="bx car">
            <AiFillCar />
          </i>
          <span className="text">Car Rental</span>
        </a>
        <ul className="side-menu top">
          <li className={tab === "dashboard" ? "active" : ""}>
            <a
              href="#"
              style={{
                width: isHide ? "100%" : "calc(48px - (4px * 2))",
              }}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li className={tab === "Register" ? "active" : ""}>
            <a
              href="#"
              style={{
                width: isHide ? "100%" : "calc(48px - (4px * 2))",
              }}
              onClick={() => {
                navigate("/userdata");
              }}
            >
              <i className="bx bxs-group"> </i>
              <span className="text">User Data</span>
            </a>
          </li>
          {/* <li className={tab === "Login" ? "active" : ""}>
              <a
                href="#"
                style={{
                  width: isHide ? "100%" : "calc(48px - (4px * 2))",
                }}
                onClick={() => {
                  setTab("Login");
                  setHeading("User Login History");
                  setSubHeading("User Login History");
                }}
              >
                <i className="bx bxs-group"></i>
                <span className="text">User Login History</span>
              </a>
            </li> */}
          <li className={tab === "Booking" ? "active" : ""}>
            <a
              href="#"
              style={{
                width: isHide ? "100%" : "calc(48px - (4px * 2))",
              }}
              onClick={() => {
                navigate("/bookingdata");
              }}
            >
              <i className="bx">
                <TbBrandBooking />
              </i>
              <span className="text">User Booking Information</span>
            </a>
          </li>
          <li className={tab === "Contact" ? "active" : ""}>
            <a
              href="#"
              style={{
                width: isHide ? "100%" : "calc(48px - (4px * 2))",
              }}
              onClick={() => {
                navigate("/contactdata");
              }}
            >
              <i className="bx">
                <MdContactMail />
              </i>
              <span className="text">User Contact</span>
            </a>
          </li>
          <li className={tab === "Addcar" ? "active" : ""}>
            <a
              href="#"
              style={{
                width: isHide ? "100%" : "calc(48px - (4px * 2))",
              }}
              onClick={() => {
                navigate("/caritem");
              }}
            >
              <i className="bx">
                <FaListAlt />
              </i>
              <span className="text">Car Item</span>
            </a>
          </li>
          <li className={tab === "blogs" ? "active" : ""}>
            <a
              href="#"
              style={{
                width: isHide ? "100%" : "calc(48px - (4px * 2))",
              }}
              onClick={() => {
                navigate("/blogs");
              }}
            >
              <i className="bx">
                <FaBloggerB />
              </i>
              <span className="text">Blogs</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li className={tab === "Profile" ? "active" : ""}>
            <a
              href="#"
              style={{
                width: isHide ? "100%" : "calc(48px - (4px * 2))",
              }}
              onClick={() => {
                navigate("/profiledata");
              }}
            >
              <i className="bx">
                <CgProfile />
              </i>
              <span className="text">Profile</span>
            </a>
          </li>
          <li>
            <a
              // href="#"
              style={{
                width: isHide ? "100%" : "calc(48px - (4px * 2))",
              }}
              className="logout"
              onClick={() => {
                navigate("/login");
              }}
            >
              <i className="bx bxs-log-out-circle"></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      {/* <!-- SIDEBAR --> */}

      {/* <!-- CONTENT --> */}
      <section
        id="content"
        style={{
          width: isHide ? "calc(100% - 280px)" : "calc(100% - 60px)",
          left: isHide ? "280px" : "60px",
        }}
      >
        {/* <!-- NAVBAR --> */}
        {/* <Navbar /> */}
        <nav>
          <i onClick={hidesidebar} className="menu">
            <HiMenu />
          </i>
          <a href="#" className="nav-link"></a>
          <form>
            <h5 className="adminpanel">Welcome to Admin Panel . . </h5>
          </form>
          <input
            type="checkbox"
            id="switch-mode"
            hidden
            onClick={change}
            checked={checkboxclick === "Checked"}
          />
          <label for="switch-mode" className="switch-mode"></label>
          <a
            href="#"
            className="notification"
            onClick={() => {
              navigate("/contactdata");
              deletenotinum();
            }}
          >
            <i className="bx bxs-bell"></i>
            {Usercon !== 0 ? <span className="num">{Usercon}</span> : ""}
          </a>
          <a
            href="#"
            className="profile"
            onClick={() => {
              navigate("/profiledata");
            }}
          >
            Admin
          </a>
        </nav>
        {/* <!-- NAVBAR --> */}

        {/* <!-- MAIN --> */}
        <main>
          <div className="head-title">
            <div className="left">
              <h1>{Heading}</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li onClick={() => navigate("/blogs")}>
                  <a className="active" href="#">
                    Blogs
                  </a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li>
                  <a className="active" href="#">
                    {SubHeading}
                  </a>
                </li>
              </ul>
            </div>
            {/* <a href="#" className="btn-download">
                <i className="bx bxs-cloud-download"></i>
                <span className="text">Download PDF</span>
              </a> */}
          </div>

          {tab === "blogs" ? <Addblogs_under /> : ""}
        </main>
        {/* <!-- MAIN --> */}
      </section>
      {/* <!-- CONTENT --> */}
    </div>
  );
};

export default Addblogs;
