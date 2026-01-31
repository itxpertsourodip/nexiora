// এটি একটি ফেক অর্ডার যা আমরা সার্ভারে পাঠাবো
const fakeOrder = {
  customerName: "Sourodip (Test)",
  phone: "01711223344",
  address: "Rajnagar, Sylhet",
  fileLink: "https://drive.google.com/file/d/example",
  items: [
    {
      productName: "Visiting Card",
      quantity: 1000,
      price: 500
    }
  ],
  totalAmount: 550,
  deliveryCharge: 50
};

// সার্ভারে অর্ডারটি পাঠাচ্ছি...
console.log("⏳ Sending Order...");

fetch('http://localhost:5000/api/orders/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(fakeOrder)
})
.then(res => res.json())
.then(data => {
  console.log("------------------------------------------------");
  console.log("✅ SUCCESS! Order Saved inside Database.");
  console.log("📝 Order ID:", data._id);
  console.log("------------------------------------------------");
})
.catch(error => {
  console.log("❌ Failed to send order:", error);
});