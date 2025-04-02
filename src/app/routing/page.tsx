
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function RoutingPage() {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Routing</h1>
        <p className="text-muted-foreground">Plan and optimize delivery routes</p>
        
        <div className="p-8 text-center">
          <p>Route planning interface will be displayed here</p>
        </div>
      </div>
    </MainLayout>
  );
}
