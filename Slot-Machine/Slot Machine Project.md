
## JS Slot Machine Project

YT link: https://www.youtube.com/watch?v=E3XxeE7NF30
#### 1. Define function for depositing some money
- ```
```JavaScript
const prompt = require("prompt-sync")();

  

const deposit = () => {

    while (true) {

        const DepositAmount = prompt("Enter a deposit amount: ");

        const numberDepositAmount = parseFloat(DepositAmount);

  

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {

            console.log("Invalid deposit amount, try again.");

     } else {

        return numberDepositAmount;

     }

    }

};
```


Firstly we have called "require(prompt-sync")();" which is a pre installed package, second set of parentheses allows us to use a function for user input.

Const: declares a variable
Prompt: Display a prompt to user
ParseFloat: converts string to a number
isNaN: is not a number
||: or
console.log: writes a message to the console for testing in the terminal
Call "node 'filename'.js" to run code in terminal

while loop keeps running the code until conditions are met (a positive number is input)

#### 2. Determine number of lines to bet on
```JavaScript
const getNumberOfLines = () => {

    while (true) {

        const Lines = prompt("Enter number of lines to bet on: ");

        const numberOfLines = parseFloat(Lines);

  

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {

            console.log("Invalid number of lines, try again.");

     } else {

        return numberOfLines;

     }

    }

};
```
Here the function is the same structure as before.
Note that we can call as many 'or' conditions as we like in the if statement.

#### 3. Function for collect a bet amount
```JavaScript
const getBet = (balance) => {

    while (true) {

        const Bet = prompt("Enter total bet: ");

        const numberBet = parseFloat(bet);

  

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > Balance) {

            console.log("Invalid bet amount, try again.");

     } else {

        return numberBet;

     }

    }

}

  

let balance = deposit();
```
Let balance be equal to the deposit the user has put in.

#### 4. Spin function
- Initialize symbol array, loop through number of symbols.
- Initialize reel array, loop through defined columns to initialize reels as an array per reel (array of arrays). Push array into empty array.
- In the loop:
	- Copy available symbols into a new array.
	- Loop through defined rows (number of symbols per reel)
	- Randomly select a symbol
	- Remove chosen symbol from array so it can't be selected again.
- Return reels.

```JavaScript
const ROWS = 3;

const COLS = 3;

  

const SYMBOLS_COUNT = {

     A:2,

     B:4,

     C:6,

     D:8

}

// multiplier of each symbol

const SYMBOL_VALUES = {

     A: 5,

     B: 4,

     C: 3,

     D: 2

}
// Spin Function

// array is defined as a constant as we change elements within the array not array itself

// referenced array: can change whats inside array withoutchangig its reference

const spin = () => {

    const symbols = []; // initialise empty array

    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) { 
// loop through entries of symbol and count in the object 
      for (let i = 0; i < count; i++) {

        symbols.push(symbol);

      }

    }

    const reels = []; // each reel is a column on the slot machine (bit that spins)

    for (let i = 0; i < COLS; i++) { // same simple loop from start to end of COL index
// push an array into reels as we need an array per reel
      reels.push([]);

      const reelSymbols = [...symbols]; // copy availble symbols into a new array

      for (let j = 0; j < ROWS; j++) {
// randomly select a reel, math.random choosing number between 0 and 1, multiplied by length to get an index. As this is a decimal number math.floor to round down to nearest integer. round down as indexing always starts at 0 so we cannot round up.
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);
// select symbol using randomindex
        const selectedSymbol = reelSymbols[randomIndex];
// push selected symbol into the ith array of reels
        reels[i].push(selectedSymbol);
// remove symbol so we cant select it again while we generate this reel
// splice(position at which remove element, remove 1 element)
        reelSymbols.splice(randomIndex, 1);

      }

    }

    return reels;

  };
  ```
We define our global constants, conventionally in capitals and placed at top of all the code.

Place all possible symbols in an array, remove them after they have been used so they aren't used again. array is defined as a constant as array doesn't change but elements inside do (very different to python).

For loop, i is a counter starting at 0, for counter less than Column/row iterate, then increase counter by 1, when i is equal to row number loop stops. symbols.push(symbol) pushes the symbol into the symbols array - insert element into a new array.

...symbols, copies available symbols into a new array as we cannot choose another symbol from the initial full array. 

#### 5. Transpose

Our returned reels is our columns, however the machine must check the rows (alignment of symbols results in winnings). 

We must transpose our returned array of arrays to display the rows not columns.

- Define transpose with unput of reels
- Initialise empty rows array
- For number of rows:
	- push as an array into rows array
	- For number of columns:
		- At column j, row i of reels, push this element into rows array at index i.
- Return rows array

- Display rows
- For (iterate through items in rows)
	 - Define 'rowString' as an empty string
	 - For index and element in row
		 - string at that row = the symbol
		 - (Now define when to add pipe operator for separation of symbols)
		 - if  i doesn't equal max value it can be -1 (so pipe operator isn't placed at end of array)
			  -  string is equal to "pipe operator", to visually separate the symbols.
```JavaScript
 const transpose = (reels) => {

    // init empty array for rows

    const rows = [];

    // loop trhough rows and push number of rows as an array into array

    for (let i=0; i < ROWS; i++) {

        rows.push([]);
	// loop through columns
	// At column j row i of reels, push into rows array at index i
        for (let j = 0;j < COLS; j++ ) {

            rows[i].push(reels[j][i])

        }

    }

    return rows;

 };
 // Print rows

  

