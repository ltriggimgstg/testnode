'use strict';
const lookup = [128,64,32,16,8,4,2,1];
const keys = [];
const children ={};
let _parent = [];
/**
 * Returns a structure of arrays in the form of {parent1.value: [child1, child2], parent2.value: [child2, child3]}.
 * Note: a child can have multiple parents. If a parent does not have any children it will not be in the returned structure.
 * @param {array} parent - The parent picklist. eg country.
 * @param {array} child - The dependent picklist. eg state.
 */
function mapDependents(parent, child){
    _parent = parent;
    for(let element of child){
        setParents(element);
    }
    return children;
}

function setParents(child){
    if(keys[child.validFor] === undefined){
        keys[child.validFor] = decode(child.validFor);
    }
    for(let i of keys[child.validFor]){
        if(children[_parent[i].value] === undefined){
            children[_parent[i].value] =[];
        }
        children[_parent[i].value].push(child);
    }
}

function decode(b64string){
    const arr8 = new Uint8Array(Buffer.from(b64string, 'base64'));
    const index =[];
    for(let i in arr8){
        if(arr8[i]){
            for(let j in lookup){
                if(arr8[i] & lookup[j]){
                    index.push((i*8) + (j*1));
                }
            }
        }
    }
    return index;
}
module.exports = mapDependents;