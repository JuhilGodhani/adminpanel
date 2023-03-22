import React from "react";
import { dbs } from "../Admin/userfirebase/userfirebase";
// import { ref, onValue } from "firebase/database";
import { Label, ModalFooter, Table } from "reactstrap";
import "../Style/contactdata.css";
import "../Style/bookingdata.css";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
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
import img from "../Images/no data found.jpg";

import { ErrorToast, SuccessToast } from "../helper/Toast";
import moment from "moment/moment";

export class UserBookingFormdata extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      filterdatas: [],
      query: "",
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
        orderno: props.data.orderno,
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
        SuccessToast("Row Deleted Successfully");
      } else {
        ErrorToast("cannot delete, please try again");
      }
    });
  }

  getAllData1() {
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
        status: "Pending",
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
    // console.log("clicked");
    const dbref = ref(dbs);
    const record = this.getAllData1();
    // console.log("amanda", record);
    const address = "BookingData/" + record.id;
    // console.log("adddata", record);
    // console.log("address", address);
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
          modorderno: "",
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
      modcarimg: row.data.carimg,
      modcarname: row.data.carname,
      modcarmodel: row.data.carmodel,
      modcartype: row.data.cartype,
      modphonenumber: row.data.phonenumber,
      modemail: row.data.email,
      moddeliverylocation: row.data.deliverylocation,
      modpickuplocation: row.data.pickuplocation,
      moddeliverydate: row.data.deliverydate,
      modorderno: row.data.orderno,
      modmsg: row.data.msg,
      modradioValue: row.data.radioValue,
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

  hendalsearch(e) {
    const getsearch = e.target.value;
    // console.log("juhil", getsearch);

    if (getsearch) {
      // const getsearch = e.target.value;
      const searchdata = this.state.tableData.filter((item) => {
        // console.log("itdfkhnm em", item);
        return (
          item.data.firstname.toLowerCase().includes(getsearch) ||
          item.data.lastname.toLowerCase().includes(getsearch) ||
          item.data.orderno.toLowerCase().includes(getsearch) ||
          item.data.deliverylocation.toLowerCase().includes(getsearch) ||
          item.data.pickuplocation.toLowerCase().includes(getsearch) ||
          item.data.returndate.toLowerCase().includes(getsearch) ||
          // item.data.radioValue.toLowerCase().includes(getsearch) ||
          item.data.deliverydate.toLowerCase().includes(getsearch) ||
          // item.data.journeytime.toLowerCase().includes(getsearch) ||
          // item.data.carid.toLowerCase().includes(getsearch) ||
          item.data.carname.toLowerCase().includes(getsearch) ||
          item.data.status.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch)
          // item.data.time.toLowerCase().includes(getsearch)
        );
      });
      this.setState({ tableData: searchdata });
    } else {
      this.setState({ tableData: this.state.filterdatas });
    }
    this.setState({ query: getsearch });
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
      this.setState({ tableData: records, filterdatas: records });

      // console.log(records);
      localStorage.setItem("bookingcount", records.length);
    });
  }

  render() {
    return (
      <>
        <div className="main_div bokdat">
          <Row>
            <Col>
              <form action="#">
                <div className="form-input">
                  <input
                    type="search"
                    placeholder="Search..."
                    value={this.state.query}
                    onChange={(e) => {
                      // this.setState({ query: e.target.value });
                      this.hendalsearch(e);
                    }}
                  />
                  <button type="submit" className="search-btn">
                    <i className="bx bx-search"></i>
                  </button>
                </div>
              </form>
            </Col>
            {/* <Row className="d-flex align-items-center justify-content-center">
              <Col lg="10"> */}
            {/* <h1 className="heder hederbd">User Booking Information</h1> */}
            {/* <Col>
              <div className="abtn">
                <button className="addbtn" onClick={() => this.add()}>
                  <IoMdAdd className="addicon" />
                  <span>Add</span>
                </button>
              </div>
            </Col> */}
            {/* </Col>
              <Col className="d-flex justify-content-center"> */}

            {/* </Col>
            </Row> */}
            {/* //======================================================================================================== */}

            {/* <Modal
              centered
              size="lg"
              // show={this.state.isOpen}
              isOpen={this.state.modal}
              toggle={() => this.setState({ modal: false })}
              // style={{ width: "30%" }}
            >
              <ModalHeader
                toggle={() => this.setState({ modal: false })}
                className="mt-1 d-flex justify-content-center updatemodalfooter "
              >
                Edit Booking Data
              </ModalHeader>
              <ModalBody>
                <Row className="d-flex justify-content-center ">
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
                    </Col>

                    <Col lg="12">
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
                    </Col>
                  </Row>
                </Row>
              </ModalBody>
              <ModalFooter className="d-flex justify-content-center updatemodalfooter">
                <button
                  className="adddata"
                  onClick={() => {
                    this.addData();
                  }}
                >
                  Add Data
                </button>
              </ModalFooter>
            </Modal> */}

            {/* //======================================================================================================== */}
          </Row>
          <div className="table_outside">
            <Table className="t" hover>
              <thead>
                <tr>
                  {/* <th></th> */}
                  {/* <th>No.</th> */}
                  {/* <th>username</th> */}
                  <th
                    style={{
                      width: this.state.tableData?.length === 0 ? "10%" : "",
                    }}
                  >
                    Order No.
                  </th>
                  <th>Full Name</th>
                  {/* <th>Email</th> */}
                  {/* <th>Phone Number</th> */}
                  {/* <th>Car Id</th> */}
                  <th>Car Name</th>
                  <th>Starting Location</th>
                  <th>Ending Location</th>
                  <th>Departure Date</th>
                  <th>Return Date</th>
                  {/* <th>Departure Time</th> */}
                  {/* <th>Other Details</th> */}
                  {/* <th>Payment by</th> */}
                  {/* <th>Policy click</th> */}
                  <th>Booking Date</th>
                  <th>Total Payment</th>
                  <th>Status</th>
                  {/* <th>Booking Time</th> */}
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {this.state.tableData?.length !== 0 ? (
                  this.state.tableData.map((row, index) => {
                    return (
                      <tr key={index + 1}>
                        {/* <td></td> */}
                        <td>{row.data.orderno}</td>
                        <td
                          className="name1"
                          record={row.data}
                          role="button"
                          onClick={() => {
                            this.opendata(row);
                          }}
                        >
                          {row.data.firstname} {row.data.lastname}
                        </td>

                        {/* <td>{row.data.email}</td> */}
                        {/* <td>{row.data.phonenumber}</td> */}
                        {/* <td className="name1">{row.data.carid}</td> */}
                        <td className="name1">{row.data.carname}</td>
                        <td className="name1">{row.data.deliverylocation}</td>
                        <td className="name1">{row.data.pickuplocation}</td>
                        <td className="name1">{row.data.deliverydate}</td>
                        <td className="name1">{row.data.returndate}</td>
                        {/* <td className="name1">
                          {moment(row.data.journeytime, "hh:mm A").format("LT")}
                        </td> */}
                        {/* <td>{row.data.msg}</td> */}
                        {/* <td className="name1">{row.data.radioValue}</td> */}
                        {/* <td className="name1">{row.data.checkboxclick}</td> */}
                        <td className="name1">{row.data.date}</td>
                        <td className="name1">
                          <BsCurrencyRupee />
                          {row.data.carprice}
                        </td>
                        {/* <td className="name1">{row.data.time}</td> */}
                        <td>
                          <span
                            className={
                              row.data.status === "Pending"
                                ? "status pending"
                                : row.data.status === "Completed"
                                ? "status completed"
                                : row.data.status === "Process"
                                ? "status process"
                                : "status"
                            }
                          >
                            {row.data.status}
                          </span>
                        </td>
                        <td>
                          <Row className="d-flex justify-content-center">
                            <Col lg="4">
                              <EditUserContact record={row.data} />
                            </Col>
                            <Col lg="4">
                              <div className="del">
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
                  })
                ) : (
                  <div className="nodata">
                    <img className="nofoundimg" src={img} />
                    <td className="nodatafound">No Booking Found</td>
                  </div>
                )}
              </tbody>
            </Table>
          </div>
        </div>
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
            className="mt-1 d-flex justify-content-center updatemodalfooter"
          >
            <h1 className="titles">
              {this.state.modfirstname} {this.state.modlastname}'s Data
            </h1>
          </ModalHeader>
          <ModalBody>
            <Row className="d-flex justify-content-center ">
              <Row>
                <div className="detailbox">
                  <Row className="alltxt">
                    <div className="setimg">
                      <img
                        className="setimg_under"
                        src={this.state.modcarimg}
                      />
                    </div>
                  </Row>
                  <Row className="alltxt">
                    <Col lg="4" className="sameque">
                      Cae Name
                    </Col>
                    <Col lg="1" className="sameque">
                      :
                    </Col>
                    <Col lg="6" className="sameans">
                      {this.state.modcarname}
                    </Col>
                  </Row>
                  <Row className="alltxt">
                    <Col lg="4" className="sameque">
                      Cae Model
                    </Col>
                    <Col lg="1" className="sameque">
                      :
                    </Col>
                    <Col lg="6" className="sameans">
                      {this.state.modcarmodel}
                    </Col>
                  </Row>
                  <Row className="alltxt">
                    <Col lg="4" className="sameque">
                      Cae Type
                    </Col>
                    <Col lg="1" className="sameque">
                      :
                    </Col>
                    <Col lg="6" className="sameans">
                      {this.state.modcartype}
                    </Col>
                  </Row>
                  <Row className="alltxt">
                    <Col lg="4" className="sameque">
                      Email
                    </Col>
                    <Col lg="1" className="sameque">
                      :
                    </Col>
                    <Col lg="6" className="sameans">
                      {this.state.modemail}
                    </Col>
                  </Row>
                  <Row className="alltxt">
                    <Col lg="4" className="sameque">
                      Phone Number
                    </Col>
                    <Col lg="1" className="sameque">
                      :
                    </Col>
                    <Col lg="6" className="sameans">
                      {this.state.modphonenumber}
                    </Col>
                  </Row>
                  {/* <Row className="alltxt">
                    <Col lg="4" className="sameque">
                      Departure Time
                    </Col>
                    <Col lg="1" className="sameque">
                      :
                    </Col>
                    <Col lg="6" className="sameans">
                      {moment(this.state.modjourneytime, "hh:mm A").format(
                        "LT"
                      )}
                    </Col>
                  </Row> */}
                  {/* <Row className="alltxt">
                    <Col lg="4" className="sameque">
                      Total Payment
                    </Col>
                    <Col lg="1" className="sameque">
                      :
                    </Col>
                    <Col lg="6" className="sameans">
                      {this.state.modradioValue}
                    </Col>
                  </Row> */}
                  <Row className="alltxt">
                    <Col lg="4" className="sameque">
                      Booking Time
                    </Col>
                    <Col lg="1" className="sameque">
                      :
                    </Col>
                    <Col lg="6" className="sameans">
                      {this.state.modtime}
                    </Col>
                  </Row>
                  <Row className="alltxt">
                    <Col lg="4" className="sameque">
                      Other Details
                    </Col>
                    <Col lg="1" className="sameque">
                      :
                    </Col>
                    <Col lg="6" className="sameans modalmsg">
                      {this.state.modmsg}
                    </Col>
                  </Row>
                </div>
              </Row>
            </Row>
          </ModalBody>
        </Modal>
      </>
    );
  }
}
