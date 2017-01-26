'use strict';

const toModel = function(data){
    //TODO: map the required fields when there is some data
    const o = {};
    ({
        label: o.label,
        value: o.value, 
    } = data);
    return o;
};

module.exports ={
    toModel
};