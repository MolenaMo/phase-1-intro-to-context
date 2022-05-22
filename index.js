// 4-element array-listed as parameters
function createEmployeeRecord([firstName,familyName,title,payPerHour]){
   /* the Returns, as Objects,  below are the keys--value TBD*/
   //create/name the object
    let employeeObj = {
        'firstName':firstName,
        'familyName':familyName,
        'title':title,
        'payPerHour':payPerHour,
        'timeInEvents':[],
        'timeOutEvents':[],
    }
    return employeeObj
/*Loads Array elements into corresponding Object properties. Additionally, 
initialize empty Arrays on the properties timeInEvents and timeOutEvents.*/
}

/*array of arrays---of what?*/
function createEmployeeRecords(records){
/*Returns array of objects*/
//create variable & for loop?
let employeeArr = []
for(const record of records){
    employeeArr.push(createEmployeeRecord(record))
}
return employeeArr
/* purpose of this function: Converts each nested Array into an employee record
 using createEmployeeRecord and accumulates it to a new Array*/
}

/*arguments-an employee record as an object? and date stamp in this format "year-MM-DD-HHMM"(as a string?)*/
function createTimeInEvent(record,timeStamp){
    /*Returns employee record*/
    //create some variables
    let dateArray = timeStamp.split(' ')
    let timeInObject = {
        'type':'TimeIn',
        'hour': parseInt(dateArray[1].slice(0,2) + "00"),
        'date': dateArray[0]
    }
    record.timeInEvents.push(timeInObject)
    return record
}/*Add an Object with keys to the timeInEvents Array on the record Object:
type: Set to "TimeIn"
hour: Derived from the argument
date: Derived from the argument*/

/*same as above --just TimeOut instead of in*/
function createTimeOutEvent(record,timeStamp){
    /*Returns the employee record*/
    let dateArray = timeStamp.split(' ')
    let timeOutObject = {
        'type':'TimeOut',
        'hour': parseInt(dateArray[1].slice(0,2) + "00"),
        'date': dateArray[0]
    }
    record.timeOutEvents.push(timeOutObject)
    return record
}

function hoursWorkedOnDate(record,date){
    /*returns hours woeked, as integer*/
    //variables 
    let hourOut, hourIn
    for(const out of record.timeOutEvents){
    if(out ['date']=== date){
        hourOut = out['hour']
    }
}
    for(const inTime of record.timeInEvents){
    if(inTime ['date']=== date){
        hourIn = inTime['hour']
    }
}
return (hourOut-hourIn)/ 100
}/* Given a date, find the number of hours elapsed between that 
date's timeInEvent and timeOutEvent*/

function wagesEarnedOnDate(record,date){
    /*Returns pay owed--as a number*/
    return hoursWorkedOnDate(record,date) * record.payPerHour
}
/*Using hoursWorkedOnDate, multiply the hours by the record's payRate
 to determine amount owed.*/


function allWagesFor(object){
    /*return pay owed for all dates*/
    //helper variable
    let dateArray = []
    for(const punchOut of object.timeOutEvents){
        dateArray.push(punchOut['date'])
    }
    let tot = 0
    for(const date of dateArray){
        tot += wagesEarnedOnDate(object,date)
    }
    return tot
}/*Using wagesEarnedOnDate, accumulate the value of all dates worked by the 
employee in the record used as context. Amount should be returned as a number. 
HINT: You will need to find the available dates somehow...*/


/*Array of employee records*/
function calculatePayroll(array){
    /*Returns sum of pay owed to all employees for all dates as a number*/
let payroll = 0 
for(const emp of array){
    payroll += allWagesFor(emp)
}
return payroll
}
