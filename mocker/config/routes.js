/**
 *
 */

const Contact = require('../route/contact');
const Member = require('../route/member');
const Picklists = require('../route/picklists');
module.exports = [
    {
        method: 'GET',
        path: '/services/data/v38.0/sobjects/Contact/{id}',
        config: Contact.getContact
    },
    {
        method: 'PUT',
        path: '/services/data/v38.0/sobjects/Contact/{id}',
        config: Contact.updateContact
    },
    {
        method: 'GET',
        path: '/services/data/v38.0/query/',
        config: Member.getLinkedMember
    },
    {
        method: 'GET',
        path: '/services/data/v38.0/sobjects/Member__c/describe/',
        config: Picklists.getPicklists
    },
    {
        method: 'GET',
        path: '/services/data/v38.0/sobjects/Provinces/{countryCode}',
        config: Picklists.getProvinces
    }
]