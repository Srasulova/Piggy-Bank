// DOM elements
let btnAddActivity =
  document.querySelector<HTMLButtonElement>(".btn-add-activity")!;

let inputAddAmount = document.querySelector<HTMLInputElement>(".add-amount");

let inputAddDetails =
  document.querySelector<HTMLInputElement>(".add-details-text");

let transactionType: any = document.querySelector<HTMLSelectElement>(
  ".select-transaction-type"
);

let activityLogTimes = document.querySelectorAll<HTMLTableCellElement>(
  ".current-time-scope"
);
let balance: any = document.querySelector<HTMLSpanElement>(".balance");

let amountSpent: any = document.querySelector<HTMLSpanElement>(".amount-spent");

let budgetedAmount: any =
  document.querySelector<HTMLSpanElement>(".budgeted-amount");

let goalAmount: any = document.querySelector<HTMLSpanElement>(".goal-amount");

let savedAmout: any = document.querySelector<HTMLSpanElement>(".saved-amount");

// get current time for the timestamp in the table
let currentDate = new Date();
let currentHours = currentDate.getHours();
let currentMinutes = currentDate.getMinutes();
let currentTimeStamp = `${currentHours}:${currentMinutes}`;
console.log(currentTimeStamp);

// setting the current time to the th element
activityLogTimes.forEach((activityLogTime) => {
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

let dailyTransactionsTable = document.getElementById(
  "daily-transactions-list"
) as HTMLTableElement;

let totalBalance: number[] = [];

// add new daily transaction line with input data to the table
function addToDailyTransactionsList() {
  // create new table row and table cells
  let newRow = dailyTransactionsTable.insertRow(-1);
  let newCellTime = newRow.insertCell(0);
  let newCellAmount = newRow.insertCell(1);
  let newCellDetails = newRow.insertCell(2);
  let newCellTransactionType = newRow.insertCell(3);

  // define current time when the activity is added
  let textTime = document.createTextNode(currentTimeStamp);
  newCellTime.appendChild(textTime);

  // add details for the transaction
  let textDetails = document.createTextNode(inputAddDetails!.value);
  newCellDetails.appendChild(textDetails);

  // define transaction type
  let textTransactionType: any;
  let textAmount: any;

  // depending on withdrawal or income add negative or pozitive number
  // to the list and show the type of transaction
  if (transactionType!.value == 1) {
    textTransactionType = document.createTextNode("Withdrawal");
    newCellTransactionType.appendChild(textTransactionType);
    newCellTransactionType.style.color = "red";
    textAmount = document.createTextNode(`- $${inputAddAmount!.value}`);
    newCellAmount.appendChild(textAmount);
    newCellAmount.style.color = "red";
    totalBalance.push(Number(`-${inputAddAmount!.value}`));
  } else if (transactionType!.value == 2) {
    textTransactionType = document.createTextNode("Income");
    newCellTransactionType.appendChild(textTransactionType);
    newCellTransactionType.style.color = "green";
    textAmount = document.createTextNode(`$${inputAddAmount!.value}`);
    newCellAmount.appendChild(textAmount);
    newCellAmount.style.color = "green";
    totalBalance.push(Number(inputAddAmount!.value));
  }
  newCellAmount.classList.add("fw-semibold");
}

// add button to add the input data to the table
btnAddActivity!.addEventListener("click", (e) => {
  e.preventDefault();
  addToDailyTransactionsList();
  inputAddAmount!.value = "";
  inputAddDetails!.value = "";
  transactionType.selectedIndex = 0;

  let sum: number = 0;
  for (let i = 0; i < totalBalance.length; i++) {
    sum += totalBalance[i];
  }

  balance.innerHTML = `${sum}`;

  if (sum < 0) {
    balance.style.color = "red";
  } else if (sum > 0) {
    balance.style.color = "green";
  }
});

// Savings progress

function updateProgressBar() {
  let amountSpentValue: number = Number(amountSpent.innerHTML.slice(1));
  let budgetedAmountValue: number = Number(budgetedAmount.innerHTML.slice(1));
  let goalAmountValue: number = Number(goalAmount.innerHTML.slice(1));
  let savedAmoutValue: number = Number(budgetedAmountValue - amountSpentValue);

  let progressPercentage: number = Number(
    (savedAmoutValue / goalAmountValue) * 100
  );

  savedAmout.innerHTML = `$${savedAmoutValue}`;

  let progressBar = document.querySelector<HTMLDivElement>(".progress-bar");
  progressBar!.style.width = `${progressPercentage}%`;
  progressBar!.textContent = `${progressPercentage}%`;
}
updateProgressBar();
