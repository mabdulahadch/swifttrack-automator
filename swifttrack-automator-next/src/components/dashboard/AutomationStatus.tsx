
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Clock, Activity } from "lucide-react";

const AutomationStatus = () => {
  const automationSystems = [
    {
      name: "Order Processing",
      status: "Operational",
      icon: <CheckCircle2 className="h-4 w-4 text-status-delivered" />,
      lastRun: "2 minutes ago",
      stats: "248 orders processed today",
    },
    {
      name: "Dispatch Scheduling",
      status: "Operational",
      icon: <CheckCircle2 className="h-4 w-4 text-status-delivered" />,
      lastRun: "15 minutes ago",
      stats: "58 orders dispatched today",
    },
    {
      name: "Routing Optimization",
      status: "Warning",
      icon: <AlertCircle className="h-4 w-4 text-status-pending" />,
      lastRun: "1 hour ago",
      stats: "High traffic detected in Lahore area",
    },
    {
      name: "Notification System",
      status: "Operational",
      icon: <CheckCircle2 className="h-4 w-4 text-status-delivered" />,
      lastRun: "5 minutes ago",
      stats: "1,054 notifications sent today",
    },
  ];

  return (
    <Card className="border shadow-sm col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" /> 
          Automation Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {automationSystems.map((system, index) => (
            <div key={index} className="flex items-start justify-between p-2 border-b last:border-0 last:pb-0">
              <div>
                <div className="flex items-center gap-2">
                  {system.icon}
                  <span className="font-medium">{system.name}</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{system.stats}</div>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" /> {system.lastRun}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomationStatus;
