
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function NotificationsPage() {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">View and manage your notifications</p>
        
        <div className="p-8 text-center">
          <p>Notifications interface will be displayed here</p>
        </div>
      </div>
    </MainLayout>
  );
}
