<!DOCTYPE html>
<html>
<body>

<h1>SailPoint IdentityNow SaaS Connector SDK :: BeyondTrust Computers :: Privilege Management for Windows and Mac</h1>

<h2>Computers as Accounts and Computer Groups</h2>
  
  The BeyondTrust Computers connector has been created using the <a href="https://developer.sailpoint.com/idn/docs/saas-connectivity/">SailPoint IdentityNow SaaS Connector SDK</a>.

<h2>Capabilities</h2>

  Computers:
    -  List
    -  Read
    -  Update (Computer Group)
    -  Enable
    -  Disable

    Note: Create Computer is not supported.  Computers must register to PM Cloud via the Adapter installation.

  Computer Groups:
    -  List
    -  Read
    
  <h2>Configuration</h2>

  After the Source or Connector definition is added to an IdentityNow instance, we can Add a new source.
 
   <img src="images/Source-BaseConfiguration.png" alt="Source Base Configuration">

  We need to provide the OAuth credentials for PM Cloud API Account, together with the API and Authentication URLs. The API Account needs Full Access to the Management API.
 
   <img src="images/API-Account.png" alt="API Account">

  Source Configuration.
 
   <img src="images/Source-Configuration.png" alt="Source Configuration">

  Test the configuration and if successful, move to the next step, otherwise, address any configuration issue.
 
  Configure a correlation rule, for example if you want to leverage the registeredOwner Registry key to automatically assign Computer Accounts to Identities.
  As an alternative, it is also possible to import a csv file for uncorrelated accounts.
  The registeredOwner Registry key value would need to be updated and managed, since the value automatically assigned by Windows is not reliable.
 
   <img src="images/Source-Correlation.png" alt="Source Correlation">

  After importing the Accounts we should be able to see Computer Accounts.
 
   <img src="images/Source-Accounts.png" alt="Computer Accounts">

  Account example.
 
   <img src="images/Account.png" alt="Account assigned to Identity">

  Account Entitlement is a Computer Group.
 
   <img src="images/Account-Entitlement.png" alt="Computer Group Entitlement">

  Elevation Policy is assigned via the Computer Group.
 
   <img src="images/Account-Entitlement-Policy.png" alt="Elevation Policy">


<h2>Roles and Access Profiles</h2>

  Access Profiles can be used to provision Entitlements or Computer Groups(and Policy) to Computers. 
   
   <img src="images/AccessProfiles.png" alt="Disable Account">

  Access Profiles can be added to Roles.
  It is also possible to allow Requests for Computer Groups via Applications or otherwise.
  However, if an expiration time is set for the Requested Computer Group, this will result in no Group at expiration time.
   
   <img src="images/Roles.png" alt="Disable Account">

  When using Roles for Joiner Mover Leaver(JML), the Create Account operation is not supported.
  Computers must be registered via the PM Cloud Adapter installation.
   
   <img src="images/Unsupported-CreateAccount.png" alt="Unsupported Create Account">

  A condition must be added to the Roles to prevent the Assign Group operation to be sent before IdentityNow sees the Computer Account.
   
   <img src="images/Role-DefineAssignment.png" alt="Define Assignment criteria">



<h2>Disable, Enable, Remove Account</h2>

  Disable, Enable and Remove Account are supported operations. 
   
   <img src="images/DisableAccount.png" alt="Disable Account">

  A disabled Computer Account shows as Archived in PM Cloud. 
   
   <img src="images/Archived.png" alt="Archived Computer">


  
<h2>Unit testing using Postman collection</h2>

  Test Connection
   
   <img src="images/TestConnection.png" alt="Test Connection">

  
  Get all Computers

   <img src="images/AccountList.png" alt="Get all Computers">

  
  Get a single Computer

   <img src="images/AccountRead.png" alt="Get a Computer">

  
  Get all Groups
  
   <img src="images/EntitlementList.png" alt="Get all Groups">

  
  Assign Computer to Group
  
   <img src="images/AccountUpdate.png" alt="Assign Computer to Group">

  Archive Computer (Disable)
  
   <img src="images/AccountDisable.png" alt="Archive Computer">

  Un-Archive Computer (Enable)
  
   <img src="images/AccountEnable.png" alt="Un-Archive Computer">

  Delete Computer
  
   <img src="images/DeleteAccount.png" alt="Delete Computer">


  <h2>Smart Error Handling</h2>

  Axios errors are tapped in code, so information can be provided to a User encountering an error to assist with identifying the possible cause, assuming misconfiguration.

  <img src="images/SmartError-badHost.png" alt="Host not found">
  
  <img src="images/SmartError-badCreds.png" alt="Invalid Credentials">
  

