SELECT id AS "databaseKey", herokuid__c AS "memberId" 
FROM salesforce.member__c 
WHERE sportstgmemberaccount__c = $1