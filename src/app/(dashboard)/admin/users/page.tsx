'use client';

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Filter, Download, Mail, Edit, MoreHorizontal, AlertTriangle, Loader2 } from "lucide-react";
import Request from "@/lib/request";
import { toast } from "sonner";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(true);
  const [filterPlan, setFilterPlan] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await Request.Get('/api/admin/users');
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterActive ? user.status !== "inactive" : true;
    const planMatch =
      filterPlan === "all" || user.plan.toLowerCase() === filterPlan.toLowerCase();

    return searchMatch && statusMatch && planMatch;
  });

  const getBillingBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Overdue</Badge>;
      case "trial":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Trial</Badge>;
      case "canceled":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Canceled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="space-y-8 pl-5 pr-2">
        {/* Header section */}
        <div className="bg-background/70 backdrop-blur-md p-8 rounded-lg shadow-xl border border-[#8b5cf6]/20">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-transparent">
            User Management
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage user accounts, subscriptions, and usage
          </p>
        </div>

        {/* Alert */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                2 users have low credit balances and 1 user has an overdue payment.
              </p>
            </div>
          </div>
        </div>

        {/* User Management */}
        <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
          <CardHeader>
            <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
              <div>
                <CardTitle>User Accounts</CardTitle>
                <CardDescription>
                  Manage and view all user accounts in the system
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5">
                  <Download className="mr-2 h-4 w-4" />
                  Export Users
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] hover:from-[#8b5cf6] hover:to-[#2B6CB0]">
                  Add New User
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search users by name or email..."
                  className="pl-10 w-full border-[#8b5cf6]/20"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={filterActive ? "default" : "outline"}
                  onClick={() => setFilterActive(!filterActive)}
                  className={filterActive ? "bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6]" : "border-[#8b5cf6]/20"}
                >
                  Active Only
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
                <select
                  className="rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none"
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                >
                  <option value="all">All Plans</option>
                  <option value="essential">Essential</option>
                  <option value="professional">Professional</option>
                  <option value="completo">Completo</option>
                </select>
              </div>
            </div>

            {showFilters && (
              <div className="mb-6 p-4 border border-[#8b5cf6]/20 rounded-lg bg-background/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Signup Date</label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type="date"
                        className="border-[#8b5cf6]/20"
                      />
                      <Input
                        type="date"
                        className="border-[#8b5cf6]/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Credit Balance</label>
                    <select
                      className="mt-1 w-full h-10 rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="all">All Balances</option>
                      <option value="low">Low (&lt; 20 credits)</option>
                      <option value="medium">Medium (20-100 credits)</option>
                      <option value="high">High (&gt; 100 credits)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Billing Status</label>
                    <select
                      className="mt-1 w-full h-10 rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none"
                    >
                      <option value="all">All Statuses</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                      <option value="trial">Trial</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm" className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40">Clear Filters</Button>
                  <Button size="sm" className="bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6]">Apply Filters</Button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-[#8b5cf6]" />
                  <span className="ml-3 text-muted-foreground">Loading users...</span>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#8b5cf6]/10">
                      <th className="text-left p-3 font-medium">User</th>
                      <th className="text-left p-3 font-medium">Plan</th>
                      <th className="text-left p-3 font-medium">Credits</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Last Active</th>
                      <th className="text-left p-3 font-medium">Signup Date</th>
                      <th className="text-left p-3 font-medium">Billing</th>
                      <th className="text-right p-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[#8b5cf6]/10 hover:bg-[#8b5cf6]/5">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </td>
                      <td className="p-3">{user.plan}</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2">
                          <span>{user.credits}</span>
                          {user.credits < 20 && user.credits > 0 && (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Low</Badge>
                          )}
                          {user.credits === 0 && (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Empty</Badge>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge 
                          className={
                            user.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                            user.status === "warning" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                            "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-3">{user.lastActive}</td>
                      <td className="p-3">{user.signupDate}</td>
                      <td className="p-3">{getBillingBadge(user.billingStatus)}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="sm" className="hover:bg-[#8b5cf6]/5">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-[#8b5cf6]/5">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="hover:bg-[#8b5cf6]/5">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {!loading && (
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
                <span className="font-medium">{users.length}</span> users
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled className="border-[#8b5cf6]/20">
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="px-3 bg-[#8b5cf6]/10 border-[#8b5cf6]/30">
                  1
                </Button>
                <Button variant="outline" size="sm" className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5">
                  Next
                </Button>
              </div>
            </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}