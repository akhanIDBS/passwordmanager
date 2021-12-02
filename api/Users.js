const express = require('express');
var ObjectId = require('mongodb').ObjectId;
const router = express.Router();

const User = require('../models/User');

router.post('/lock-application', (req, res) => {

    let _id = req.body.userId;

    User.find({_id})
    .then(response => {

        //Find application that needs to be updated
        const application = response[0].applications.filter( item => {
            return item._id == req.body.applicationId
        })

        //Update keys so that it is a locked application
        let updatedApplication = application[0];
        updatedApplication.locked = true;
        updatedApplication.unlock_date = req.body.unlockDate;
        updatedApplication.current_password = req.body.generatedPassword;

        //Replace updated application with old 
        let updatedApplications = response[0].applications;
        const index = updatedApplications.indexOf(application[0]);
        if (index !== -1) {
            updatedApplications[index] = updatedApplication;
        } else {
            throw "There was an error updating your applications"
        }

        // Update database
        User.updateOne({_id: _id}, {$set: {applications: updatedApplications}},
            function (err) {
                if (err)  {
                    res.json({
                        status: "FAIL",
                        message: "There was an error updating your application status"
                    })
                } else {
                    res.json({
                        status: "SUCCESS",
                        result: updatedApplication
                    })
                }
            })

    })
    .catch(err => {
        res.json({
            status: "FAIL",
            message: "There was an error - " + err
        })
    })

});

router.post('/add-application', (req, res) => {

    let _id = req.body.userId;
    let application = req.body.application;

    User.find({ _id })
        .then(response => {

            let currentApplications = response[0].applications;
            let updatedApplications = currentApplications;
            updatedApplications.push(application);
        
            User.updateOne({ _id: _id },
                { $set: { applications: updatedApplications } },
                function (err) {
                    if (err) {
                        res.json({
                            status: "FAIL",
                            message: err
                        })
                    } else {
                        res.json({
                            status: "SUCCESS",
                            applications: updatedApplications
                        })
                    }
                })
        })
        .catch(err => {
            res.json({
                status: "FAIL",
                message: err
            })
        })

});

router.post('/delete-application', (req, res) => {

    let appID = req.body.appID;
    let userID = new ObjectId(req.body.userID);

    User.find({userID})
    .then(result => {
        
        let applications = result[0].applications;
        let updatedApplications = applications.filter((value, index, arr) => { return value._id != appID});
        
        User.updateOne({ _id: userID },
            { $set: { applications: updatedApplications } },
            function (err) {
                if (err) {
                    res.json({
                        status: "FAIL",
                        message: err
                    })
                } else {
                    res.json({
                        status: "SUCCESS",
                        applications: updatedApplications
                    })
                }
            })

    })
    .catch(err => {
        res.json({
            status: "FAIL",
            message: "There was an error - " + err,
        });
    });
 
});

router.get('/get-application/:id/:userID', (req, res) => {

    let appID = req.params.id;
    let userID = new ObjectId(req.params.userID);

    User.find({userID})
    .then(result => {

        const application = result[0].applications.filter( item => {
            return item._id == appID;
        })[0];


        res.json({
            status: "SUCCESS",
            result: application
        })
    })
    .catch(err => {
        res.json({
            status: "FAIL",
            message: err
        });
    })

});

router.post('/save-user', (req, res) => {

    let user = req.body.user;
    const newUser = new User(user);

    newUser.save()
        .then(result => {
            res.json({
                status: "SUCCESS"
            })
        })
        .catch(err => {
            res.json({
                status: "FAIL",
                message: "Error: " + err
            })
        });

})

router.get('/get-user/:id', (req, res) => {

    let _id = req.params.id;

    User.find({ _id }).then(result => {
        if (result.length) {
            res.json({
                status: "SUCCESS",
                user: result,
            });
        } else {
            res.json({
                status: "FAIL",
                message: "Could not find user with ID"
            })
        }
    })
        .catch(error => {
            console.log(error)
            res.json({
                status: "FAIL",
                message: error
            });
        });

})

module.exports = router;