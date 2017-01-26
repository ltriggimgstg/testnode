'use strict';

const toModel = function(data){
    //TODO: map the required fields when there is some data
    const a = [];
    if( data.totalSize >0){
    //add parsed rows    
    }
    
    /*({
        [name + 'Street']: o.Street,
        [name + 'City']: o.suburb, 
        [name + 'State']: o.shippingstate,
        [name + 'PostalCode']: o.postalCode,
        [name + 'Country']: o.country,
        [name + 'Longitude']: o.long,
        [name + 'Latitude']: o.lat,
        [name + 'GeocodeAccuracy']: o.geoCodeAcc
    } = data);*/
    return a;
};

module.exports ={
    toModel
};