
// This file handles the automation logic for different workflows

import { api } from './api';

/**
 * Automation service for handling all automated workflows
 */
export const automationService = {
  /**
   * Process new orders automatically
   */
  processNewOrders: async () => {
    console.log("Processing new orders");
    try {
      // Fetch pending orders
      const response = await api.fetchOrders({ status: 'pending' });
      
      // Process each order
      const results = await Promise.all(
        response.data.map(async (order) => {
          // Validate order data
          if (!validateOrderData(order)) {
            return { orderId: order.id, status: 'failed', reason: 'Invalid order data' };
          }
          
          // Update order status to processing
          await api.updateOrderStatus(order.id, 'processing');
          
          // Return success
          return { orderId: order.id, status: 'success' };
        })
      );
      
      return { 
        processed: results.filter(r => r.status === 'success').length,
        failed: results.filter(r => r.status === 'failed').length,
        details: results
      };
    } catch (error) {
      console.error("Error processing new orders:", error);
      return { processed: 0, failed: 0, error: error.message };
    }
  },

  /**
   * Schedule dispatches for processed orders
   */
  scheduleDispatches: async () => {
    console.log("Scheduling dispatches");
    try {
      // Fetch orders ready for dispatch
      const response = await api.fetchOrders({ status: 'processing' });
      
      // Schedule dispatch for each order
      const results = await Promise.all(
        response.data.map(async (order) => {
          try {
            // Get optimal courier based on location and order details
            const courier = await findOptimalCourier(order);
            
            if (!courier) {
              return { orderId: order.id, status: 'failed', reason: 'No courier available' };
            }
            
            // Dispatch the order
            const dispatchResult = await api.dispatchOrder(order.id, courier);
            
            // Update order status
            await api.updateOrderStatus(order.id, 'dispatched');
            
            // Return success with tracking ID
            return { 
              orderId: order.id, 
              status: 'success', 
              trackingId: dispatchResult.trackingId,
              courier: courier.id
            };
          } catch (error) {
            return { orderId: order.id, status: 'failed', reason: error.message };
          }
        })
      );
      
      return {
        dispatched: results.filter(r => r.status === 'success').length,
        failed: results.filter(r => r.status === 'failed').length,
        details: results
      };
    } catch (error) {
      console.error("Error scheduling dispatches:", error);
      return { dispatched: 0, failed: 0, error: error.message };
    }
  },

  /**
   * Handle exceptions such as failed deliveries
   */
  handleExceptions: async () => {
    console.log("Handling exceptions");
    try {
      // Fetch failed deliveries
      const response = await api.fetchOrders({ status: 'failed' });
      
      // Handle each exception
      const results = await Promise.all(
        response.data.map(async (order) => {
          // Determine recovery action
          const recoveryAction = determineRecoveryAction(order);
          
          if (recoveryAction === 'reschedule') {
            // Reschedule for next day
            await api.updateOrderStatus(order.id, 'processing');
            return { orderId: order.id, action: 'rescheduled' };
          } else if (recoveryAction === 'reassign') {
            // Find a new courier
            const courier = await findOptimalCourier(order, true);
            
            if (courier) {
              await api.dispatchOrder(order.id, courier);
              await api.updateOrderStatus(order.id, 'dispatched');
              return { orderId: order.id, action: 'reassigned', courier: courier.id };
            } else {
              return { orderId: order.id, action: 'manual_intervention' };
            }
          } else {
            // Manual intervention needed
            return { orderId: order.id, action: 'manual_intervention' };
          }
        })
      );
      
      return {
        rescheduled: results.filter(r => r.action === 'rescheduled').length,
        reassigned: results.filter(r => r.action === 'reassigned').length,
        manual: results.filter(r => r.action === 'manual_intervention').length,
        details: results
      };
    } catch (error) {
      console.error("Error handling exceptions:", error);
      return { error: error.message };
    }
  },

  /**
   * Generate daily reports
   */
  generateReports: async () => {
    console.log("Generating reports");
    try {
      // Get performance metrics
      const metrics = await api.getPerformanceMetrics('day');
      
      // Generate report content
      const reportContent = {
        date: new Date().toISOString(),
        metrics,
        summary: {
          performanceRating: calculatePerformanceRating(metrics),
          issues: identifyIssues(metrics),
          recommendations: generateRecommendations(metrics)
        }
      };
      
      // In a real system, this would save the report or email it
      console.log("Report generated:", reportContent);
      
      return { 
        success: true, 
        reportId: `REP-${Date.now()}`,
        summary: reportContent.summary
      };
    } catch (error) {
      console.error("Error generating reports:", error);
      return { success: false, error: error.message };
    }
  }
};

