import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, TrendingUp, Wallet } from "lucide-react";

export default function DashboardEarnings() {
  return (
    <div className="space-y-6">
      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-foreground/60 text-sm mb-1">Total Earnings</p>
              <h3 className="text-3xl font-bold text-foreground">$12,450</h3>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400">+15% from last month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-foreground/60 text-sm mb-1">This Month</p>
              <h3 className="text-3xl font-bold text-foreground">$1,845</h3>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-foreground/60">8 days remaining</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-foreground/60 text-sm mb-1">Available Balance</p>
              <h3 className="text-3xl font-bold text-foreground">$3,200</h3>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <Wallet className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white">
            Withdraw Funds
          </Button>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Earnings Over Time</h3>
        <div className="h-80 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-end justify-around p-4">
          {[420, 580, 650, 720, 890, 950, 1200, 1450].map((height, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-1">
              <div
                className="bg-gradient-to-t from-primary to-secondary rounded-t w-full mx-1"
                style={{ height: `${(height / 1500) * 100}%` }}
              />
              <span className="text-xs text-foreground/60">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][idx]}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Transaction History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Transaction History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "2024-01-20", desc: "Bandwidth earnings", type: "Credit", amount: "+$245.50", status: "Completed" },
                { date: "2024-01-19", desc: "Withdrawal", type: "Debit", amount: "-$500.00", status: "Pending" },
                { date: "2024-01-18", desc: "Bonus reward", type: "Credit", amount: "+$150.00", status: "Completed" },
                { date: "2024-01-17", desc: "Bandwidth earnings", type: "Credit", amount: "+$320.75", status: "Completed" },
                { date: "2024-01-16", desc: "Referral bonus", type: "Credit", amount: "+$100.00", status: "Completed" },
              ].map((tx, idx) => (
                <tr key={idx} className="border-b border-border/40 hover:bg-muted/50 transition">
                  <td className="py-3 px-4 text-foreground text-sm">{tx.date}</td>
                  <td className="py-3 px-4 text-foreground">{tx.desc}</td>
                  <td className="py-3 px-4">
                    <span className={`text-sm font-medium ${tx.type === 'Credit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-foreground font-semibold">{tx.amount}</td>
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

      {/* Reward Tiers */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Reward Tiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { tier: "Bronze", requirement: "10 GB/month", bonus: "+5%" },
            { tier: "Silver", requirement: "50 GB/month", bonus: "+10%", current: true },
            { tier: "Gold", requirement: "100 GB/month", bonus: "+15%" }
          ].map((tier, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border ${
                tier.current
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-muted/30'
              }`}
            >
              <h4 className="font-semibold text-foreground mb-2">{tier.tier}</h4>
              <p className="text-sm text-foreground/70 mb-2">Requirement: {tier.requirement}</p>
              <p className="text-lg font-bold text-primary">{tier.bonus} Bonus</p>
              {tier.current && (
                <p className="text-xs text-primary mt-2 font-medium">Current Tier</p>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
