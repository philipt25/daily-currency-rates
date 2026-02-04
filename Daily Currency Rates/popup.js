async function convertCurrency() {
  const amountInput = document.getElementById("amount");
  let amount = parseFloat(amountInput.value);

  // Minimum and maximum amount check
  if (isNaN(amount) || amount < 1) {
    amount = 1;
    amountInput.value = 1; // auto reset to 1
  } else if (amount > 9999999999) {
    amount = 9999999999;
    amountInput.value = 9999999999; // auto reset to max
  }

  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

  if (from === to) {
    document.getElementById("result").textContent = "No need to convert";
    return;
  }

  const url = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.rates && data.rates[to]) {
      document.getElementById("result").textContent =
        `${amount} ${from} = ${data.rates[to].toFixed(2)} ${to}`;
    } else {
      document.getElementById("result").textContent = "No conversion data available!";
    }
  } catch (err) {
    document.getElementById("result").textContent = "Error during conversion!";
  }
}

document.getElementById("convert").addEventListener("click", convertCurrency);

// Run once on load to show default EUR → USD
window.addEventListener("DOMContentLoaded", convertCurrency);

document.querySelectorAll("select").forEach(select => {
  select.addEventListener("change", () => select.blur());
});

document.addEventListener("click", (e) => {
  if (!e.target.closest("select")) {
    document.querySelectorAll("select").forEach(select => select.blur());
  }
});

document.getElementById("amount").addEventListener("input", (e) => {
  let value = parseFloat(e.target.value);
  if (value < 1) {
    e.target.value = 1;
  } else if (value > 9999999999) {
    e.target.value = 9999999999;
  }
});
