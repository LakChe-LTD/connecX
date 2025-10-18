import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", hotspots: 5, earnings: "$450.50", status: "Active", joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", hotspots: 3, earnings: "$320.00", status: "Active", joined: "2024-01-10" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", hotspots: 8, earnings: "$780.25", status: "Active", joined: "2024-01-05" },
    { id: 4, name: "Sarah Williams", email: "sarah@example.com", hotspots: 2, earnings: "$150.75", status: "Inactive", joined: "2024-01-01" },
    { id: 5, name: "Alex Brown", email: "alex@example.com", hotspots: 6, earnings: "$620.00", status: "Active", joined: "2023-12-25" },
    { id: 6, name: "Emma Davis", email: "emma@example.com", hotspots: 4, earnings: "$380.50", status: "Active", joined: "2023-12-20" },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Users</h2>
          <p className="text-foreground/60">Manage and monitor user accounts</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white w-full md:w-auto">
          Add New User
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" size={20} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-background"
          />
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Hotspots</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Earnings</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Joined</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground/80">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border/40 hover:bg-muted/50 transition">
                  <td className="py-3 px-4 text-foreground font-medium">{user.name}</td>
                  <td className="py-3 px-4 text-foreground/70">{user.email}</td>
                  <td className="py-3 px-4 text-foreground">{user.hotspots}</td>
                  <td className="py-3 px-4 text-foreground font-semibold">{user.earnings}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      user.status === 'Active'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                        : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-foreground text-sm">{user.joined}</td>
                  <td className="py-3 px-4">
                    <button className="p-2 hover:bg-muted rounded-lg transition text-foreground/60 hover:text-foreground">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-foreground/60">No users found matching your search</p>
          </div>
        )}
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h4 className="text-foreground/60 text-sm mb-2">Total Users</h4>
          <p className="text-3xl font-bold text-foreground">{users.length}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">+15 this month</p>
        </Card>

        <Card className="p-6">
          <h4 className="text-foreground/60 text-sm mb-2">Active Users</h4>
          <p className="text-3xl font-bold text-foreground">{users.filter(u => u.status === 'Active').length}</p>
          <p className="text-xs text-foreground/60 mt-2">{Math.round(users.filter(u => u.status === 'Active').length / users.length * 100)}% of total</p>
        </Card>

        <Card className="p-6">
          <h4 className="text-foreground/60 text-sm mb-2">Total Earnings</h4>
          <p className="text-3xl font-bold text-foreground">$3,680</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">+$500 this week</p>
        </Card>
      </div>
    </div>
  );
}
