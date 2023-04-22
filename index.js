// DOM elements
var btnAddActivity = document.querySelector(".btn-add-activity");
var inputAddAmount = document.querySelector(".add-amount");
var inputAddDetails = document.querySelector(".add-details-text");
var transactionType = document.querySelector(".select-transaction-type");
var activityLogTimes = document.querySelectorAll(".current-time-scope");
var balance = document.querySelector(".balance");
var amountSpent = document.querySelector(".amount-spent");
var budgetedAmount = document.querySelector(".budgeted-amount");
var goalAmount = document.querySelector(".goal-amount");
var savedAmout = document.querySelector(".saved-amount");
// get current time for the timestamp in the table
var currentDate = new Date();
var currentHours = currentDate.getHours();
var currentMinutes = currentDate.getMinutes();
var currentTimeStamp = "".concat(currentHours, ":").concat(currentMinutes);
console.log(currentTimeStamp);
// setting the current time to the th element
activityLogTimes.forEach(function (activityLogTime) {
    activityLogTime.innerHTML = currentTimeStamp;
});
// activity log class. was testing the table data
// class ActivityLog {
//   time: string;
//   amount: number;
//   details: string;
//   transaction: number;
//   constructor(
//     time: string,
//     amount: number,
//     details: string,
//     transaction: number
//   ) {
//     this.time = time;
//     this.amount = amount;
//     this.details = details;
//     this.transaction = transaction;
//   }
// }
// let listItems: any = [
//   new ActivityLog("10:00", 20, "breakfast with friends", 1),
//   new ActivityLog("13:00", 7, "smoothie", 1),
//   new ActivityLog("17:00", 200, "Uber payment", 2),
// ];
var dailyTransactionsTable = document.getElementById("daily-transactions-list");
var totalBalance = [];
// add new daily transaction line with input data to the table
function addToDailyTransactionsList() {
    // create new table row and table cells
    var newRow = dailyTransactionsTable.insertRow(-1);
    var newCellTime = newRow.insertCell(0);
    var newCellAmount = newRow.insertCell(1);
    var newCellDetails = newRow.insertCell(2);
    var newCellTransactionType = newRow.insertCell(3);
    // define current time when the activity is added
    var textTime = document.createTextNode(currentTimeStamp);
    newCellTime.appendChild(textTime);
    // add details for the transaction
    var textDetails = document.createTextNode(inputAddDetails.value);
    newCellDetails.appendChild(textDetails);
    // define transaction type
    var textTransactionType;
    var textAmount;
    // depending on withdrawal or income add negative or pozitive number
    // to the list and show the type of transaction
    if (transactionType.value == 1) {
        textTransactionType = document.createTextNode("Withdrawal");
        newCellTransactionType.appendChild(textTransactionType);
        newCellTransactionType.style.color = "red";
        textAmount = document.createTextNode("- $".concat(inputAddAmount.value));
        newCellAmount.appendChild(textAmount);
        newCellAmount.style.color = "red";
        totalBalance.push(Number("-".concat(inputAddAmount.value)));
    }
    else if (transactionType.value == 2) {
        textTransactionType = document.createTextNode("Income");
        newCellTransactionType.appendChild(textTransactionType);
        newCellTransactionType.style.color = "green";
        textAmount = document.createTextNode("$".concat(inputAddAmount.value));
        newCellAmount.appendChild(textAmount);
        newCellAmount.style.color = "green";
        totalBalance.push(Number(inputAddAmount.value));
    }
    newCellAmount.classList.add("fw-semibold");
}
// add button to add the input data to the table
btnAddActivity.addEventListener("click", function (e) {
    e.preventDefault();
    addToDailyTransactionsList();
    inputAddAmount.value = "";
    inputAddDetails.value = "";
    transactionType.selectedIndex = 0;
    var sum = 0;
    for (var i = 0; i < totalBalance.length; i++) {
        sum += totalBalance[i];
    }
    balance.innerHTML = "".concat(sum);
    if (sum < 0) {
        balance.style.color = "red";
    }
    else if (sum > 0) {
        balance.style.color = "green";
    }
});
// Savings progress
function updateProgressBar() {
    var amountSpentValue = Number(amountSpent.innerHTML.slice(1));
    var budgetedAmountValue = Number(budgetedAmount.innerHTML.slice(1));
    var goalAmountValue = Number(goalAmount.innerHTML.slice(1));
    var savedAmoutValue = Number(budgetedAmountValue - amountSpentValue);
    var progressPercentage = Number((savedAmoutValue / goalAmountValue) * 100);
    savedAmout.innerHTML = "$".concat(savedAmoutValue);
    var progressBar = document.querySelector(".progress-bar");
    progressBar.style.width = "".concat(progressPercentage, "%");
    progressBar.textContent = "".concat(progressPercentage, "%");
}
updateProgressBar();
