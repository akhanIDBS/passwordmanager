import React, { useState, useEffect } from 'react';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Password from '../objects/Password';
import user from '../testdata/testusers';
import { Button, Form, Row, Col } from 'react-bootstrap';

function ApplicationCard(props) {

    var DateDiff = {
        
        inSeconds: function(d1, d2){
            var t2 = d2.getTime();
            var t1 = d1.getTime();
            
            return parseInt((((t2-t1)/(24*3600*1000)%1*24)%1*60)%1*60);
        },

        inMinutes: function(d1, d2){
            var t2 = d2.getTime();
            var t1 = d1.getTime();
            
            return parseInt(((t2-t1)/(24*3600*1000)%1*24)%1*60);
        },

        inHours: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();
            
            return parseInt((t2-t1)/(24*3600*1000)%1*24);
        },

        inDays: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();
            
            return parseInt((t2-t1)/(24*3600*1000));
        },
     
        inWeeks: function(d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();
     
            return parseInt((t2-t1)/(24*3600*1000*7));
        },
     
        inMonths: function(d1, d2) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();
     
            return (d2M+12*d2Y)-(d1M+12*d1Y);
        },
     
        inYears: function(d1, d2) {
            return d2.getFullYear()-d1.getFullYear();
        }

    }

    const [remaingHours, setRemaingHours] = React.useState(null);
    const [remainingDays, setRemainingDays] = React.useState(null);
    const [remainingMinutes, setRemainingMinutes] = React.useState(null);
    const [remainingSeconds, setRemainingSeconds] = React.useState(null);

    function unlockPassword() {
        props.passwordDetails.locked = false;
        setPassword(props.passwordDetails.password);
    }

    useEffect(() => {

        const intervalId = setInterval( () => {
            if (props.passwordDetails.locked) {

                let unlockDate = new Date(props.passwordDetails.unlock_date);
                
                setRemainingDays(DateDiff.inDays(new Date(), unlockDate));
                setRemaingHours(DateDiff.inHours(new Date(), unlockDate));
                setRemainingMinutes(DateDiff.inMinutes(new Date(), unlockDate));
                setRemainingSeconds(DateDiff.inSeconds(new Date(), unlockDate));

                if (remainingDays <= 0 && remaingHours <= 0 && remainingMinutes <= 0 && remainingSeconds <= 0) {
                    unlockPassword();
                }
    
            }
        }, 1000)
        
        return () => clearInterval(intervalId);

    }, [useState]);


    const [activeUser, setActiveUser] = React.useState(user);
    const [password, setPassword] = React.useState('');

    function generateNewPassword() {
        let newPassword = Password.generate(16);
        setPassword(newPassword);
    }

    function lockPassword() {
        const currentDate = new Date();
        const lockDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
        const unlockDate = new Date(lockDate.getFullYear(), lockDate.getMonth(), lockDate.getDate() + 7, lockDate.getHours(), lockDate.getMinutes(), lockDate.getSeconds());

    }


    return (
        <div className="application-card">
            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{props.passwordDetails.application_name}</p>
            {
                props.passwordDetails.locked ?
                    (
                        <>
                            <div style={{ display: "flex" }}>
                                <label htmlFor="app-password-locked" style={{ marginTop: '0.5vh', marginRight: '10px' }}>Password: </label>
                                <div id="app-password=locked" class="input-locked no-margin"></div>
                            </div>
                            <div className="password-btns" style={{ display: "flex", fontWeight: '200' }}>
                                This password is locked for {remainingDays} days, {remaingHours} hours, {remainingMinutes} minutes, {remainingSeconds} seconds left.
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <div style={{ display: "flex" }}>
                                <label htmlFor="app-password" style={{ marginTop: '0.5vh', marginRight: '10px' }}>Password: </label>
                                <div id="app-password" class="input white no-margin"><p style={{ color: 'black', marginTop: '0.3vh' }}>{password}</p></div>
                            </div>
                            <div className="password-btns" style={{ display: "flex" }}>
                                <div className="cute-btn green" onClick={() => generateNewPassword()}>
                                    <p>Generate New Password</p>
                                </div>
                                <div className="cute-btn purple" onClick={() => lockPassword()}>
                                    <p>Lock</p>
                                </div>
                                <div className="cute-btn red">
                                    <p>Delete</p>
                                </div>
                            </div>
                        </>
                    )
            }
        </div>
    );
}

export default ApplicationCard;