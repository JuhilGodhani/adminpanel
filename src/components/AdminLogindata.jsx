import React from "react";
import { admindbs } from "../Admin/adminfirebase/adminfirebase";
// import { ref, onValue } from "firebase/database";
import { Row, Col, Table } from "reactstrap";
import { MdDelete } from "react-icons/md";
import "../Style/contactdata.css";
import {
  ref,
  child,
  onValue,
  set,
  get,
  update,
  remove,
} from "firebase/database";
// import { dbs } from "../userfirebase/userfirebase";
// import { admindbs } from "../adminfirebase/adminfirebase";
import { ErrorToast, SuccessToast } from "../helper/Toast";

export class AdminLogindata extends React.Component {
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
    const dbref = ref(admindbs);
    // console.log("first");
    const record = this.getAllData(row);
    // console.log("record", record);
    const address = "AdminLoginData/" + record.id;
    // console.log("dsf", address);
    get(child(dbref, address)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(admindbs, address));
      } else {
        ErrorToast("can't delete,user does not exists ");
      }
    });
  }
  componentDidMount() {
    const dbRef = ref(admindbs, "AdminLoginData");

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });
    });
  }

  render() {
    return (
      <>
        <div className="main_div">
          {/* <h1 className="heder">Admin Login History</h1> */}
          <div className="table_outside">
            <Table className="t" hover>
              <thead>
                <tr>
                  {/* <th>No.</th> */}
                  {/* <th>username</th> */}
                  <th>USer Name</th>
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
                      {/* <td>{index + 1}</td> */}
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
