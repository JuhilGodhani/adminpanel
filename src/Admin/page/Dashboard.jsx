import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "reactstrap";
import "../../style/dashboard.css";
import { CgProfile } from "react-icons/cg";
import MileChart from "../components/Milechart/MileChart";

const Dashboard = () => {
  const navigate = useNavigate();
  const bookingdata = localStorage.getItem("bookingcount");
  const contactdata = localStorage.getItem("contactdata");
  const registerdata = localStorage.getItem("registercountdata");
  const logindata = localStorage.getItem("logincountdata");
  const adminLoginDatas = JSON.parse(localStorage.getItem("adminLoginDatas"));

  return (
    <div>
      <div classNameName="d-flex justify-content-center">
        <div classNameName="main_div_dashboard gap-lg-5  ">
          <Row>
            <Col>
              <div classNameName="main_box_dashboard">
                <div
                  classNameName="mainbox subbox1"
                  onClick={() => navigate("/userregidata")}
                >
                  <h1 classNameName="counttext">User Register</h1>
                  <h3 classNameName="countnum">{registerdata}</h3>
                </div>
                <div
                  classNameName="mainbox subbox2"
                  onClick={() => navigate("/userlogindata")}
                >
                  <h1 classNameName="counttext">User Login</h1>
                  <h3 classNameName="countnum">{logindata}</h3>
                </div>
                <div
                  classNameName="mainbox subbox3"
                  onClick={() => navigate("/usermsg")}
                >
                  <h1 classNameName="counttext">User Contact</h1>
                  <h3 classNameName="countnum">{contactdata}</h3>
                </div>
                <div
                  classNameName="mainbox subbox4"
                  onClick={() => navigate("/userbookingdata")}
                >
                  <h1 classNameName="counttext">User Booking</h1>
                  <h3 classNameName="countnum">{bookingdata}</h3>
                </div>
              </div>
            </Col>
          </Row>
          <div classNameName="statics">
            <Col classNameName="profile_location">
              <div classNameName="profile">
                <div classNameName="profile_box">
                  <Row classNameName="d-flex justify-content-center ">
                    <div classNameName="proimg_div">
                      <CgProfile classNameName="probg" />
                    </div>
                  </Row>
                  {/* <Row> */}
                  <div>
                    <h1 classNameName="profilename">Profile</h1>
                    <h3 classNameName="profiledetails ">
                      User Name :-
                      <span classNameName="username">
                        {adminLoginDatas.username}
                      </span>
                    </h3>
                    <h3 classNameName="profiledetails">
                      Email :-
                      <span classNameName="useremail">
                        {adminLoginDatas.email}
                      </span>
                    </h3>
                  </div>
                  {/* </Row> */}
                </div>
              </div>
            </Col>
            <div classNameName="statsbg">
              <div classNameName="stats">
                <h3 classNameName="stats__title">Miles Statistics</h3>
                <MileChart />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Row classNameName="staticschart">
        <Col lg="12"> */}

      {/* </Col>
      </Row> */}
    </div>
  );
};

export default Dashboard;
