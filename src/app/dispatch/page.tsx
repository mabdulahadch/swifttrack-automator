
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function DispatchPage() {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Dispatch</h1>
        <p className="text-muted-foreground">Manage delivery dispatching</p>
        
        <div className="p-8 text-center">
          <p>Dispatch management interface will be displayed here</p>
        </div>
      </div>
    </MainLayout>
  );
}
