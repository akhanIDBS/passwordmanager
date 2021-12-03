import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ApplicationCard from './components/ApplicationCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import { FaKey, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';


import axios from 'axios';
import urlstart from './urlstart'

function Dashboard() {

  const _id = "61a4df815796008158e2db5c";

  const [activeUser, setActiveUser] = React.useState({ _id: "", username: "", password: "", applications: [] });
  const [applications, setApplications] = React.useState([]);
  const [applicationName, setApplicationName] = React.useState('');
  const [alert, setAlert] = React.useState(false);
  const [deleteAlert, setDeleteAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [activePage, setActivePage] = React.useState('Passwords');

  function updateApplicationName(e) {
    setApplicationName(e.target.value);
  }


  function addApplication() {

    const data = {
      application: {
        name: applicationName,
        locked: false,
        current_password: ""
      },
      userId: activeUser._id
    };

    const url = urlstart + "/user/add-application";

    axios.post(url, data)
      .then(res => {
        setApplications(res.data.applications);
        console.log(applications);
        setApplicationName("")
        setAlert(true);
      })
      .catch(err => {
        console.log(err);
      })

  }

  useEffect(() => {

    const url = `${urlstart}/user/get-user/${_id}`;

    // Get User Applications
    axios.get(url)
      .then(response => {
        setActiveUser(response.data.user[0]);
        setApplications(response.data.user[0].applications);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      })

  }, [activeUser]);

  return (
    <Row id="dashboard-body" style={{height: '100vh', width: '100vw', margin: 0}}>
      
      <Col xs={2} md={2} style={{height: '100vh', backgroundColor: '#F7FAFA', borderRight: 'solid #7EA8AD 10px'}}>
        
        <Row style={
          {height: '15vh', display: 'flex', justifyContent: 'center', 
          alignItems: 'center', textAlign: 'center', marginBottom: '10vh'}
          }>
          <h2>PM.</h2>
        </Row>
        <Row className={activePage === 'Passwords' ? 'side-bar-icon side-bar-icon-selected' : 'side-bar-icon'} onClick={() => setActivePage('Passwords')}>
          <span><FaKey size={40} className="icon" /></span>
          <p className="light-text">Passwords</p>
        </Row>
        <Row className={activePage === 'Account' ? 'side-bar-icon side-bar-icon-selected' : 'side-bar-icon'} onClick={() => setActivePage('Account')}>
          <span><FaUserCircle size={40} className="icon" /></span>
          <p className="light-text">Account</p>
        </Row>
        <Row className={activePage === 'Logout' ? 'side-bar-icon side-bar-icon-selected' : 'side-bar-icon'} onClick={() => setActivePage('Logout')}>
          <span><FaSignOutAlt size={40} className="icon" /></span>
          <p className="light-text">Logout</p>
        </Row>

      </Col>
      

      <Col xs={10} md={10} style={{fontFamily: 'Montserrat', color: '#626363'}}>
        <Container style={{height: '100vh', paddingTop: '15vh'}}>
          {
            activePage === 'Passwords' ? (
            <>
            <div style={{width: '100%', marginBottom: '5vh'}}>
            <input 
            className="add-application-input" 
            placeholder="Application Name..." 
            style={{width: '100%'}}
            onChange={e => updateApplicationName(e)}
            value={applicationName}
            />
            <button
             className="add-application-btn"
             onClick={() => addApplication()}>Add</button>
          </div>
          <div className="application-container" style={{height: '65vh'}}>
            {
              loading ? 
              (
                <p>Loading...</p>
              )
              :
              (
                  applications.map( application => {
                    return <ApplicationCard _id={application._id} setApplications={setApplications} />
                  })
              )
            }
            </div>
          </>
            )
            :
            null
          }
          {
            activePage === 'Account' ? 
            (<p style={{textAlign: 'center'}}>User Account Details</p>) : null
          }
          {
            activePage == 'Logout' ? 
            (<p style={{textAlign: 'center'}}>Are you sure you'd like to logout</p>) : null
          }
        </Container>
      </Col>


    </Row>
  );
}

export default Dashboard;