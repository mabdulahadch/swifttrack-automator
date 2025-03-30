
import MainLayout from "@/components/layout/MainLayout";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import RecentOrders from "@/components/dashboard/RecentOrders";
import AutomationStatus from "@/components/dashboard/AutomationStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, Search } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to SwiftTrack Automator</p>
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
                  <Link to="/tracking">
                    <Search className="h-4 w-4 mr-2" /> Open Tracking Page
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" /> Customer Link
                  </a>
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
                  <Link to="/orders">View All Orders</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/automation">Automation Settings</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/reports">Generate Reports</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/dispatch">Dispatch Manager</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
