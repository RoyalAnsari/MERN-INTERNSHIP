// accountFactory.js

function createAccount(name, startBalance, lowBalanceCallback) {

    // PRIVATE BALANCE (closure)
    let balance = startBalance

    function deposit(amount) {
        balance = balance + amount
        console.log(name + " deposited " + amount)
    }

    function withdraw(amount) {

        if (amount > balance) {
            console.log("Not enough money")
            return
        }

        balance = balance - amount
        console.log(name + " withdrew " + amount)

        // LOW BALANCE ALERT
        if (balance < 100) {
            lowBalanceCallback(balance)
        }
    }

    function getBalance() {
        return balance
    }

    function transfer(amount, otherAccount) {

        withdraw(amount)
        otherAccount.deposit(amount)

        console.log("Transfer completed")
    }

    return {
        name,
        deposit,
        withdraw,
        getBalance,
        transfer
    }
}

module.exports = createAccount