import { AttributeChange, ConnectorError, StdAccountCreateInput, StdAccountCreateOutput, StdEntitlementListOutput } from "@sailpoint/connector-sdk"
import { Group } from "../model/group"
import { User } from "../model/user"
import { Container } from "../model/container"

export class Util {
  

    /**
     * converts user object to IDN account output
     *
     * @param {User} user User object
     * @returns {StdAccountCreateOutput} IDN account create object
     */
    public userToAccount(user: User): StdAccountCreateOutput {
        return {
            // Convert id to string because IDN doesn't work well with number types for the account ID
            identity: user.id ? user.id : '',
            uuid: user.id ? user.id : '',
            attributes: {
                id: user.id ? user.id : '',
                hostType: user.hostType ? user.hostType : '',
                created: user.created ? user.created : '',
                adapterVersion: user.adapterVersion ? user.adapterVersion : '',
                packageManagerVersion: user.packageManagerVersion ? user.packageManagerVersion : '',
                agentVersion: user.agentVersion ? user.agentVersion : '',
                authorisationState: user.authorisationState ? user.authorisationState : '',
                authorised: user.authorised ? user.authorised : '',
                lastConnected: user.lastConnected ? user.lastConnected : '',
                deactivated: user.deactivated ? user.deactivated : false,
                autoDeactivated: user.autoDeactivated ? user.autoDeactivated : false,
                pendingDeactivation: user.pendingDeactivation ? user.pendingDeactivation : false,
                deactivatedOn: user.deactivatedOn ? user.deactivatedOn : '',
                group: user.groupId ? user.groupId : '',
                groupName: user.groupName ? user.groupName : '',
                policyId: user.policyId ? user.policyId : '',
                policyName: user.policyName ? user.policyName : '',
                policyRevision: user.policyRevision ? user.policyRevision : -1,
                policyRevisionStatus: user.policyRevisionStatus ? user.policyRevisionStatus : '',
                macAddress: user.endpointInformation.macAddress ? user.endpointInformation.macAddress : '',
                osArchitecture: user.endpointInformation.osArchitecture ? user.endpointInformation.osArchitecture : '',
                osCaption: user.endpointInformation.osCaption ? user.endpointInformation.osCaption : '',
                osCodeSet: user.endpointInformation.osCodeSet ? user.endpointInformation.osCodeSet : '',
                osComputerDescription: user.endpointInformation.osComputerDescription ? user.endpointInformation.osComputerDescription : '',
                osCountryCode: user.endpointInformation.osCountryCode ? user.endpointInformation.osCountryCode : '',
                osInstallDate: user.endpointInformation.osInstallDate ? user.endpointInformation.osInstallDate : '',
                osManufacturer: user.endpointInformation.osManufacturer ? user.endpointInformation.osManufacturer : '',
                osOrganization: user.endpointInformation.osOrganization ? user.endpointInformation.osOrganization : '',
                osSerialNumber: user.endpointInformation.osSerialNumber ? user.endpointInformation.osSerialNumber : '',
                osSystemDirectory: user.endpointInformation.osSystemDirectory ? user.endpointInformation.osSystemDirectory : '',
                osSystemDrive: user.endpointInformation.osSystemDrive ? user.endpointInformation.osSystemDrive : '',
                osVersion: user.endpointInformation.osVersion ? user.endpointInformation.osVersion : '',
                osVersionString: user.endpointInformation.osVersionString ? user.endpointInformation.osVersionString : '',
                processorCaption: user.endpointInformation.processorCaption ? user.endpointInformation.processorCaption : '',
                processorDescription: user.endpointInformation.processorDescription ? user.endpointInformation.processorDescription : '',
                processorManufacturer: user.endpointInformation.processorManufacturer ? user.endpointInformation.processorManufacturer : '',
                processorName: user.endpointInformation.processorName ? user.endpointInformation.processorName : '',
                systemDnsHostName: user.endpointInformation.systemDnsHostName ? user.endpointInformation.systemDnsHostName : '',
                systemDomain: user.endpointInformation.systemDomain ? user.endpointInformation.systemDomain : '',
                systemManufacturer: user.endpointInformation.systemManufacturer ? user.endpointInformation.systemManufacturer : '',
                systemModel: user.endpointInformation.systemModel ? user.endpointInformation.systemModel : '',
                systemName: user.endpointInformation.systemName ? user.endpointInformation.systemName : '',
                systemPrimaryOwnerName: user.endpointInformation.systemPrimaryOwnerName ? user.endpointInformation.systemPrimaryOwnerName : '',
                systemSystemType: user.endpointInformation.systemSystemType ? user.endpointInformation.systemSystemType : '',
                systemWorkgroup: user.endpointInformation.systemWorkgroup ? user.endpointInformation.systemWorkgroup : '',
                certificateInformation: user.certificateInformation ? user.certificateInformation: '',
                hostPolicyId:  user.hostPolicyId ? user.hostPolicyId: '',
                hostPolicyName:  user.hostPolicyName ? user.hostPolicyName: '',
                hostPolicyRevision:  user.hostPolicyRevision ? user.hostPolicyRevision: 0,
                hostLastUpdated:  user.hostLastUpdated ? user.hostLastUpdated: '',
                agentLogs:  user.agentLogs ? user.agentLogs: '',
                duplicateCount:  user.duplicateCount ? user.duplicateCount: 0,
                credentialType:  user.credentialType ? user.credentialType: '',
                policyUpdateTimeStamp:  user.policyUpdateTimeStamp ? user.policyUpdateTimeStamp: '',
                daysDisconnected:  user.daysDisconnected ? user.daysDisconnected: 0,
                connectionStatus:  user.connectionStatus ? user.connectionStatus: '',
                archived:  user.archived ? user.archived: false,
                archivedOn:  user.archivedOn ? user.archivedOn: ''
                        }
        }
    }

    /**
     * converts group object to IDN Entitlement List Output
     *
     * @param {Group} group group object
     * @returns {StdAccountCreateOutput} IDN Entitlement List Output
     */
    public groupToEntitlement(group: Group): StdEntitlementListOutput {
        return {
            identity: group.id,
            uuid: group.id,
            type: 'group',
            attributes: {
                id: group.id,
                name: group.name,
                description: group.description,
                computerCount: group.computerCount,
                activeComputers: group.activeComputers,
                created: group.created,
                policyRevisionId: group.policyRevisionId,
                policyId: group.policyId,
                policyRevisionStatus: group.policyRevisionStatus,
                policyName: group.policyName,
                revision: group.revision,
                default: group.default,
                locked: group.locked,
                errorInfo: group.errorInfo
             }
        }
    }

   
}