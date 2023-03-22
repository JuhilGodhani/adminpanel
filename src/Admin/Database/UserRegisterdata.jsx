import React from "react";
import { dbs } from "../userfirebase/userfirebase";
// import { ref, onValue } from "firebase/database";
import { Row, Table } from "reactstrap";
import "../../style/contactdata.css";
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
import { ErrorToast } from "../../helper/Toast";

export className RegisterData extends React.Component {
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
    const address = "UserRegisterData/" + record.id;
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
    const dbRef = ref(dbs, "UserRegisterData");

    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapShot) => {
        let keyName = childSnapShot.key;
        let data = childSnapShot.val();
        records.push({ key: keyName, data: data });
      });
      this.setState({ tableData: records });
      localStorage.setItem("registercountdata", records.length);
    });
  }

  render() {
    return (
      <>
        <div classNameName="main_div">
          <h1 classNameName="heder">User Register History</h1>
          <Table striped classNameName="t">
            <thead>
              <tr>
                <th>No.</th>
                {/* <th>username</th> */}
                <th>Name</th>
                <th>Phone number</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Password</th>
                <th>Created</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.tableData.map((row, index) => {
                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td classNameName="name1">
                      {row.data.firstname} {row.data.lastname}
                    </td>
                    <td classNameName="name1">{row.data.phonenumber}</td>
                    <td>{row.data.gender}</td>
                    <td>{row.data.email}</td>
                    <td>{row.data.password}</td>
                    <td classNameName="name1">{row.data.date}</td>
                    <td classNameName="name1">{row.data.time}</td>
                    <td>
                      <Row classNameName="d-flex justify-content-center">
                        <div classNameName=" del">
                          <MdDelete
                            // username={row.data.currenttime}
                            // record={row.data}
                            onClick={() => this.delete(row)}
                          />
                        </div>
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
