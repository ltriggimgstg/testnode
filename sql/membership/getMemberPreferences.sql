-- add query here
SELECT	herokuid__c AS "membershipId",
	organisation__c AS "organisationId",
	sportstgmemberaccount__c AS "accountId",
	name AS "name",
	firstname__c AS "firstName",
	lastname__c AS "lastName",
	salutation__c AS "salutation",
	birthdate__c AS "dob",
	json_build_object(
		'isPreferred', 'TBD',
		'email', email__c
	) AS "emails",
	mobilephone__c AS "mobilePhone",
	homephone__c AS "homePhone",
	phone__c AS "otherPhone",
	hasoptedoutoffax__c AS "hasOptedOutOfFax",
	hasoptoutofmarketing__c AS "optedOutOfMktg",
	publicprofilevisibility__c AS "isProfilePublic",
	hasoptedoutofemail__c AS "recieveClubAnnc",
	donotcall__c AS "contactByPhone",
	'TBD' AS "photoURL",
	json_build_object(
		'street', mailingstreet__c,
		'suburb', mailingcity__c,
		'postalCode', mailingpostalcode__c,
		'state', mailingstate__c,
		'country', mailingcountry__c
	) AS "mailingAddr",
	json_build_object(
		'street', otherstreet__c,
		'suburb', othercity__c,
		'state', otherstate__c,
		'postalCode', otherpostalcode__c,
		'country', othercountry__c
	) AS "otherAddr",
	'TBD: membersecurity.RelatedThirdParty' AS "parentMemberId",
	'Stephen Smith Sr.' AS "parentGuardian",
	'Essendon Bombers' AS "teamSupported"
 FROM salesforce.member__c 
 WHERE herokuid__c =  ${membershipId}