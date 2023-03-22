import React from "react";
import { admindbs } from "../adminfirebase/adminfirebase";
import { ref, onValue } from "firebase/database";
import { Table } from "reactstrap";
import "../Style/contactdata.css";


export class AdminRegisterData extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    const dbRef = ref(admindbs, "AdminRegisterData");

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
          <h1 className="heder">Admin Register Data</h1>
          <Table striped className="t">
            <thead>
              <tr>
                <th></th>
                <th>No.</th>
                {/* <th>username</th> */}
                <th>Name</th>
                <th>Phone number</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>

            <tbody>
              {this.state.tableData.map((row, index) => {
                return (
                  <tr key={index}>
                    <td></td>
                    <td>{index}</td>
                    <td className="name1">
                      {row.data.firstname} {row.data.lastname}
                    </td>
                    <td className="name1">{row.data.phonenumber}</td>
                    <td className="name1">{row.data.gender}</td>
                    <td className="name1">{row.data.email}</td>
                    <td className="name1">{row.data.password}</td>
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
