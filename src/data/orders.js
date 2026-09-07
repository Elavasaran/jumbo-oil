export const orders = [
  {
    id: "ORD-2026-001",
    customerId: "cust-1",
    date: "2026-09-01T10:30:00Z",
    products: [
      { productId: "prod-1", variantId: "var-1-1", name: "Premium Coconut Oil", size: "1 L", quantity: 2, price: 290 },
      { productId: "prod-2", variantId: "var-2-5", name: "Pure Sunflower Oil", size: "5 L", quantity: 1, price: 850 }
    ],
    amount: 1430,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    status: "Delivered",
    shippingAddress: {
      name: "Rahul Sharma",
      address: "45 Lotus Apartments, MG Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001"
    }
  },
  {
    id: "ORD-2026-002",
    customerId: "cust-2",
    date: "2026-09-05T14:15:00Z",
    products: [
      { productId: "prod-3", variantId: "var-3-500", name: "Traditional Gingelly Oil", size: "500 ml", quantity: 3, price: 220 }
    ],
    amount: 660,
    paymentMethod: "COD",
    paymentStatus: "Pending",
    status: "Processing",
    shippingAddress: {
      name: "Priya Desai",
      address: "12 Green Avenue, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050"
    }
  }
];
