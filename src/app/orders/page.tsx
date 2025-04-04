
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function OrdersPage() {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-muted-foreground">Manage your delivery orders</p>
        
        <div className="p-8 text-center">
          <p>Orders management interface will be displayed here</p>
        </div>
      </div>
    </MainLayout>
  );
}
