import { ConnectorError, logger } from "@sailpoint/connector-sdk"
import {check_token_expiration,smart_error_handling,auth} from './generic-functions'
import {pmc_get,pmc_get_pagination,pmc_assign_computer_to_group,pmc_delete_computer,pmc_archive_computer} from './pmc-functions'

export class MyClient {
    private readonly instance?: string
    private readonly authUrl?: string
    private readonly client_id?: string
    private readonly client_secret?: string

    constructor(config: any) {
        // Fetch necessary properties from config.
        // Global Variables
        // Remove trailing slash in URL if present.  Then store in Global Variables.
        if(config?.instance.substr(config?.instance.length - 1 ) == '/'){
            globalThis.__INSTANCE = config?.instance.substr(0,config?.instance.length - 1) + '/management-api/scim/v2'
            globalThis.__REST_API = config?.instance.substr(0,config?.instance.length - 1) + '/management-api'
        }  else{
            globalThis.__INSTANCE = config?.instance+'/management-api/scim/v2'
            globalThis.__REST_API = config?.instance+'/management-api'
        }
        // Remove trailing slash in Auth URL if present.  Then store in Global Variables.
        if(config?.authUrl.substr(config?.authUrl.length - 1 ) == '/'){
            globalThis.__AUTHURL = config?.authUrl.substr(0,config?.authUrl.length - 1)
        }  else{
            globalThis.__AUTHURL = config?.authUrl
        }
        // Store Client Credentials in Global Variables
        globalThis.__CLIENT_ID = config?.client_id
        globalThis.__CLIENT_SECRET = config?.client_secret
    // pageSize for GET all Records
        globalThis.__pageSize = 50
    }


