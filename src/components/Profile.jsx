import React, { useEffect } from "react";
import "../Style/profile.css";
import {
  ref,
  child,
  onValue,
  set,
  get,
  update,
  remove,
} from "firebase/database";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { admindbs } from "../Admin/adminfirebase/adminfirebase";
import { CgProfile } from "react-icons/cg";

const Profile = () => {
  return (
    <>
      <div className="maindiv">
        <div className="profile_box">
          <div className="profile_nav">
            <div className="div_proimg">
              <CgProfile className="proimg" />
            </div>
            <h2>Admin</h2>
          </div>
          <div className="prodetails">
            <Row className="samepad">
              <Col lg="3">Name</Col>
              <Col lg="1">:</Col>
              <Col lg="8">Admin</Col>
            </Row>

            <Row className="samepad">
              <Col lg="3">Email</Col>
              <Col lg="1">:</Col>
              <Col lg="8">admin1@gmail.com</Col>
            </Row>

            <Row className="samepad">
              <Col lg="3">Number</Col>
              <Col lg="1">:</Col>
              <Col lg="8">8320148386</Col>
            </Row>
            <Row className="samepad">
              <Col lg="3">Gender</Col>
              <Col lg="1">:</Col>
              <Col lg="8">male</Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
