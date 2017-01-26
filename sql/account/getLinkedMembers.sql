-- add query here
SELECT heroku.membership.firstName AS "firstName",
	heroku.membership.lastName AS "lastName",
    heroku.membership.organisation AS "organisationId",
    heroku.membership.id AS "membershipId",
    heroku.membership.member AS "memberId",
    salesforce.account.photourl AS "photourl",
    salesforce.member__c.sportstgmemberaccount__c AS "accountId"
FROM heroku.membership
    JOIN salesforce.member__c ON heroku.membership.member = salesforce.member__c.herokuid__c
	JOIN salesforce.account ON heroku.membership.organisation = salesforce.account.sfid
 WHERE salesforce.member__c.herokuid__c IN ($1:csv)