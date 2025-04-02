
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function CustomersPage() {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">Manage your customers and their information</p>
        
        <div className="p-8 text-center">
          <p>Customers management interface will be displayed here</p>
        </div>
      </div>
    </MainLayout>
  );
}
