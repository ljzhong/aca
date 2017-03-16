// command --> node lob.js

var Lob = require("lob")("");


var poop = {
    fname: "Esther",
    linit: "M",
    address_line1: "_",
    address_city: "Tryon",
    address_state: "NC",
    address_zip: "28782",

    // to
    rep_name: "President Donald Trump",
    rep_address_line1: "The White House",
    rep_address_line2: "1600 Pennsylvania Avenue NW",
    rep_address_city: "Washington",
    rep_address_state: "DC",
    rep_address_zip: "20500",

    text: "Mr Trump, I'm a 71 year old, permanent,y disabled female who depends on Social Security and Medicare to survive. Please don't mess with these programs! The seniors are counting on you! Please keep your promise! Thanks!",

    // postcard
    postcard: "dont-repeal"

};

Lob.postcards.create({
  description: "ACA postcard",
  metadata: { campaign: "TSUNAMI01" },
  from: {
    name: poop.fname + " " + poop.linit + ".",
    address_line1: poop.address_line1,
    address_city: poop.address_city,
    address_state: poop.address_state,
    address_zip: poop.address_zip
  },
  to: {
    name: poop.rep_name,
    address_line1: poop.rep_address_line1,
    address_city: poop.rep_address_city,
    address_state: poop.rep_address_state,
    address_zip: poop.rep_address_zip
  },
  front: "<html> <head> <meta charset='UTF-8'> <title>Protect Affordable Insurance - front</title> <style> *, *:before, *:after { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; } body { width: 6.25in; height: 4.25in; margin: 0; padding: 0; } #outer { width: 6.25in; height: 4.25in; border: .03in solid black; } #inner { width: 5.5in; height: 3.5in; position: absolute; left: .375in; top: .375in; border: .03in none white; } img { width:100%; height:100%; } </style> </head> <body> <div id='outer'> <img src='https://www.fightforhealthcare.org/img/postcard/{{ postcard }}.jpg'></img> <div id='inner'> </div> </div> </body> </html>",
  back: "<html> <head> <meta charset='UTF-8'> <link href='https://fonts.googleapis.com/css?family=Lato:400' rel='stylesheet' type='text/css'> <title>Protect Affordable Insurance - back</title> <style> *, *:before, *:after { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; } body { width: 6.25in; height: 4.25in; margin: 0; padding: 0; background-color: white; border: 1px solid black; } /* do not put text outside of the safe area */ #safe-area { position: absolute; width: 5.875in; height: 3.875in; left: 0.1875in; top: 0.1875in; } #message { position: absolute; width: 2.2in; height: 2in; top: 1.2in; left: .25in; font-family: 'Lato'; font-weight: 400; font-size: .122in; } .addressblock { position: absolute; width: 3in; height: 2.25in; top: 1.75in; left: 3in; font-family: 'Lato'; font-weight: 400; font-size: .122in; border: 1px solid black; } .stamp { position: absolute; border: 1px black solid; width: 0.87in; height: 0.7in; left: 2in; top: 0.2in; } .stamp p { position: absolute; left: .23in; top: .2in; margin: 0 auto; } .return-address { font-size: .8em; position: absolute; left: .3in; top: .3in; } .recipient-address { position: absolute; left: .3in; top: 1.3in; } #header { height: 1in; } #header img { top: 0; left: 0; width: 100%; position: relative; } </style> </head> <body> <div id='safe-area'> <div id='header'> <img src='https://www.fightforhealthcare.org/img/postcard/{{ postcard }}-h1.png'></img> </div> <div id='message'> Dear <span class='postcard-mock-rep'>{{ rep_name }}</span>, <br><br> <span class='postcard-mock-text'>{{ text }}</span> <br><br> Best, <br><span class='postcard-mock-name'>{{ fname }} {{ linit }}.</span> </div> </div> </body> </html>",
  data: {
    fname: poop.fname,
    linit: poop.linit,

    // to
    rep_name: poop.rep_name,

    text: poop.text,

    // postcard
    postcard: poop.postcard
  }
}, function (err, res) {
  console.log(err, res);
});