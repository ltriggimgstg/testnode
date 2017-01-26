-- dummy SQL
--- SELECT 'Blah' AS name, 'What' AS detail
SELECT	organisation__c AS "organisationId",
        Id AS "memberId",
        firstname__c AS "firstName",
        lastname__c AS "lastName",
        herokuid__c AS "accountId"
FROM salesforce.member__c
WHERE herokuid__c =  ${accountId}