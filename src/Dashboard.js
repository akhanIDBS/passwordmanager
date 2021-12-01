import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import ApplicationCard from './components/ApplicationCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col } from 'react-bootstrap';
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
        setApplications(activeUser.applications);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      })

  }, [activeUser]);

  return (
    <div class="dashboard-body">
      <div class="header-nav">
        <div class="logo">P</div>
        <div class="title">Password Manager</div>
        <div class="logout">Logout</div>
      </div>
      <div class="dashboard-container">
        <div class="dashboard">
          {
            loading ? (
              <p>Loading...</p>
            )
              :
              (
                <>
                  <form>
                    <div class="row" style={{ marginTop: "5vh" }}>
                      <div class="col">
                        <label htmlFor="app-name"><b>Application Name</b></label>
                        <div style={{ display: "flex" }}>
                          <input id="app-name" class="input" onChange={e => updateApplicationName(e)} value={applicationName}></input>
                          <div className="search-btn" onClick={() => addApplication()}>Add</div>
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
                        {
                          deleteAlert ? 
                          (<div class="mt-3 alert alert-warning d-flex justify-content-between" role="alert">
                              <p>Successfully Deleted Application</p>
                              <p id="dismiss" onClick={() => setDeleteAlert(false)}>X</p>
                            </div>
                          )
                          :
                          (<></>)
                        }
                      </div>
                    </div>
                  </form>
                  <div class="app-container">
                    {applications.map(passwordSection => {
                      return (
                        <ApplicationCard
                          _id={passwordSection._id}
                          setApplications={setApplications}
                          setDeleteAlert={setDeleteAlert}
                        />
                      );
                    })}
                  </div>
                </>
              )
          }
        </div>
      </div>
    </div>
  );
}

export default Dashboard;