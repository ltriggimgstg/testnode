'use strict';

const Auth = require('../../route/auth');
const Account = require('../../route/account');
const Membership = require('../../route/membership');
const Organisation = require('../../route/organisation');
const AuthCache = require('../../route/authCache');
const SFPersonalInfo = require('../../route/sfPersonalInfo');

module.exports = [

    //{ method: 'GET', path: '/Login', config: Auth.login},
    { method: 'GET', path: '/Account/{accountId}/Memberships', config: Account.getActiveMemberships},
    { method: 'GET', path: '/Account/{accountId}/Organisation/{organisationId}/RelatedMemberships', config: Account.getRelatedMemberships},
    { method: 'GET', path: '/Account/{accountId}/PersonalInfo', config: Account.getPersonalInfo},
    { method: 'PUT', path: '/Account/{accountId}/PersonalInfo', config: Account.updatePersonalInfo},
    { method: 'GET', path: '/Membership/{membershipId}/MemberPreferences', config: Membership.getMemberPreferences},
    { method: 'PUT', path: '/Membership/{membershipId}/MemberPreferences', config: Membership.updateMemberPreferences},
    { method: 'PATCH', path: '/Membership/{membershipId}/MemberCommsPreference', config: Membership.updateMemberCommsPref},
    { method: 'PATCH', path: '/Membership/{membershipId}/MemberPrivPreference', config: Membership.updateMemberPrivPref},
    { method: 'GET', path: '/Membership/{membershipId}/MembershipHistory', config: Membership.getMembershipHistory},
    { method: 'GET', path: '/Membership/{membershipId}/TransactionsHistory', config: Membership.getTransactionsHistory},
    { method: 'POST', path: '/Organisation/{organisationId}/MembershipSubscription', config: Organisation.insertMembershipSubscription},
    { method: 'POST', path: '/Organisation/{organisationId}/RegistrationForm', config: Organisation.insertRegistrationForm},

    //TODO: Mocked route, will be update later
    { method: 'GET', path: '/AuthCache/{memberId}/GetAuthToken', config: AuthCache.getAuthToken},
    { method: 'GET', path: '/SFPersonalInfo/{token}/Member/{memberId}/GetPersonalInfo', config: SFPersonalInfo.getPersonalInfo},
];
