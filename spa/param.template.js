const param = {
    msalConfig : {
        auth: {
            clientId: "clientid-of-spa-application",
            authority: "https://login.microsoftonline.com/tenantid",
            validateAuthority: true
        },
        cache: {
            cacheLocation: "localStorage",
            storeAuthStateInCookie: false
        }
    },

    login : {
        token_request : {
            scopes: ["openid", "profile", "User.Read"]
        }
    },

    api : {
        token_request : {
            scopes: ["https://functionAppName.azurewebsites.net/user_impersonation"]
        },
        url : "https://functionAppName.azurewebsites.net/api/functionName?code=yourFunctionKey"
    }

}
