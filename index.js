#! /usr/bin/env node
import chalk from "chalk";
import { faker } from "@faker-js/faker";
import inquirer from "inquirer";
console.log(chalk.bold.bgCyan.yellow("<<<***WELCOME TO OUR OOP BANK SERVICE PROGRAM***>>>"));
class customer {
    first_name;
    last_name;
    gender;
    age;
    phone_No;
    account_No;
    constructor(f_name, l_name, age, gender, mobile, accNo) {
        this.first_name = f_name;
        this.last_name = l_name;
        this.age = age;
        this.gender = gender;
        this.phone_No = mobile;
        this.account_No = accNo;
    }
}
class Bank {
    Customer = [];
    account = [];
    addcustomer(obj) {
        this.Customer.push(obj);
    }
    addAccountNum(obj) {
        this.account.push(obj);
    }
    Transaction(acctObj) {
        let new_accounts = this.account.filter((acct) => acct.account_No !== acctObj.account_No);
        this.account = [...new_accounts, acctObj];
    }
}
let My_Bank = new Bank();
// let cus =new customer("abeera","khalid",21,"female",1235647890,1000)
// console.log(cus)
for (let i = 1; i <= 4; i++) {
    let f_name = faker.person.firstName("female");
    let l_name = faker.person.lastName();
    let Num = parseInt(faker.phone.number());
    const client = new customer(f_name, l_name, 21 * i, "female", Num, 2000 + i);
    My_Bank.addcustomer(client);
    My_Bank.addAccountNum({ account_No: client.account_No, Balance: 500 * i });
}
//console.log(My_Bank);
//create Bank services function
async function Bank_Services(bank) {
    do {
        let services = await inquirer.prompt({
            name: "Select_service",
            type: "list",
            message: "Please select Bank services options...",
            choices: ["View_Balance", "Cash_Deposit", "Cash_Withdrawal", "Exit/Leave"],
        });
        //check balance
        if (services.Select_service == "View_Balance") {
            let view_res = await inquirer.prompt({
                name: "num",
                type: "input",
                message: "Enter your Account_No",
            });
            let account = My_Bank.account.find((Acc) => Acc.account_No == view_res.num);
            if (!account) {
                console.log(chalk.red.bold("Invalid Account Number!!!"));
            }
            if (account) {
                let name = My_Bank.Customer.find((item) => item.account_No == account?.account_No);
                console.log(`${chalk.green.bold.italic(name?.first_name)}${chalk.green.bold.italic(name?.last_name)}, Your Account Balance is${chalk.bold.blueBright(account.Balance)}`);
            }
        }
        //Cash deposit
        if (services.Select_service == "Cash_Deposit") {
            let view_res = await inquirer.prompt({
                name: "num",
                type: "input",
                message: "Enter your Account_No",
            });
            let account = My_Bank.account.find((Acc) => Acc.account_No == view_res.num);
            if (!account) {
                console.log(chalk.red.bold("Invalid Account Number!!!"));
            }
            if (account) {
                let Ans = await inquirer.prompt({
                    name: "Rupees",
                    type: "number",
                    message: "Enter Your Withdrawal amount...",
                });
                let New_Balance = account.Balance + Ans.Rupees;
                //trasaction method call
                bank.Transaction({
                    account_No: account.account_No,
                    Balance: New_Balance,
                });
                console.log(New_Balance);
            }
        }
        //Cash with drawal
        if (services.Select_service == "Cash_Withdrawal") {
            let view_res = await inquirer.prompt({
                name: "num",
                type: "input",
                message: "Enter your Account_No",
            });
            let account = My_Bank.account.find((Acc) => Acc.account_No == view_res.num);
            if (!account) {
                console.log(chalk.red.bold("Invalid Account Number!!!"));
            }
            if (account) {
                let Ans = await inquirer.prompt({
                    name: "Rupees",
                    type: "number",
                    message: "Enter Your Withdrawal amount...",
                });
                if (Ans.Rupees > account.Balance) {
                    console.log(chalk.bold.redBright.italic("Current Balance is insufficient"));
                }
                let New_Balance = account.Balance - Ans.Rupees;
                //trasaction method call
                bank.Transaction({
                    account_No: account.account_No,
                    Balance: New_Balance,
                });
                console.log(New_Balance);
            }
        }
        //leaving this program
        if (services.Select_service == "Exit/Leave") {
            console.log(chalk.italic.cyan("Thank you for using our Bank Services..."));
            console.log(chalk.italic.cyan("Leaving Bank Services program!!!"));
            return;
        }
    } while (true);
}
Bank_Services(My_Bank);
