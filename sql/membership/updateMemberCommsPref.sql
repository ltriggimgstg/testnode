-- add query here
UPDATE salesforce.member__c
SET
	hasoptoutofmarketing__c = ${optedOutOfMktg}
WHERE  herokuid__c =  ${membershipId}
