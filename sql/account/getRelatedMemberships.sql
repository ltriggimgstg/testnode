-- add query here
SELECT	organisation__c AS "organisationId",
	Id AS "memberId",
	firstname__c AS "firstName",
	lastname__c AS "lastName",
	herokuid__c AS "accountId"
 FROM salesforce.member__c 
 WHERE herokuid__c =  ${accountId}
 AND  organisation__c =  ${organisationId}