import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaMagic, FaLock, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios';
import urlstart from '../urlstart';
import Password from '../objects/Password';

function ApplicationCardSS(props) {

    const userId = "61a4df815796008158e2db5c";
    const [passwordDetails, setPasswordDetails] =

        React.useState({
            locked: true,
            current_password: '',
            unlock_date: '',
            name: '',
            _id: ''
        });

    const [loading, setLoading] = React.useState(true);

    useEffect(() => {

        if (loading) {
            const url = urlstart + `/user/get-application/${props._id}/${userId}`
            axios.get(url)
                .then(response => {
                    setPasswordDetails(response.data.result);
                    setLoading(false);
                })
                .catch(err => {
                    console.log("There was an error");
                });
        }

        const intervalId = setInterval(() => {

            if (passwordDetails.locked && !loading) {

                let unlockDate = new Date(passwordDetails.unlock_date);

                setRemainingDays(DateDiff.inDays(new Date(), unlockDate));
                let _remainingDays = DateDiff.inDays(new Date(), unlockDate);

                setRemaingHours(DateDiff.inHours(new Date(), unlockDate));
                let _remainingHours = DateDiff.inHours(new Date(), unlockDate);

                setRemainingMinutes(DateDiff.inMinutes(new Date(), unlockDate));
                let _remainingMinutes = DateDiff.inMinutes(new Date(), unlockDate);

                setRemainingSeconds(DateDiff.inSeconds(new Date(), unlockDate));
                let _remainingSeconds = DateDiff.inSeconds(new Date(), unlockDate);

                if (_remainingDays <= 0 && _remainingHours <= 0 && _remainingMinutes <= 0 && _remainingSeconds <= 0) {
                    console.log("Unlocking password");
                    unlockPassword();
                }

            }
        }, 1000)

        return () => clearInterval(intervalId);

    }, [useState, passwordDetails]);

    var DateDiff = {

        inSeconds: function (d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((((t2 - t1) / (24 * 3600 * 1000) % 1 * 24) % 1 * 60) % 1 * 60);
        },

        inMinutes: function (d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt(((t2 - t1) / (24 * 3600 * 1000) % 1 * 24) % 1 * 60);
        },

        inHours: function (d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2 - t1) / (24 * 3600 * 1000) % 1 * 24);
        },

        inDays: function (d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2 - t1) / (24 * 3600 * 1000));
        },

        inWeeks: function (d1, d2) {
            var t2 = d2.getTime();
            var t1 = d1.getTime();

            return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
        },

        inMonths: function (d1, d2) {
            var d1Y = d1.getFullYear();
            var d2Y = d2.getFullYear();
            var d1M = d1.getMonth();
            var d2M = d2.getMonth();

            return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
        },

        inYears: function (d1, d2) {
            return d2.getFullYear() - d1.getFullYear();
        }

    }

    const [remainingHours, setRemaingHours] = React.useState(null);
    const [remainingDays, setRemainingDays] = React.useState(null);
    const [remainingMinutes, setRemainingMinutes] = React.useState(null);
    const [remainingSeconds, setRemainingSeconds] = React.useState(null);
    const [password, setPassword] = React.useState('');

    function unlockPassword() {
        let updated = passwordDetails;
        updated.locked = false;
        updated.unlock_date = "";
        setPasswordDetails(updated);
        setPassword(passwordDetails.current_password);
    }


    function generateNewPassword() {
        let newPassword = Password.generate(16);
        setPassword(newPassword);
    }

    function lockPassword() {

        if (password === "") {
            console.log("You cannot lock an empty password!");
        } else {

            const currentDate = new Date();
            const lockDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
            const unlockDate = new Date(lockDate.getFullYear(), lockDate.getMonth(), lockDate.getDate() + 7, lockDate.getHours(), lockDate.getMinutes(), lockDate.getSeconds());

            const data = {
                userId: userId,
                applicationId: props._id,
                generatedPassword: password,
                unlockDate: unlockDate
            }

            const url = urlstart + '/user/lock-application'

            setLoading(true);

            axios.post(url, data)
                .then(response => {
                    setLoading(false);
                    setPasswordDetails(response.data.result);
                })
                .catch(err => {
                    console.log("There was an error - " + err);
                })

        }

    }

    function deleteApplication() {

        const data = {
            userID: userId,
            appID: passwordDetails._id
        }

        const url = urlstart + '/user/delete-application';

        axios.post(url, data)
            .then(response => {
                console.log(response.data.applications);
                props.setApplications(response.data.applications);
                props.setDeleteAlert(true);
            })
            .catch(err => {
                console.log("There was an error " + err);
            })

    }

    return (
        <Container>
            <Row style={{ fontSize: '0.5rem', marginBottom: '2vh' }}>
                <Col xs={2} style={{ backgroundColor: '#7EA8AD' }}>

                </Col>
                <Col xs={10} style={{ backgroundColor: '#F7FAFA', lineHeight: 0.8, paddingTop: '2vh', paddingBottom: '2vh' }}>
                    <p>Name: {passwordDetails.name}</p>
                    <p>Password: { passwordDetails.locked ? <span><FaLock size={10} color={"#7EA8AD"} style={{position: 'relative', bottom: '2px'}} /></span> : password}</p>
                    { passwordDetails.locked ?  
                    (<p>Time Remaining: {remainingDays}d : {remainingHours}h : {remainingMinutes}m : {remainingSeconds}s </p>) :
                    (<p>-</p>)}
                    {
                        passwordDetails.locked ?
                            null
                            :
                            (
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', paddingRight: '20vh' }}>
                                    <FaMagic size={10} color={"#436585"} onClick={() => generateNewPassword()} />
                                    <FaLock size={10} color={"#7EA8AD"} onClick={() => lockPassword()} />
                                    <FaTrashAlt size={10} color={"#970E0E"} onClick={() => deleteApplication()} />
                                </div>
                            )
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default ApplicationCardSS
