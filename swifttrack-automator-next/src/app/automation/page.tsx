"use client";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  CalendarClock, 
  Settings, 
  AlertCircle, 
  Bell, 
  Zap, 
  Clock, 
  MessageSquare,
  RotateCw,
  CheckSquare,
  FileText,
  PackageOpen
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Automation = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Automation Settings</h1>
        <p className="text-muted-foreground">
          Configure automated workflows and rules
        </p>
      </div>

      <Tabs defaultValue="workflows" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="rules">Rules & Triggers</TabsTrigger>
          <TabsTrigger value="schedules">Schedules</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="workflows" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AutomationCard 
              title="Order Processing" 
              description="Automatically process new orders" 
              icon={PackageOpen}
              isActive={true} 
            />
            <AutomationCard 
              title="Dispatch Scheduling" 
              description="Auto-assign orders to couriers" 
              icon={CalendarClock}
              isActive={true} 
            />
            <AutomationCard 
              title="Notifications" 
              description="Send automated updates to customers" 
              icon={Bell}
              isActive={true} 
            />
            <AutomationCard 
              title="Exception Handling" 
              description="Automated recovery for failed deliveries" 
              icon={AlertCircle}
              isActive={false} 
            />
            <AutomationCard 
              title="Report Generation" 
              description="Create daily performance reports" 
              icon={FileText}
              isActive={true} 
            />
            <AutomationCard 
              title="Data Synchronization" 
              description="Sync data with external systems" 
              icon={RotateCw}
              isActive={false} 
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Automation Metrics</CardTitle>
              <CardDescription>Performance of automated processes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Tasks Automated</p>
                  <p className="text-2xl font-bold">3,254</p>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Success Rate</p>
                  <p className="text-2xl font-bold">96.7%</p>
                  <p className="text-xs text-muted-foreground">
                    +1.2% from last month
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Time Saved</p>
                  <p className="text-2xl font-bold">187 hrs</p>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Failed Tasks</p>
                  <p className="text-2xl font-bold">43</p>
                  <p className="text-xs text-muted-foreground">
                    1.3% of total
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Automation Rules</CardTitle>
              <CardDescription>Define conditions that trigger automated actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((rule) => (
                  <div
                    key={rule}
                    className="flex justify-between items-center p-4 border rounded-md"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {[
                            "Auto-reassign failed deliveries",
                            "Priority routing for express orders",
                            "Customer notification on delays"
                          ][rule - 1]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {[
                            "When delivery fails, reassign after 30 mins",
                            "Route express orders to nearest couriers",
                            "Send SMS if delivery is delayed by 15+ mins"
                          ][rule - 1]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Switch id={`rule-${rule}`} defaultChecked={rule !== 2} />
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Create New Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Tasks</CardTitle>
              <CardDescription>Configure recurring automated tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((schedule) => (
                  <div
                    key={schedule}
                    className="flex justify-between items-center p-4 border rounded-md"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {[
                            "Daily Performance Report",
                            "Order Status Update",
                            "Weekly Analytics"
                          ][schedule - 1]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {[
                            "Every day at 6:00 PM",
                            "Every 15 minutes",
                            "Every Monday at 9:00 AM"
                          ][schedule - 1]}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Switch id={`schedule-${schedule}`} defaultChecked />
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Clock className="h-4 w-4 mr-2" />
                  Add Scheduled Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Automation Logs</CardTitle>
                <CardDescription>Recent automation activity</CardDescription>
              </div>
              <Select defaultValue="today">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">Last 7 days</SelectItem>
                  <SelectItem value="month">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-start space-x-3 border-b pb-3 last:border-0">
                    <div className={`p-1.5 rounded-full mt-0.5 ${getStatusColor(index)}`}>
                      {getStatusIcon(index)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {[
                          "Order #12345 automatically processed",
                          "SMS notification sent to customer",
                          "Daily report generated and emailed",
                          "Failed delivery rescheduled automatically",
                          "New route optimized for 12 orders"
                        ][index]}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {[
                          "2 minutes ago",
                          "15 minutes ago",
                          "1 hour ago",
                          "3 hours ago",
                          "5 hours ago"
                        ][index]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Activity Logs
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

interface AutomationCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  isActive: boolean;
}

const AutomationCard = ({ title, description, icon: Icon, isActive }: AutomationCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="bg-primary/10 p-2 rounded-full">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <Switch id={`toggle-${title}`} defaultChecked={isActive} />
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" size="sm" className="w-full">
          <Settings className="h-4 w-4 mr-2" />
          Configure
        </Button>
      </CardContent>
    </Card>
  );
};

const getStatusColor = (index: number): string => {
  const colors: string[] = [
    "bg-green-100",
    "bg-blue-100",
    "bg-purple-100",
    "bg-amber-100",
    "bg-indigo-100"
  ];
  return colors[index % colors.length];
};

const getStatusIcon = (index: number): JSX.Element => {
  const icons: JSX.Element[] = [
    <CheckSquare key={0} className="h-4 w-4 text-green-600" />,
    <MessageSquare key={1} className="h-4 w-4 text-blue-600" />,
    <FileText key={2} className="h-4 w-4 text-purple-600" />,
    <RotateCw key={3} className="h-4 w-4 text-amber-600" />,
    <Zap key={4} className="h-4 w-4 text-indigo-600" />
  ];
  return icons[index % icons.length];
};

export default Automation;
