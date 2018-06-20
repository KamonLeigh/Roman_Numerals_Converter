const numberToRoman = (num) =>{
    // Make list of single units
    const list = {MM: 2000, M:1000, CM: 900, D: 500, CD: 400, C:100, XC: 90, L:50, XL:40, X:10, IX: 9, V: 5, IV: 4, I:1}
    num = Math.floor(num)
    // This stores the Roman numerals
    let result = ''
   
    for(const key in list){
        //  loop through the keys if if statement is true. I will round figure and save key to
        //  result  
        const outcome = num / list[key]
        if(outcome >= 1 ){
           const times =  Math.floor(outcome)
           const letter = key.repeat(times)
           result += letter
           //calculate remaining numbers and go again :)
           num  = num - (list[key] * times)
        }

    }
    return result
    

}

//console.log(numberToRoman(2018))


const romanToNumber = (str) => {
    str = str.toUpperCase()
    // Table is different from above as I had to deal with triple letters
    const list = { MM:2000, M: 1000, CM: 900, D: 500, CD: 400, CCC: 300, CC:200, C: 100, XC: 90, L: 50, XL: 40,  XXX: 30, XX:20, X: 10, IX: 9, V: 5, IV: 4, III:3, II: 2, I: 1 }
    let result = 0 

    Object.keys(list).forEach(item => {
        if(str.indexOf(item) === 0){
           result += list[item]
           str = str.replace(item, '');
          }
        })

        if(str.length > 0) {
           return console.log('invalid input')
        }
        
        return result
}



module.exports = {
    romanToNumber,
    numberToRoman
}