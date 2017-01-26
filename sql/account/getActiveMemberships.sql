--sample SQL
SELECT heroku.membership.firstName || ' ' || heroku.membership.lastName AS "name",
    heroku.membership.member_name AS "memberName",
    heroku.membership.status AS "status",
    heroku.membership.organisation AS "organisationId",
    heroku.membership.id AS "membershipId",
    heroku.membership.member AS "memberId",
    salesforce.account.photourl AS "orgSmLogoURL",
    salesforce.member__c.sportstgmemberaccount__c AS "accountId"
FROM heroku.membership
    JOIN salesforce.member__c ON heroku.membership.member = salesforce.member__c.herokuid__c
    JOIN salesforce.account ON heroku.membership.organisation = salesforce.account.sfid
WHERE salesforce.member__c.sportstgmemberaccount__c = ${accountId}
    AND heroku.membership.status = 'Active'