// Helper functions
const validateOrderData = (order) => {
  // Check for required fields
  return !!(
    order.id && 
    order.customerName && 
    order.customerPhone && 
    order.address && 
    order.items && 
    order.items.length > 0
  );
};

const findOptimalCourier = async (order, prioritize = false) => {
  // This would use a real algorithm to find the best courier
  // For the mock, we'll just return a simulated courier
  
  // Simulate no couriers available (20% chance)
  if (!prioritize && Math.random() < 0.2) {
    return null;
  }
  
  return {
    id: `C-${Math.floor(Math.random() * 1000)}`,
    name: "Courier " + Math.floor(Math.random() * 50),
    location: "Hub " + Math.floor(Math.random() * 5 + 1),
    rating: (3 + Math.random() * 2).toFixed(1),
    vehicleType: Math.random() > 0.5 ? "bike" : "car"
  };
};

const determineRecoveryAction = (order) => {
  // In a real system, this would use complex logic
  // For the mock, we'll use randomization
  const rand = Math.random();
  
  if (rand < 0.4) return 'reschedule';
  if (rand < 0.8) return 'reassign';
  return 'manual_intervention';
};

const calculatePerformanceRating = (metrics) => {
  // Calculate a performance score based on metrics
  const onTimeWeight = 0.5;
  const satisfactionWeight = 0.3;
  const deliveryTimeWeight = 0.2;
  
  // Normalize delivery time (lower is better)
  const avgTimeScore = Math.max(0, 1 - (metrics.averageDeliveryTime / 60));
  
  // Calculate weighted score (out of 5)
  const score = (
    (metrics.onTimeRate / 100 * 5 * onTimeWeight) +
    (metrics.customerSatisfaction * satisfactionWeight) +
    (avgTimeScore * 5 * deliveryTimeWeight)
  );
  
  return score.toFixed(1);
};

const identifyIssues = (metrics) => {
  const issues = [];
  
  if (metrics.onTimeRate < 90) {
    issues.push("On-time delivery rate below target");
  }
  
  if (metrics.averageDeliveryTime > 50) {
    issues.push("Average delivery time above target");
  }
  
  if (metrics.customerSatisfaction < 4.5) {
    issues.push("Customer satisfaction below target");
  }
  
  // Find problematic areas
  const problematicAreas = metrics.areaPerformance
    .filter(area => area.onTimeRate < 90)
    .map(area => area.area);
  
  if (problematicAreas.length > 0) {
    issues.push(`Low performance in areas: ${problematicAreas.join(', ')}`);
  }
  
  return issues;
};

const generateRecommendations = (metrics) => {
  const recommendations = [];
  
  // Based on identified issues, generate recommendations
  if (metrics.onTimeRate < 90) {
    recommendations.push("Optimize courier assignments to improve on-time delivery");
  }
  
  if (metrics.averageDeliveryTime > 50) {
    recommendations.push("Review routing algorithms to reduce delivery times");
  }
  
  // Find the worst performing area
  const worstArea = metrics.areaPerformance.reduce(
    (worst, current) => current.onTimeRate < worst.onTimeRate ? current : worst, 
    { onTimeRate: 100 }
  );
  
  if (worstArea.onTimeRate < 90) {
    recommendations.push(`Increase courier capacity in ${worstArea.area}`);
  }
  
  // Always add a general recommendation
  recommendations.push("Continue monitoring customer feedback for service improvements");
  
  return recommendations;
};
