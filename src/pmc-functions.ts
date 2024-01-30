// BeyondTrust PM Cloud functions
import { ConnectorError, logger } from '@sailpoint/connector-sdk'
import {smart_error_handling} from './generic-functions'

// =================================================
// GET - PM Cloud - Single Record
// =================================================
export async function pmc_get(endpoint: string) {
  //  try{
    const axios = require('axios');
    // set the headers
    const config = {
      method: 'get',
      rejectUnauthorized: false,
      url: globalThis.__REST_API + endpoint,
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+globalThis.__ACCESS_TOKEN
      }
  }
  let res = await axios(config)
         return res.data      
    }
  
  
// =================================================
// GET - PM Cloud - with Pagination Support
// =================================================
export async function pmc_get_pagination(endpoint: string) {

//  try{
  const axios = require('axios');
  // set the headers
  const config = {
    method: 'get',
    rejectUnauthorized: false,
    url: globalThis.__REST_API + endpoint+'?Pagination.PageSize='+globalThis.__pageSize+'&Pagination.PageNumber=1',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+globalThis.__ACCESS_TOKEN
    }
}
let res = await axios(config)
    // PAGINATION BEGIN
    const totalRecordCount = res.data.totalRecordCount
    var pageNumber = res.data.pageNumber
    const pageSize = res.data.pageSize
    var records = res.data.data
    const pageCount = res.data.pageCount

    console.log('Total # of Records = '+totalRecordCount+'  pageSize = '+pageSize+' pageNumber = '+pageNumber+' pageCount = '+pageCount)
    if(pageCount > 1){
        for (let page = 2; page < pageCount + 1; ++page) {
            console.log('PAGINATION: pageCount = '+pageCount+'   We are working on Page # '+page)
            const configGP2 = {
                method: 'get',
                rejectUnauthorized: false,
                url: globalThis.__REST_API + endpoint+'?Pagination.PageSize='+globalThis.__pageSize+'&Pagination.PageNumber='+page,
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer '+globalThis.__ACCESS_TOKEN
                }
            }
            let res2 = await await axios(configGP2)
            records = records.concat(res2.data.data)
        }
    }
    // PAGINATION END
  
      return records
    
  }
  
// =================================================
// Assign Computer to a Group
// =================================================
export async function pmc_assign_computer_to_group(account:any, changes:any) {

  const axios = require('axios');

  // entitlements = Computer Group    
  for (var change of changes){
    if(change.op.toLowerCase() == 'add' || change.op.toLowerCase() == 'set'){
    //Assign Computer to Group
      const assign_group = {
        method: 'post',
        rejectUnauthorized: false,
        url: globalThis.__REST_API + '/v2/Groups/'+change.value+'/AssignComputers',
        data: {"computerIds": [account]},
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer '+globalThis.__ACCESS_TOKEN
        }
      }
      console.log('assign_group = '+JSON.stringify(assign_group))
      let resAssign = await axios(assign_group)
    }
    if(change.op.toLowerCase() == 'remove' && changes.length == 1){
      //Unassign Computer from Group
        const unassign_group = {
          method: 'post',
          rejectUnauthorized: false,
          url: globalThis.__REST_API + '/v2/Groups/UnassignComputers',
          data: {
            "allComputers": false,
            "selectionComputerIds": [account],
            "groupId": change.value
        },
          headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+globalThis.__ACCESS_TOKEN
          }
        }
        console.log('unassign_group = '+JSON.stringify(unassign_group))
        let resAssign = await axios(unassign_group)
      }
    }
  return {}
  }

// =================================================
// Delete Computer
// =================================================
export async function pmc_delete_computer(account:any) {

  const axios = require('axios');

  //Delete Computer
      const delete_computer = {
          method: 'delete',
          rejectUnauthorized: false,
          url: globalThis.__REST_API + '/v2/Computers',
          data: {"computerIds": [account]},
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer '+globalThis.__ACCESS_TOKEN
            }
      }
      let resAssign = await axios(delete_computer)
     
     return {}
}
  
// =================================================
// Archive Computer
// =================================================
export async function pmc_archive_computer(account:any,action:any) {

  const axios = require('axios');

  //Archive or Unarchive Computer
      const archive_computer = {
          method: 'post',
          rejectUnauthorized: false,
          url: globalThis.__REST_API + '/v2/Computers/'+account+'/'+action,
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer '+globalThis.__ACCESS_TOKEN
            }
      }
      let resAssign = await axios(archive_computer)
     
      let resComputerDetails = await pmc_get('/v2/Computers/'+account)
      return resComputerDetails
 }

