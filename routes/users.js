var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk')
var USER_POOL_ID = process.env.USER_POOL_ID
var REGION = process.env.REGION


router.get('/', function (req, res, next) {
  // Here we can check the req.user.scope array contains the scope
  // relevant for the REST API operation being invoked

  try {

    // Try and obtain the full user details using the access token

    console.log('------', req.get('Authorization').replace("Bearer ", ""))
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
      region: REGION,
      UserPoolId: USER_POOL_ID
    });

    var params = {
      AccessToken: req.get('Authorization').replace("Bearer ", "")
    };

    cognitoidentityserviceprovider.getUser(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data);           // successful response
    });

  } catch (e) {
    console.log(e)
  }

  res.send('Successfully verified JWT token. Extracted information '
    + JSON.stringify(req.user))
})



module.exports = router;
