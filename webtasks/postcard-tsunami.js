// send a message to slack containing: name, message, payment format

// create lob card 

// send confirmation email


// stripe payment




'use latest';

var LOB_TEST_KEY = ctx.secrets.LOB_TEST_KEY;
var LOB_KEY = ctx.secrets.LOB_KEY;

var STRIPE_SECRET_KEY = ctx.secrets.STRIPE_SECRET_TEST_KEY;
var STRIPE_SECRET_KEY = ctx.secrets.STRIPE_SECRET_KEY;

var MY_SLACK_WEBHOOK_URL = ctx.secrets.SLACK_WEBHOOK_URL;



module.exports = function(ctx, callback) {
  //var data = ctx.body.data;
  
  // data modal
  var data = {
    "email": "doughnut.express@gmail.com",

    "fname": "linda",
    "lname": "zhong",
    "front": "protect-affordable",
    "why": "",
    "addressLine1":"sentinel drive",
    "addressCity":"basking ridge",
    "addressState":"NJ",
    "addressZip":"98102",

    "rep1Name": "K J",
    "rep1Address": "3423 ASD",
    "rep2Name": "F sd",
    "rep2Address": "asdf",
    "rep3Name": "F BB",
    "rep4Address": "asdfa",

    "stripeToken": "sampletoken"
  };

  var payment = "";
  if (data.stripeToken) payment = "Stripe payment";
  else payment = "Facebook share";

  var linit = data.lname;
  if (data.stripeToken) payment = "Stripe payment";
  else payment = "Facebook share";

  // data processing
  var cleaned = {
    "email": data.email,

    "fname": data.fname,
    "lname": data.lname,
    "front": data.front,
    "why": data.why,
    "addressLine1": data.addressLine1,
    "addressCity": data.addressCity,
    "addressState": data.addressState,
    "addressZip": data.addressZip,

    "rep1Name": data.rep1Name,
    "rep1Address": data.rep1Address,
    "rep2Name": data.rep2Name,
    "rep2Address": data.rep2Address,
    "rep3Name": data.rep3Name,
    "rep4Address": data.rep3Address,
    
    "stripeToken": data.stripeToken,
    "payment": payment
  };
  
  // add stripe payment
  var stripe = require("stripe")(STRIPE_SECRET_TEST_KEY);
  
  stripe.customers.create({
    description: `${cleaned.fname} ${cleaned.lname}`,
    email: cleaned.email,
    source: cleaned.stripeToken,
    metadata: cleaned,
  }, function(err, customer) {
    console.log(err);
    console.log(customer);
  });
  // Charge the user's card:
  stripe.charges.create({
    amount: 300,
    currency: "usd",
    description: "F4H - 3 Postcard",
    source: cleaned.stripeToken,
  }, function(err, charge) {
    // asynchronously called
  });



  /**
   * create a list of lob cards
   * - put in address into google maps
   * - then get representatives names and addresses
   * - make a postcard for each on test
   */
  
  
  // postcard 1
  Lob.postcards.create({
    description: "ACA postcard",
    metadata: { campaign: "TSUNAMI01" },
    from: {
      name: cleaned.fname + " " + cleaned.linit + ".",
      address_line1: poop.address_line1,
      address_city: poop.address_city,
      address_state: poop.address_state,
      address_zip: poop.address_zip
    },
    to: {
      name: poop.rep_name,
      address_line1: poop.rep_address_line1,
      address_city: poop.rep_address_city,
      address_state: poop.rep_address_state,
      address_zip: poop.rep_address_zip
    },
    front: "<html> <head> <meta charset='UTF-8'> <title>Protect Affordable Insurance - front</title> <style> *, *:before, *:after { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; } body { width: 6.25in; height: 4.25in; margin: 0; padding: 0; } #outer { width: 6.25in; height: 4.25in; border: .03in solid black; } #inner { width: 5.5in; height: 3.5in; position: absolute; left: .375in; top: .375in; border: .03in none white; } img { width:100%; height:100%; } </style> </head> <body> <div id='outer'> <img src='https://raw.githubusercontent.com/activegiver/aca/master/img/postcard/{{ postcard }}.jpg'></img> <div id='inner'> </div> </div> </body> </html>",
    back: "<html> <head> <meta charset='UTF-8'> <link href='https://fonts.googleapis.com/css?family=Lato:400' rel='stylesheet' type='text/css'> <title>Protect Affordable Insurance - back</title> <style> *, *:before, *:after { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; } body { width: 6.25in; height: 4.25in; margin: 0; padding: 0; background-color: white; border: 1px solid black; } /* do not put text outside of the safe area */ #safe-area { position: absolute; width: 5.875in; height: 3.875in; left: 0.1875in; top: 0.1875in; } #message { position: absolute; width: 2.2in; height: 2in; top: 1.2in; left: .25in; font-family: 'Lato'; font-weight: 400; font-size: .122in; } .addressblock { position: absolute; width: 3in; height: 2.25in; top: 1.75in; left: 3in; font-family: 'Lato'; font-weight: 400; font-size: .122in; border: 1px solid black; } .stamp { position: absolute; border: 1px black solid; width: 0.87in; height: 0.7in; left: 2in; top: 0.2in; } .stamp p { position: absolute; left: .23in; top: .2in; margin: 0 auto; } .return-address { font-size: .8em; position: absolute; left: .3in; top: .3in; } .recipient-address { position: absolute; left: .3in; top: 1.3in; } #header { height: 1in; } #header img { top: 0; left: 0; width: 100%; position: relative; } </style> </head> <body> <div id='safe-area'> <div id='header'> <img src='https://raw.githubusercontent.com/activegiver/aca/master/img/postcard/{{ postcard }}-h1.png'></img> </div> <div id='message'> Dear <span class='postcard-mock-rep'>{{ rep_name }}</span>, <br><br> <span class='postcard-mock-text'>{{ text }}</span> <br><br> Best, <br><span class='postcard-mock-name'>{{ fname }} {{ linit }}.</span> </div> </div> </body> </html>",
    data: {
      fname: poop.fname,
      linit: poop.linit,

      // to
      rep_name: poop.rep_name,

      text: poop.text,

      // postcard
      postcard: poop.postcard
    }
  }, function (err, res) {
    console.log(err, res);
  });

  
  
  
  
  
  
  
  
  // send confirmation email
  
  
  // send a message to slack containing: name, message, payment format
  var slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);
  slack.onError = function (err) {
    console.log('API error:', err);
  };
  slack.send({
    "fallback": `A postcard was created by ${cleaned.lname} ${cleaned.fname}`,
    "color": "#439FE0", // Can either be one of 'good', 'warning', 'danger', or any hex color code
  
    "title": "Postcard Tsunami alert",
    "pretext": `A postcard was created by ${cleaned.lname} ${cleaned.fname}`,
  
    // Fields are displayed in a table on the message
    "fields": [
      {
        "title": "Name", // The title may not contain markup and will be escaped for you
        "value": `${cleaned.lname} ${cleaned.fname}`,
        "short": false
      },
      {
        "title": "Email", // The title may not contain markup and will be escaped for you
        "value": `${cleaned.email}`,
        "short": false
      },
      {
        "title": "Payment Format", // The title may not contain markup and will be escaped for you
        "value": "Text value of the field. May contain standard message markup and must be escaped as normal. May be multi-line.",
        "short": false
      },
      {
        "title": "Message", // The title may not contain markup and will be escaped for you
        "value": `${cleaned.why}`,
        "short": false
      },
      {
        "title": "Cards", // The title may not contain markup and will be escaped for you
        "value": `${cleaned.card[0]}\n${cleaned.card[1]}\n${cleaned.card[2]}`,
        "short": false
      }
    ]
  });

  
    callback(null, {}); 
}

