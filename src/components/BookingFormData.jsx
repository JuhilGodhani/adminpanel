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
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import moment from "moment/moment";

export class UserBookingFormdata extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      filterdatas: [],
      usersele: "",
      query: "",
      modal: false,
      modal1: false,

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

  handleSele(event) {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({ usersele: value });

    if (value === "Pending") {
      const scartype = this.state.filterdatas.filter((row) => {
        if (row.data.status === "Pending") {
          return row;
        }
      });
      this.setState({ tableData: scartype });
    } else if (value === "Completed") {
      const scartype = this.state.filterdatas.filter((row) => {
        if (row.data.status === "Completed") {
          return row;
        }
      });
      this.setState({ tableData: scartype });
    } else if (value === "Process") {
      const scartype = this.state.filterdatas.filter((row) => {
        if (row.data.status === "Process") {
          return row;
        }
      });
      this.setState({ tableData: scartype });
    } else if (value === "none") {
      const scartype = this.state.filterdatas.filter((row) => {
        this.setState({ usersele: "" });
        return row;
      });
      this.setState({ tableData: scartype });
    }
  }
  getAllData(props) {
    return {
      id: props.key,
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
    const record = this.getAllData(row);
    const address = "BookingData/" + record.id;
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
  }
  addData() {
    const dbref = ref(dbs);
    const record = this.getAllData1();
    const address = "BookingData/" + record.id;
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

  hendalsearch(e) {
    console.log("this.filterdatas :>> ", this.state.filterdatas);
    console.log("this.tableData :>> ", this.state.tableData);
    const getsearch = e.target.value;

    let data = this.state?.filterdatas?.filter((item) => {
      if (item?.data?.status === this.state.usersele) {
        return item;
      }
    });
    console.log("data :>> ", data);
    if (data.length === 0) {
      if (getsearch) {
        const searchdata = this.state?.filterdatas.filter((item) => {
          return (
            item.data.firstname.toLowerCase().includes(getsearch) ||
            item.data.lastname.toLowerCase().includes(getsearch) ||
            item.data.orderno.toLowerCase().includes(getsearch) ||
            item.data.deliverylocation.toLowerCase().includes(getsearch) ||
            item.data.pickuplocation.toLowerCase().includes(getsearch) ||
            item.data.returndate.toLowerCase().includes(getsearch) ||
            item.data.deliverydate.toLowerCase().includes(getsearch) ||
            String(item?.data?.carprice)?.includes(getsearch) ||
            item.data.carname.toLowerCase().includes(getsearch) ||
            item.data.status.toLowerCase().includes(getsearch) ||
            item.data.date.toLowerCase().includes(getsearch)
          );
        });
        this.setState({ tableData: searchdata });
        console.log("object juhil:>> ", this.state.usersele);
      }
      this.setState({ query: getsearch });
    } else {
      if (getsearch) {
        const searchdata = data.filter((item) => {
          return (
            item.data.firstname.toLowerCase().includes(getsearch) ||
            item.data.lastname.toLowerCase().includes(getsearch) ||
            item.data.orderno.toLowerCase().includes(getsearch) ||
            item.data.deliverylocation.toLowerCase().includes(getsearch) ||
            item.data.pickuplocation.toLowerCase().includes(getsearch) ||
            item.data.returndate.toLowerCase().includes(getsearch) ||
            item.data.deliverydate.toLowerCase().includes(getsearch) ||
            String(item?.data?.carprice)?.includes(getsearch) ||
            item.data.carname.toLowerCase().includes(getsearch) ||
            item.data.status.toLowerCase().includes(getsearch) ||
            item.data.date.toLowerCase().includes(getsearch)
          );
        });
        this.setState({ tableData: searchdata });
      } else {
        this.setState({ tableData: data });
      }
      this.setState({ query: getsearch });
    }
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
      this.setState({
        tableData: records,
        filterdatas: records,
      });

      localStorage.setItem("bookingcount", records.length);
    });
  }

  render() {
    console.log("tableData :>> ", this.state.tableData);
    return (
      <>
        <div className="main_div bokdat">
          <Row
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Col>
              <form action="#" style={{ marginBottom: "0px" }}>
                <div className="form-input">
                  <input
                    type="search"
                    placeholder="Search..."
                    value={this.state.query}
                    onChange={(e) => {
                      this.hendalsearch(e);
                    }}
                  />
                  <button type="submit" className="search-btn">
                    <i className="bx bx-search"></i>
                  </button>
                </div>
              </form>
            </Col>
            <Col>
              <FormControl className="selectitem" style={{ width: "50%" }}>
                <InputLabel
                  id="demo-simple-select-helper-label"
                  style={{ color: "var(--dark)" }}
                >
                  Status
                </InputLabel>
                <Select
                  className="selectitem cartype"
                  value={this.state.usersele}
                  name="status"
                  label="status"
                  onChange={(e) => {
                    this.handleSele(e);
                  }}
                  style={{ padding: 27, color: "var(--dark)" }}
                >
                  <MenuItem value="none">None of these</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Process">Process</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col></Col>
          </Row>
          <div className="table_outside">
            <Table className="t" hover>
              <thead>
                <tr>
                  <th
                    style={{
                      width: this.state.tableData?.length === 0 ? "10%" : "",
                    }}
                  >
                    Order No.
                  </th>
                  <th>Full Name</th>

                  <th>Car Name</th>
                  <th>Starting Location</th>
                  <th>Ending Location</th>
                  <th>Departure Date</th>
                  <th>Return Date</th>

                  <th>Booking Date</th>
                  <th>Total Payment</th>
                  <th>Status</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {this.state.tableData?.length !== 0 ? (
                  this.state.tableData.map((row, index) => {
                    return (
                      <tr key={index + 1}>
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

                        <td className="name1">{row.data.carname}</td>
                        <td className="name1">{row.data.deliverylocation}</td>
                        <td className="name1">{row.data.pickuplocation}</td>
                        <td className="name1">{row.data.deliverydate}</td>
                        <td className="name1">{row.data.returndate}</td>

                        <td className="name1">{row.data.date}</td>
                        <td className="name1">
                          <BsCurrencyRupee />
                          {row.data.carprice}
                        </td>

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
                              <EditUserContact record={row} />
                            </Col>
                            <Col lg="4">
                              <div className="del">
                                <MdDelete
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
          isOpen={this.state.modal1}
          toggle={() => this.setState({ modal1: false })}
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
                      Car Name
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
                      Car Model
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
                      Car Type
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
