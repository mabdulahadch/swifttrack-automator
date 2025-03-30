
// This file handles sending notifications to customers and administrators

/**
 * Notification service for sending various types of alerts
 */
export const notificationService = {
  /**
   * Send a notification to a customer
   */
  sendCustomerNotification: async (customerId, type, data) => {
    console.log(`Sending ${type} notification to customer ${customerId}`);
    
    // Get notification template
    const template = getNotificationTemplate(type, data);
    
    if (!template) {
      console.error(`Invalid notification type: ${type}`);
      return { success: false, error: "Invalid notification type" };
    }
    
    // Get customer contact preferences (in a real app, this would come from the database)
    const customerPreferences = await mockGetCustomerPreferences(customerId);
    
    // Track which channels were successfully sent
    const results = {
      email: false,
      sms: false,
      push: false
    };
    
    // Send via all enabled channels
    if (customerPreferences.email && template.email) {
      // In a real app, this would use an email service
      console.log(`EMAIL to ${customerPreferences.emailAddress}: ${template.email.subject} - ${template.email.body}`);
      results.email = true;
    }
    
    if (customerPreferences.sms && template.sms) {
      // In a real app, this would use an SMS service
      console.log(`SMS to ${customerPreferences.phoneNumber}: ${template.sms}`);
      results.sms = true;
    }
    
    if (customerPreferences.push && template.push) {
      // In a real app, this would use a push notification service
      console.log(`PUSH to device ${customerPreferences.deviceId}: ${template.push.title} - ${template.push.body}`);
      results.push = true;
    }
    
    // Record notification in history (in a real app)
    const notificationId = `NOTIF-${Date.now()}`;
    
    return {
      success: results.email || results.sms || results.push,
      notificationId,
      channels: results
    };
  },
  
  /**
   * Send a notification to system administrators
   */
  sendAdminNotification: async (type, data) => {
    console.log(`Sending admin notification: ${type}`);
    
    // Get admin notification template
    const template = getAdminNotificationTemplate(type, data);
    
    if (!template) {
      console.error(`Invalid admin notification type: ${type}`);
      return { success: false, error: "Invalid notification type" };
    }
    
    // In a real app, this would send to all admins or specific roles
    console.log(`ADMIN NOTIFICATION: ${template.title} - ${template.message}`);
    
    return {
      success: true,
      notificationId: `ADMIN-NOTIF-${Date.now()}`
    };
  },
  
  /**
   * Send notifications for order status changes
   */
  sendOrderStatusNotification: async (orderId, status) => {
    console.log(`Sending order status notification for order ${orderId}: ${status}`);
    
    // In a real app, fetch order details from the API
    const order = await mockGetOrderDetails(orderId);
    
    if (!order) {
      return { success: false, error: "Order not found" };
    }
    
    // Map status to notification type
    const notificationType = mapStatusToNotificationType(status);
    
    if (!notificationType) {
      return { success: false, error: "No notification for this status" };
    }
    
    // Prepare notification data
    const notificationData = {
      orderId: order.id,
      trackingId: order.trackingId,
      customerName: order.customerName,
      estimatedDelivery: order.estimatedDelivery
    };
    
    // Send the notification
    return await notificationService.sendCustomerNotification(
      order.customerName, // In a real app, this would be the customer ID
      notificationType,
      notificationData
    );
  },
  
  /**
   * Send batch notifications
   */
  sendBatchNotifications: async (notificationRequests) => {
    console.log(`Processing batch of ${notificationRequests.length} notifications`);
    
    const results = await Promise.all(
      notificationRequests.map(async (req) => {
        try {
          if (req.type === 'customer') {
            return await notificationService.sendCustomerNotification(
              req.customerId,
              req.notificationType,
              req.data
            );
          } else if (req.type === 'admin') {
            return await notificationService.sendAdminNotification(
              req.notificationType,
              req.data
            );
          } else if (req.type === 'order_status') {
            return await notificationService.sendOrderStatusNotification(
              req.orderId,
              req.status
            );
          } else {
            return { success: false, error: "Invalid notification request type" };
          }
        } catch (error) {
          console.error("Error processing notification:", error);
          return { success: false, error: error.message };
        }
      })
    );
    
    return {
      total: notificationRequests.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      details: results
    };
  }
};

