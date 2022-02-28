var express = require('express');
var mysql = require('mysql'); 
var app = express();
var dbConfig = require('./config/db.config'); 
var otpSender = require('./service/twillio.service');
var otpUtils = require('./utils/utils.otp.generator');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var mysqlConnection = mysql.createConnection({
    host : dbConfig.DB_HOST, 
    user: dbConfig.DB_USERNAME, 
    password: dbConfig.DB_PASSWORD, 
    database: dbConfig.DB_DATABASENAME
}); 

mysqlConnection.connect((err) => {
    if(!err) {
        console.log(`[*] Conntected with DataBase`); 
    } else {
        console.log(`[*] Error While conntecting with Database ${err}`); 
    }
})

app.listen(3030, () => {
    console.log(`[*] Http Server Listening : http://localhost:3030`);
})

app.get('/api/user', (req, res) => {
    mysqlConnection.query("SELECT * FROM user", (err, rows, fields) => {
        if(!err) {
            console.log(rows); 
            res.send(rows); 
            console.log(`[*] Response Sent for request :  ${req}`);
        } else {
            console.log(err);
        }
    })
})

// -----------  add a new user ------------------------------------------------------

app.post('/api/add-user', (req, res) => {
    userData = req.body; 
    let userFullName = userData.userFullName;  
    let userEmailAddress = userData.userEmailAddress; 
    let userPhoneNumber = userData.userPhoneNumber; 
    let userPassword = userData.userPassword; 
    let queryString = `INSERT INTO user VALUES("${userFullName}", "${userEmailAddress}", "${userPhoneNumber}", "${userPassword}",false)`;
    console.log(queryString);
    mysqlConnection.query(queryString, (err, rows, fields) => {
            if(!err) {
                res.send({message : "New User Created.", status : 200}); 
                console.log("[*] New User Added.."); 
            } else {
                console.log(`[*] Erro -> ${err.message}`);
                res.send({ message : err.message, status : 400 }); 
            }
        }
    )

})


// ------------------------------------------------------------------------------------

app.post('/api/fetch-user-data', (req, res) => {
    console.log(req.body);
    let userEmailAddress = req.body.userEmailAddress; 
    let sql_query = `SELECT * FROM user where user_email = "${userEmailAddress}"`; 
    console.log(sql_query);
    mysqlConnection.query(sql_query, (err, rows, fields) => {
        console.log(rows); 
        if(!err) {
            res.send(rows); 
        } else {
            res.send({"data" : "Not-Found"});
        }
    })
})

// ------ authenticate a user ----------------------------------------------------- 

app.post('/api/auth-user', (req, res) => {
    let userData = req.body; 
    console.log(userData);
    let userEmailAddress = userData.userEmailAddress; 
    console.log(userEmailAddress); 
    let userPassword = userData.userPassword; 
    let queryString = `SELECT user_password FROM user WHERE user_email = "${userEmailAddress}"`; 
    console.log(queryString);
    mysqlConnection.query(queryString, (err, rows, fields) => {
        if(!err) {
            var AuthRes = {}
            if(rows.length == 0) {
                AuthRes['validated'] = false; 
                AuthRes['userPassword'] = rows;
                AuthRes['status'] = 'FAILURE';
            } else {
                if(rows[0]['user_password'] == userPassword) {
                    AuthRes['validated'] = true;
                    AuthRes['status'] = 'SUCCESS'; 
                } else {
                    AuthRes['validated'] = false; 
                    AuthRes['status'] = 'FAILURE'; 
                    AuthRes['message'] = 'Wrong Credentials.'
                }
            }
            res.send(AuthRes); 

        } else {
            console.log(`[*] Error : ${err.message}`); 
            let AuthRes = {
                validated : false, 
                status: 'FAILURE', 
                staus_message : err.message 
            }
            res.send(AuthRes); 
        }
    })
})

// -------------------------------------------------------------------- 
app.post("/api/check-user-active", (req, res) => {
    let userEmailAddress = req.body.userEmailAddress; 
    let sql_query = `SELECT is_active FROM user WHERE user_email = "${userEmailAddress}"`; 
    // sql query to execute. 
    console.log(sql_query); 
    mysqlConnection.query(sql_query, (err, rows, fields) => {
        if(!err) {
            res.send(rows); 
        } else {
            res.send({"Message" : "Error", "is_active" : 0});
        }
    })
})

