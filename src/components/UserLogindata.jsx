import React from "react";
import { dbs } from "../Admin/userfirebase/userfirebase";

// import { ref, onValue } from "firebase/database";
import { Row, Col, Table } from "reactstrap";
import "../Style/contactdata.css";

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
import { ErrorToast, SuccessToast } from "../helper/Toast";

export class UserLogindata extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
    };
  }

  getAllData(props) {
    console.log("row", props);
    return { id: props.data.time };
  }

  delete(row) {
    const dbref = ref(dbs);
    // console.log("first");
    const record = this.getAllData(row);
    // console.log("record", record);
    const address = "UserLoginData/" + record.id;
    // console.log("dsf", address);
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(dbs, address));
      } else {
        ErrorToast("can't delete,user does not exists ");
      }
    });
  }

  componentDidMount() {
    const dbRef = ref(dbs, "UserLoginData");

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });
      localStorage.setItem("logincountdata", records.length);
    });
  }

  render() {
    return (
      <>
        <div className="main_div">
          {/* <h1 className="heder">User Login History</h1> */}
          <div className="table_outside">
            <Table className="t" hover>
              <thead>
                <tr>
                  {/* <th>No.</th> */}
                  {/* <th>username</th> */}
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Signed In</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {this.state.tableData.map((row, index) => {
                  return (
                    <tr key={index + 1}>
                      {/* <td>{index + 1}</td>   */}
                      <td className="name1">{row.data.username}</td>
                      <td>{row.data.email}</td>
                      <td>{row.data.password}</td>
                      <td className="name1">{row.data.date}</td>
                      <td className="name1">{row.data.time}</td>
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
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </>
    );
  }
}
