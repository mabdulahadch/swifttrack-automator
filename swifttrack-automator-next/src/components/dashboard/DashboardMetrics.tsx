
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingUp, Truck, Users, AlertTriangle } from "lucide-react";

const DashboardMetrics = () => {
  const metrics = [
    {
      title: "Total Orders",
      value: "1,284",
      change: "+12.5%",
      icon: <Package className="h-5 w-5 text-swifttrack-600" />,
      changeColor: "text-status-delivered",
    },
    {
      title: "Processing",
      value: "162",
      change: "+5.2%",
      icon: <TrendingUp className="h-5 w-5 text-status-processing" />,
      changeColor: "text-status-processing",
    },
    {
      title: "Dispatched",
      value: "58",
      change: "+3.1%",
      icon: <Truck className="h-5 w-5 text-status-dispatched" />,
      changeColor: "text-status-dispatched",
    },
    {
      title: "Exceptions",
      value: "23",
      change: "-8.4%",
      icon: <AlertTriangle className="h-5 w-5 text-status-failed" />,
      changeColor: "text-status-delivered",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              {metric.icon}
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className={`text-xs ${metric.changeColor} flex items-center gap-1`}>
              {metric.change} from last week
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardMetrics;
