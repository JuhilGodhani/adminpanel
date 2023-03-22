import React from "react";
import { dbs } from "../Admin/userfirebase/userfirebase";

// import { ref, onValue } from "firebase/database";
import { Row, Col, Table } from "reactstrap";
import "../Style/contactdata.css";

import EditUserContact from "./EditUserContact";
import { MdDelete } from "react-icons/md";
import {
  ref,
  child,
  onValue,
  set,
  get,
  update,
  remove,
} from "firebase/database";
import img from "../Images/no data found.jpg";

import { ErrorToast, SuccessToast } from "../helper/Toast";
import { json } from "react-router-dom";

export class ContactDatas extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
      filterdatas: [],
      query: "",
    };
  }

  getAllData(props) {
    // console.log("row", props);
    return { id: props.data.time };
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

  hendalsearch(e) {
    const getsearch = e.target.value;
    // console.log("juhil", getsearch);

    if (getsearch) {
      // const getsearch = e.target.value;
      const searchdata = this.state.tableData.filter((item) => {
        // console.log("item", item);
        return (
          item.data.yourName.toLowerCase().includes(getsearch) ||
          item.data.email.toLowerCase().includes(getsearch) ||
          item.data.message.toLowerCase().includes(getsearch) ||
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
                        <td className="name1 contactmsg">{row.data.message}</td>
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
                              <div className=" del">
                                <MdDelete
                                  // username={row.data.currenttime}
                                  // record={row.data}
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
                    <td className="nodatafound">No data Found</td>
                  </div>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </>
    );
  }
}
