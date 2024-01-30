// BeyondTrust Generic functions
import { ConnectorError, logger } from '@sailpoint/connector-sdk'

// =================================================
// GENERIC - Check OAuth Bearer Token expiration time
// =================================================
export async function check_token_expiration() {

// Check EXPIRATION_TIME
let now = 0
now = Date.now();
console.log('now Time =        '+now)
console.log('Expiration Time = '+globalThis.__EXPIRATION_TIME)
const time_buffer = 100
let valid_token = 'valid'
if(!globalThis.__EXPIRATION_TIME){
    console.log('######### Expiration Time is undefined')
    valid_token = 'undefined'
}
else{
    if(globalThis.__EXPIRATION_TIME - time_buffer <= now){
        console.log('Expiration Time is in the past')
        valid_token = 'expired'
    }
    else{
        console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
        valid_token = 'valid'
    }
}

return valid_token

}

// =================================================
// GENERIC - Smart Error Handling
// =================================================
export async function smart_error_handling(err: any) {

    console.log('############ We are in smart_error handling, error name = '+err.name+'    Error Message = '+err.message)
    // Smart Error Handling
    if(err.message.substr(0,21) == 'getaddrinfo ENOTFOUND'){
        throw new ConnectorError(err.message+'  ::  Verify the Source instance portion of the URL in Configuration.   '+err.message)
    }   else if(err.message == 'Request failed with status code 401'){
        throw new ConnectorError(err.message+'  ::  Verify that the Source API account client_id and client_secret are valid in Configuration.   '+err.message)
    }   else if(err.message == 'Request failed with status code 403'){
            throw new ConnectorError(err.message+'  ::  Verify that the Source API account has required permissions. '+err.message)
    }   else if(err.message == 'Request failed with status code 400'){
            throw new ConnectorError(err.message+'  ::  Verify Client ID and Client Secret values. '+err.message)
    }   else if(err.message == 'Request failed with status code 404'){
            throw new ConnectorError(err.message+'  ::  Source instance responded, but there is a problem with the URL in Configuration.  '+err.message)
    }    else{
        console.log('about to throw ConnectorError')
        throw new ConnectorError(err.name+'  ::  '+err.message)
    }
    }
    
// =================================================
// Authentication Simple
// =================================================
export async function auth() {

    // set the Authorization header
let base64data = Buffer.from(globalThis.__CLIENT_ID+':'+globalThis.__CLIENT_SECRET).toString('base64')
const authorization = 'Basic '+base64data

const axios = require('axios');
const qs = require('querystring');
const data = {
    grant_type: 'client_credentials'
};
console.log('AuthUrl = '+globalThis.__AUTHURL)
// set the headers
const config = {
    method: 'post',
    rejectUnauthorized: false,
    url: globalThis.__AUTHURL,
    data: qs.stringify(data),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': authorization
    }
};
try{
    let resAuth = await axios(config)
    // Store res data in Global variable
    let now = 0
    now = Date.now();
    globalThis.__ACCESS_TOKEN = resAuth.data.access_token
    globalThis.__EXPIRATION_TIME = now + (resAuth.data.expires_in * 1000)    
    return resAuth
}   catch (err:any) {
    await smart_error_handling(err)
}

}