// --------------------------------------------------------------------- 
app.post("/api/send-otp", (req, res) => {
    let userPhoneNumber = req.body.userPhoneNumber; 
    let userEmailAddress = req.body.userEmailAddress; 
    console.log(req.body);
    let otpString = otpUtils.otpGenerator(); 
    otpSender.send_otp(userPhoneNumber, otpString); 
    console.log(`OTP Sent -> ${userPhoneNumber}`); 
    let sql_query = `INSERT INTO user_otp(user_email_address, user_otp) VALUES("${userEmailAddress}", "${otpString}")`; 
    console.log(sql_query);
    mysqlConnection.query(sql_query, (err, row, fields) => {
        console.log("-------------------");
        if(!err) {
            console.log("passed");
            res.send({"message" : "OTP Sent","status" : "SUCCESS"});     
        } else {
            console.log(err.message);
            res.send({"message" : "Operation Failed", "status" : "FAILURE"});
        }
    }) 
})


// --------------------------------------------------------------------- 
app.post("/api/validate-otp", (req, res) => {
    let userEmailAddress = req.body.userEmailAddress; 
    let otpEntered = req.body.otpEntered; 
    let sql_query = `SELECT user_otp, sent_at from user_otp WHERE user_email_address="${userEmailAddress}" ORDER BY sent_at DESC;`
    mysqlConnection.query(sql_query,(err, rows, fileds) => {
        if(!err) {
            console.log(rows);
            console.log(rows[0]['user_otp']);
            console.log(rows[0]['user_otp'] == otpEntered)
            if(rows[0]['user_otp'] == otpEntered) {
                let sql_query_2 = `UPDATE user SET is_active=${true} WHERE user_email = "${userEmailAddress}"`; 
                mysqlConnection.query(sql_query_2, (err, rows, files) => {
                    console.log("-><-")
                    if(!err) {
                        let jsonResponse = {
                            'status' : 'SUCCESSS'
                        }
                        console.log(jsonResponse); 
                        res.send(jsonResponse); 
                    } else {
                        let jsonResponse = {
                            'status' : 'FAILED', 
                            'Message' : err.message 
                        }
                        console.log(jsonResponse); 
                        res.send(jsonResponse);
                    }
                })
            }
        }
        else {
            console.log("---------------------");
            let jsonResponse = {
                'status' : 'FAILED', 
            }
            console.log(jsonResponse); 
            res.send(jsonResponse); 
        }
    })
})


// ------------------------------------------------------------------------ 
app.post("/api/register-package", (req, res) => {
    let packageData = req.body;  
    console.log(packageData); 
    let sql_query = `INSERT INTO package_data(package_name, registerd_by, length, weight, breadth,drop_address,pickup_address, 
        alternative_phone_number, package_type) VALUES("${packageData.packageName}", "${packageData.registerBy}", 
        "${packageData.packageLength}", "${packageData.packageWeight}", "${packageData.packageBreadth}","${packageData.packageDropDownAddress}", 
        "${packageData.packagePickupAddress}", "${packageData.packagePhoneNumber}", "${packageData.packageType}")`; 
    console.log(sql_query); 
    mysqlConnection.query(sql_query, (err, rows, fields) => {
        if(!err) {
            res.send(
                {
                    'status' : 'SUCCESS', 
                    'message' : 'Your Package is Registered.'
                }
            )
        } else {
            console.log(err.message); 
            res.send(
                {
                    'status' : 'FAILED', 
                    'message' : err.message  
                }
            )
        }
    })
})

// ------------------------------------------------------------------------
app.post("/api/track-package-list", (req, res) => {
    console.log(req.body);
    let usrEmailAddress = req.body['userEmailAddress']; // get email address of user. 
    console.log(usrEmailAddress); 
    let sql_query = `
        SELECT * FROM package_data 
        WHERE registerd_by="${usrEmailAddress}" AND is_deliverd=false 
        ORDER BY registerd_on DESC; 
    `; 
    console.log(sql_query); 
    mysqlConnection.query(sql_query, (err, rows, fields) => {
        if(!err) {
            res.send(rows); 
        } else {
            res.send({
                'status' : 'FAILED', 
                'message' : err.message 
            })
        }
    })
})

// --------------------------------------------------------------------------- 
app.post("/api/package-data", (req, res) => {
    console.log(req.body); 
    let userEmailAddress = req.body.userEmailAddress; 
    let packageID = req.body.packageID; 
    let sql_query = `
        SELECT * FROM package_data 
        WHERE package_id=${packageID} AND registerd_by="${userEmailAddress}"; 
    `
    console.log(sql_query); 
    mysqlConnection.query(sql_query, (err, rows, fields) => {
        if(!err) {
            console.log(rows); 
            res.send(rows); 
        } else {
            res.send(
                {
                    'status' : 'FAILURE', 
                    'message' : err.message 
                }
            )
        }
    })
})

