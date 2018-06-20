const operations = require('./functions.js');


test("should convert 'MMXVI' to 2016", () =>{
    const result = operations.romanToNumber('MMXVI');
    expect(result).toBe(2016);
});


test('dealing with triple letter in middle of string "LXXXVII"', () =>{
    const input = 'LXXXVII'
    const result = operations.romanToNumber(input)
    expect(result).toBe(87);
});

test("deal with triple letter at the end of string 'MMXVIII'", () =>{
    const input = 'MMXVIII';
    const result = operations.romanToNumber(input);
    expect(result).toBe(2018)
});


test('deal with triple number at the begining of string', () => {
    const input = 'MMMIV';
    const result = operations.romanToNumber(input);
    expect(result).toBe(3004);
});

/* Note that this test below may have taken place before look up table update
   table stopped at MM: 2000 in RomanToNumber function 
*/

test('upper limit of look up table in function romanToNumber', ()=>{
    const input = 'MMMM';
    const result = operations.romanToNumber(input);
    expect(result).toBe(3000);
});

test('should handle lowercase strings', () => {
    const input = 'mmxviii';
    const result = operations.romanToNumber(input);
    expect(result).toBe(2018);
});

/* TESTING numberToRoman */

test('should return large number in correct format', () => {
    const input = 2018;
    const result = operations.numberToRoman(input);
    expect(result).toBe('MMXVIII');
});

test('should handle decimal numbers', () => {
    const input = 2018.3;
    const result = operations.numberToRoman(input);
    expect(result).toBe('MMXVIII');
});


test('handling edge case numbers live IX :9', () => {
    const input = 59;
    const result = operations.numberToRoman(input);
    expect(result).toBe('LIX');
});