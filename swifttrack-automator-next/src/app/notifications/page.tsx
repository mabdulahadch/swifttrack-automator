"use client";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  AlertCircle, 
  Check, 
  ChevronDown,
  Send,
  Settings,
  Smartphone,
  Edit,
  Trash,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockNotifications } from "@/lib/data";
import { NotificationType } from "@/types";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const groupNotificationsByDate = (notifications: NotificationType[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const groups: Record<string, NotificationType[]> = {
    "Today": [],
    "Yesterday": [],
    "Earlier": []
  };
  
  notifications.forEach(notification => {
    const notifDate = new Date(notification.createdAt);
    notifDate.setHours(0, 0, 0, 0);
    
    if (notifDate.getTime() === today.getTime()) {
      groups["Today"].push(notification);
    } else if (notifDate.getTime() === yesterday.getTime()) {
      groups["Yesterday"].push(notification);
    } else {
      groups["Earlier"].push(notification);
    }
  });
  
  return groups;
};

const Notifications = () => {
  const groupedNotifications = groupNotificationsByDate(mockNotifications);
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">
          Manage system and customer notifications
        </p>
      </div>

      <Tabs defaultValue="inbox" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Check className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          </div>
        </div>

        <TabsContent value="inbox" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Notification Center</CardTitle>
              <CardDescription>
                System alerts, updates, and customer communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(groupedNotifications).map(([dateGroup, notifications]) => (
                  notifications.length > 0 && (
                    <div key={dateGroup}>
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">{dateGroup}</h3>
                      <div className="space-y-4">
                        {notifications.map((notification) => (
                          <div key={notification.id} className={`flex space-x-4 p-4 rounded-lg ${notification.read ? 'bg-background' : 'bg-secondary/20'}`}>
                            <div className={`flex-shrink-0 rounded-full p-2 ${getNotificationTypeColor(notification.type)}`}>
                              {getNotificationTypeIcon(notification.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <p className="font-medium">{notification.title}</p>
                                <div className="flex items-center space-x-2">
                                  {!notification.read && (
                                    <Badge variant="secondary" className="text-xs">New</Badge>
                                  )}
                                  <span className="text-xs text-muted-foreground">
                                    {formatTime(notification.createdAt)}
                                  </span>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <ChevronDown className="h-4 w-4" />
                                        <span className="sr-only">Actions</span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <Check className="mr-2 h-4 w-4" />
                                        Mark as read
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Bell className="mr-2 h-4 w-4" />
                                        Mute notifications
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-destructive">
                                        <Trash className="mr-2 h-4 w-4" />
                                        Delete notification
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>
                Customize messages sent to customers at different stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: "Order Confirmation", 
                    channel: "SMS & Email",
                    preview: "Your order #[OrderID] has been confirmed and is being processed." 
                  },
                  { 
                    title: "Dispatch Notification", 
                    channel: "SMS",
                    preview: "Your order #[OrderID] has been dispatched and will be delivered soon." 
                  },
                  { 
                    title: "Delivery Confirmation", 
                    channel: "SMS & Email",
                    preview: "Your order #[OrderID] has been delivered. Thank you for choosing our service!" 
                  },
                  { 
                    title: "Delivery Delay", 
                    channel: "SMS",
                    preview: "Your delivery for order #[OrderID] has been delayed. New ETA: [DeliveryTime]" 
                  }
                ].map((template, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{template.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{template.channel}</Badge>
                          {index < 3 && <Badge variant="secondary">Active</Badge>}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{template.preview}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Create New Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Customer Notifications</h3>
                  {[
                    { label: "Order Confirmations", defaultChecked: true },
                    { label: "Dispatch Alerts", defaultChecked: true },
                    { label: "Delivery Updates", defaultChecked: true },
                    { label: "Delivery Confirmations", defaultChecked: true },
                    { label: "Delay Notifications", defaultChecked: true }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm">{item.label}</p>
                      </div>
                      <Switch defaultChecked={item.defaultChecked} />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Admin Notifications</h3>
                  {[
                    { label: "System Alerts", defaultChecked: true },
                    { label: "Failed Deliveries", defaultChecked: true },
                    { label: "New Customer Signups", defaultChecked: false },
                    { label: "Daily Summary Reports", defaultChecked: true }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm">{item.label}</p>
                      </div>
                      <Switch defaultChecked={item.defaultChecked} />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Communication Channels</h3>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Settings
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      SMS Settings
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Smartphone className="h-4 w-4 mr-2" />
                      Push Settings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

const getNotificationTypeColor = (type: NotificationType['type']) => {
  switch (type) {
    case 'info':
      return 'bg-blue-100';
    case 'success':
      return 'bg-green-100';
    case 'warning':
      return 'bg-amber-100';
    case 'error':
      return 'bg-red-100';
    default:
      return 'bg-gray-100';
  }
};

const getNotificationTypeIcon = (type: NotificationType['type']) => {
  switch (type) {
    case 'info':
      return <Bell className="h-4 w-4 text-blue-600" />;
    case 'success':
      return <Check className="h-4 w-4 text-green-600" />;
    case 'warning':
      return <AlertCircle className="h-4 w-4 text-amber-600" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return <Bell className="h-4 w-4 text-gray-600" />;
  }
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default Notifications;
