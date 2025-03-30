
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart as BarChartIcon, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  PieChart,
  FileText,
  Share2,
  BarChart4,
  TrendingUp,
  Filter,
  Package,
  Truck,
  Clock,
  MapPin
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie,
  Cell
} from "recharts";

const Reports = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Reports & Analytics</h1>
        <p className="text-muted-foreground">
          Gain insights from delivery performance and system metrics
        </p>
      </div>

      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <Select defaultValue="last30">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <PieChart className="h-4 w-4 mr-2" />
            Customize Report
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="delivery">Delivery Performance</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard 
              title="Total Orders" 
              value="3,285" 
              trend="+12.5%" 
              trendUp={true}
              description="vs. last period" 
              icon={Package}
            />
            <MetricCard 
              title="On-time Delivery" 
              value="94.2%" 
              trend="+2.4%" 
              trendUp={true}
              description="vs. last period" 
              icon={Clock}
            />
            <MetricCard 
              title="Failed Deliveries" 
              value="87" 
              trend="-3.1%" 
              trendUp={true}
              description="vs. last period" 
              icon={Truck}
            />
            <MetricCard 
              title="Avg. Delivery Time" 
              value="42 mins" 
              trend="-5 mins" 
              trendUp={true}
              description="vs. last period" 
              icon={MapPin}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Orders Trend</CardTitle>
                <CardDescription>Daily orders over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={orderTrendData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="orders"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#colorOrders)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Status</CardTitle>
                <CardDescription>Distribution of order statuses</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="w-full h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={deliveryStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {deliveryStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance by Area</CardTitle>
              <CardDescription>Delivery metrics across different zones</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={areaPerformanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="area" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="onTime" stackId="a" fill="#4ade80" name="On-time" />
                  <Bar dataKey="delayed" stackId="a" fill="#fbbf24" name="Delayed" />
                  <Bar dataKey="failed" stackId="a" fill="#f87171" name="Failed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "April Performance Summary",
                    "Q1 2023 Analytics",
                    "March Delivery Metrics"
                  ].map((report, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{report}</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { area: "Gulshan", rate: "98.3%" },
                    { area: "Model Town", rate: "97.1%" },
                    { area: "DHA Phase 5", rate: "96.8%" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-sm font-medium">{item.area}</span>
                      </div>
                      <span className="text-sm font-medium">{item.rate}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scheduled Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Daily Performance", schedule: "Every day at 8 PM" },
                    { name: "Weekly Summary", schedule: "Every Monday at 9 AM" },
                    { name: "Monthly Analytics", schedule: "1st of month at 10 AM" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.schedule}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delivery">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Detailed delivery performance reports will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Operational metrics reports will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Financial performance reports will be displayed here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

const MetricCard = ({ title, value, trend, trendUp, description, icon: Icon }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center mt-1">
              <div className={`text-xs font-medium flex items-center ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
                {trendUp ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {trend}
              </div>
              <p className="text-xs text-muted-foreground ml-1">{description}</p>
            </div>
          </div>
          <div className="bg-primary/10 p-2 rounded-full">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Sample data
const orderTrendData = [
  { date: "Apr 1", orders: 120 },
  { date: "Apr 5", orders: 145 },
  { date: "Apr 10", orders: 135 },
  { date: "Apr 15", orders: 158 },
  { date: "Apr 20", orders: 142 },
  { date: "Apr 25", orders: 165 },
  { date: "Apr 30", orders: 180 },
];

const deliveryStatusData = [
  { name: "Delivered", value: 68 },
  { name: "In Transit", value: 15 },
  { name: "Processing", value: 12 },
  { name: "Failed", value: 5 },
];

const COLORS = ["#4ade80", "#8b5cf6", "#fbbf24", "#f87171"];

const areaPerformanceData = [
  { area: "Gulshan", onTime: 85, delayed: 10, failed: 5 },
  { area: "DHA", onTime: 78, delayed: 15, failed: 7 },
  { area: "Clifton", onTime: 82, delayed: 12, failed: 6 },
  { area: "Model Town", onTime: 80, delayed: 12, failed: 8 },
  { area: "Johar", onTime: 75, delayed: 18, failed: 7 },
];

export default Reports;
