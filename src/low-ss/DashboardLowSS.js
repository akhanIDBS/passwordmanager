import React, {useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa'
import PasswordCompLowSS from './PasswordCompLowSS'
import axios from 'axios'
import urlstart from '../urlstart'

function DashboardLowSS() {

  const [activeMenu, setActiveMenu] = React.useState(false)

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <div style={{
                height: '8vh', width: '100%',
                backgroundColor: '#F7FAFA', display: 'flex',
                flexDirection: 'row', justifyContent: 'space-between',
                padding: '5px 20px', alignItems: 'flex-end', fontFamily: 'Montserrat'
            }}>
                <div>
                    <p onClick={() => setActiveMenu(true)}><FaBars /></p>
                    <div className={activeMenu ? 'menu menu-open' : 'menu'} >
                        <div className="menu-container">
                        <p style={{textAlign: 'right', color: 'white'}} onClick={() => setActiveMenu(false)}>X</p>
                        <p>Passwords</p>
                        <p>Account</p>
                        <p>Logout</p>
                        </div>
                    </div>
                </div>
                <p>PM.</p>
                <p></p>
            </div>
            <div>
                <PasswordCompLowSS />
            </div>
        </div>
    )
}

export default DashboardLowSS
