//#! /usr/bin/env node
import inquirer from "inquirer";
import showBanner from "node-banner";
import gradient from "gradient-string";
let conversion = {
    PKR: {
        USD: 0.0044,
        GBP: 0.0037,
        PKR: 1,
    },
    GBP: {
        USD: 1.21,
        PKR: 271.79,
        GBP: 1,
    },
    USD: {
        PKR: 225.5,
        GBP: 0.83,
        USD: 1,
    },
};
async function fun() {
    let loop = true;
    while (loop) {
        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "from",
                choices: ["PKR", "GBP", "USD"],
                message: gradient.rainbow("Select your currency"),
            },
            {
                type: "list",
                name: "to",
                choices: ["PKR", "GBP", "USD"],
                message: gradient.rainbow("Select your conversion currency"),
            },
            {
                type: "number",
                name: "amount",
                message: gradient.rainbow("Enter your amount"),
                validate: (input) => {
                    if (input) {
                        return true;
                    }
                    else {
                        return gradient.rainbow("please enter number :");
                    }
                },
            },
        ]);
        const { from, to, amount } = answer;
        let result = conversion[from][to] * amount;
        console.log(gradient.rainbow(`Your conversion from ${from} to ${to} is ${result}`));
        // prompt from user to ask calculate again or not
        let answers = await inquirer.prompt([
            {
                type: "confirm",
                name: "again",
                message: gradient.rainbow("Do you want to perform  again?"),
            },
        ]);
        loop = answers.again;
    }
    console.log(gradient.rainbow("Thank You for Using Our Calculator: "));
}
(async () => {
    await showBanner("Currency Converter ", "This Currency Converter perform conversion of PKR, USD, GBP", "red", "blue");
})();
setTimeout(() => {
    fun();
}, 1000);
