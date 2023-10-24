/**
 * Part 1
 * Create a function that receives 2 strings. The second string must contain only a letter
 * It should return the number of times that letter (second parameter) is included in the string (first parameter).
 * It should not differentiate between uppercase and lowercase letters
 * Check that both parameters are strings and the second string is only 1 character. If there's an error, print a message and return -1 
 * Example: timesChar("Characteristic", "c") -> 3
 */
console.log("EXERCISE 1 - PART 1");

function timesChar(string, letter) {
    if (letter.length == 1) {
        string = string.toLocaleLowerCase();
        letter = letter.toLocaleLowerCase();
        let counter = 0;
        for (let i = 0; i < string.length; i++) {
            if (string[i] == letter) {
                counter++;
            }
        }
        console.log(counter);
    }
    else {
        console.log("Error, letter is more than 1 letter or equals to 0.");
    }
}

timesChar("Characteristic", "c");

/**
 * Part 2
 * Create an array of strings.
 * Filter the array to include only the strings which their length is at least 5 characters
 * Transform all the strings in the filtered array to UPPERCASE
 * Print the resulting array, using ";" as the separator
 * Don't use traditional loops! (while, for, ...) 
 */
console.log("EXERCISE 1 - PART 2");

let strings = ["Hello", "My name is", "Erik"];

if (strings[0].length < 5) {
    strings.pop(0);
}
if (strings[1].length < 5) {
    strings.pop(1);
}
if (strings[2].length < 5) {
    strings.pop(2);
}

console.log(strings[0] + ";" + strings[1]);

/**
 * Part 3
 * Create a function that receives 3 parameters with default values (product -> "Generic product",
 * price -> 100, tax 21). Transform the product's name to string and the other 2 parameters to number.
 * If price or tax cannot be converted to number (NaN), show an error.
 * Finally, print the received product and the final price (including taxes) 
 * Call this function several times, omitting parameters or sending not numeric values.
 */
console.log("EXERCISE 1 - PART 3");

function exercise3(product, price, tax) {
    if (isNaN(price) || isNaN(tax)) {
        console.log("Error, price or tax isn't a number");
    }
    else {
        console.log(product + " - Price: " + price + " - Tax: " + tax);
    }
}

exercise3("Generic product 1", 100, 21);
exercise3("Generic product 2", "ds", 21);
exercise3("Generic product 3", 50, "we");
exercise3("Generic product 4", 70, "32");
exercise3("Generic product 5", "20", 54);
exercise3("Generic product 6", "28", "99");

/**
 * Part 4
 * Create an array with 4 values and do the following (use the correct array methods).
 * Add 2 elements at the beginning
 * Add 2 more at the end.
 * Delete positions 3,4 and 5
 * Insert 2 elements before the last element.
 * On each change, show the resulting array with its elements separated by '=>' (don't use any loop).
 */
console.log("EXERCISE 1 - PART 4");

let array = [1, 2, 3, 4];
console.log("=> " + array);

array.unshift(-1, 0);
console.log("=> " + array);

array.push(5, 6);
console.log("=> " + array);

array.splice(3, 3);
console.log("=> " + array);

array.splice(array.length - 1, 0, 7, 8);
console.log("=> " + array);

/**
 * Part 5
 * Create an array with several strings. Using the reduce method, return a string
 * that is a concatenation of the first letter of every string in the array.
 */

console.log("EXERCISE 1 - PART 5");

let array5 = ["String 1", "string 2", "$tring 3", "8tring 4"];
console.log(array5.reduce((total, firstLetter) => total += firstLetter.substring(0, 1), ""));

/**
 * Part 6
 * Create an array with several strings. Using the reduce method, return the total length of all the strings.
 */
console.log("EXERCISE 1 - PART 6");

let array6 = ["String 1", "string 22", "$tring 333", "8tring 4444"];
console.log(array6.reduceRight((total, word) => total + word).length);

/**
 * Part 7
 * Create a function that receives an array and adds the first three numbers of the array.
 * Use array destructuring in the parameters to get those three numbers.
 * If any of those numbers is not present in the array, a default value of 0 will be assigned
 * Return the result of adding those three numbers
 */
console.log("EXERCISE 1 - PART 7");

function exercise7([num1, num2, num3]) {
    return num1 + num2 + num3;
}
let array7 = [1, 2, 3, 4];
const modifiedArray = exercise7(array7);
console.log(modifiedArray);

/**
 * Part 8
 * Create a funcion that can receive as many numbers as you want by parameter. Use rest to group them in
 * an array and print the ones that are even and the ones that arre odd separately. 
 * DON'T use loops (for, while, etc.)
 * Call this function several times with different values.
 */
console.log("EXERCISE 1 - PART 8");

function printEvenOddNumbers(...numbs) {
    const evenNumbers = numbs.filter(num => num % 2 === 0);
    const oddNumbers = numbs.filter(num => num % 2 !== 0);

    console.log("Even numbers:", evenNumbers.toString());
    console.log("Odd numbers:", oddNumbers.toString());
}

printEvenOddNumbers(1, 3, 4, 6, 9, 35);
console.log("");
printEvenOddNumbers(2, 7, 5, 32, 956);



/**
 * Part 9
 * Create a Map object. The key will be a student name, and the value an array with all his/her exam marks.
 * Iterate through the Map and show each student's name, the marks separated by '-' and the average mark (with 2 decimals).
 * Example: Peter (7.60 - 2.50 - 6.25 - 9.00). Average: 6.34
 */
console.log("EXERCISE 1 - PART 9");

let students = new Map();
students.set("Peter", [7.6, 2.5, 6.25, 9]);
students.set("Markus", [6, 7.25, 9, 10]);
students.set("Jessica", [2, 5.5, 4.85, 3]);

for (let data of students) {
    let average = 0;
    for (let i = 0; i < data[1].length; i++) {
        average += data[1][i];
    }
    average /= data[1].length;
    console.log(data[0] + " (" + data[1].join(" - ") + "). Average: " + average.toFixed(2));
}

/**
 * Part 10
 * Create a function that receives an array, deletes its duplicated values and prints them.
 * Create a Set object from the array to delete the duplicated values.
 */
console.log("EXERCISE 1 - PART 10");

let set = new Set();

function exercise10(array) {
    let uniqueValues = new Set(array);
    let uniqueArray = [...uniqueValues];
    console.log(uniqueArray);
}

let data = [1, 2, 3, 4, 4, 5, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10, 10, 10];

exercise10(data);