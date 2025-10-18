import { Card } from "@/components/ui/card";
import { Users, BarChart3, TrendingUp, AlertCircle } from "lucide-react";

export default function AdminOverview() {
  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: "2,450",
      change: "+180 this month",
      color: "bg-blue-100 dark:bg-blue-900"
    },
    {
      icon: BarChart3,
      label: "Active Hotspots",
      value: "1,280",
      change: "+45 this month",
      color: "bg-green-100 dark:bg-green-900"
    },
    {
      icon: TrendingUp,
      label: "Total Revenue",
      value: "$125,450",
      change: "+22% from last month",
      color: "bg-purple-100 dark:bg-purple-900"
    },
    {
      icon: AlertCircle,
      label: "Active Issues",
      value: "12",
      change: "3 critical",
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
        {/* User Growth Chart */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">User Growth</h3>
          <div className="h-80 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-end justify-around p-4">
            {[420, 580, 750, 920, 1100, 1280, 1450, 1850].map((height, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="bg-gradient-to-t from-primary to-secondary rounded-t w-full mx-1"
                  style={{ height: `${(height / 2000) * 100}%` }}
                />
                <span className="text-xs text-foreground/60">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][idx]}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* System Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
          <div className="space-y-4">
            {[
              { status: "API Servers", health: "Operational", color: "green" },
              { status: "Database", health: "Operational", color: "green" },
              { status: "CDN", health: "Operational", color: "green" },
              { status: "Payment Gateway", health: "Warning", color: "yellow" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-foreground/70">{item.status}</span>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.color === 'green'
                    ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                    : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
                }`}>
                  {item.health}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">User</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { user: "John Doe", type: "Withdrawal", amount: "$500.00", date: "2024-01-20", status: "Completed" },
                { user: "Jane Smith", type: "Deposit", amount: "+$250.00", date: "2024-01-19", status: "Completed" },
                { user: "Mike Johnson", type: "Withdrawal", amount: "$1,200.00", date: "2024-01-18", status: "Pending" },
                { user: "Sarah Williams", type: "Bonus", amount: "+$100.00", date: "2024-01-17", status: "Completed" },
              ].map((tx, idx) => (
                <tr key={idx} className="border-b border-border/40 hover:bg-muted/50 transition">
                  <td className="py-3 px-4 text-foreground">{tx.user}</td>
                  <td className="py-3 px-4 text-foreground">{tx.type}</td>
                  <td className="py-3 px-4 text-foreground font-semibold">{tx.amount}</td>
                  <td className="py-3 px-4 text-foreground text-sm">{tx.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      tx.status === 'Completed'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
