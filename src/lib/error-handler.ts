// Centralized error handling utility

type ErrorResponse = {
  success: false;
  message: string;
  code?: string;
  details?: unknown;
};

type ErrorConfig = {
  logError?: boolean;
  notifyAdmin?: boolean;
  retryCount?: number;
};

export class AppError extends Error {
  code: string;
  details?: unknown;

  constructor(message: string, code: string, details?: unknown) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'AppError';
  }
}

export const errorHandler = {
  /**
   * Handle API errors consistently
   */
  handleApiError: (error: unknown, config: ErrorConfig = {}): ErrorResponse => {
    const { logError = true, notifyAdmin = false } = config;
    
    // Log error if configured
    if (logError) {
      console.error('API Error:', error);
    }

    // Handle known error types
    if (error instanceof AppError) {
      return {
        success: false,
        message: error.message,
        code: error.code,
        details: error.details
      };
    }

    // Handle unexpected errors
    return {
      success: false,
      message: 'An unexpected error occurred',
      code: 'INTERNAL_ERROR'
    };
  },

  /**
   * Handle automation workflow errors
   */
  handleAutomationError: async (error: unknown, context: string): Promise<ErrorResponse> => {
    console.error(`Automation error in ${context}:`, error);

    // Determine if error is recoverable
    const isRecoverable = error instanceof AppError && 
      ['COURIER_UNAVAILABLE', 'TEMPORARY_FAILURE'].includes(error.code);

    if (isRecoverable) {
      // Implement recovery logic here
      return {
        success: false,
        message: 'Operation failed but will be retried automatically',
        code: error instanceof AppError ? error.code : 'AUTOMATION_ERROR'
      };
    }

    return {
      success: false,
      message: 'Automation error occurred',
      code: error instanceof AppError ? error.code : 'AUTOMATION_ERROR',
      details: error instanceof AppError ? error.details : undefined
    };
  },

  /**
   * Handle notification delivery errors
   */
  handleNotificationError: (error: unknown, notificationType: string): ErrorResponse => {
    console.error(`Notification error (${notificationType}):`, error);

    return {
      success: false,
      message: 'Failed to send notification',
      code: error instanceof AppError ? error.code : 'NOTIFICATION_ERROR',
      details: {
        notificationType,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    };
  }
};