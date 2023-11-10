// Slot Machine Project
// This project intends to build a 3 by 3 slot machine with 3 unique sybols
// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin slot machine
// 5. Check if user won
// 6. Give user winnings
// 7. Play again

// Global Variables:
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

// 1. Function for deposit
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
    

// 2. Function for number of lines 

const getNumberOfLines = () => {
    while (true) {
        const Lines = prompt("Enter number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(Lines);

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of lines, try again.");
     } else {
        return numberOfLines;
     }
    }
};

// const DepositAmount = deposit();
// const numberOfLines = getNumberOfLines();

//3. Collect a bet amount

const getBet = (balance, Lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet);

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / Lines) {
            console.log("Invalid bet amount, try again.");
     } else {
        return numberBet;
     }
    }
}

 
// 4. Spin the slot machine
// Define some variables to depict how big the machine is
// How many different symbols we have, value of them, amount of them
// defined as global variables (placed at top of program)


// Spin Function
// array is defined as a constant as we change elements within the array not array itself
// referenced array: can change whats inside array withoutchangig its reference
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
      for (let i = 0; i < count; i++) {
        symbols.push(symbol);
      }
    }
  
    const reels = [];
    for (let i = 0; i < COLS; i++) {
      reels.push([]);
      const reelSymbols = [...symbols];
      for (let j = 0; j < ROWS; j++) {
        const randomIndex = Math.floor(Math.random() * reelSymbols.length);
        const selectedSymbol = reelSymbols[randomIndex];
        reels[i].push(selectedSymbol);
        reelSymbols.splice(randomIndex, 1);
      }
    }
  
    return reels;
  };

 // const reels = spin();
  //console.log(reels);
 // let balance = deposit();
 // const numberOfLines = getNumberOfLines();
 // const bet = getBet(balance, numberOfLines);

 // 5.Check if user won
 // Transpose arrays

 const transpose = (reels) => {
    const rows = [];
    for (let i=0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++ ) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
 };

// Print rows

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()){ 
            rowString += symbol 
            if (i != row.length - 1) {
                rowString += " | "
            }
        }
        console.log(rowString);
    }
};


  // 6. Check if user won

  const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row< lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }

    return winnings;
  };

// 7. Play again

const game = () => {
    let balance = deposit();

    while (true) {
        console.log("Your balance is $" + balance);

        const numberOfLines = getNumberOfLines();
        const betperline = getBet(balance, numberOfLines);

        balance -= betperline * numberOfLines;

        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);

        const winnings = getWinnings(rows, betperline, numberOfLines);
        balance += winnings;
        
        console.log("You won, $" + winnings.toString())

        if (balance <= 0) {
            console.log("You ran out of money!")
            break;
        }

        const playAgain = prompt("do you want to play again (y/n)?");
        
        if (playAgain != "y") break;
    }
};

game();
