// DOM elements
var btnAddActivity = document.querySelector(".btn-add-activity");
var inputAddAmount = document.querySelector(".add-amount");
var inputAddDetails = document.querySelector(".add-details-text");
var transactionType = document.querySelector(".select-transaction-type");
var activityLogTimes = document.querySelectorAll(".current-time-scope");
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
// activity log class
var ActivityLog = /** @class */ (function () {
    function ActivityLog(time, amount, details, transaction) {
        this.time = time;
        this.amount = amount;
        this.details = details;
        this.transaction = transaction;
    }
    return ActivityLog;
}());
// btnAddActivity!.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(transactionType!.value);
//   console.log(inputAddAmount!.value);
//   console.log(inputAddDetails!.value);
// });
var listItems = [
    new ActivityLog("10:00", 20, "breakfast with friends", 1),
    new ActivityLog("13:00", 7, "smoothie", 1),
    new ActivityLog("17:00", 200, "Uber payment", 2),
];
var dailyTransactionsTable = document.getElementById("daily-transactions-list");
function addToDailyTransactionsList() {
    var newRow = dailyTransactionsTable.insertRow(-1);
    var newCellTime = newRow.insertCell(0);
    var newCellAmount = newRow.insertCell(1);
    var newCellDetails = newRow.insertCell(2);
    var newCellTransactionType = newRow.insertCell(3);
    var textTime = document.createTextNode(currentTimeStamp);
    newCellTime.appendChild(textTime);
    var textAmount = document.createTextNode("$".concat(inputAddAmount.value));
    newCellAmount.appendChild(textAmount);
    newCellAmount.classList.add("fw-semibold");
    var textDetails = document.createTextNode(inputAddDetails.value);
    newCellDetails.appendChild(textDetails);
    var textTransactionType;
    if (transactionType.value == 1) {
        textTransactionType = document.createTextNode("Withdrawal");
        newCellTransactionType.appendChild(textTransactionType);
        newCellTransactionType.style.color = "red";
    }
    else if (transactionType.value == 2) {
        textTransactionType = document.createTextNode("Income");
        newCellTransactionType.appendChild(textTransactionType);
        newCellTransactionType.style.color = "green";
    }
    // let textTransactionType: any =
    //   transactionType!.value == 1
    //     ? document.createTextNode("Withdrawal")
    //     : transactionType!.value == 2
    //     ? document.createTextNode("Income")
    //     : null;
    // newCellTransactionType.appendChild(textTransactionType);
}
btnAddActivity.addEventListener("click", function (e) {
    e.preventDefault();
    addToDailyTransactionsList();
});
// listItems.forEach((listItem:any) => )
