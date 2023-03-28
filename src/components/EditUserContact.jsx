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
import { dbs } from "../Admin/userfirebase/userfirebase";
// import { Button, Modal, InputGroup, Form } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { child } from "firebase/database";
import { ref, onValue, set, get, update, remove } from "firebase/database";
import "../Style/bookingdata.css";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const db1 = dbs;
export default class EditUserContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      // isOpen: false,
      mode: "",
      isOpen: false,
      record: {
        firstname: props.record.data.firstname,
        lastname: props.record.data.lastname,
        email: props.record.data.email,
        phonenumber: props.record.data.phonenumber,
        deliverylocation: props.record.data.deliverylocation,
        pickuplocation: props.record.data.pickuplocation,
        deliverydate: props.record.data.deliverydate,
        journeytime: props.record.data.journeytime,
        msg: props.record.data.msg,
        radioValue: props.record.data.radioValue,
        checkboxclick: props.record.data.checkboxclick,
        status: props.record.data.status,
        date: props.record.data.date,
        time: props.record.data.time,
        key: props.record.key,
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
      modstatus: "",
      moddate: "",
      modtime: "",
      modkey: "",
    };
  }
  componentDidMount() {
    // console.log(this.state.record);
  }
  render() {
    return (
      <>
        {/* <Button variant='primary' className='ms-2' onClick={()=>{this.openModal("add")}}>Add New Record</Button> */}
        {/* <Button
          variant="success"
          className="ms-2"
          onClick={() => {
            this.openModal("edit");
          }}
        >
          Edit Record
        </Button>
        <Button
          variant="danger"
          className="ms-2"
          onClick={() => {
            this.inteface("delete");
          }}
          // onClick={()=>this.deleteData()}
          style={this.state.mode == "add" ? { display: "none" } : {}}
        >
          Delete Record
        </Button> */}
        {/* //===================================================================================================================    */}
        {/* <div className="del">
          <MdDelete
            // username={row.data.currenttime}
            // record={row.data}
            onClick={() => {
              this.inteface("delete");
            }}
          />
        </div> */}
        {/* //========================================================== */}
        <div className="edit">
          <FaEdit
            // record={row.data}
            onClick={() => {
              this.openModal("edit");
            }}
          />
        </div>
        {/* //=================================================================================================== */}
        <Modal
          centered
          size="lg"
          // show={this.state.isOpen}
          isOpen={this.state.modal}
          toggle={() => this.setState({ modal: false })}
          style={{ width: "20%" }}
        >
          <ModalHeader
            toggle={() => this.setState({ modal: false })}
            className="mt-1 d-flex justify-content-center updatemodalfooter "
          >
            Edit Status
          </ModalHeader>
          <ModalBody>
            <Row className="d-flex justify-content-center ">
              <Row>
                {/* <Col lg="6">
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
                      placeholder="Starting Location"
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
                      placeholder="Ending Location"
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
                      placeholder="departure date"
                      // required
                      className="t2"
                    />
                    <FormHelperText className="formhelpertxt">
                      Departure date
                    </FormHelperText>
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
                      placeholder="departure time"
                      // required
                      className="time_picker"
                    />
                  </FormGroup>
                </Col> */}
                {/* <Col lg="6"> */}
                <FormControl className="selectformcon">
                  <Select
                    value={this.state.modstatus}
                    onChange={(e) => {
                      this.setState({
                        modstatus: e.target.value,
                      });
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                    <MenuItem value="Process">Process</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                  <FormHelperText>Edit Status</FormHelperText>
                </FormControl>
                {/* </Col>
                <Col lg="6"> */}
                {/* <FormGroup>
                    <Input
                      type="time"
                      name="time"
                      onChange={(e) => {
                        this.setState({
                          modjourneytime: e.target.value,
                        });
                      }}
                      value={this.state.modjourneytime}
                      placeholder="departure time"
                      // required
                      className="time_picker"
                    />
                  </FormGroup> */}
                {/* </Col> */}
                {/* <Col lg="12">
                  <FormGroup>
                    <Input
                      rows={5}
                      type="textarea"
                      className="textarea"
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
                </Col> */}
              </Row>
            </Row>
          </ModalBody>
          <ModalFooter className="d-flex justify-content-center updatemodalfooter">
            <button
              className="updatebtn"
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
              className="ms-2"
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
              className="ms-2"
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
              className="ms-2"
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
        // modfirstname: rec.firstname,
        // modlastname: rec.lastname,
        // modemail: rec.email,
        // modphonenumber: rec.phonenumber,
        // moddeliverylocation: rec.deliverylocation,
        // modpickuplocation: rec.pickuplocation,
        // moddeliverydate: rec.deliverydate,
        // modjourneytime: rec.journeytime,
        // modmsg: rec.msg,
        // modradioValue: rec.radioValue,
        // modcheckboxclick: rec.checkboxclick,
        modstatus: rec.status,
        moddate: rec.date,
        modtime: rec.time,
        modkey: rec.key,
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
      id: this.state.modkey,
      // id:this.state.modusername,

      data: {
        // firstname: this.state.modfirstname,
        // lastname: this.state.modlastname,
        // email: this.state.modemail,
        // message: this.state.modmessage,
        // phonenumber: this.state.modphonenumber,
        // deliverylocation: this.state.moddeliverylocation,
        // pickuplocation: this.state.modpickuplocation,
        // deliverydate: this.state.moddeliverydate,
        // journeytime: this.state.modjourneytime,
        // radioValue: this.state.modradioValue,
        // checkboxclick: this.state.modcheckboxclick,
        status: this.state.modstatus,
        // msg: this.state.modmsg,
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
