import React from "react";
import { dbs } from "../userfirebase/userfirebase";
// import { ref, onValue } from "firebase/database";
import { Label, ModalFooter, Table } from "reactstrap";
import "../../style/contactdata.css";
import "../../style/bookingdata.css";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
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
import EditUserContact from "./EditUserContact";
import { ErrorToast, SuccessToast } from "../../helper/Toast";

export className UserBookingFormdata extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      modal: false,
      modal1: false,

      // records: {
      modfirstname: "",
      modlastname: "",
      modphonenumber: "",
      modemail: "",
      moddeliverylocation: "",
      modpickuplocation: "",
      moddeliverydate: "",
      modjourneytime: "",
      modmsg: "",
      moddate: "",
      modtime: "",

      // },
    };
  }

  getAllData(props) {
    // console.log("row1231", props);
    return {
      id: props.data.time,
      data: {
        firstname: props.data.firstname,
        lastname: props.data.lastname,
        phonenumber: props.data.phonenumber,
        email: props.data.email,
        deliverylocation: props.data.deliverylocation,
        pickuplocation: props.data.pickuplocation,
        deliverydate: props.data.deliverydate,
        journeytime: props.data.journeytime,
        msg: props.data.msg,
        checkboxclick: props.data.checkboxclick,
        date: props.data.date,
        time: props.data.time,
      },
    };
  }

  delete(row) {
    const dbref = ref(dbs);
    // console.log("first");
    const record = this.getAllData(row);
    // console.log("record", record);
    const address = "BookingData/" + record.id;
    // console.log("dsf", address);
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(dbs, address));
      } else {
        alert("cannot delete, please try again");
      }
    });
  }

  getAllData1() {
    console.log("row1231");
    const currentdate = new Date().toLocaleDateString();
    const currenttime = new Date().toLocaleTimeString();
    return {
      id: currenttime,
      data: {
        firstname: this.state.modfirstname,
        lastname: this.state.modlastname,
        phonenumber: this.state.modphonenumber,
        email: this.state.modemail,
        deliverylocation: this.state.moddeliverylocation,
        pickuplocation: this.state.modpickuplocation,
        deliverydate: this.state.moddeliverydate,
        journeytime: this.state.modjourneytime,
        msg: this.state.modmsg,
        checkboxclick: "Unchecked",
        radioValue: "Not Paided",
        date: currentdate,
        time: currenttime,
      },
    };
  }
  add() {
    this.setState({ modal: true });
    // console.log("click");
  }
  addData() {
    console.log("clicked");
    const dbref = ref(dbs);
    const record = this.getAllData1();
    console.log("amanda", record);
    const address = "BookingData/" + record.id;
    console.log("adddata", record);
    console.log("address", address);
    get(child(dbref, address)).then((snapshot) => {
      if (
        !this.state.modfirstname ||
        !this.state.modlastname ||
        !this.state.modemail ||
        !this.state.modphonenumber ||
        !this.state.moddeliverylocation ||
        !this.state.modpickuplocation ||
        !this.state.moddeliverydate ||
        !this.state.modjourneytime ||
        !this.state.modmsg
      ) {
        ErrorToast("Please fill the data");
      } else if (snapshot.exists()) {
        // set(ref(dbs,address),record.data)
        ErrorToast("can't create, please try again");
      } else {
        set(ref(dbs, address), record.data);
        this.setState({ modal: false });
        this.setState({
          modfirstname: "",
          modlastname: "",
          modphonenumber: "",
          modemail: "",
          moddeliverylocation: "",
          modpickuplocation: "",
          moddeliverydate: "",
          modjourneytime: "",
          modmsg: "",
          moddate: "",
          modtime: "",
        });
        SuccessToast("Added Successfully");
      }
    });
  }

  opendata(row) {
    this.setState({ modal1: true });
    this.setState({
      modfirstname: row.data.firstname,
      modlastname: row.data.lastname,
      modphonenumber: row.data.phonenumber,
      modemail: row.data.email,
      moddeliverylocation: row.data.deliverylocation,
      modpickuplocation: row.data.pickuplocation,
      moddeliverydate: row.data.deliverydate,
      modjourneytime: row.data.journeytime,
      modmsg: row.data.msg,
      modcheckboxclick: row.data.checkboxclick,
      moddate: row.data.date,
      modtime: row.data.time,
    });
  }
  // getAllData1() {
  //   return {
  //     id: this.state.modtime,
  //     data: {
  //       modfirstname: this.state.modfirstname,
  //       modlastname: this.state.modlastname,
  //       modphonenumber: this.state.modphonenumber,
  //       modemail: this.state.modemail,
  //       moddeliverylocation: this.state.moddeliverylocation,
  //       modpickuplocation: this.state.modpickuplocation,
  //       moddeliverydate: this.state.moddeliverydate,
  //       modjourneytime: this.state.modjourneytime,
  //       modmsg: this.state.modmsg,
  //       moddate: this.state.moddate,
  //       modtime: this.state.modtime,
  //     },
  //   };
  // }

  // edit(row) {
  //   this.setState({ modal: true });
  //   // console.log(row.data.firstname);

  //   this.setState({
  //     modfirstname: row.data.firstname,
  //     modlastname: row.data.lastname,
  //     modphonenumber: row.data.phonenumber,
  //     modemail: row.data.email,
  //     moddeliverylocation: row.data.deliverylocation,
  //     modpickuplocation: row.data.pickuplocation,
  //     moddeliverydate: row.data.deliverydate,
  //     modjourneytime: row.data.journeytime,
  //     modmsg: row.data.msg,
  //     moddate: row.data.date,
  //     modtime: row.data.time,
  //   });
  // }
  // insertData() {
  //   console.log(this.state, "row");
  //   const dbref = ref(dbs);
  //   const record = this.getAllData1(this.state);
  //   console.log("abc", record);
  //   const address = "BookingData/" + record.id;
  //   get(child(dbref, address)).then((snapshot) => {
  //     // if (snapshot.exists()) {
  //     //   // set(ref(dbs,address),record.data)
  //     //   alert("cannot create,user already 👍 exists ");
  //     // } else {
  //     set(ref(dbs, address), record.data);
  //     // }
  //   });
  // }

  componentDidMount() {
    const dbRef = ref(dbs, "BookingData");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;

        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });

      // console.log(records);
      localStorage.setItem("bookingcount", records.length);
    });
  }

  render() {
    return (
      <>
        <div classNameName="main_div">
          <div>
            {/* <Row classNameName="d-flex align-items-center justify-content-center">
              <Col lg="10"> */}
            <h1 classNameName="heder hederbd">User Booking Information</h1>
            <div classNameName="abtn">
              <button classNameName="addbtn" onClick={() => this.add()}>
                <IoMdAdd classNameName="addicon" />
                <span>Add</span>
              </button>
            </div>
            {/* </Col>
              <Col classNameName="d-flex justify-content-center"> */}

            {/* </Col>
            </Row> */}
            {/* //======================================================================================================== */}

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
                  classNameName="adddata"
                  onClick={() => {
                    this.addData();
                  }}
                >
                  Add Data
                </button>
              </ModalFooter>
            </Modal>

            {/* //======================================================================================================== */}
          </div>
          <Table striped classNameName="t">
            <thead>
              <tr>
                {/* <th></th> */}
                {/* <th>No.</th> */}
                {/* <th>username</th> */}
                <th>Full Name</th>
                {/* <th>Email</th> */}
                {/* <th>Phone Number</th> */}
                <th>Delivery Location</th>
                <th>Pickup Location</th>
                <th>Delivery Date</th>
                <th>Journey Time</th>
                {/* <th>Other Details</th> */}
                <th>Payment by</th>
                <th>Policy click</th>
                <th>Booking Date</th>
                <th>Booking Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.tableData.map((row, index) => {
                return (
                  <tr key={index + 1}>
                    {/* <td></td> */}
                    {/* <td>{index + 1}</td> */}
                    <td
                      classNameName="name1"
                      record={row.data}
                      role="button"
                      onClick={() => {
                        this.opendata(row);
                      }}
                    >
                      {row.data.firstname} {row.data.lastname}
                    </td>
                    <Modal
                      centered
                      size="lg"
                      // show={this.state.isOpen}
                      isOpen={this.state.modal1}
                      toggle={() => this.setState({ modal1: false })}
                      // style={{ width: "30%" }}
                    >
                      <ModalHeader
                        toggle={() => this.setState({ modal1: false })}
                        classNameName="mt-1 d-flex justify-content-center updatemodalfooter "
                      >
                        {this.state.modfirstname} {this.state.modlastname} Data
                      </ModalHeader>
                      <ModalBody>
                        <Row classNameName="d-flex justify-content-center ">
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
                            </Col> */}

                            <Col lg="6">
                              <FormGroup>
                                <Label classNameName="labelsty">Email :-</Label>
                                <Input
                                  type="email"
                                  // name="email"
                                  // onChange={(e) => {
                                  //   this.setState({
                                  //     modemail: e.target.value,
                                  //   });
                                  // }}
                                  value={this.state.modemail}
                                  // placeholder="Email"
                                  // required
                                />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                              <FormGroup>
                                <Label classNameName="labelsty">
                                  Phone Number :-
                                </Label>
                                <Input
                                  type="number"
                                  // name="phonenumber"
                                  // onChange={(e) => {
                                  //   this.setState({
                                  //     modphonenumber: e.target.value,
                                  //   });
                                  // }}
                                  value={this.state.modphonenumber}
                                  // required
                                />
                              </FormGroup>
                            </Col>

                            {/* <Col lg="6">
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
                            </Col> */}
                            {/* 
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
                            </Col> */}

                            <Col lg="12">
                              <FormGroup>
                                <Label classNameName="labelsty">
                                  Other Details :-
                                </Label>
                                <Input
                                  rows={5}
                                  type="textarea"
                                  classNameName="textarea"
                                  value={this.state.modmsg}
                                  // required
                                  // placeholder="Other Details"
                                ></Input>
                              </FormGroup>
                            </Col>
                          </Row>
                        </Row>
                      </ModalBody>
                    </Modal>
                    {/* <td>{row.data.email}</td> */}
                    {/* <td>{row.data.phonenumber}</td> */}
                    <td classNameName="name1">{row.data.deliverylocation}</td>
                    <td classNameName="name1">{row.data.pickuplocation}</td>
                    <td classNameName="name1">{row.data.deliverydate}</td>
                    <td classNameName="name1">{row.data.journeytime}</td>
                    {/* <td>{row.data.msg}</td> */}
                    <td classNameName="name1">{row.data.radioValue}</td>
                    <td classNameName="name1">{row.data.checkboxclick}</td>
                    <td classNameName="name1">{row.data.date}</td>
                    <td classNameName="name1">{row.data.time}</td>
                    <td>
                      <Row classNameName="d-flex justify-content-center">
                        <Col lg="4">
                          <EditUserContact record={row.data} />
                        </Col>
                        <Col lg="4">
                          <div classNameName="del">
                            <MdDelete
                              // username={row.data.currenttime}
                              record={row.data}
                              onClick={() => this.delete(row)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}
