'use latest';

import stripe from 'stripe';

module.exports = function(ctx, callback) {
  var data = ctx.body.data;
  var STRIPE_SECRET_KEY = ctx.secrets.STRIPE_SECRET_KEY;

  var stripe = require("stripe")(STRIPE_SECRET_KEY);
  
  stripe.customers.create({
    description: `${data.fname} ${data.lname}`,
    email: data.email,
    source: data.stripeToken,
    metadata: data,
  }, function(err, customer) {
    // console.log(err);
    // console.log(customer);
    callback(null, {});
  });
}