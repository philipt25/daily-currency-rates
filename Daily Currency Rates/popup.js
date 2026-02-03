async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;

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
