
'use client';

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import RecentOrders from "@/components/dashboard/RecentOrders";
import AutomationStatus from "@/components/dashboard/AutomationStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search } from "lucide-react";
import { toast } from "sonner";

interface DashboardProps {
  userId: string;
}

const Dashboard = ({ userId }: DashboardProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (data.success) {
          setUser(data.user);
        } else {
          toast.error(data.message || "Failed to load user data");
        }
      } catch (error) {
        toast.error("Error loading user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to SwiftTrack Automator, {user?.name}
        </p>
      </div>

      <div className="grid gap-6">
        <DashboardMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <RecentOrders />
          <AutomationStatus />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Customer Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Allow your customers to track their orders with a simple tracking interface.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/tracking">
                    <Search className="h-4 w-4 mr-2" /> Open Tracking Page
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/tracking" target="_blank">
                    <ExternalLink className="h-4 w-4 mr-2" /> Customer Link
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild className="w-full">
                  <Link href="/orders">View All Orders</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/automation">Automation Settings</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/reports">Generate Reports</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/orders/create">Create Order</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
