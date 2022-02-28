var twilioConfig = require('../config/twillio.config'); 
const accountSid = twilioConfig.TWILIO_ACCOUNT_SID;
const authToken = twilioConfig.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


function send_otp(user_phone_number, otp_string) {
    console.log(user_phone_number);
    try {
      client.messages 
      .create({ 
         body: `Package Delivery System\nYour Confirmation Code : ${otp_string}`,  
        messagingServiceSid: 'MG132d941f4060d63f464505fefdbc7796',      
        to: user_phone_number 
      }) 
      .then(message => console.log(message.sid)) 
      .done();
    }catch(err) {
      console.log(err.message);
    }
}


module.exports = {
  send_otp
}

//  (912) 600-8610