const changePassword = () => {
    // const password;
    // if (document.getElementById("password").value != document.getElementById("confirmpassword").value) {
    //   throw "Passwords Do Not Match!"
    // } else {
    //   password = document.getElementById("password").value;
    // }
    password = document.getElementById("password").value;

    
    const poolData = {
      UserPoolId : _config.cognito.userPoolId, // Your user pool id here          
      ClientId : _config.cognito.clientId, // Your client id here          
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    
    const email = getUrlParameter("email");        
    const code = getUrlParameter("code");
    
    const userData = {          
      Username : email,    
      Pool : userPool,        
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.confirmPassword(code, password, {
      onSuccess: function (result) {
        console.log(result);
        redirectTo('/developer/login');
        },
        onFailure: function(err) {
          console.log(err);
          redirectTo('/');
        }
    });
  }