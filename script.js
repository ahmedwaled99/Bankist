'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/////////////////////////////////////////////////

let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['f', 'g', 'h', 'i', 'j'];
console.log(arr.slice(3));
console.log(arr.slice(-1));

const letters = arr.concat(arr2);
console.log(letters);

console.log(letters.join(' '));

movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`movement ${i + 1} : You deposied ${mov}`);
  } else {
    console.log(`movement ${i + 1} : You withdrew ${Math.abs(mov)}`);
  }
});

currencies.forEach(function (value, key, map) {
  console.log(value);
  console.log(key);
});

///////////////////////////////////////////////////////////////

const displayMovements = function (movement, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movement.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

const checkDogs = [...dogsJulia.concat(dogsKate)];
const dogsJuliaCorrected = dogsJulia.slice(2, 5);

const checkDogsCorrected = [5, 2, 4, 1, 15, 8, 3];

console.log(checkDogsCorrected);

checkDogsCorrected.forEach(function (val, i) {
  if (val >= 3) {
    console.log(`Dog number ${i + 1} is an adult and is ${val} years old`);
  } else {
    console.log(`Dog number ${i + 1} is still a puppy`);
  }
});

const euroToUsd = 1.1;

const movementsUSD = movements.map(function (mov) {
  return Math.trunc(mov * euroToUsd);
});

console.log(movementsUSD);

const clacDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);

const balance = movements.reduce(function (acc, cur, i, arr) {
  return acc + cur;
}, 0);

console.log(balance);

const calcAverageHumanAge = checkDogsCorrected.map(function (age) {
  if (age <= 2) {
    return age * 2;
  } else {
    return 16 + age * 4;
  }
});
console.log(calcAverageHumanAge);
const adultDogs = calcAverageHumanAge.filter(function (age) {
  return age >= 18;
});

console.log(adultDogs);

const clacDogAvg =
  adultDogs.reduce((acc, cur) => acc + cur, 0) / adultDogs.length;
console.log(clacDogAvg);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const calcAverageHumanAge2 = function (ages) {
  const avgAge = ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((age, cur, i, arr) => age + cur / arr.length, 0);
  console.log(avgAge);
};

calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge2([16, 6, 10, 5, 6, 1, 4]);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  clacDisplayBalance(acc);
  calcDisplaySummary(acc);
};

let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
  labelWelcome.textContent = 'Log in to get started';
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

const accountsMovements = accounts.map(acc => acc.movements);
const allMovements = accountsMovements.flat();
console.log(allMovements);

const overAllBalance = allMovements.reduce((acc, cur) => acc + cur, 0);
console.log(overAllBalance);

// movements.sort((a, b) => {
//   if (a > b) return 1; //(keep order );
//   if (a < b) return -1; //(switch order );
// });
// movements.sort((a, b) => a - b);

// console.log(movements);

// movements.sort((a, b) => b - a);

// console.log(movements);
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

function capitalizeAndLowercase(sentence) {
  // Check if the input is not empty
  if (sentence.length === 0) {
    return '';
  }

  // Split the sentence into words
  const words = sentence.split(' ');

  // Capitalize the first letter and make the rest lowercase for each word
  const modifiedWords = words.map(word => {
    const firstLetter = word[0].toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });

  // Join the modified words into a sentence
  return modifiedWords.join(' ');
}

console.log(capitalizeAndLowercase('heLLO MY NAME IS ahmed wALed'));

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
//////////////////////////////////////////////////////////////////////////
const dogSarah = dogs.find(dogs => dogs.owners.includes('Sarah'));

if (dogSarah.recFood > dogSarah.curFood) {
  console.log(`Sarah's dog eating too much`);
} else {
  console.log(`Sarah's dog eating too little`);
}
//////////////////////////////////////////////////////////////////////////

const ownersEatTooMuch = dogs
  .filter(dogs => dogs.curFood > dogs.recFood)
  .flatMap(dogs => dogs.owners);
const ownersEatTooLittle = dogs
  .filter(dogs => dogs.curFood < dogs.recFood)
  .flatMap(dogs => dogs.owners);

console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);
//////////////////////////////////////////////////////////////////////////
console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too much!`);
//////////////////////////////////////////////////////////////////////////
console.log(dogs.some(dogs => dogs.recFood === dogs.curFood));
//////////////////////////////////////////////////////////////////////////
console.log(
  dogs.some(
    dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
  )
);
//////////////////////////////////////////////////////////////////////////
const DogsEatingOkay = dogs.filter(
  dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1
);
console.log(DogsEatingOkay);
//////////////////////////////////////////////////////////////////////////
const recommendedFoodOnly = dogs.sort((a, b) => a.recFood - b.recFood);
console.log(recommendedFoodOnly);
//////////////////////////////////////////////////////////////////////////