const printRows = () => {

    for (const row of rows) { // iterating by item will return an array

        let rowString = "";

        for (const [i, symbol] of row.entries()){ // loop through index and element that exists in each row

            rowString += symbol //+= concatenates strings together

            if (i != row.length - 1) {

                rowString += " | "

            }

        }

        console.log(rowString);

    }

};
```

#### 6. Check if User Won

- Retrieve winnings
- Define winnings as 0 
- For (choose row to look at):
	- symbol is index of the row
	- check if symbols are the same, declare as true
	- For (iterate through symbols):
		- If (symbol doesn't equal index 0 of symbols):
			- declare as false
			- break out of _this_ for loop
	 - Calculate how much user won
- Return winnings

```JavaScript
// take rows, bets, lines as input to match users "prediction" to outcome
  const getWinnings = (rows, bet, lines) => {
	// add to winnings whenever they win
    let winnings = 0;

  
	// decide how many rows to look at based on how many the user bet on
    for (let row = 0; row< lines; row++) {
		// symbols defined as the index at which the symbol is at
        const symbols = rows[row];
		// check if the symbols are the same
        let allSame = true;

  
		// if not same can make it false
        for (const symbol of symbols) {// iterating by item
			// if symbol doesnt equal symbols at index 0
            if (symbol != symbols[0]) {
				// make false
                allSame = false;
				// break out of THIS for loop
                break;
				// means did not win in this row
            }

        }
		// calculate how much the user won by bet amount*symbol value
        if (allSame) {
			// add winnings to init val
            winnings += bet * SYMBOL_VALUES[symbols[0]];

        }

    }

  

    return winnings;

  };
```
#### 7. Play Again

- Define game
- Define balance as users' deposit input
- While (loop to keep game running):
	 - Display user balance
	 - Take bet per line and lines bet on from user input
	 - Update user balance after their betting's
	 - Spin Machine
	 - Transpose columns to rows
	 - Display rows
	 - Retrieve winnings 
	 - Add winnings to balance
	 - Display users' winnings
	 - If (user runs out of money):
		 - Display "user has no money"
	 - Break _this_ for loop
	 - Ask if user wants to play again
	 - If user says no end game

```JavaScript
// 7. Play again

const game = () => {
	// users' balance is their deposit
    let balance = deposit();

  
	// while loop to keep game running
    while (true) {
		// display user balance
        console.log("Your balance is $" + balance);
		// Call our functions defined before
        const numberOfLines = getNumberOfLines();

        const betperline = getBet(balance, numberOfLines);
		// user balance is now original minus their bettings
        balance -= betperline * numberOfLines;
		// spin machine
        const reels = spin();
		// dsiplay rows
        const rows = transpose(reels);

        printRows(rows);

        const winnings = getWinnings(rows, betperline, numberOfLines);
		// add winnings to balance
        balance += winnings;
		// display this rounds winnings
        console.log("You won, $" + winnings.toString())

  
		// if user runs out of money dsiplay message
        if (balance <= 0) {

            console.log("You ran out of money!")

            break;

        }

  
		// ask if user wants to play again
        const playAgain = prompt("do you want to play again (y/n)?");
		// if user enters anything but yes break loop
        if (playAgain != "y") break;

    }

};

  
// call game 
game();
```

