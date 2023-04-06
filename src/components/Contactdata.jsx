import React from "react";
import { dbs } from "../Admin/userfirebase/userfirebase";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import { ref, onValue } from "firebase/database";
// import { Row, Col, Table } from "reactstrap";
import "../Style/contactdata.css";
import EditUserContact from "./EditUserContact";
import { MdDelete } from "react-icons/md";
import { ImReply } from "react-icons/im";
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
  Table,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import img from "../Images/no data found.jpg";
import swal from "sweetalert";
import { ErrorToast, SuccessToast } from "../helper/Toast";
import { json } from "react-router-dom";

export class ContactDatas extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      filterdatas: [],
      query: "",
      modal: false,
      modname: "",
      modmsg: "",
      modemail: "",
    };
  }

  getAllData(props) {
    // console.log("row", props);
    return { id: props.key };
  }

  delepop(row) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        return this.delete(row);
        // swal("Poof! Your imaginary file has been deleted!", {
        //   icon: "success",
        // });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  }

  delete(row) {
    const dbref = ref(dbs);
    // console.log("first");
    const record = this.getAllData(row);
    // console.log("record", record);
    const address = "ContactDatas/" + record.id;
    // console.log("dsf", address);
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(dbs, address));
        SuccessToast("Row Deleted Successfully");
      } else {
        ErrorToast("can't delete,user does not exists ");
      }
    });
  }

  opendata(row) {
    this.setState({
      modal: true,
      modname: row.data.yourName,
      modmsg: row.data.message,
      modemail: row.data.email,
    });
  }

  hendalsearch(e) {
    const getsearch = e.target.value;
    // console.log("juhil", getsearch);

    if (getsearch) {
      // const getsearch = e.target.value;
      const searchdata = this.state.filterdatas.filter((item) => {
        // console.log("item", item);
        return (
          item.data.yourName.toLowerCase().includes(getsearch) ||
          item.data.email.toLowerCase().includes(getsearch) ||
          // item.data.message.toLowerCase().includes(getsearch) ||
          item.data.date.toLowerCase().includes(getsearch) ||
          item.data.time.toLowerCase().includes(getsearch)
        );
      });
      this.setState({ tableData: searchdata });
    } else {
      this.setState({ tableData: this.state.filterdatas });
    }
    this.setState({ query: getsearch });
  }

  componentDidMount() {
    const dbRef = ref(dbs, "ContactDatas");
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records, filterdatas: records });
      localStorage.setItem("contactdata", records.length);
      // console.log("dubdata", { tableData: records });
    });
  }

  render() {
    return (
      <>
        <div className="main_div">
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
          {/* <h1 className="heder">User Contact Data</h1> */}
          <div className="table_outside">
            <Table className="t" hover>
              <thead>
                <tr>
                  {/* <th>No.</th> */}
                  {/* <th>username</th> */}
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {this.state.tableData?.length !== 0 ? (
                  this.state.tableData.map((row, index) => {
                    return (
                      <tr key={index + 1}>
                        {/* <td>{index + 1}</td> */}
                        {/* <td>{row.data.key}</td> */}
                        <td className="name1">{row.data.yourName}</td>
                        <td>{row.data.email}</td>
                        <td
                          className="name1 clihe"
                          record={row.data}
                          role="button"
                          onClick={() => {
                            this.opendata(row);
                          }}
                        >
                          Click here
                        </td>
                        <td className="name1">{row.data.date}</td>
                        <td className="name1">{row.data.time}</td>
                        {/* <td>
                      <EditUserContact
                        username={row.data.yourName}
                        record={row.data}
                      />
                    </td> */}
                        <td>
                          <Row className="d-flex justify-content-center">
                            <Col lg="4">
                              <Link to="/reply">
                                <ImReply
                                  // record={row.data}
                                  className="replybtn"
                                  onClick={() => {
                                    localStorage.setItem(
                                      "contactmsg",
                                      JSON.stringify(row.data)
                                    );
                                  }}
                                />
                              </Link>
                            </Col>
                            <Col lg="4">
                              <div className=" del">
                                <MdDelete
                                  // username={row.data.currenttime}
                                  // record={row.data}
                                  onClick={() => this.delepop(row)}
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
                    <td className="nodatafound">No data Found</td>
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
          isOpen={this.state.modal}
          toggle={() => this.setState({ modal: false })}
          // style={{ width: "30%" }}
        >
          <ModalHeader
            toggle={() => this.setState({ modal: false })}
            className="mt-1 d-flex justify-content-center updatemodalfooter"
          >
            <h1 className="titles">{this.state.modname}'s Message</h1>
          </ModalHeader>
          <ModalBody>
            <Row className="d-flex justify-content-center ">
              <Row>
                <div className="detailbox">
                  <Row className="alltxt">
                    <Col lg="2" className="sameque">
                      Email
                    </Col>
                    <Col lg="1" className="sameque">
                      :
                    </Col>
                    <Col lg="8" style={{ textTransform: "lowercase" }}>
                      {this.state.modemail}
                    </Col>
                  </Row>

                  <Row className="alltxt">
                    <Col lg="2" className="sameque">
                      Message
                    </Col>
                    <Col lg="1" className="sameque">
                      :
                    </Col>
                    <Col lg="8" className="sameans contmsg">
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
