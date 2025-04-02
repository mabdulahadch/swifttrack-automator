
import { Order, NotificationType } from "@/types";

// Mock data for the dashboard
export const mockOrders: Order[] = [
  {
    id: "ord-001",
    trackingId: "ST-7823912",
    customerName: "Ahmed Khan",
    customerPhone: "+92 300 1234567",
    address: "House 123, Street 5, Block B, DHA Phase 1, Lahore",
    status: "processing",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    estimatedDelivery: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    items: [
      {
        id: "item-001",
        name: "Smartphone",
        quantity: 1,
        price: 45000
      }
    ]
  },
  {
    id: "ord-002",
    trackingId: "ST-7823913",
    customerName: "Sara Ahmed",
    customerPhone: "+92 321 7654321",
    address: "Flat 5, Tower A, Bahria Town, Karachi",
    status: "dispatched",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
    estimatedDelivery: new Date(Date.now() + 21600000).toISOString(), // 6 hours from now
    items: [
      {
        id: "item-002",
        name: "Laptop",
        quantity: 1,
        price: 120000
      },
      {
        id: "item-003",
        name: "Wireless Mouse",
        quantity: 1,
        price: 2500
      }
    ]
  },
  {
    id: "ord-003",
    trackingId: "ST-7823914",
    customerName: "Fatima Zaidi",
    customerPhone: "+92 333 9876543",
    address: "Shop 7, Block C, Johar Town, Islamabad",
    status: "delivered",
    createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    items: [
      {
        id: "item-004",
        name: "Headphones",
        quantity: 2,
        price: 8000
      }
    ]
  },
  {
    id: "ord-004",
    trackingId: "ST-7823915",
    customerName: "Ali Raza",
    customerPhone: "+92 305 4567890",
    address: "House 45, Street 11, G-10/2, Islamabad",
    status: "pending",
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
    estimatedDelivery: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
    items: [
      {
        id: "item-005",
        name: "Smartwatch",
        quantity: 1,
        price: 25000
      }
    ]
  },
  {
    id: "ord-005",
    trackingId: "ST-7823916",
    customerName: "Zainab Malik",
    customerPhone: "+92 312 3456789",
    address: "Flat 12, Building C, Gulberg III, Lahore",
    status: "failed",
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    items: [
      {
        id: "item-006",
        name: "Bluetooth Speaker",
        quantity: 1,
        price: 5000
      }
    ]
  }
];

export const mockNotifications: NotificationType[] = [
  {
    id: "notif-001",
    title: "New Order Received",
    message: "Order #ST-7823912 has been successfully received from the API.",
    type: "info",
    read: false,
    createdAt: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
  },
  {
    id: "notif-002",
    title: "Order Dispatched",
    message: "Order #ST-7823913 has been dispatched with courier ID #C-45678.",
    type: "success",
    read: false,
    createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  {
    id: "notif-003",
    title: "Delivery Exception",
    message: "Order #ST-7823916 delivery failed. Customer not available at address.",
    type: "error",
    read: true,
    createdAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
  },
  {
    id: "notif-004",
    title: "Schedule Optimization",
    message: "Automated routing has optimized 12 deliveries in Karachi region.",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: "notif-005",
    title: "API Connection Warning",
    message: "Intermittent connection with courier API. Some updates may be delayed.",
    type: "warning",
    read: true,
    createdAt: new Date(Date.now() - 129600000).toISOString() // 36 hours ago
  }
];
