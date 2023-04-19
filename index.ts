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

// activity log class
class ActivityLog {
  time: string;
  amount: number;
  details: string;
  transaction: number;

  constructor(
    time: string,
    amount: number,
    details: string,
    transaction: number
  ) {
    this.time = time;
    this.amount = amount;
    this.details = details;
    this.transaction = transaction;
  }
}

// btnAddActivity!.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(transactionType!.value);
//   console.log(inputAddAmount!.value);
//   console.log(inputAddDetails!.value);
// });

let listItems: any = [
  new ActivityLog("10:00", 20, "breakfast with friends", 1),
  new ActivityLog("13:00", 7, "smoothie", 1),
  new ActivityLog("17:00", 200, "Uber payment", 2),
];

let dailyTransactionsTable = document.getElementById(
  "daily-transactions-list"
) as HTMLTableElement;

function addToDailyTransactionsList() {
  let newRow = dailyTransactionsTable.insertRow(-1);
  let newCellTime = newRow.insertCell(0);
  let newCellAmount = newRow.insertCell(1);
  let newCellDetails = newRow.insertCell(2);
  let newCellTransactionType = newRow.insertCell(3);

  let textTime = document.createTextNode(currentTimeStamp);
  newCellTime.appendChild(textTime);

  let textAmount = document.createTextNode(`$${inputAddAmount!.value}`);
  newCellAmount.appendChild(textAmount);
  newCellAmount.classList.add("fw-semibold");

  let textDetails = document.createTextNode(inputAddDetails!.value);
  newCellDetails.appendChild(textDetails);

  let textTransactionType: any;

  if (transactionType!.value == 1) {
    textTransactionType = document.createTextNode("Withdrawal");
    newCellTransactionType.appendChild(textTransactionType);
    newCellTransactionType.style.color = "red";
  } else if (transactionType!.value == 2) {
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

btnAddActivity!.addEventListener("click", (e) => {
  e.preventDefault();
  addToDailyTransactionsList();
});

// listItems.forEach((listItem:any) => )

// to be done:
// 1. Balance
// 2. Change color of the amounts and add - if withdrawal
