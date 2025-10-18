import { BarChart3, TrendingUp, Wifi, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function DashboardOverview() {
  const stats = [
    {
      icon: Wifi,
      label: "Active Hotspots",
      value: "12",
      change: "+2 this month",
      color: "bg-blue-100 dark:bg-blue-900"
    },
    {
      icon: Users,
      label: "Connected Users",
      value: "245",
      change: "+32 today",
      color: "bg-green-100 dark:bg-green-900"
    },
    {
      icon: TrendingUp,
      label: "Revenue",
      value: "$4,250",
      change: "+12% from last month",
      color: "bg-purple-100 dark:bg-purple-900"
    },
    {
      icon: BarChart3,
      label: "Bandwidth Used",
      value: "85.6 GB",
      change: "+5.2 GB today",
      color: "bg-orange-100 dark:bg-orange-900"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-foreground/60 text-sm mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
            <p className="text-xs text-foreground/50">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Chart */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Bandwidth Usage</h3>
          <div className="h-80 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-end justify-around p-4">
            {[65, 78, 90, 72, 85, 95, 88].map((height, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div
                  className="bg-gradient-to-t from-primary to-secondary rounded-t w-8"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-foreground/60">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "New user connected", time: "2 mins ago", icon: "👤" },
              { action: "Hotspot #5 online", time: "1 hour ago", icon: "📡" },
              { action: "Reward earned", time: "3 hours ago", icon: "🎁" },
              { action: "Payment received", time: "Yesterday", icon: "💰" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.action}</p>
                  <p className="text-xs text-foreground/60">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Hotspots List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Your Hotspots</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Users</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Bandwidth</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((item) => (
                <tr key={item} className="border-b border-border/40 hover:bg-muted/50 transition">
                  <td className="py-3 px-4 text-foreground">Hotspot #{item}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm font-medium">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      Online
                    </span>
                  </td>
                  <td className="py-3 px-4 text-foreground">{Math.floor(Math.random() * 100) + 20}</td>
                  <td className="py-3 px-4 text-foreground">{(Math.random() * 50 + 10).toFixed(1)} GB</td>
                  <td className="py-3 px-4 text-foreground font-semibold">${(Math.random() * 200 + 50).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
