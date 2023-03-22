import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
// ===========================
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { SuccessToast } from "../../../helper/Toast";
import { AccountCircle } from "@material-ui/icons";
import { useNavigate } from "react-router";
// import { useUserAuth } from "../context/UserAuthContext";
// import { useUserAuth } from "../../Admin/context/UserAuthContext";

// ===================================
import "../../../style/header.css";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const data = {
  password: "",
};

// const LILO = {
//   login: "Login Type",
//   logout: "Logout",
// };

const Adminheader = (props) => {
  // ==========================================
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [OpenProfile, setOpenProfile] = useState(false);
  const [OpenProfile1, setOpenProfile1] = useState(false);
  const [modal, setModal] = useState(false);

  // const [lgtype, setLgtype] = useState("Login Type");

  // const lgtype = () => localStorage.setItem("lgtype", JSON.stringify(LILO));
  const LoginType = localStorage.getItem("lgtype");

  const open = Boolean(anchorEl);

  const menuRef = useRef(null);
  const toggleMenu = () => {
    menuRef.current.classNameList.toggle("menu_active");
  };

  // =================================================================================

  // const { logOut } = useUserAuth();
  const navigate = useNavigate();
  // const handleLogout = async () => {
  //   try {
  //     await logOut();
  //     navigate("/home");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const a = { username: " ", email: " ", password: " " };
  const handleLogout = () => {
    window.localStorage.clear();
    // window.localStorage.setItem("userLoginDatas", JSON.stringify(a));
    window.localStorage.setItem("adminLoginDatas", JSON.stringify(a));
    // window.localStorage.setItem("lgtype", "Login type");
    // window.close("/adminpanel");
    navigate("/alogin");
    window.location.reload();
  };

  const menuRef1 = useRef();
  const menuRef2 = useRef();
  useEffect(() => {
    // let handler = (e) => {
    //   if (!menuRef1.current.contains(e.target)) {
    //     setOpenProfile(false);
    //   }
    // };
    // document.addEventListener("mousedown", handler);
    // let handler1 = (e) => {
    //   if (!menuRef2.current.contains(e.target)) {
    //     setOpenProfile1(false);
    //   }
    // };
    // document.addEventListener("mousedown", handler1);
  }, []);
  //===================================================
  const [securepassword, setPassword] = useState(data);

  const handlePassword = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setPassword({ ...securepassword, [name]: value });
  };

  // const psw = "juju@123";
  // //=============================================================
  // const handlerSubmit = () => {
  //   // setLgtype("Logout");
  //   // navigate("/alogin");
  //   if (securepassword.password === psw) {
  //     navigate("/alogin");
  //     // setLgtype("Logout");

  //     // console.log("click");
  //   } else if (securepassword.password !== psw) {
  //     navigate("/login");
  //     localStorage.setItem("Login type", "user");
  //   }
  //   // localStorage.setItem("lgtype","Logout")
  //   // // setModal(false);
  //   window.location.reload();
  // };

  const login = () => {
    if (LoginType === "Login") {
      // setOpenProfile1(true);
      navigate("./alogin");
    } else if (LoginType === "Logout") {
      handleLogout();
      setOpenProfile(false);
    }
  };

  // const userdata = JSON.parse(localStorage.getItem("userLoginDatas"));
  const admindata = JSON.parse(localStorage.getItem("adminLoginDatas"));
  // =================================================================================
  return (
    <header classNameName="header">
      {/* ==============header top========= */}
      {/* <UserAuthContextProvider> */}
      {/* <ProtectedRoute> */}

      <div classNameName="header_top headerfix">
        <Container>
          <Row classNameName="topleft">
            <Col lg="6" md="6" sm="6">
              <div classNameName="header_top_left">
                <span>Need Help?</span>
                <span classNameName="header_top_help">
                  <i classNameName="ri-phone-fill"></i> +91-875-849-1244
                </span>
              </div>
            </Col>

            {/* //========================================================================================= */}
            {/* <Col lg="6" md="6" sm="6">
              <div classNameName="header_top_right d-flex aign-items-center justify-content-end gap-3">
                <Link to="/login" classNameName="d-flex align-items-center gap-1">
                  <i classNameName="ri-login-circle-line"></i>Login{" "}
                </Link>

                <Link
                  to="/register"
                  classNameName="d-flex align-items-center gap-1"
                >
                  <i classNameName="ri-user-line"></i>Register{" "}
                </Link>
              </div>
            </Col> */}
            {/* //========================================================================================= */}
            <Row classNameName="topright">
              <Col lg="6" md="6" sm="6">
                <div classNameName="header_top_right d-flex aign-items-center justify-content-end">
                  {/* {auth && ( */}
                  <div
                    classNameName="acc"
                    onMouseLeave={() => {
                      setOpenProfile(false);
                      // setOpenProfile1(false);
                    }}
                    onMouseEnter={() => setOpenProfile(true)}
                  >
                    <IconButton classNameName="iconbtn" color="inherit">
                      <AccountCircle />
                    </IconButton>
                    {OpenProfile && (
                      <div ref={menuRef1}>
                        <div classNameName="flex flex-column dropDownProfile">
                          <div classNameName="arrow"></div>
                          <ul classNameName="flex flex-column gap-4 menu1">
                            <div
                              // onClick={() => {
                              //   setOpenProfile1(true);
                              //   localStorage.setItem("lgtype","LogOut")
                              //   // lgtype();
                              //   // console.log(LILO?.login);
                              //   // console.log(LILO?.logout);
                              //   console.log(LoginType);
                              // }}
                              classNameName="same"
                            >
                              <li onClick={login}>{LoginType}</li>
                            </div>
                            {/* <Link  classNameName="same"> */}
                            {/* //================================================================================================== */}
                            {/* <li onClick={handleLogout}>LogOut</li> */}
                            {/* //================================================================================================== */}

                            {/* </Link> */}
                            {/* <Link to="/register" classNameName="same">
                                  <li>Register</li>
                                </Link> */}
                          </ul>
                        </div>
                      </div>
                    )}
                    {/* <span classNameName="name">{userdata?.username || ""}</span> */}
                    <span classNameName="name">
                      {admindata?.username || ""}
                    </span>

                    {/* {OpenProfile1 && (
                      <div
                        ref={menuRef2}
                        onMouseLeave={() => setOpenProfile1(false)}
                      >
                        <div classNameName="flex flex-column dropDownProfile1">
                          <div classNameName="arrow1"></div>
                          <ul classNameName="flex flex-column gap-4 menu1">
                            <div
                              onClick={() => {
                                {
                                  localStorage.setItem("Login type", "admin");
                                  setOpenProfile1(false);
                                  setOpenProfile(false);
                                  setModal(true);
                                  // setLgtype("Logout");

                                  // navigate("/alogin");
                                  // window.location.reload();
                                }
                              }}
                              classNameName="same"
                            >
                              <li>Admin</li>
                            </div>
                            <div
                              classNameName="same"
                              onClick={() => {
                                {
                                  localStorage.setItem("Login type", "user");
                                  setOpenProfile1(false);
                                  setOpenProfile(false);
                                  navigate("/login");
                                  window.location.reload();
                                  // setLgtype("Logout");
                                }
                              }}
                            >
                              <li>User</li>
                            </div>
                          </ul>
                        </div>
                      </div>
                    )} */}
                  </div>
                  {/* )} */}
                </div>
              </Col>
              {/* //============================================================================================== */}
            </Row>
          </Row>
        </Container>
      </div>
      {/* </ProtectedRoute> */}
      {/* </UserAuthContextProvider> */}
      {/* <div classNameName="header_top"></div> */}

      {/* //=================================================================================================================================================//      */}
    </header>
  );
};

export default Adminheader;
