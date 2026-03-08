const createAccount = require("./accountFactory")

// LOW BALANCE CALLBACK
function lowBalanceAlert(balance) {
    console.log("Warning! Low balance:", balance)
}

// CREATE ACCOUNTS
const acc1 = createAccount("Ali", 50, lowBalanceAlert)
const acc2 = createAccount("Sara", 300, lowBalanceAlert)

// OPERATIONS
acc1.deposit(200)

acc1.withdraw(550)

console.log("Ali balance:", acc1.getBalance())

// TRANSFER
acc1.transfer(50, acc2)

console.log("Sara balance:", acc2.getBalance())