// ---------------------------------------------------------------------------- 
app.post("/api/update-tracking-data", (req, res) => {
    let packageData = req.body; 
    let packageID=  packageData.packageID; 
    let lastLocation = packageData.lastLocation; 
    let packageStatus = packageData.packageStatus; 
    let sql_query = `
        INSERT INTO 
        package_tracking_data(package_id, last_location, package_status) 
        VALUES(${packageID}, "${lastLocation}","${packageStatus}");`
    console.log(sql_query); 

    if(packageStatus.toUpperCase() == 'DELIVERED') {
        let sql_query_2 =`
        UPDATE package_data 
        SET is_deliverd=true 
        WHERE package_id = ${packageID};
        `; 

        console.log("-----------------*---------------------");
    
        mysqlConnection.query(sql_query_2, (err, rows, fields) => {
            console.log(rows);
            console.log("----------------------*--------------------------");
            mysqlConnection.query(sql_query, (err, rows, fields) => {
                if(!err) {
                    res.send(
                        {
                            'status' : 'SUCCESS', 
                            'message' : 'Tracking Data Updated.' 
                        }
                    )
                } else {
                    res.send(
                        {
                            'status' : 'FAILURE', 
                            'message' : err.message 
                        }
                    )
                }
            })
        })
    } else {
       
            mysqlConnection.query(sql_query, (err, rows, fields) => {
                if(!err) {
                    res.send(
                        {
                            'status' : 'SUCCESS', 
                            'message' : 'Tracking Data Updated.' 
                        }
                    )
                } else {
                    res.send(
                        {
                            'status' : 'FAILURE', 
                            'message' : err.message 
                        }
                    )
                }
            })      
    }

  
})

// ----------------------------------------------------------------------------- 
app.post("/api/tracking-data", (req, res) => {
    let packageID = req.body.packageID; 
    sql_query = `
        SELECT * 
        FROM package_tracking_data 
        where package_id = ${packageID}
        ORDER BY updated_on DESC 
    `; 
    console.log(sql_query); 
    mysqlConnection.query(sql_query, (err, rows, fields) => {
        if(!err) {
            res.send(rows); 
        } else {
            res.send(
                {
                    'status' : 'FAILED', 
                    'message' : err.message 
                }
            )
        }
    })
})

// -------------------------------------------------------------------------------
app.post('/api/estimate-cost', (req, res) => {
    let packageData = req.body; 
    console.log(packageData);
    let packageLength = packageData.packageLength; 
    let packageWeight = packageData.packageWeight; 
    let estimatedCost = packageWeight * 100 + packageLength * 10;
    // let discountCoupon = packageData.discountCoupon;  
    res.send(
        {
            'status' : 'SUCCESS', 
            'cost' : estimatedCost 
        }
    )
})

// ----------------------------------------------------------------
app.post("/api/package-history-list", (req, res) => {
    console.log(req.body);
    let usrEmailAddress = req.body['userEmailAddress']; // get email address of user. 
    console.log(usrEmailAddress); 
    let sql_query = `
        SELECT * FROM package_data 
        WHERE registerd_by="${usrEmailAddress}" AND is_deliverd=true 
        ORDER BY registerd_on DESC; 
    `; 
    console.log(sql_query); 
    mysqlConnection.query(sql_query, (err, rows, fields) => {
        if(!err) {
            res.send(rows); 
        } else {
            res.send(
                {
                    'status' : 'FAILED', 
                    'message' : err.message 
                }
            )
        }
    })
})

// ------------------------------------------------------------------
app.post("/api/update-user-profile", (req, res) => {
    console.log(req.body); 
    let userProfileData = req.body; 
    let sql_query = `
        INSERT INTO user_profile(firstname, lastname, email_address, phone_number, country, state, city ,zip_code) 
        VALUES ("${userProfileData.firstName}", "${userProfileData.secondName}", "${userProfileData.emailAddress}", "${userProfileData.phoneNumber}", "${userProfileData.country}", "${userProfileData.state}", "${userProfileData.city}","${userProfileData.zipCode}"); 
    `

    mysqlConnection.query(sql_query, (err, rows, fileds) => {
        if(!err) {
            res.send(
                {
                    status : 'SUCCESS', 
                    message : 'user profile updated.'  
                }
            )
        } else {
            res.send(
                {
                    status : 'FAILURE', 
                    message : err.message 
                }
            )
        }
    })
})

// -------------------------------------------------------------------- 
app.post("/api/add-review", (req, res) => {
    let reviewData = req.body; 
    let sql_query = `
        INSERT INTO user_review 
        VALUES("${reviewData.packageID}", "${reviewData.reviewContent}");
    `
    console.log(sql_query); 
    mysqlConnection.query(sql_query, (err, rows, fields) => {
        if(!err) {
            res.send(
                {
                    status : 'SUCCESS', 
                    message : 'Review Added'
                }
            )
        } else {
            res.send(
                {
                    status : 'FAILED', 
                    message : err.message 
                }
            )
        }
    })
})