    async getAllAccounts(): Promise<any[]> {

        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await auth()
            logger.info(`Auth Status : ${JSON.stringify(resAuth.status)}`)
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // We get a List of Computers (all pages), then for each Computer, we get the details
            try{
                let resAccounts = await pmc_get_pagination('/v2/Computers')
                let Computers = []
                for (var computer of resAccounts){
                    let Computer = await pmc_get('/v2/Computers/'+computer.id)
                    Computers.push(Computer)
                }
                return Computers
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await auth()
                    logger.info(`Auth Status : ${JSON.stringify(resAuth2.status)}`)
                    let resAccounts2 = await pmc_get_pagination('/v2/Computers')
                    let Computers = []
                    for (var computer of resAccounts2){
                        let Computer = await pmc_get('/v2/Computers/'+computer.id)
                        Computers.push(Computer)
                    }
                       return Computers
                }    else{
                    console.log('about to throw ConnectorError')
                    await smart_error_handling(err)
                    return err.message
                }

            }  
            }

    async getAccount(identity: string): Promise<any> {
        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await auth()
            logger.info(`Auth Status : ${JSON.stringify(resAuth.status)}`)
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // Get Computer
            try{
                let resAccount = await pmc_get('/v2/Computers/'+identity)
                return resAccount
        }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await auth()
                    let resAccount2 = await pmc_get('/v2/Computers/'+identity)
                    return resAccount2
                }   else{
                        console.log('about to throw ConnectorError')
                        await smart_error_handling(err)
                        return err.message
                    }
            }  

    }

    async changeAccountStatus(identity: string, status: string): Promise<any> {
        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await auth()
            logger.info(`Auth Status : ${JSON.stringify(resAuth.status)}`)
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // Change Computer to Archived or no Archived
            try{
                let changeAccount = await pmc_archive_computer(identity,status)
                return changeAccount
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await auth()
                    logger.info(`Auth Status : ${JSON.stringify(resAuth2.status)}`)
                    let changeAccount2 = await pmc_archive_computer(identity,status)
                    return changeAccount2
                }     else{
                        console.log('about to throw ConnectorError')
                        await smart_error_handling(err)
                        return err.message
                    }

            }  
    }

    async updateAccount(account: string, changes: any): Promise<any> {
        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await auth()
            logger.info(`Auth Status : ${JSON.stringify(resAuth.status)}`)
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // Assign Computer to Group, or Unassign
            console.log('changes in my-client = '+JSON.stringify(changes))
        try{
                let changeAccount = await pmc_assign_computer_to_group(account,changes)
                return changeAccount
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await auth()
                    logger.info(`Auth Status : ${JSON.stringify(resAuth2.status)}`)
                    let changeAccount2 = await pmc_assign_computer_to_group(account,changes)
                    return changeAccount2
                }    else{
                        console.log('about to throw ConnectorError')
                        await smart_error_handling(err)
                        return err.message
                    }

                } 
    }

    async deleteAccount(identity: string): Promise<any> {
        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await auth()
            logger.info(`Auth Status : ${JSON.stringify(resAuth.status)}`)
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // Delete Computer
            try{
                let changeAccount = await pmc_delete_computer(identity)
                return changeAccount
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await auth()
                    logger.info(`Auth Status : ${JSON.stringify(resAuth2.status)}`)
                    let changeAccount2 = await pmc_delete_computer(identity)
                    return changeAccount2
                }     else{
                        console.log('about to throw ConnectorError')
                        await smart_error_handling(err)
                        return err.message
                    }

            }  
    }

    async testConnection(): Promise<any> {

        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await auth()
            logger.info(`Auth Status : ${JSON.stringify(resAuth.status)}`)
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

        // TEST = GET About
        try{
        let About = await pmc_get('/v2/About')
        logger.info(`About : ${JSON.stringify(About)}`)
        return {}
    } catch (err:any) {
        console.log('##### Error name = '+err.name)
        console.log('##### Error message = '+err.message)
        if(err.message == 'Request failed with status code 401'){
            console.log('#### error status = 401')
            let resAuth2: any = await auth()
            logger.info(`Auth Status : ${JSON.stringify(resAuth2.status)}`)
            let About2 = await pmc_get('/v2/About')
            return {}
        }   else{
            console.log('We are about to throw ConnectorError in Test Connection')
            await smart_error_handling(err)
            return err.message
        }
    }
    }

    async getAllEntitlements(): Promise<any[]> {
        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await auth()
            logger.info(`Auth Status : ${JSON.stringify(resAuth.status)}`)
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // GET entitlements - Computer Groups
            try{
                let resG = await pmc_get_pagination('/v2/Groups')
                return resG
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await auth()
                    let resG2 = await pmc_get_pagination('/v2/Groups')
                    return resG2
                    }    else{
                    console.log('about to throw ConnectorError')
                    await smart_error_handling(err)
                    return err.message
                }
            }
    }

    async getEntitlement(identity: string): Promise<any[]> {
        // Check expiration time for Bearer token in Global variable
        let valid_token = await check_token_expiration()
        if((valid_token == 'undefined') || (valid_token == 'expired')){
            console.log('######### Expiration Time is undefined or in the past')
            let resAuth = await auth()
            logger.info(`Auth Status : ${JSON.stringify(resAuth.status)}`)
                }
        else if(valid_token == 'valid'){
            console.log('### Expiration Time is in the future:  No need to Re-Authenticate')
            }

            // GET entitlement - Computer Group
            try{
                let resGP = await pmc_get('/v2/Groups/'+identity)
                return resGP
            }  catch (err:any) {
                console.log('##### Error name = '+err.name)
                console.log('##### Error message = '+err.message)
                if(err.message == 'Request failed with status code 401'){
                    console.log('#### error status = 401')
                    let resAuth2: any = await auth()
                    logger.info(`Auth Status : ${JSON.stringify(resAuth2.status)}`)
                    let resGP2 = await pmc_get('/v2/Groups/'+identity)
                    return resGP2
                    }     else{
                    console.log('about to throw ConnectorError')
                    await smart_error_handling(err)
                    return err.message
                }

            }  

    }

}
