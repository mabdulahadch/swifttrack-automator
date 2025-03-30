
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Route, TruckIcon, Navigation } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Routing = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Route Planning</h1>
        <p className="text-muted-foreground">
          Optimize delivery routes and schedules
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Route Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] bg-muted flex items-center justify-center rounded-md">
              <div className="text-center flex flex-col items-center space-y-4">
                <MapPin className="h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  Interactive map visualization will be displayed here
                </p>
                <Button variant="outline" className="mt-2">
                  <Navigation className="h-4 w-4 mr-2" />
                  Load Map View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Route Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="optimizer">Optimization Strategy</Label>
                <Select defaultValue="fastest">
                  <SelectTrigger id="optimizer">
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fastest">Fastest Routes</SelectItem>
                    <SelectItem value="efficient">Fuel Efficient</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="custom">Custom Settings</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicles">Available Vehicles</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="vehicles">
                    <SelectValue placeholder="Select vehicles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles</SelectItem>
                    <SelectItem value="bikes">Bikes Only</SelectItem>
                    <SelectItem value="cars">Cars Only</SelectItem>
                    <SelectItem value="vans">Vans Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-stops">Maximum Stops Per Route</Label>
                <Input
                  id="max-stops"
                  placeholder="Enter number of stops"
                  type="number"
                  defaultValue="15"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Orders</Label>
                <Input
                  id="priority"
                  placeholder="Enter order IDs (comma separated)"
                />
              </div>

              <Button className="w-full mt-4">
                <Route className="h-4 w-4 mr-2" />
                Generate Optimal Routes
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Active Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((route) => (
                <div
                  key={route}
                  className="flex items-center justify-between p-4 border rounded-md"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <TruckIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Route #{route}</p>
                      <p className="text-sm text-muted-foreground">
                        {10 + route} stops • Est. completion: {route + 1}h 30m
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Route Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium">Average Route Completion</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last week
                </p>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium">On-time Delivery Rate</p>
                <p className="text-2xl font-bold">93%</p>
                <p className="text-xs text-muted-foreground">
                  +1.2% from last week
                </p>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <p className="text-sm font-medium">Avg. Delivery Time</p>
                <p className="text-2xl font-bold">42 min</p>
                <p className="text-xs text-muted-foreground">
                  -3 min from last week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Routing;
