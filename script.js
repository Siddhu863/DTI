const orderForm = document.getElementById("orderForm");
const ordersDiv = document.getElementById("orders");

let tokenMap = {};
let waitQueueMap = {};

const prepTimeMap = {
  dosa: 5,
  idly: 3,
  vada: 4,
  biryani: 10,
  poori: 6,
  upma: 4
};

orderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const itemRaw = document.getElementById("foodItem").value.trim();
  const item = itemRaw.toLowerCase();
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!item || quantity < 1) return;

  const prepTime = prepTimeMap[item] || 7; // fallback prep time
  const now = Date.now();

  // Token numbering
  if (!tokenMap[item]) tokenMap[item] = 1;
  else tokenMap[item] += 1;

  const tokenNumber = tokenMap[item];

  // Queue initialization
  if (!waitQueueMap[item]) waitQueueMap[item] = [];

  // Clean up old tokens (those whose time is up)
  waitQueueMap[item] = waitQueueMap[item].filter(token => {
    const elapsedMinutes = (now - token.createdAt) / 60000;
    return elapsedMinutes < token.prepTime;
  });

  // Calculate remaining time from previous tokens
  let totalPendingTime = 0;
  for (let t of waitQueueMap[item]) {
    const elapsed = (now - t.createdAt) / 60000;
    const remaining = Math.max(0, t.prepTime - elapsed);
    totalPendingTime += remaining;
  }

  // Add current token’s prep time
  const estimatedWaitTime = Math.ceil(totalPendingTime + prepTime);

  // Add new token to queue
  waitQueueMap[item].push({
    tokenNumber,
    prepTime,
    createdAt: now
  });

  // Show bill
  const billHTML = `
    <div class="bill">
      <div class="bill-part">
        <h3>👨‍🍳 Kitchen Copy!</h3>
        <p><strong>Item:</strong> ${itemRaw}</p>
        <p><strong>Qty:</strong> ${quantity}</p>
        <p class="token">Token #${tokenNumber}</p>
        <p><strong>Est. Wait Time:</strong> ${estimatedWaitTime} mins</p>
      </div>
      <div class="bill-part">
        <h3>👤 Customer Copy!</h3>
        <p><strong>Item:</strong> ${itemRaw}</p>
        <p><strong>Qty:</strong> ${quantity}</p>
        <p class="token">Token #${tokenNumber}</p>
        <p><strong>Est. Wait Time:</strong> ${estimatedWaitTime} mins</p>
      </div>
    </div>
    <button class="print-btn" onclick="window.print()">🖨️ Print Bill</button>
  `;

  ordersDiv.innerHTML = billHTML;
  orderForm.reset();
});
