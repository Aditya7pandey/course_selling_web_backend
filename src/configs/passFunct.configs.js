
const lowerCase = (str)=>{
    for(let char of str){
        if(char >= 'a' && char<='z'){
            return true;
        }
    }
    return false;
}

const upperCase = (str) =>{
    for(let char of str){
        if(char >= 'A' && char<='Z'){
            return true;
        }
    }
    return false;
}

module.exports = {
    lowerCase,
    upperCase
}