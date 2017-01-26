-- add query here
SELECT salesforce.product__c.name AS "description",
        heroku.orderitem.quantity AS "quantity",
        (coalesce(heroku.orderitem.total_price, 0) + coalesce(cast(heroku.orderitem.currency as double precision), 0)) AS "amount",
	    heroku.order.status AS "status",
	    heroku.orderitem.paid_datetime AS "date",
        salesforce.account.name AS "clubName",
	    'TBD' AS "invoiceNo"
FROM heroku.membership 
    JOIN heroku.orderitem ON heroku.membership.order_item = heroku.orderitem.id
    JOIN heroku.order ON heroku.orderitem.order = heroku.order.id
    JOIN salesforce.product__c ON heroku.orderitem.product = salesforce.product__c.sfid
    JOIN salesforce.account ON heroku.order.orderer_account = salesforce.account.sfid
WHERE heroku.membership.member =  ${membershipId}