
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Search, PlusCircle, Mail, Phone } from "lucide-react";

const Customers = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <p className="text-muted-foreground">
          Manage customer information and orders
        </p>
      </div>

      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customers..."
              className="pl-8 w-full"
            />
          </div>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Customers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="vip">VIP</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-md"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {String.fromCharCode(65 + index)}
                            {String.fromCharCode(75 + index)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {["Ahmed Khan", "Fatima Ali", "Mohammad Raza", "Ayesha Malik", "Bilal Ahmed"][index]}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {index + 3} orders • Customer since {2023 - index}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="active">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  Active customers will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="vip">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  VIP customers will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="new">
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  New customers will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Total Customers</p>
                  <p className="text-2xl font-bold">1,248</p>
                  <p className="text-xs text-muted-foreground">
                    +15 this week
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Active Customers</p>
                  <p className="text-2xl font-bold">843</p>
                  <p className="text-xs text-muted-foreground">
                    67% of total
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Avg. Orders</p>
                  <p className="text-2xl font-bold">3.7</p>
                  <p className="text-xs text-muted-foreground">
                    Per customer
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <p className="text-sm font-medium">Retention Rate</p>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-xs text-muted-foreground">
                    +2.5% from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Signups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                          {String.fromCharCode(76 + index)}
                          {String.fromCharCode(83 + index)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {["Hamza Iqbal", "Zainab Hussain", "Umar Farooq"][index - 1]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {index} {index === 1 ? "hour" : "hours"} ago
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Customers;
