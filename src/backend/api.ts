
// This file contains the API client for making requests to the courier service API

/**
 * API client for interacting with the courier service API
 */
export const api = {
  /**
   * Fetch orders from the API with pagination and filtering options
   */
  fetchOrders: async (params = {}) => {
    // In a real implementation, this would make an actual API call
    // For now we return mock data
    console.log("Fetching orders with params:", params);
    return mockFetchOrders(params);
  },

  /**
   * Fetch a single order by ID
   */
  fetchOrder: async (id) => {
    console.log("Fetching order with ID:", id);
    // Simulate API call
    return mockOrders.find(order => order.id === id) || null;
  },

  /**
   * Update an order's status
   */
  updateOrderStatus: async (id, status) => {
    console.log(`Updating order ${id} status to ${status}`);
    // In a real app, this would update the status on the server
    return { success: true, message: "Order status updated" };
  },

  /**
   * Create a new order
   */
  createOrder: async (orderData) => {
    console.log("Creating new order:", orderData);
    // In a real app, this would send the order data to the server
    return { 
      success: true, 
      message: "Order created successfully", 
      order: { id: `ORD-${Math.floor(Math.random() * 10000)}`, ...orderData } 
    };
  },

  /**
   * Get tracking information for an order
   */
  getTrackingInfo: async (trackingId) => {
    console.log("Getting tracking info for:", trackingId);
    // Simulate API call to get tracking data
    return mockTrackingInfo(trackingId);
  },

  /**
   * Simulate a dispatch request
   */
  dispatchOrder: async (orderId, courierData) => {
    console.log(`Dispatching order ${orderId} with courier:`, courierData);
    return { 
      success: true, 
      message: "Order dispatched successfully",
      trackingId: `TRK-${Math.floor(Math.random() * 100000)}`
    };
  },

  /**
   * Get delivery performance metrics
   */
  getPerformanceMetrics: async (period = "week") => {
    console.log(`Getting performance metrics for period: ${period}`);
    return mockPerformanceMetrics(period);
  }
};

// Mock data helpers
const mockFetchOrders = (params) => {
  let result = [...mockOrders];
  
  // Filter by status if provided
  if (params.status) {
    result = result.filter(order => order.status === params.status);
  }
  
  // Simple pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: result.slice(startIndex, endIndex),
    total: result.length,
    page,
    limit,
    totalPages: Math.ceil(result.length / limit)
  };
};

const mockTrackingInfo = (trackingId) => {
  // Generate random tracking events
  const events = [
    { status: "order_received", timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), location: "Processing Center" },
    { status: "processing", timestamp: new Date(Date.now() - 86400000).toISOString(), location: "Processing Center" },
    { status: "dispatched", timestamp: new Date(Date.now() - 43200000).toISOString(), location: "Distribution Hub" },
    { status: "in_transit", timestamp: new Date(Date.now() - 21600000).toISOString(), location: "En Route" },
  ];
  
  // Randomly decide if the package has been delivered
  const isDelivered = Math.random() > 0.7;
  if (isDelivered) {
    events.push({ status: "delivered", timestamp: new Date().toISOString(), location: "Customer Address" });
  }
  
  return {
    trackingId,
    currentStatus: isDelivered ? "delivered" : "in_transit",
    estimatedDelivery: new Date(Date.now() + 86400000).toISOString(),
    events
  };
};

const mockPerformanceMetrics = (period) => {
  return {
    totalOrders: 3285,
    deliveredOrders: 2945,
    failedDeliveries: 87,
    onTimeRate: 94.2,
    averageDeliveryTime: 42, // in minutes
    customerSatisfaction: 4.7,
    areaPerformance: [
      { area: "Gulshan", onTimeRate: 98.3, deliveryTime: 38 },
      { area: "DHA", onTimeRate: 92.8, deliveryTime: 45 },
      { area: "Clifton", onTimeRate: 95.1, deliveryTime: 40 },
      { area: "Model Town", onTimeRate: 97.1, deliveryTime: 36 },
      { area: "Johar", onTimeRate: 89.5, deliveryTime: 52 }
    ]
  };
};

// Sample mock orders data
const mockOrders = [
  {
    id: "ORD-12345",
    trackingId: "TRK-78901",
    customerName: "Ahmed Khan",
    customerPhone: "+92 300 1234567",
    address: "House 123, Street 7, Gulshan-e-Iqbal, Karachi",
    status: "delivered",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString(),
    estimatedDelivery: new Date(Date.now() - 86400000).toISOString(),
    items: [
      { id: "ITM-1", name: "Smartphone", quantity: 1, price: 50000 },
      { id: "ITM-2", name: "Phone Case", quantity: 1, price: 1500 }
    ]
  },
  {
    id: "ORD-12346",
    trackingId: "TRK-78902",
    customerName: "Fatima Ali",
    customerPhone: "+92 300 7654321",
    address: "Flat 4B, Building 7, DHA Phase 5, Lahore",
    status: "in_transit",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 21600000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 21600000).toISOString(),
    items: [
      { id: "ITM-3", name: "Laptop", quantity: 1, price: 120000 }
    ]
  },
  {
    id: "ORD-12347",
    trackingId: "TRK-78903",
    customerName: "Mohammad Raza",
    customerPhone: "+92 321 1122334",
    address: "House 45, Block C, Johar Town, Lahore",
    status: "processing",
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    updatedAt: new Date(Date.now() - 14400000).toISOString(),
    estimatedDelivery: new Date(Date.now() + 86400000).toISOString(),
    items: [
      { id: "ITM-4", name: "Headphones", quantity: 1, price: 8000 },
      { id: "ITM-5", name: "Mouse", quantity: 1, price: 3000 },
      { id: "ITM-6", name: "Keyboard", quantity: 1, price: 6000 }
    ]
  }
];
