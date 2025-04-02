
export type OrderStatus = 'pending' | 'processing' | 'dispatched' | 'delivered' | 'failed';

export interface Order {
  id: string;
  trackingId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface DashboardStat {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
}

export interface NotificationType {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}
