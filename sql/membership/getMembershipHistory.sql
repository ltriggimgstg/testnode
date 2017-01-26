-- add query here
SELECT    heroku.membership.organisation AS "organisationId",
    heroku.membership.id AS "membershipId",
    heroku.membership.member AS "memberId",
    'heroku.membership.TBD' AS "orgSmLogoURL",
    coalesce(salesforce.account.name, '') || ' ' || coalesce(salesforce.account.shippingcity, '') || ' ' || coalesce(salesforce.membertype__c.name, '') || ' ' || coalesce(heroku.membership.status, '') AS "name",
    heroku.membership.status AS "status",
    heroku.membership.start_date AS "startDate",
    heroku.membership.end_date AS "endDate",    
    heroku.membership.member AS "accountId",
    salesforce.membertype__c.name AS "memberType",
    salesforce.account.name AS "clubName",
    'Age 21' AS "ageGroup"
FROM heroku.membership 
    JOIN heroku.membertypeassignment ON heroku.membership.id = heroku.membertypeassignment.membership
    JOIN salesforce.membertype__c ON heroku.membertypeassignment.member_type = salesforce.membertype__c.sfid
    JOIN salesforce.account ON heroku.membership.organisation = salesforce.account.sfid
WHERE heroku.membership.member =  ${membershipId} 
ORDER BY heroku.membership.end_date DESC, heroku.membership.organisation