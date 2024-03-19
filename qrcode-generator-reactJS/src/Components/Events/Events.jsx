import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Events.css'; // Import the custom styles
import url from '../../Config';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${url}/events/allevents`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleOn = async (eventId) => {
    console.log(`clicked on`);
    try {
      const response = await axios.get(`${url}/candistributeOn/${eventId}`);
      alert(response.data.message);
    } catch (error) {
      console.error('Error turning on certificate:', error);
    }
  };

  const handleOff = async (eventId) => {
    try {
      const response = await axios.get(`${url}/candistributeOff/${eventId}`);
      alert(response.data.message);
    } catch (error) {
      console.error('Error turning off certificate:', error);
    }
  };

  return (
    <div className='events-container'>
      <div className='events-top'>
        <div className='events-head'>
          <h1 className='events-heading'>EVENTS</h1>
        </div>
        <Link to='/createevent'><button className='event-btn'>Add Event</button></Link>
      </div>
      <div className='events-bottom'>
        {events.map(event => (
          <div key={event.eventId} className='event-card'>
            <h2 className='event-name'>{event.eventName}</h2>
            <p className='event-details'>
              <strong className='detail-label'>Description:</strong> {event.eventDescription}<br />
              <strong className='detail-label'>Timing:</strong> {event.eventTiming}<br />
              <strong className='detail-label'>Day:</strong> {event.eventDay}<br />
              <strong className='detail-label'>Location:</strong> {event.eventLocation}
            </p>
            <div className="button-group">
              <Link to={`/qrcode/${event.eventName}/:Others`} className="link">
                <button className='generate-qr-btn'>Generate QR Code Others</button>
              </Link>
              <Link to={`/qrcode/${event.eventName}/:Teacher`} className="link">
                <button className='generate-qr-btn'>Generate QR Code for Teacher</button>
              </Link>
              <Link to={`/qrcode/${event.eventName}/:Student`} className="link">
                <button className='generate-qr-btn'>Generate QR Code for Student</button>
              </Link>
              <Link to={`/attendance/${event.eventName}`}>
                <button className='attendance-btn'>Get Attendance</button>
              </Link>
              <div className='btn_grp'>
                <button className='on-certificate-btn' onClick={() => handleOn(event.eventId)}>On Certificate</button>
                <button className='off-certificate-btn' onClick={() => handleOff(event.eventId)}>Off Certificate</button>

              </div>  
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
