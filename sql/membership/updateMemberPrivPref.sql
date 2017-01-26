-- add query here
UPDATE salesforce.member__c
SET
	publicprofilevisibility__c = ${isProfilePublic}
WHERE  herokuid__c =  ${membershipId}