// Helper functions
const getNotificationTemplate = (type, data) => {
  const templates = {
    order_confirmation: {
      sms: `SwiftTrack: Your order #${data.orderId} has been confirmed and is being processed. Track your delivery at: track.swifttrack.pk/${data.trackingId}`,
      email: {
        subject: `Order Confirmation - #${data.orderId}`,
        body: `Dear ${data.customerName},\n\nYour order #${data.orderId} has been confirmed and is now being processed. You can track your delivery using the tracking ID: ${data.trackingId} at track.swifttrack.pk.\n\nThank you for choosing SwiftTrack!`
      },
      push: {
        title: "Order Confirmed",
        body: `Your order #${data.orderId} has been confirmed and is being processed.`
      }
    },
    order_dispatched: {
      sms: `SwiftTrack: Your order #${data.orderId} has been dispatched! Estimated delivery: ${formatDateTime(data.estimatedDelivery)}. Track at: track.swifttrack.pk/${data.trackingId}`,
      email: {
        subject: `Order Dispatched - #${data.orderId}`,
        body: `Dear ${data.customerName},\n\nGreat news! Your order #${data.orderId} has been dispatched and is on its way to you. Estimated delivery: ${formatDateTime(data.estimatedDelivery)}.\n\nTrack your delivery using the tracking ID: ${data.trackingId} at track.swifttrack.pk.\n\nThank you for your patience!`
      },
      push: {
        title: "Order Dispatched",
        body: `Your order is on its way! Estimated delivery: ${formatDateTime(data.estimatedDelivery)}.`
      }
    },
    order_delivered: {
      sms: `SwiftTrack: Your order #${data.orderId} has been delivered! Thank you for choosing SwiftTrack.`,
      email: {
        subject: `Order Delivered - #${data.orderId}`,
        body: `Dear ${data.customerName},\n\nYour order #${data.orderId} has been successfully delivered! We hope you are satisfied with our service.\n\nPlease let us know if you have any feedback.\n\nThank you for choosing SwiftTrack!`
      },
      push: {
        title: "Order Delivered",
        body: `Your order #${data.orderId} has been delivered successfully!`
      }
    },
    delivery_delay: {
      sms: `SwiftTrack: We apologize, but there's a delay with your order #${data.orderId}. New estimated delivery: ${formatDateTime(data.estimatedDelivery)}. Track at: track.swifttrack.pk/${data.trackingId}`,
      email: {
        subject: `Delivery Delay - Order #${data.orderId}`,
        body: `Dear ${data.customerName},\n\nWe apologize for the inconvenience, but there's a delay with your order #${data.orderId}. Your new estimated delivery time is: ${formatDateTime(data.estimatedDelivery)}.\n\nYou can track your delivery using the tracking ID: ${data.trackingId} at track.swifttrack.pk.\n\nThank you for your patience and understanding.`
      },
      push: {
        title: "Delivery Delay",
        body: `There's a delay with your order. New estimated delivery: ${formatDateTime(data.estimatedDelivery)}.`
      }
    }
  };
  
  return templates[type];
};

const getAdminNotificationTemplate = (type, data) => {
  const templates = {
    system_alert: {
      title: "System Alert",
      message: data.message
    },
    failed_delivery: {
      title: `Failed Delivery: Order #${data.orderId}`,
      message: `Order #${data.orderId} delivery has failed. Reason: ${data.reason}. Action required.`
    },
    performance_alert: {
      title: "Performance Alert",
      message: `Performance metric ${data.metric} is ${data.value}${data.unit}, which is below the target of ${data.target}${data.unit}.`
    },
    new_customer: {
      title: "New Customer Registration",
      message: `New customer registered: ${data.customerName}, Phone: ${data.customerPhone}`
    }
  };
  
  return templates[type];
};

const mapStatusToNotificationType = (status) => {
  const statusMap = {
    pending: null, // No notification for pending status
    processing: "order_confirmation",
    dispatched: "order_dispatched",
    delivered: "order_delivered",
    failed: "delivery_delay"
  };
  
  return statusMap[status] || null;
};

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  
  // Format: Day Month, Hour:Minute
  return `${date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
};

// Mock functions (would be real API calls in a production app)
const mockGetCustomerPreferences = async (customerId) => {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 50));
  
  // In a real app, this would fetch from a database
  return {
    email: true,
    emailAddress: "customer@example.com",
    sms: true,
    phoneNumber: "+92 300 1234567",
    push: Math.random() > 0.5, // 50% chance of having push enabled
    deviceId: "device-id-12345"
  };
};

const mockGetOrderDetails = async (orderId) => {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 50));
  
  // In a real app, this would fetch from the API or database
  return {
    id: orderId,
    trackingId: `TRK-${Math.floor(Math.random() * 100000)}`,
    customerName: "Ahmed Khan",
    customerPhone: "+92 300 1234567",
    estimatedDelivery: new Date(Date.now() + Math.random() * 86400000 * 2).toISOString()
  };
};
