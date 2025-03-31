
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your application settings</p>
        
        <div className="p-8 text-center">
          <p>Settings interface will be displayed here</p>
        </div>
      </div>
    </MainLayout>
  );
}
