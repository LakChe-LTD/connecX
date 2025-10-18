import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AdminRewards() {
  const [rewards, setRewards] = useState([
    {
      id: 1,
      name: "Bronze Tier",
      requirement: "10 GB/month",
      bonus: "5%",
      description: "Entry level reward tier",
      active: true,
      users: 450
    },
    {
      id: 2,
      name: "Silver Tier",
      requirement: "50 GB/month",
      bonus: "10%",
      description: "Standard reward tier",
      active: true,
      users: 280
    },
    {
      id: 3,
      name: "Gold Tier",
      requirement: "100 GB/month",
      bonus: "15%",
      description: "Premium reward tier",
      active: true,
      users: 120
    },
    {
      id: 4,
      name: "Platinum Tier",
      requirement: "500 GB/month",
      bonus: "25%",
      description: "Elite reward tier",
      active: true,
      users: 35
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReward, setNewReward] = useState({
    name: "",
    requirement: "",
    bonus: "",
    description: ""
  });

  const handleAddReward = (e: React.FormEvent) => {
    e.preventDefault();
    const reward = {
      id: rewards.length + 1,
      ...newReward,
      active: true,
      users: 0
    };
    setRewards([...rewards, reward]);
    setNewReward({ name: "", requirement: "", bonus: "", description: "" });
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    setRewards(rewards.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header & Action */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reward Tiers</h2>
          <p className="text-foreground/60">Manage reward tiers and incentives</p>
        </div>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto flex items-center justify-center gap-2"
        >
          <Gift size={18} />
          Add New Tier
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <Card className="p-6 border-primary/30 bg-primary/5">
          <h3 className="text-lg font-semibold text-foreground mb-4">Create New Reward Tier</h3>
          <form onSubmit={handleAddReward} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tier Name</label>
                <input
                  type="text"
                  value={newReward.name}
                  onChange={(e) => setNewReward({ ...newReward, name: e.target.value })}
                  placeholder="e.g., Diamond Tier"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Requirement</label>
                <input
                  type="text"
                  value={newReward.requirement}
                  onChange={(e) => setNewReward({ ...newReward, requirement: e.target.value })}
                  placeholder="e.g., 200 GB/month"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bonus Percentage</label>
                <input
                  type="text"
                  value={newReward.bonus}
                  onChange={(e) => setNewReward({ ...newReward, bonus: e.target.value })}
                  placeholder="e.g., 20%"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <input
                  type="text"
                  value={newReward.description}
                  onChange={(e) => setNewReward({ ...newReward, description: e.target.value })}
                  placeholder="Brief description"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Create Tier
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="p-6 relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{reward.name}</h3>
                  <p className="text-sm text-foreground/60">{reward.description}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition text-foreground/60 hover:text-foreground">
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(reward.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition text-foreground/60 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-foreground/60 mb-1">Requirement</p>
                <p className="font-semibold text-foreground">{reward.requirement}</p>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-foreground/60 mb-1">Bonus</p>
                <p className="text-2xl font-bold text-primary">{reward.bonus}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground/60">Active Users</span>
                <span className="font-semibold text-foreground">{reward.users}</span>
              </div>

              <div className="pt-3 border-t border-border">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={reward.active}
                    className="w-4 h-4 rounded border-input"
                  />
                  <span className="text-sm text-foreground">Active</span>
                </label>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Rewards Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h4 className="text-foreground/60 text-sm mb-2">Total Reward Tiers</h4>
          <p className="text-3xl font-bold text-foreground">{rewards.length}</p>
          <p className="text-xs text-foreground/60 mt-2">Active in system</p>
        </Card>

        <Card className="p-6">
          <h4 className="text-foreground/60 text-sm mb-2">Users in Rewards</h4>
          <p className="text-3xl font-bold text-foreground">{rewards.reduce((sum, r) => sum + r.users, 0)}</p>
          <p className="text-xs text-foreground/60 mt-2">Across all tiers</p>
        </Card>

        <Card className="p-6">
          <h4 className="text-foreground/60 text-sm mb-2">Avg Bonus Rate</h4>
          <p className="text-3xl font-bold text-foreground">
            {(rewards.reduce((sum, r) => sum + parseInt(r.bonus), 0) / rewards.length).toFixed(0)}%
          </p>
          <p className="text-xs text-foreground/60 mt-2">Across all tiers</p>
        </Card>
      </div>

      {/* Recent Reward Distributions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Distributions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">User</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Tier</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { user: "John Doe", tier: "Silver Tier", amount: "$150.00", date: "2024-01-20", status: "Distributed" },
                { user: "Jane Smith", tier: "Gold Tier", amount: "$280.00", date: "2024-01-19", status: "Distributed" },
                { user: "Mike Johnson", tier: "Silver Tier", amount: "$125.00", date: "2024-01-18", status: "Distributed" },
                { user: "Sarah Williams", tier: "Bronze Tier", amount: "$45.50", date: "2024-01-17", status: "Distributed" },
              ].map((dist, idx) => (
                <tr key={idx} className="border-b border-border/40 hover:bg-muted/50 transition">
                  <td className="py-3 px-4 text-foreground">{dist.user}</td>
                  <td className="py-3 px-4 text-foreground">{dist.tier}</td>
                  <td className="py-3 px-4 text-foreground font-semibold">{dist.amount}</td>
                  <td className="py-3 px-4 text-foreground text-sm">{dist.date}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100">
                      {dist.status}
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
