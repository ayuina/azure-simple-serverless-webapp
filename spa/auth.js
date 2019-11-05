
const msalagent = new Msal.UserAgentApplication(param.msalConfig);
msalagent.handleRedirectCallback(
    function authRedirectCallBack(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("token type is:" + response.tokenType);
        }
    }
);

function signIn( callback ) {
    msalagent
        .loginPopup( param.login.token_request )
        .then( callback )
        .catch(function(error){
            console.log(error);
        });
}

function acquireAuthToken( tokenRequest, callback ) {
    msalagent
        .acquireTokenSilent(tokenRequest)
        .then( callback )
        .catch(function(err){
            console.log(err);
            if( err.errorCode &&  err.errorCode.length) {
                if(err.errorCode === "consent_required" || err.errorCode === "interaction_required" || err.errorCode === "login_required") {
                    msalagent
                        .acquireTokenPopup(tokenRequest)
                        .then( callback )
                        .catch(function(err){
                            console.log(err);
                            window.alert("cannot acquire auth token");
                        });
                }
            }
        });
}

function callApi() {
    acquireAuthToken( 
        param.api.token_request, 
        function(tokenResponse){
            console.log(tokenResponse);
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", param.api.url, true); // true for asynchronous
            xmlHttp.setRequestHeader('Authorization', 'Bearer ' + tokenResponse.accessToken);
            xmlHttp.onreadystatechange = apiCallback;
            xmlHttp.send();
        });
}

function apiCallback() {
    if (this.readyState == 4 && this.status == 200){
        var response = JSON.parse(this.responseText);
        console.log(response);
        alert(response.message);
    } else {
        console.log("readyState : " + this.readyState + " , status : " + this.status);
    }
}

