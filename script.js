const orderForm = document.getElementById("orderForm");
const ordersDiv = document.getElementById("orders");

let tokenMap = {};

orderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const item = document.getElementById("foodItem").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!item || quantity < 1) return;

  // Generate token number per item
  if (!tokenMap[item.toLowerCase()]) {
    tokenMap[item.toLowerCase()] = 1;
  } else {
    tokenMap[item.toLowerCase()] += 1;
  }

  const tokenNumber = tokenMap[item.toLowerCase()];

  const billHTML = `
    <div class="bill">
      <div class="bill-part">
        <h3>👨‍🍳 Kitchen Copy</h3>
        <p><strong>Item:</strong> ${item}</p>
        <p><strong>Qty:</strong> ${quantity}</p>
        <p class="token">Token #${tokenNumber}</p>
      </div>
      <div class="bill-part">
        <h3>👤 Customer Copy</h3>
        <p><strong>Item:</strong> ${item}</p>
        <p><strong>Qty:</strong> ${quantity}</p>
        <p class="token">Token #${tokenNumber}</p>
      </div>
    </div>
    <button class="print-btn" onclick="window.print()">🖨️ Print Bill</button>
  `;

  ordersDiv.innerHTML = billHTML;

  orderForm.reset();
});
