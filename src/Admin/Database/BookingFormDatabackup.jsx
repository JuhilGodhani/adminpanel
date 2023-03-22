import React from "react";
import { dbs } from "../userfirebase/userfirebase";
// import { ref, onValue } from "firebase/database";
import { ModalFooter, Table } from "reactstrap";
import "../../style/contactdata.css";
import "../../style/bookingdata.css";
import { MdDelete } from "react-icons/md";
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

export className UserBookingFormdata extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      modal: false,
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
    console.log("row1231", props);
    return {
      id: props.data.time,
      // data: {
      //   firstname: this.props.modfirstname,
      //   lastname: this.props.modlastname,
      //   phonenumber: this.props.modphonenumber,
      //   email: this.props.modemail,
      //   deliverylocation: this.props.moddeliverylocation,
      //   pickuplocation: this.props.modpickuplocation,
      //   deliverydate: this.props.moddeliverydate,
      //   journeytime: this.props.modjourneytime,
      //   msg: this.props.modmsg,
      // },
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
        alert("cannot delete,user does not exists ");
      }
    });
  }

  getAllData1() {
    return {
      id: this.state.modtime,
      data: {
        modfirstname: this.state.modfirstname,
        modlastname: this.state.modlastname,
        modphonenumber: this.state.modphonenumber,
        modemail: this.state.modemail,
        moddeliverylocation: this.state.moddeliverylocation,
        modpickuplocation: this.state.modpickuplocation,
        moddeliverydate: this.state.moddeliverydate,
        modjourneytime: this.state.modjourneytime,
        modmsg: this.state.modmsg,
        moddate: this.state.moddate,
        modtime: this.state.modtime,
      },
    };
  }

  edit(row) {
    this.setState({ modal: true });
    // console.log(row.data.firstname);

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
      moddate: row.data.date,
      modtime: row.data.time,
    });
  }
  insertData() {
    console.log(this.state, "row");
    const dbref = ref(dbs);
    const record = this.getAllData1(this.state);
    console.log("abc", record);
    const address = "BookingData/" + record.id;
    get(child(dbref, address)).then((snapshot) => {
      // if (snapshot.exists()) {
      //   // set(ref(dbs,address),record.data)
      //   alert("cannot create,user already 👍 exists ");
      // } else {
      set(ref(dbs, address), record.data);
      // }
    });
  }

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
      console.log(records);
    });
  }

  render() {
    return (
      <>
        <div classNameName="main_div">
          <h1 classNameName="heder">User Booking Information</h1>
          <Table striped classNameName="t">
            <thead>
              <tr>
                <th>No.</th>
                {/* <th>username</th> */}
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Delivery Location</th>
                <th>Pickup Location</th>
                <th>Delivery Date</th>
                <th>Journey Time</th>
                <th>Other Details</th>
                <th>Payment by</th>
                <th>Policy click</th>
                <th>Booking Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.tableData.map((row, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>
                      {row.data.firstname} {row.data.lastname}
                    </td>
                    <td>{row.data.email}</td>
                    <td>{row.data.phonenumber}</td>
                    <td>{row.data.deliverylocation}</td>
                    <td>{row.data.pickuplocation}</td>
                    <td>{row.data.deliverydate}</td>
                    <td>{row.data.journeytime}</td>
                    <td>{row.data.msg}</td>
                    <td>{row.data.radioValue}</td>
                    <td>{row.data.checkboxclick}</td>
                    <td>{row.data.date}</td>
                    <td>{row.data.time}</td>
                    <td>
                      <div classNameName="del">
                        <MdDelete
                          // username={row.data.currenttime}
                          record={row.data}
                          onClick={() => this.delete(row)}
                        />
                      </div>
                      <div classNameName="edit">
                        <FaEdit
                          record={row.data}
                          onClick={() => this.edit(row)}
                        ></FaEdit>
                      </div>
                    </td>
                    <Modal
                      size="lg"
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
                          onClick={() => this.insertData()}
                        >
                          Update
                        </button>
                      </ModalFooter>
                    </Modal>
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
