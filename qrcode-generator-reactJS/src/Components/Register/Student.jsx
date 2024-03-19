import React, { useState } from 'react'
import "./Register.css"
import url from '../../Config';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./Teacherform.css"

function Student() {
  const navigate=useNavigate();

  const [fullName, setFullName] = useState('');
  const [icNumber, setIcNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [date, setDate] = useState('');
  const [Class, setClass] = useState('');
  const [Race, setRace] = useState('');
  const [Fathername, setFatherName] = useState('');
  const [fatherage, setFatherAge] = useState('');
  const [fatheroccupation, setFatherOccupation] = useState('');
  // const [fatherstatus, setFatherStatus] = useState('');
  const [mothername, setMotherName] = useState('');
  const [motherage, setMotherAge] = useState('');
  const [motheroccupation, setMotherOccupation] = useState('');
  // const [motherstatus, setMotherStatus] = useState('');
  const [homeaddress, setHomeAddress] = useState('');
  const [state, setState] = useState('');
  const [fatherStatus, setFatherStatus] = useState('');
  const [district, setDistrict] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [phonenumberfather, setPhoneNumberFather] = useState('');
  const [phonenumbermother, setPhoneNumberMother] = useState('');
  const [picture, setPicture] = useState('');
  const [whoami, setWhoAmI] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSchoolState, setSelectedSchoolState] = useState('');
  const [selectedSchoolDistrict, setSelectedSchoolDistrict] = useState('');
  const [password, setPassword] = useState('');
  const {eventname}=useParams();
  const [motherStatus, setMotherStatus] = useState('');
  const [Email, setEmail] = useState('');

  const handleMotherStatusChange = (e) => {
    setMotherStatus(e.target.value);
  };
  const schoolStates = ['SELANGOR', 'Kuala Lumpur'];
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
          console.log(position.coords.latitude,position.coords.longitude);
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
  // const YOUR_OFFICE_LATITUDE =12.9709819;
  // const YOUR_OFFICE_LONGITUDE =80.0423042;


  // Function to handle attendance button click
  const handleAttendanceClick = () => {
    getCurrentLocation();
    if (location) {
      const distance = calculateDistance(location.latitude, location.longitude, YOUR_OFFICE_LATITUDE, YOUR_OFFICE_LONGITUDE);
      if (distance <= 100) {
        // Handle attendance recording (e.g., send request to server)
        alert("Attendance marked successfully!");
      } else {
        //setShowAlert(true);
        alert("You are more than 500 meters away from the office.");
      }
    }
  };

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


  const handleSchoolStateChange = (selectedSchoolState) => {
    setSelectedSchoolState(selectedSchoolState);
    // Update districts based on the selected school state
    if (selectedSchoolState === 'SELANGOR') {
      setSelectedSchoolDistrict(selangorDistricts[0]); // Set default district for Selangor
    } else if (selectedSchoolState === 'Kuala Lumpur') {
      setSelectedSchoolDistrict(kualaLumpurDistricts[0]); // Set default district for Kuala Lumpur
    }
  };

  const handleSchoolDistrictChange = (selectedSchoolDistrict) => {
    setSelectedSchoolDistrict(selectedSchoolDistrict);
  };

  const handleStateChange = (selectedState) => {
    setSelectedState(selectedState);
    if (selectedState === 'SELANGOR') {
      setSelectedDistrict(selangorDistricts[0]); // Set default district for Selangor
    } else if (selectedState === 'Kuala Lumpur') {
      setSelectedDistrict(kualaLumpurDistricts[0]); // Set default district for Kuala Lumpur
    }
  };

  const handleDistrictChange = (selectedDistrict) => {
    setSelectedDistrict(selectedDistrict);
  };

  const handleFormSubmit = async(e) => {
    // Add logic to send the form data to the server or perform any other actions
    try {
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
      const nullFormData = Object.fromEntries(allFields.map((field) => [field, null]));
  
      e.preventDefault();
      const icNumberRegex = /^\d{6}-\d{2}-\d{4}$/;
      if (!icNumber.match(icNumberRegex)) {
        alert('Invalid IC number format. Use: 650423-07-5659');
        return;
      } 
      handleAttendanceClick();
      getCurrentLocation();
      if (location) {
        const distance = calculateDistance(location.latitude, location.longitude, YOUR_OFFICE_LATITUDE, YOUR_OFFICE_LONGITUDE);
        console.log(distance);
        if (distance <= 500) {
      const formData = {
        ...nullFormData,
        fullName,
        icNumber,
        dateOfBirth,
        schoolName,
        date,
        Class:selectedClass,
        Race:selectedRace,
        Fathername,
        fatherage,
        fatheroccupation,
        fatherstatus:fatherStatus,
        mothername,
        motherage,
        motheroccupation,
        motherstatus:motherStatus,
        homeaddress,
        state: selectedState,
        district: selectedDistrict,
        phonenumber,
        phonenumberfather,
        phonenumbermother,
        picture:"",
        whoami:"student",
        selectedSchoolState,
        selectedSchoolDistrict,
        password,
        Email
        
      };
      // console.log(formData);
      // let arrayofname=
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
    }
    else{
      alert("You are more than 500 meters away from the office. Cannot submit the form.");
    }
  }
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  const classOptions = [
    { label: "Select Class Type", value: "" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "STPM", value: "STPM" },
    { label: "Others", value: "Others" },
  ];  const [selectedClass, setSelectedClass] = useState('');
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };
  const [selectedRace, setSelectedRace] = useState('');

  const raceOptions = [
    { label: "Select Race Type", value: "" },
    { label: "Malay", value: "Malay" },
    { label: "Chinese", value: "Chinese" },
    { label: "Indian", value: "Indian" },
    { label: "Others", value: "Others" },
  ];

  const handleRaceChange = (e) => {
    setSelectedRace(e.target.value);
  };

  const fatherStatusOptions = [
    { label: "Select Father Status Working ?", value: "" },
    { label: "Yes-Working", value: "Yes" },
    { label: "Not Working", value: "No" },
    { label: "D - PassedAway", value: "D" },
  ];

  const handleFatherStatusChange = (e) => {
    setFatherStatus(e.target.value);
  };
  return (
    <div className='container_form'>
      <form onSubmit={handleFormSubmit} className="form-container">
        {/* Personal Information */}
        <label className="label">
          Full Name:
          <input className="input-field" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder='Enter your name'/>
        </label>
  
        <label className="label">
          IC Number:
          <input className="input-field" type="text" value={icNumber} onChange={(e) => setIcNumber(e.target.value)} required  placeholder='Enter your ic number'/>
        </label>
  
        <label className="label">
          Date of Birth:
          <input className="input-field" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required/>
        </label>
  
        <label className="label">
          School Name:
          <input className="input-field" type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required placeholder='Enter your school name'/>
        </label>
        <label className="label">
          School State:
          <select value={selectedSchoolState} onChange={(e) => handleSchoolStateChange(e.target.value)} className="input-field" required >
            <option value="">Select School State</option>
            {schoolStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>

        {/* School District Dropdown */}
        <label className="label">
          School District:
          <select
            value={selectedSchoolDistrict}
            onChange={(e) => handleSchoolDistrictChange(e.target.value)}
            className="input-field"
            required
          >
            <option value="">Select School District</option>
            {selectedSchoolState === 'SELANGOR'
              ? selangorDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : selectedSchoolState === 'Kuala Lumpur'
              ? kualaLumpurDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : null}
          </select>
        </label>

        {/* <label className="label">
          Admission Date:
          <input className="input-field" type="date" value={date} onChange={(e) => setDate(e.target.value)} required/>
        </label> */}
  
        {/* Other Information */}
        <label className="label">
          Class:
        <select value={selectedClass} onChange={handleClassChange} className="input-field" required>
          {classOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
              </label>
  
        <label className="label">
        Race:
        <select className="input-field" value={selectedRace} onChange={handleRaceChange} required>
          {raceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
  
        <label className="label">
          Father's Name:
          <input className="input-field" type="text" value={Fathername} onChange={(e) => setFatherName(e.target.value)} required placeholder='Enter your Father name'/>
        </label>
  
        <label className="label">
          Father's Age:
          <input className="input-field" type="text" value={fatherage} onChange={(e) => setFatherAge(e.target.value)} required placeholder='Enter your Father Age'/>
        </label>
  
        <label className="label">
          Father's Occupation:
          <input className="input-field" type="text" value={fatheroccupation} onChange={(e) => setFatherOccupation(e.target.value)} required placeholder='Enter your Father Occupation'/>
        </label>
        <label className="label">
        Father's Status:
        <select className="input-field" value={fatherStatus} onChange={handleFatherStatusChange} required>
          {fatherStatusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
  
        <label className="label">
          Mother's Name:
          <input className="input-field" type="text" value={mothername} onChange={(e) => setMotherName(e.target.value)} required placeholder='Enter your Mother name'/>
        </label>
  
        <label className="label">
          Mother's Age:
          <input className="input-field" type="text" value={motherage} onChange={(e) => setMotherAge(e.target.value)} required  placeholder='Enter your Mother Age'/>
        </label>
  
        <label className="label">
          Mother's Occupation:
          <input className="input-field" type="text" value={motheroccupation} onChange={(e) => setMotherOccupation(e.target.value)} required   placeholder='Enter your Mother Occupation'/>
        </label>
  
        <label className="label">
        Mother's Status:
        <select
          value={motherStatus}
          onChange={handleMotherStatusChange}
          style={{ backgroundColor: 'white', zIndex: 9999, elevation: 1000 }}
          required
          className="input-field"
        >
          <option value="" style={{ color: 'black', fontSize: 15, backgroundColor: '#f3f2f1' }}>
            Select Mother Status Working ?
          </option>
          <option value="Yes" style={{ color: 'black', fontSize: 15 }}>
            Yes-Working
          </option>
          <option value="No" style={{ color: 'black', fontSize: 15 }}>
            Not Working
          </option>
          <option value="D" style={{ color: 'black', fontSize: 15 }}>
            D - PassedAway
          </option>
        </select>
      </label>
  
        <label className="label">
          Home Address:
          <input className="input-field" type="text" value={homeaddress} onChange={(e) => setHomeAddress(e.target.value)} required  placeholder='Enter your Home Address'/>
        </label>
  
       
        <label className="label">
          Phone Number:
          <input className="input-field" type="text" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} required  placeholder='Enter your Phone Number'/>
        </label>
  
        <label className="label">
          Father's Phone Number:
          <input className="input-field" type="text" value={phonenumberfather} onChange={(e) => setPhoneNumberFather(e.target.value)} required placeholder='Enter your Father Phone Number'/>
        </label>
  
        <label className="label">
          Mother's Phone Number:
          <input className="input-field" type="text" value={phonenumbermother} onChange={(e) => setPhoneNumberMother(e.target.value)} required  placeholder='Enter your Mother Phone Number'/>
        </label>
        <label className="label">
          Email:
          <input className="input-field" type="text" value={Email} onChange={(e) => setEmail(e.target.value)} required  placeholder='Enter your Email'/>
        </label>
  
       
  
        
  
        
    
        <label className="label">
          Password:
          <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required  placeholder='Enter your Password'/>
        </label>

       

        {/* State Dropdown */}
        <label className="label">
          State:
          <select value={selectedState} className="input-field" onChange={(e) => handleStateChange(e.target.value)} required>
            <option value="">Select State</option>
            {schoolStates.map((state1) => (
              <option key={state1} value={state1}>
                {state1}
              </option>
            ))}
          </select>
        </label>

        {/* District Dropdown */}
        <label className="label">
          District:
          <select value={selectedDistrict} className="input-field" onChange={(e) => handleDistrictChange(e.target.value)} required>
          <option value="">Select School District</option>
            {selectedState === 'SELANGOR'
              ? selangorDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : selectedState === 'Kuala Lumpur'
              ? kualaLumpurDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))
              : null}
          </select>
        </label>
  
        <button type="submit" className="button">Submit</button>
      </form>
      <div>
      <button onClick={()=>navigate("/certificateLoging")} className='button'>Get Certificate</button>
    </div>
      <div className='footer'>
          <h4 className='text'>Registration of your personal data © [Copyrights_2024] ensures its security; we do not share any information with others.</h4>
      </div>
    </div>
  );
  
}

export default Student
