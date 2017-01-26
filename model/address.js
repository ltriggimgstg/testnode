'use strict';

const toModel = function(name,data){
    const o = {};
    ({
        [name + 'Street']: o.Street,
        [name + 'City']: o.Suburb, 
        [name + 'State']: o.Shippingstate,
        [name + 'PostalCode']: o.PostalCode,
        [name + 'Country']: o.Country,
        [name + 'Longitude']: o.Long,
        [name + 'Latitude']: o.Lat,
        [name + 'GeocodeAccuracy']: o.GeoCodeAcc
    } = data);
    return o;
};

module.exports ={
    toModel
};