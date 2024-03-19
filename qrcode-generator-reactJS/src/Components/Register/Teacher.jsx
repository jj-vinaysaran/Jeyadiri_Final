import React, { useState } from 'react';
import "./Register.css"; // You can add your custom styles here
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import url from '../../Config';
import "./Teacherform.css"

function Teacher() {
  const [fullName, setFullName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [phonenumber, setContactNumber] = useState('');
  
  const [state, setstate] = useState('');
  const [district, setDistrict] = useState('');
  const {eventname}=useParams();
  const schoolStates = ['SELANGOR', 'Kuala Lumpur'];
  const [password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const navigate=useNavigate();

  const selangorDistricts = [
    'Sabak Bernam',
    'Hulu Selangor',
    'Kuala Selangor',
    'Gombak',
    'Petaling Jaya',
    'Klang',
    'Hulu Langat',
    'Sepang',
    'Kuala Langat',
  ];

  const kualaLumpurDistricts = [
    'Kepong',
    'Batu',
    'Wangsa Maju',
    'Setiawangsa',
    'Titiwangsa',
    'Segambut',
    'Bukit Bintang',
    'Lembah Pantai',
    'Cheras',
    'Bandar Tun Razak',
    'Seputih',
  ];
  const [location, setLocation] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Function to get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Function to calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  };

  const YOUR_OFFICE_LATITUDE =12.968154202937821;
  const YOUR_OFFICE_LONGITUDE =77.65520916404631;

  

  const handleSchoolStateChange = (state) => {
    setstate(state);
    // Update districts based on the selected school state
    if (state === 'SELANGOR') {
      setDistrict(selangorDistricts[0]); // Set default district for Selangor
    } else if (state === 'Kuala Lumpur') {
      setDistrict(kualaLumpurDistricts[0]); // Set default district for Kuala Lumpur
    }
  };

  const handleSchoolDistrictChange = (district) => {
    setDistrict(district);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Define all possible fields
      const allFields = [
        'fullName',
        'icNumber',
        'dateOfBirth',
        'schoolName',
        'date',
        'Class',
        'Race',
        'Fathername',
        'fatherage',
        'fatheroccupation',
        'fatherstatus',
        'mothername',
        'motherage',
        'motheroccupation',
        'motherstatus',
        'homeaddress',
        'state',
        'district',
        'phonenumber',
        'phonenumberfather',
        'phonenumbermother',
        'picture',
        'whoami',
        'selectedSchoolState',
        'selectedSchoolDistrict',
        'password',
        'ParentOrVisitor',
        'Occupation',
        'Email'
      ];
  
      // Create an object with all fields set to null
      const nullFormData = Object.fromEntries(allFields.map((field) => [field, null]));
      const icNumberRegex = /^\d{6}-\d{2}-\d{4}$/;
      if (!icNumber.match(icNumberRegex)) {
        alert('Error', 'Invalid IC number format. Use: 650423-07-5659');
        return;
      }
      getCurrentLocation();
      if (location) {
        const distance = calculateDistance(location.latitude, location.longitude, YOUR_OFFICE_LATITUDE, YOUR_OFFICE_LONGITUDE);
        console.log(distance);
        if (distance <= 500) {
      // Update the nullFormData with the provided data
      const formData = {
        ...nullFormData,
        fullName,
        icNumber,
        schoolName,
        phonenumber,
        state,
        district,
        whoami:"teacher",
        password,
        Email
      };
  
      // console.log(formData);
  
      const response = await axios.post(`${url}/post/${eventname}`, formData);
  
      // Handle the response from the server if needed
      // console.log(response.data);
      if(response.status==201)
      {
        alert("Thank you for Registering ! you may leave the site now")
          navigate("/certificateLoging")
      }
      else{
        
        alert("Some Error Occured")
      }
    }else{
      alert("You are more than 500 meters away from the office. Cannot submit the form.");
    }
  }
    } catch (err) {
      // Handle errors
      // console.error(err);
      alert(err.response.data.error);

    }
  };
  

  return (
    <div className='container_form'>
    <h1 className="h1">{eventname}</h1>
    <form className="form-container" onSubmit={handleFormSubmit}>
      {/* Teacher Information */}
      <label className="label">
        Full Name:
        <input className="input-field" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}  required/>
      </label>

      <label className="label">
        IC Number:
        <input className="input-field" type="text" value={icNumber} onChange={(e) => setIcNumber(e.target.value)}  required/>
      </label>

      <label className="label">
        Name of School:
        <input className="input-field" type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required />
      </label>
      <label className="label">
        Contact number:
        <input className="input-field" type="text" value={phonenumber} onChange={(e) => setContactNumber(e.target.value)}  required/>
      </label>

     
      <label>
          School State:
          <select value={state} onChange={(e) => handleSchoolStateChange(e.target.value)} className="input-field" required>
            <option value="">Select School State</option>
            {schoolStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>

        {/* School District Dropdown */}
        <label>
          School District:
          <select
            value={district}
            onChange={(e) => handleSchoolDistrictChange(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select School District</option>
            {state === 'SELANGOR'
              ? selangorDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : state === 'Kuala Lumpur'
              ? kualaLumpurDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : null}
          </select>
        </label>
        <label className="label">
          Email:
          <input className="input-field" type="text" value={Email} onChange={(e) => setEmail(e.target.value)}  required/>
        </label>
      <label className="label">
        Password:
        <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>

      <button className="button" type="submit">Submit</button>
    </form>
    <div>
      <button onClick={()=>navigate("/certificateLoging")} className='button'>Get Certificate</button>
    </div>
    <div className='footer'>
      <h4 className='text'>Registration of your personal data © [Copyrights_2024] ensures its security.we do not share any information with others.</h4>
    </div>
  </div>
  );
}

export default Teacher;
