const balance = document.getElementById("balance");
const list = document.getElementById("list");
const form = document.getElementById("form");
const date = document.getElementById("date");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, date: "11.2.2021", amount: 20 },
//   { id: 2, date: "11.2.2021", amount: 300 },
//   { id: 3, date: "11.2.2021", amount: 10 },
//   { id: 4, date: "11.2.2021", amount: 150 },
// ];

const localStorageSavings = JSON.parse(localStorage.getItem("savings"));

let transactions =
  localStorage.getItem("savings") !== null ? localStorageSavings : [];

function addSavings(e) {
  e.preventDefault();

  if (
    date.value.trim() === "" ||
    amount.value.trim() === "" ||
    amount.value.trim() <= 0
  ) {
    alert("Please add a text and a positive amount");
  } else {
    const transaction = {
      id: generateID(),
      date: date.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateTotal();

    updatelocalStorage();

    date.value = "";
    amount.value = "";
  }
}

//Id generator
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  const item = document.createElement("li");

  item.classList.add("plus");

  item.innerHTML = `
    ${transaction.date} <span>${transaction.amount}€</span> <button class="delete-btn" onclick="removeSaving(${transaction.id})">x</button>
  `;

  list.appendChild(item);
}

function updateTotal() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  balance.innerText = `${total}€`;
}

function removeSaving(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updatelocalStorage();

  init();
}

function updatelocalStorage() {
  localStorage.setItem("savings", JSON.stringify(transactions));
}

function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateTotal();
}

init();

form.addEventListener("submit", addSavings);
