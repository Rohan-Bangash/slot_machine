// import prompt sync package to get user input
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 6; // also known as "reel" in a slot machine

// these are the symbols you could possibly have in each reel or column
// our program will randomly select from these number of symbols
const SYMBOLS_COUNT = {
    A: 2, // there will only be 2 A's in each reel (column)
    B: 4, // there will only be 4 B's in each reel (column)
    C: 6,
    D: 8
}

const SYMBOLS_VALUES = {
    A: 5, // if we get a line or row of A's, we will multiply the bet amount by 5
    B: 4, 
    C: 3,
    D: 2
}

const deposit = () => { 
    while(true)
    {
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount<= 0)
        {
            console.log("Invalid deposit amount, try again.");
        } else
        {
            return numberDepositAmount;
        }
    }
};


// determine number of lines to bet on
const getNumberOfLines = () => {
    while(true)
    {
        const lines = prompt("Enter the number of lines to bet on(1-3): ");
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines<1 || numberOfLines>3)
        {
            console.log("Invalid number of lines, try again.");
        } else 
        {
            return numberOfLines;
        }
    }
}

// get total bet, bet amount must be less than balance
const getBet = (balance, lines) => {
    while(true)
    {
        const bet = prompt("Enter the bet per line: ");
        const numberBet = parseFloat(bet); 

        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance/lines)
        {
            console.log("Invalid bet, try again.");
        } else
        {
            return numberBet;
        }
        }
}


// put all possible symbols inside an array
// randomly select them out of the array
// , and remove them from the array every single time that we use them, 
// while were generating each reel
// so we want to generate individual columns

const spin = () => {
    const symbols = [];
    // we need to loop through all the entries we have inside the SYMBOLS_COUNT object
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }
    // each nested array will represent a column, and we will generate the
    // symbols inside of these reels, using the symbols[] array
    const reels = [];
    for(let i=0;i<COLS;i++) {
        reels.push([]);
        const reelSymbols = [...symbols]; // this ...syntax creates a copy of the array []reels
        for(let j=0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); //yt: Using Math.random in Java - David Dobervich
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }
    return reels;
}

// randomly select elements from the symbols[] array when inserting them in
// the slot machines reels

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
const reels = spin();
console.log(reels);
