// Dropdown menu dice type

const diceType = [`D4`, `D6`, `D8`, `D10`, `D12`, `D20`];
const diceTypeSelect = document.getElementById(`dice-type`);

diceType.forEach(function (type) {
  const option = document.createElement(`option`);
  option.value = type;
  option.textContent = type;
  diceTypeSelect.appendChild(option);
});

// Amount of dice to roll

const diceSelect = document.getElementById(`dice-number`);

for (let i = 1; i <= 20; i++) {
  const option = document.createElement(`option`);
  option.value = i;
  option.textContent = i;
  diceSelect.appendChild(option);
}

// Roll History
const rollHistory = [];
const rollHistoryList = document.getElementById(`dice-roll-history`);

// The roll

function rollDice() {
  const diceTypeValue = diceTypeSelect.value.replace(/[a-zA-Z]/g, ``); // choosing dice type
  const sides = parseInt(diceTypeValue); // extract number from dice
  const amount = parseInt(diceSelect.value); // amount of dice rolled
  const minimum = amount; // for the min/max display
  const maximum = sides * amount; // for the min/max display

  let total = 0;
  let results = [];

  // Real result

  for (let i = 0; i < amount; i++) {
    const roll = Math.floor(Math.random() * sides) + 1;
    total += roll;
    results.push(roll);
  }

  document.getElementById(`dice-roller`).disabled = true;
  document.getElementById(`individual-rolls`).textContent = ``;

  // Animation
  const interval = setInterval(() => {
    const fakeRoll = Math.floor(Math.random() * (sides * amount)) + amount;

    document.getElementById(`result-total`).textContent =
      `You rolled: ${fakeRoll} 🎲`;
  }, 100);

  // Stop animation after 1 second
  setTimeout(() => {
    clearInterval(interval);

    document.getElementById(`dice-roller`).disabled = false;

    // Display REAL result
    document.getElementById(`result-total`).textContent =
      `You rolled: ${total} 🎲`;

    document.getElementById(`individual-rolls`).textContent =
      `Individual results: ${results.join(`, `)} 🎲`;

    const historyEntry = `${amount} x D${sides} (${results.join(`, `)}) = ${total} 🎲`;
    rollHistory.push(historyEntry);

    // Create and append list item
    const listItem = document.createElement("li");
    listItem.textContent = historyEntry;
    rollHistoryList.appendChild(listItem);
  }, 1000);

  // Min/Max Result
  document.getElementById(`min-roll`).textContent = `Minimum roll: ${minimum}`;
  document.getElementById(`max-roll`).textContent = `Maximum roll: ${maximum}`;

  // Build and push history entry
}

// Roll dice error
document.getElementById(`dice-roller`).addEventListener("click", () => {
  const amount = parseInt(diceSelect.value);

  if (!amount || amount < 1) {
    window.alert("Choose a dice type and amount of dice to roll!");
    return;
  }

  rollDice();
});

// Clear Results
function clearResults() {
  document.getElementById(`result-total`).textContent = ``;
  document.getElementById(`individual-rolls`).textContent = ``;
  document.getElementById(`min-roll`).textContent = ``;
  document.getElementById(`max-roll`).textContent = ``;
}

// Clear History
function clearHistory() {
  document.getElementById(`dice-roll-history`).textContent = ``;
}
