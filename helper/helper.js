
const S = require('string');

let checkUrl = (str) => {

    if(S(str).contains('http://')){
        str = S(str).replaceAll('http://',''); 
        return str.s;
    }
    else if(S(str).contains('https://')){
        str = S(str).replaceAll('https://',''); 
        return str.s;
    }
    else{
        return str;
    }
}
module.exports = {checkUrl}