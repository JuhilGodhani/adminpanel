import React, { Component } from "react";
// import { auth, app, db } from "./Firebase";
import { ModalFooter, Table } from "reactstrap";
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
import { dbs } from "../userfirebase/userfirebase";
// import { Button, Modal, InputGroup, Form } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { child } from "firebase/database";
import { ref, onValue, set, get, update, remove } from "firebase/database";
import "../../style/bookingdata.css";
import { ErrorToast, SuccessToast } from "../../helper/Toast";

const db1 = dbs;
export default className EditUserContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      // isOpen: false,
      mode: "",
      isOpen: false,
      record: {
        firstname: props.record.firstname,
        lastname: props.record.lastname,
        email: props.record.email,
        phonenumber: props.record.phonenumber,
        deliverylocation: props.record.deliverylocation,
        pickuplocation: props.record.pickuplocation,
        deliverydate: props.record.deliverydate,
        journeytime: props.record.journeytime,
        msg: props.record.msg,
        radioValue: props.record.radioValue,
        checkboxclick: props.record.checkboxclick,
        date: props.record.date,
        time: props.record.time,
      },
      modfirstname: "",
      modlastname: "",
      modemail: "",
      modphonenumber: "",
      moddeliverylocation: "",
      modpickuplocation: "",
      moddeliverydate: "",
      modjourneytime: "",
      modmsg: "",
      modradioValue: "",
      modcheckboxclick: "",
      moddate: "",
      modtime: "",
    };
  }
  componentDidMount() {
    // console.log(this.state.record);
  }
  render() {
    return (
      <>
        {/* <Button variant='primary' classNameName='ms-2' onClick={()=>{this.openModal("add")}}>Add New Record</Button> */}
        {/* <Button
          variant="success"
          classNameName="ms-2"
          onClick={() => {
            this.openModal("edit");
          }}
        >
          Edit Record
        </Button>
        <Button
          variant="danger"
          classNameName="ms-2"
          onClick={() => {
            this.inteface("delete");
          }}
          // onClick={()=>this.deleteData()}
          style={this.state.mode == "add" ? { display: "none" } : {}}
        >
          Delete Record
        </Button> */}
        {/* //===================================================================================================================    */}
        {/* <div classNameName="del">
          <MdDelete
            // username={row.data.currenttime}
            // record={row.data}
            onClick={() => {
              this.inteface("delete");
            }}
          />
        </div> */}
        {/* //========================================================== */}
        <div classNameName="edit">
          <FaEdit
            // record={row.data}
            onClick={() => {
              this.openModal("edit");
            }}
          ></FaEdit>
        </div>
        {/* //=================================================================================================== */}
        <Modal
          centered
          size="lg"
          // show={this.state.isOpen}
          isOpen={this.state.modal}
          toggle={() => this.setState({ modal: false })}
          // style={{ width: "30%" }}
        >
          <ModalHeader
            toggle={() => this.setState({ modal: false })}
            classNameName="mt-1 d-flex justify-content-center updatemodalfooter "
          >
            Edit Booking Data
          </ModalHeader>
          <ModalBody>
            <Row classNameName="d-flex justify-content-center ">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder="First Name"
                      name="firstname"
                      onChange={(e) => {
                        this.setState({
                          modfirstname: e.target.value,
                        });
                      }}
                      value={this.state.modfirstname}
                      // required
                    ></Input>
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Input
                      type="text"
                      name="lastname"
                      onChange={(e) => {
                        this.setState({
                          modlastname: e.target.value,
                        });
                      }}
                      value={this.state.modlastname}
                      placeholder="Last Name"
                      // required
                    />
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      onChange={(e) => {
                        this.setState({
                          modemail: e.target.value,
                        });
                      }}
                      value={this.state.modemail}
                      placeholder="Email"
                      // required
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Input
                      type="number"
                      name="phonenumber"
                      onChange={(e) => {
                        this.setState({
                          modphonenumber: e.target.value,
                        });
                      }}
                      value={this.state.modphonenumber}
                      placeholder="Phone Number"
                      // required
                    />
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup>
                    <Input
                      type="text"
                      name="deliverylocation"
                      onChange={(e) => {
                        this.setState({
                          moddeliverylocation: e.target.value,
                        });
                      }}
                      value={this.state.moddeliverylocation}
                      placeholder="Delivery Location"
                      // required
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Input
                      type="text"
                      name="pickuplocation"
                      onChange={(e) => {
                        this.setState({
                          modpickuplocation: e.target.value,
                        });
                      }}
                      value={this.state.modpickuplocation}
                      placeholder="Pickup Location"
                      // required
                    />
                  </FormGroup>
                </Col>

                <Col lg="6">
                  <FormGroup>
                    <Input
                      type="date"
                      name="date"
                      onChange={(e) => {
                        this.setState({
                          moddeliverydate: e.target.value,
                        });
                      }}
                      value={this.state.moddeliverydate}
                      placeholder="journey date"
                      // required
                      classNameName="t2"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <Input
                      type="time"
                      name="time"
                      onChange={(e) => {
                        this.setState({
                          modjourneytime: e.target.value,
                        });
                      }}
                      value={this.state.modjourneytime}
                      placeholder="journey time"
                      // required
                      classNameName="time_picker"
                    />
                  </FormGroup>
                </Col>

                <Col lg="12">
                  <FormGroup>
                    <Input
                      rows={5}
                      type="textarea"
                      classNameName="textarea"
                      name="msg"
                      onChange={(e) => {
                        this.setState({
                          modmsg: e.target.value,
                        });
                      }}
                      value={this.state.modmsg}
                      // required
                      placeholder="Other Details"
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
            </Row>
          </ModalBody>
          <ModalFooter classNameName="d-flex justify-content-center updatemodalfooter">
            <button
              classNameName="updatebtn"
              onClick={() => {
                this.updateData();
              }}
            >
              Update
            </button>
          </ModalFooter>
        </Modal>
        {/* //=================================================================================================== */}
        {/* <Modal show={this.state.isOpen}>
          <Modal.Header>
            <Modal.Title>
              {this.state.mode == "add" ? "Add New Record" : "edit record"}
            </Modal.Title>
            <Button
              size="m"
              variant="dark"
              onClick={() => {
                this.closeModel();
              }}
            >
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <InputGroup>
              <InputGroup.Text>username</InputGroup.Text>
              <Form.Control
                value={this.state.modusername}
                onChange={(e) => {
                  this.setState({ modusername: e.target.value });
                }}
                disabled={this.state.mode != "add"}
              ></Form.Control>
            </InputGroup>

            <InputGroup>
              <InputGroup.Text>firstname</InputGroup.Text>
              <Form.Control
                value={this.state.modfirstname}
                onChange={(e) => {
                  this.setState({ modfirstname: e.target.value });
                }}
                disabled={this.state.mode != "add"}
              ></Form.Control>
            </InputGroup>

            <InputGroup>
              <InputGroup.Text>email</InputGroup.Text>
              <Form.Control
                type="email"
                value={this.state.modemail}
                onChange={(e) => {
                  this.setState({ modemail: e.target.value });
                }}
              ></Form.Control>
            </InputGroup>

            <InputGroup>
              <InputGroup.Text>meassge</InputGroup.Text>
              <Form.Control
                value={this.state.modmessage}
                onChange={(e) => {
                  this.setState({ modmessage: e.target.value });
                }}
              ></Form.Control>
            </InputGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="primary"
              classNameName="ms-2"
              onClick={() => {
                this.inteface("add");
              }}
              // onClick={()=>this.insertData()}
              style={this.state.mode != "add" ? { display: "none" } : {}}
            >
              Add New Record
            </Button>

            <Button
              variant="success"
              classNameName="ms-2"
              onClick={() => {
                this.inteface("update");
              }}
              // onClick={()=>this.updateData()}
              style={this.state.mode == "add" ? { display: "none" } : {}}
            >
              Update Record
            </Button>

             <Button
              variant="danger"
              classNameName="ms-2"
              onClick={() => {
                this.inteface("delete");
              }}
              // onClick={()=>this.deleteData()}
              style={this.state.mode == "add" ? { display: "none" } : {}}
            >
              Delete Record
            </Button> 
          </Modal.Footer>
        </Modal> */}
      </>
    );
  }

  openModal(option) {
    // if (option == "add") {
    //   this.setState({
    //     isOpen: true,
    //     mode: option,
    //     modusername: "",
    //     modfirstname: "",
    //     modemail: "",
    //     modmessage: "",
    //   });
    // } else
    if (option == "edit") {
      let rec = this.state.record;
      this.setState({
        // this.setState({ modal: true });
        // isOpen: true,
        modal: true,
        mode: option,
        modfirstname: rec.firstname,
        modlastname: rec.lastname,
        modemail: rec.email,
        modphonenumber: rec.phonenumber,
        moddeliverylocation: rec.deliverylocation,
        modpickuplocation: rec.pickuplocation,
        moddeliverydate: rec.deliverydate,
        modjourneytime: rec.journeytime,
        modmsg: rec.msg,
        modradioValue: rec.radioValue,
        modcheckboxclick: rec.checkboxclick,
        moddate: rec.date,
        modtime: rec.time,
      });
    }
  }

  // closeModel() {
  //   this.setState({
  //     isOpen: false,
  //   });
  // }

  getAllData() {
    return {
      id: this.state.modtime,
      // id:this.state.modusername,

      data: {
        firstname: this.state.modfirstname,
        lastname: this.state.modlastname,
        email: this.state.modemail,
        // message: this.state.modmessage,
        phonenumber: this.state.modphonenumber,
        deliverylocation: this.state.moddeliverylocation,
        pickuplocation: this.state.modpickuplocation,
        deliverydate: this.state.moddeliverydate,
        journeytime: this.state.modjourneytime,
        radioValue: this.state.modradioValue,
        checkboxclick: this.state.modcheckboxclick,
        msg: this.state.modmsg,
        date: this.state.moddate,
        time: this.state.modtime,
      },
    };
  }

  inteface(option) {
    // if (option == "add") this.insertData();
    if (option == "update") this.updateData();
    // if (option == "delete") this.deleteData();
    // this.closeModel();
  }

  // insertData() {
  //   const dbref = ref(db1);
  //   const record = this.getAllData();
  //   const address = "BookingData/" + record.id;
  //   get(child(dbref, address)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       // set(ref(db1,address),record.data)
  //       alert("cannot create,user already exists ");
  //     } else {
  //       set(ref(db1, address), record.data);
  //     }
  //   });
  // }

  updateData() {
    console.log("edit");
    const dbref = ref(db1);
    const record = this.getAllData();
    console.log("editid", record);
    const address = "BookingData/" + record.id;
    console.log("record.id===", record.id);
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        update(ref(db1, address), record.data);
        this.setState({ modal: false });
        SuccessToast("Updated Successfully");
      } else {
        ErrorToast("can't update, please try again");
      }
    });
  }

  // deleteData() {
  //   console.log("del");
  //   const dbref = ref(db1);
  //   const record = this.getAllData();
  //   // console.log(record);
  //   const address = "BookingData/" + record.id;
  //   console.log(record.id);
  //   get(child(dbref, address)).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       remove(ref(db1, address));
  //     } else {
  //       alert("cannot delete,user does not exists ");
  //     }
  //   });
  // }
}
