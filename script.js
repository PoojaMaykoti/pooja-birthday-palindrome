function reverseStr(str){
  var reversedStr;

  var listOfChars = str.split('');

  var reverseListOfChars = listOfChars.reverse();


  return reversedStr = reverseListOfChars.join('');
  

}

function ispalindrome(str){
var reverse = reverseStr(str);

if(str === reverse){
  return true;
}
return false;
}


function convertDateToStr(date){
var dateStr = {
  day:'', month:'', year:'' };

if(date.day < 10){
  dateStr.day = '0'+ date.day;
}
else{
  dateStr.day = date.day.toString();
}

if(date.month < 10){
  dateStr.month = '0'+ date.month;
}
else{
  dateStr.month = date.month.toString();
}
dateStr.year = date.year.toString();

return dateStr;

}

function getAllDateFormats(date){
var dateStr = convertDateToStr(date);

var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
var mmddyyyy = dateStr.month + dateStr.day + dateStr.year; 
var yyyymmdd = dateStr.year + dateStr.month + dateStr.day
var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

return [ ddmmyyyy , mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}


function checkPalindromeForAllDateFormats(date){
var listsOfPalindrome = getAllDateFormats(date);

var flag = false;

for( var i=0; i<listsOfPalindrome.length; i++){
  if(ispalindrome(listsOfPalindrome[i])){
    flag = true;
    break;
  }
}
return flag;
}

function isLeapYear(year){
if(year % 400 ===0){
  return true;
}

if(year % 100 ===0){
  return false;
}
if(year % 4 ===0){
  return true;
}
return  false;
}
// get next date
function getNextDate(date){
var day = date.day +1 ; // increament the day
var month = date.month;
var year = date.year;

var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// check for february

if(month === 2 ){  

  // check for leap year
    if(isLeapYear(year)){
      if(day > 29){
        day = 1;
        month++;
      }
    }
   else{
     if(day > 28){
       day = 1;
       month++;
     }
   } 
}


// check for other months
else{
  // check if the day exceeds the max days in months
  if(day > daysInMonth[month-1]){
    day = 1;
    month++;
  }
}

// increament the year if months greater than 12
if(month > 12){
  month = 1;
  year++;
}

return {
  day : day,
  month : month,
  year : year
};
}
// get next palindrome date
function getNextPalindromeDate(date){

var counter = 0;
var nextDate = getNextDate(date);

while(1){
 counter++;
 var isPalindrome = checkPalindromeForAllDateFormats(nextDate);

 if(isPalindrome){
   break;
 }

 nextDate = getNextDate(nextDate)
}

return [counter, nextDate];
}

var dateInput = document.querySelector('#dob-input');

var showButton = document.querySelector('#show-btn');

var result = document.querySelector('#result');


function clickHandler(e){
var bdayStr = dateInput.value; // 2020-10-11

if(bdayStr !== ''){
  var listOfDate = bdayStr.split('-'); // ['2020', '10', '11']

  var date = {
    day: Number(listOfDate[2]),
    month: Number(listOfDate[1]),
    year: Number(listOfDate[0])
  };
  
  var isPalindrome = checkPalindromeForAllDateFormats(date);

  if(isPalindrome){
     result.innerText = 'Yay! your birthday is a palindrome!! 🥳🥳';
  }
  else {
    var [counter, nextDate] = getNextPalindromeDate(date);

    result.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${counter} days! 😔`;
 }
  // console.log(isPalindrome);
}
}







showButton.addEventListener('click', clickHandler)

// var date={
//   day : 12,
//   month: 2,
//   year :2020
// } 

// console.log(getNextPalindromeDate(date));

// 1202  2021
// 2021 1202