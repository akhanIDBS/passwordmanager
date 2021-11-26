import React, { useState } from 'react';
import './Dashboard.css';
import ApplicationCard from './components/ApplicationCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
import user from './testdata/testusers';

function Dashboard() {

  const [activeUser, setActiveUser] = React.useState(user[0]);
  const [passwords, setPasswords] = React.useState(activeUser.passwords);
  const [applicationName, setApplicationName] = React.useState('');
  const [alert, setAlert] = React.useState(false);

  function updateApplicationName(e) {
    setApplicationName(e.target.value);
  }


  function addPassword() {
    let current = [...passwords];
    current.push({
      "_id": 3,
      "application_name": applicationName,
      "locked": false,
    })
    setApplicationName("")
    setPasswords(current);
    setAlert(true);
  }

  return (
    <div class="dashboard-body">
        <div class="header-nav">
          <div class="logo">P</div>
          <div class="title">Password Manager</div>
          <div class="logout">Logout</div>
        </div>
        <div class="dashboard-container">
            <div class="dashboard">
              <form>
              <div class="row" style={{marginTop: "5vh"}}>
                <div class="col">
                  <label htmlFor="app-name"><b>Application Name</b></label>
                  <div style={{display: "flex"}}>
                    <input id="app-name" class="input" onChange={e => updateApplicationName(e)} value={applicationName}></input>
                    <div className="search-btn" onClick={() => addPassword()}>Add</div>
                  </div>
                  {
                    alert ? 
                    (<div class="mt-3 alert alert-success d-flex justify-content-between" role="alert">
                    <p>Successfully Added Application</p>
                    <p id="dismiss" onClick={() => setAlert(false)}>X</p>
                  </div>) 
                  : 
                  (<></>)
                  }
                </div>
              </div>
              </form>
              <div class="app-container">
                { passwords.map( passwordSection => {
                  return (
                  <ApplicationCard passwordDetails={passwordSection} />
                  );
                })}
              </div>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;