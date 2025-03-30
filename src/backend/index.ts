
// Main backend entry point that exposes all services

import { api } from './api';
import { automationService } from './automation';
import { notificationService } from './notifications';

// Export all services
export const backendServices = {
  api,
  automation: automationService,
  notifications: notificationService
};

// For easy import
export { api } from './api';
export { automationService } from './automation';
export { notificationService } from './notifications';

// Initialize and run automated tasks (in a real app, this would be handled by a proper scheduler)
export const initializeAutomation = () => {
  console.log("Initializing automation services");
  
  // Run initial automation workflows
  runAutomationWorkflows();
  
  // Set up periodic task execution (this is just for demonstration)
  // In a real app, this would be handled by a proper task scheduler or cron jobs
  const intervals = {
    processOrders: setInterval(() => {
      automationService.processNewOrders()
        .then(result => console.log("Auto processed orders:", result));
    }, 15 * 60 * 1000), // Every 15 minutes
    
    scheduleDispatches: setInterval(() => {
      automationService.scheduleDispatches()
        .then(result => console.log("Auto dispatched orders:", result));
    }, 30 * 60 * 1000), // Every 30 minutes
    
    handleExceptions: setInterval(() => {
      automationService.handleExceptions()
        .then(result => console.log("Auto handled exceptions:", result));
    }, 60 * 60 * 1000), // Every hour
    
    generateReports: setInterval(() => {
      automationService.generateReports()
        .then(result => console.log("Auto generated reports:", result));
    }, 24 * 60 * 60 * 1000) // Every 24 hours
  };
  
  // Return a cleanup function to clear intervals
  return () => {
    Object.values(intervals).forEach(interval => clearInterval(interval));
    console.log("Automation services stopped");
  };
};

// Run all automation workflows (for simulation purposes)
const runAutomationWorkflows = async () => {
  console.log("Running initial automation workflows");
  
  try {
    // Process pending orders
    const processResult = await automationService.processNewOrders();
    console.log("Initial order processing:", processResult);
    
    // Schedule dispatches
    const dispatchResult = await automationService.scheduleDispatches();
    console.log("Initial dispatch scheduling:", dispatchResult);
    
    // Handle exceptions
    const exceptionResult = await automationService.handleExceptions();
    console.log("Initial exception handling:", exceptionResult);
    
    // Generate reports
    const reportResult = await automationService.generateReports();
    console.log("Initial report generation:", reportResult);
    
    console.log("Initial automation workflows completed");
  } catch (error) {
    console.error("Error running initial automation workflows:", error);
  }
};
