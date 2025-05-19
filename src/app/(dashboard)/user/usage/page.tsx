'use client';

import { Calendar, ChevronLeft, ChevronRight, CreditCard, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usageData, activityLogs } from "@/lib/constants/usermock";
export default function UsagePage() {
  const [dateRange, setDateRange] = useState("30-days");
  const [filterOpen, setFilterOpen] = useState(false);
  
  const user = {
    name: "John Doe",
    email: "john@example.com",
    plan: "Professional",
    credits: 85,
  };
  const totalCredits = activityLogs.reduce((sum, log) => sum + log.creditsUsed, 0);

  return (
    <div className="relative overflow-hidden">
      <div className="space-y-8 pl-5 pr-2">
        {/* Header section */}
        <div className="bg-background/70 backdrop-blur-md p-8 rounded-lg shadow-xl border border-[#8b5cf6]/20">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-transparent">
            Credit Usage History
          </h1>
          <p className="text-muted-foreground">
            Track and analyze your AI credit usage
          </p>
        </div>
        
        {/* Usage Summary */}
        <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
          <CardHeader>
            <CardTitle>Usage Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1 border-b md:border-b-0 md:border-r border-[#8b5cf6]/10 pb-4 md:pb-0 md:pr-4">
                <p className="text-sm text-muted-foreground">Monthly Allocation</p>
                <p className="text-2xl font-semibold">150 Credits</p>
                <p className="text-sm text-muted-foreground">Resets on May 26, 2025</p>
              </div>
              <div className="flex-1 border-b md:border-b-0 md:border-r border-[#8b5cf6]/10 py-4 md:py-0 md:px-4">
                <p className="text-sm text-muted-foreground">Used this Month</p>
                <p className="text-2xl font-semibold">65 Credits</p>
                <p className="text-sm text-muted-foreground">43% of your monthly limit</p>
              </div>
              <div className="flex-1 pt-4 md:pt-0 md:pl-4">
                <p className="text-sm text-muted-foreground">Remaining Balance</p>
                <p className="text-2xl font-semibold">{user.credits} Credits</p>
                <p className="text-sm text-muted-foreground">Will expire if not used</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Trend Chart */}
        <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Usage Trend</CardTitle>
                <CardDescription>Daily credit usage over time</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setDateRange("7-days")}
                  className={`border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5 ${dateRange === "7-days" ? "bg-[#8b5cf6]/10 text-[#8b5cf6]" : ""}`}
                >
                  7D
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setDateRange("30-days")}
                  className={`border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5 ${dateRange === "30-days" ? "bg-[#8b5cf6]/10 text-[#8b5cf6]" : ""}`}
                >
                  30D
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setDateRange("90-days")}
                  className={`border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5 ${dateRange === "90-days" ? "bg-[#8b5cf6]/10 text-[#8b5cf6]" : ""}`}
                >
                  90D
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={usageData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                    axisLine={{ stroke: '#EDF2F7' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    tickLine={false}
                    axisLine={{ stroke: '#EDF2F7' }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`${value} credits`, 'Usage']}
                    labelFormatter={(label) => `May ${label}`}
                  />
                  <Bar 
                    dataKey="credits" 
                    fill="#2B6CB0" 
                    radius={[4, 4, 0, 0]} 
                    name="Credits Used" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="bg-background/70 backdrop-blur-md shadow-md border border-[#8b5cf6]/20">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Detailed record of your AI agent usage</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filterOpen && (
              <div className="mb-4 p-4 border border-[#8b5cf6]/20 rounded-md bg-[#8b5cf6]/5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Agent Type</label>
                    <select className="mt-1 w-full h-10 rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50">
                      <option value="">All Agents</option>
                      <option value="marketing">Marketing Bot</option>
                      <option value="organization">Organization Bot</option>
                      <option value="strategy">Strategy Bot</option>
                      <option value="whatsapp">WhatsApp Bot</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Activity Type</label>
                    <select className="mt-1 w-full h-10 rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50">
                      <option value="">All Activities</option>
                      <option value="campaign">Campaign</option>
                      <option value="content">Content Generation</option>
                      <option value="analysis">Analysis</option>
                      <option value="response">Customer Response</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Sort By</label>
                    <select className="mt-1 w-full h-10 rounded-md border border-[#8b5cf6]/20 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/50">
                      <option value="date-desc">Date (Newest First)</option>
                      <option value="date-asc">Date (Oldest First)</option>
                      <option value="credits-desc">Credits (Highest First)</option>
                      <option value="credits-asc">Credits (Lowest First)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                  >
                    Reset
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-[#2B6CB0] hover:bg-[#2B6CB0]/90"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          
            {/* Activity Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#8b5cf6]/10">
                    <th className="text-left p-3 font-medium">Date</th>
                    <th className="text-left p-3 font-medium">Agent</th>
                    <th className="text-left p-3 font-medium">Activity</th>
                    <th className="text-left p-3 font-medium">Credits Used</th>
                    <th className="text-left p-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activityLogs.map((log) => (
                    <tr key={log.id} className="border-b border-[#8b5cf6]/10 hover:bg-[#8b5cf6]/5">
                      <td className="p-3">{log.date}</td>
                      <td className="p-3">{log.agent}</td>
                      <td className="p-3">{log.activity}</td>
                      <td className="p-3">{log.creditsUsed}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600">
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">45</span> results
              </div>
              <div className="flex space-x-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled
                  className="border-[#8b5cf6]/20"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="px-3 bg-[#8b5cf6]/10 text-[#8b5cf6] border-[#8b5cf6]/20"
                >
                  1
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="px-3 border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  2
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="px-3 border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  3
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#8b5cf6]/10 p-4">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-[#2B6CB0] mr-2" />
                <span className="font-medium">Total Credits Used:</span>
              </div>
              <span className="text-lg font-semibold">{totalCredits} Credits</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}