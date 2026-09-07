export const invoices = [
  {
    invoiceNumber: "INV-2026-1001",
    orderNumber: "ORD-2026-001",
    date: "2026-09-01T11:00:00Z",
    customer: "Rahul Sharma",
    items: [
      { product: "Premium Coconut Oil", variant: "1 L", quantity: 2, price: 290 },
      { product: "Pure Sunflower Oil", variant: "5 L", quantity: 1, price: 850 }
    ],
    tax: 0,
    total: 1430,
    paymentStatus: "Paid"
  },
  {
    invoiceNumber: "INV-2026-1002",
    orderNumber: "ORD-2026-002",
    date: "2026-09-05T15:00:00Z",
    customer: "Priya Desai",
    items: [
      { product: "Traditional Gingelly Oil", variant: "500 ml", quantity: 3, price: 220 }
    ],
    tax: 0,
    total: 660,
    paymentStatus: "Pending"
  }
];
