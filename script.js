const orderForm = document.getElementById('orderForm');
const foodItemInput = document.getElementById('foodItem');
const quantityInput = document.getElementById('quantity');
const ordersContainer = document.getElementById('orders');

// Track food item order numbers
const foodCounters = {};
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
  
    const foodItem = foodItemInput.value.trim().toLowerCase();
    const displayItem = foodItemInput.value.trim();
    const quantity = parseInt(quantityInput.value.trim(), 10);
  
    if (!foodItem || !quantity || quantity < 1) return;
  
    // Create or increment the food item's order number
    if (!foodCounters[foodItem]) {
      foodCounters[foodItem] = 1;
    } else {
      foodCounters[foodItem]++;
    }
  
    const orderNumber = foodCounters[foodItem];
  
    const billHTML = `
      <div class="bill">
        <div class="bill-part">
          <h3>Customer Copy</h3>
          <p><strong>Item:</strong> ${displayItem}</p>
          <p><strong>Qty:</strong> ${quantity}</p>
          <div class="token"><strong>Token:</strong> #${orderNumber}</div>
          <p class="small">Please wait for your token to be called.</p>
        </div>
        <div class="zigzag-divider"></div>
        <div class="bill-part">
          <h3>Kitchen Copy</h3>
          <p><strong>Item:</strong> ${displayItem}</p>
          <p><strong>Qty:</strong> ${quantity}</p>
          <div class="token"><strong>Token:</strong> #${orderNumber}</div>
          <p class="small">Prepare and deliver in order.</p>
        </div>
      </div>
      <button class="print-btn" onclick="window.print()">🖨️ Print Token</button>
    `;
  
    // Overwrite the old bill (show only the latest)
    ordersContainer.innerHTML = billHTML;
  
    // Reset form
    orderForm.reset();
  });