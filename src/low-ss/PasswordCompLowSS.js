import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import ApplicationCardSS from './ApplicationCardSS'
import axios from 'axios';
import urlstart from '../urlstart';

function PasswordCompLowSS(props) {

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

  }, []);

    return (
        <div style={{width: '100%'}}>
            <Container style={{marginTop: '5vh', display: 'flex', justifyContent: 'center', flexDirection: 'column', fontFamily: 'Montserrat'}}>
                <div style={{marginBottom: '5vh'}}>
                    <p style={{lineHeight: 0.8, fontWeight: '400', fontSize: '0.8rem'}}>Enter Application Name</p>
                    <input onChange={e => updateApplicationName(e)} value={applicationName} className="low-ss-input"></input>
                    <button className="low-ss-add-btn" onClick={() => addApplication()}>Add</button>
                </div> 
                
                <div style={{height: '50vh'}} className='app-container-ss'>
                    {
                        applications.map( application => {
                            return <ApplicationCardSS key={application._id} _id={application._id} setApplications={setApplications} />
                        })
                    }
                </div>
            </Container>
        </div>
    )
}

export default PasswordCompLowSS
