import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Attendance.css';
import url from '../../Config';
const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const { eventName } = useParams();

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      let chararray = eventName.split(" ");
      let ans = "";
      for (let i = 0; i < chararray.length; i++) {
        ans += chararray[i];
      }

      // Fetch attendance data from the server based on the event name
      const response = await axios.get(`${url}/attendance/${ans}`);

      setAttendance(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  return (
    <div className="attendance-container">
      <h1>{eventName}</h1>
      <h1 className="attendance-heading">Attendance</h1>

      <div className="attendance-tables">
        <div className="table">
          <h2>Others</h2>
          <table>
            <thead>
              <tr>
                <th>Attendance ID</th>
                <th>User Full Name</th>
                <th>State</th>
                <th>District</th>
                <th>Phone Number</th>
                <th>ParentOrVisitor</th>
                <th>Occupation</th>
                <th>Email</th>
                <th>Ic Number</th>
              </tr>
            </thead>
            <tbody>
              {attendance.others &&
                attendance.others.map((entry) => (
                  <tr key={entry.id} className="attendance-row">
                    <td>{entry.id}</td>
                    <td>{entry.fullName}</td>
                    <td>{entry.state}</td>
                    <td>{entry.district}</td>
                    <td>{entry.phonenumber}</td>
                    <td>{entry.ParentOrVisitor}</td>
                    <td>{entry.Occupation}</td>
                    <td>{entry.Email}</td>
                    <td>{entry.icNumber}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="table">
          <h2>Students</h2>
          <table>
          <thead>
            <tr>
              <th>Attendance ID</th>
              <th>User Full Name</th>
              <th>School Name</th>
              <th>State</th>
              <th>District</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Class</th>
              <th>Race</th>
              <th>Father's Name</th>
              <th>Father's Age</th>
              <th>Father's Occupation</th>
              <th>Father's Status</th>
              <th>Mother's Name</th>
              <th>Mother's Age</th>
              <th>Mother's Occupation</th>
              <th>Mother's Status</th>
              <th>Home Address</th>
              <th>selectedSchoolDistrict</th>
              <th>selectedSchoolState</th>
              <th>phonenumberfather</th>
              <th>phonenumbermother</th>
              <th>icNumber</th>
              <th>Email</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {attendance.students &&
              attendance.students.map((entry) => (
                <tr key={entry.id} className="attendance-row">
                  <td>{entry.id}</td>
                  <td>{entry.fullName}</td>
                  <td>{entry.schoolName}</td>
                  <td>{entry.state}</td>
                  <td>{entry.district}</td>
                  <td>{entry.phonenumber}</td>
                  <td>{entry.dateOfBirth}</td>
                  <td>{entry.Class}</td>
                  <td>{entry.Race}</td>
                  <td>{entry.Fathername}</td>
                  <td>{entry.fatherage}</td>
                  <td>{entry.fatheroccupation}</td>
                  <td>{entry.fatherstatus}</td>
                  <td>{entry.mothername}</td>
                  <td>{entry.motherage}</td>
                  <td>{entry.motheroccupation}</td>
                  <td>{entry.motherstatus}</td>
                  <td>{entry.homeaddress}</td>
                  <td>{entry.selectedSchoolDistrict}</td>
                  <td>{entry.selectedSchoolState}</td>
                  <td>{entry.phonenumberfather}</td>
                  <td>{entry.phonenumbermother
}</td>
                  <td>{entry.icNumber
}</td>
                  <td>{entry.Email
}</td>
                  {/* Add more data cells as needed */}
                </tr>
              ))}
          </tbody>
        </table>
        </div>

        <div className="table">
          <h2>Teachers</h2>
          <table>
            <thead>
              <tr>
                <th>Attendance ID</th>
                <th>User Full Name</th>
                <th>School Name</th>
                <th>State</th>
                <th>District</th>
                <th>Phone Number</th>
                <th>IcNumber</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {attendance.students &&
                attendance.teachers.map((entry) => (
                  <tr key={entry.id} className="attendance-row">
                    <td>{entry.id}</td>
                    <td>{entry.fullName}</td>
                    <td>{entry.schoolName}</td>
                    <td>{entry.state}</td>
                    <td>{entry.district}</td>
                    <td>{entry.phonenumber}</td>
                    <td>{entry.icNumber}</td>
                    <td>{entry.Email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
