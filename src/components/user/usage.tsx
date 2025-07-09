'use client';

import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Download,
  Filter,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Loading from '@/components/loading';
import { getTransactionHistory } from '@/core/transaction';
import { getSubscription } from '@/core/subscription';
import { getCurrentProfile } from '@/core/auth/server';
import { useLanguage } from '@/lib/i18n/language-context';

const UsagePage = () => {
  const { t } = useLanguage();
  const [dateRange, setDateRange] = useState('7-days');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [creditLog, setCreditLog] = useState({ plan: 0, totalSpent: 0, balance:0 });
  const [chartData, setChartData] = useState([]);
  const [totalData, setTotalData] = useState([]);

  const getDateRange = (range: string) => {
    const to = new Date();
    const from = new Date();

    switch (range) {
      case '7-days':
        from.setDate(to.getDate() - 7);
        break;
      case '30-days':
        from.setDate(to.getDate() - 30);
        break;
      case '90-days':
        from.setDate(to.getDate() - 90);
        break;
      default:
        from.setDate(to.getDate() - 30);
        break;
    }

    return { from, to };
  };

  const transformToChartData = (logs: any[], from: Date, to: Date) => {
    const map = new Map<string, number>();

    for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
      const key = d.toISOString().slice(0, 10);
      map.set(key, 0);
    }

    logs.forEach((log) => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      if (map.has(date)) {
        map.set(date, map.get(date)! + log.credits_spent);
      }
    });

    return Array.from(map.entries()).map(([date, credits]) => ({
      date,
      credits,
    }));
  };

  const getHistory = async () => {
    try {
      const profile = await getCurrentProfile()
      const tempLog = {
        plan: 0,
        totalSpent: 0,
        balance:0
      };
      const logs = await getTransactionHistory(profile.id);
      logs.forEach((log) => (tempLog.totalSpent += log.credits_spent));
      tempLog.balance = profile.credits_balance
      await getSubscription(profile.id)
        .then((res) => (tempLog.plan = res?.amount ? res.amount : 0))
        .catch((err) => console.log('get Subscription Error', err));

      const { from, to } = getDateRange(dateRange);

      const filteredLogs = logs.filter((log) => {
        const logDate = new Date(log.timestamp);
        return (!from || logDate >= from) && (!to || logDate <= to);
      });

      const transformed = transformToChartData(filteredLogs, from, to);
      setRecentActivity(logs);
      setCreditLog(tempLog);
      setChartData(transformed);
      setTotalData(logs);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load usage data:", error);
    }
  };

  const setTable = () => {
    const { from, to } = getDateRange(dateRange);

    const filteredLogs = totalData.filter((log) => {
      const logDate = new Date(log.timestamp);
      return (!from || logDate >= from) && (!to || logDate <= to);
    });

    const transformed = transformToChartData(filteredLogs, from, to);
    setChartData(transformed);
  };

  useEffect(() => {
    getHistory();
  },[]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTable();
  }, [dateRange]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="space-y-8 pl-2 pr-2">
        {/* Header section */}
        <div className="rounded-lg border border-[#8b5cf6]/20 bg-background/70 p-8 shadow-xl backdrop-blur-md">
          <h1 className="bg-gradient-to-r from-[#2B6CB0] to-[#8b5cf6] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
            {t.user.usage.title}
          </h1>
          <p className="text-muted-foreground">
            {t.user.usage.subtitle}
          </p>
        </div>

        {/* Usage Summary */}
        <Card className="border border-[#8b5cf6]/20 bg-background/70 shadow-md backdrop-blur-md">
          <CardHeader>
            <CardTitle>{t.user.usage.summary}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div className="flex-1 border-b border-[#8b5cf6]/10 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
                <p className="text-sm text-muted-foreground">
                  {t.user.usage.monthlyAllocation}
                </p>
                <p className="text-2xl font-semibold">{creditLog?.plan}</p>
                <p className="text-sm text-muted-foreground">
                  {t.user.usage.resetDate}
                </p>
              </div>
              <div className="flex-1 border-b border-[#8b5cf6]/10 py-4 md:border-b-0 md:border-r md:px-4 md:py-0">
                <p className="text-sm text-muted-foreground">{t.user.usage.usedThisMonth}</p>
                <p className="text-2xl font-semibold">
                  {creditLog?.totalSpent}
                </p>
                <p className="text-sm text-muted-foreground">
                  43% {t.user.usage.percentageUsed}
                </p>
              </div>
              <div className="flex-1 pt-4 md:pl-4 md:pt-0">
                <p className="text-sm text-muted-foreground">
                  {t.user.usage.remainingBalance}
                </p>
                <p className="text-2xl font-semibold">
                  {creditLog.balance} {t.user.usage.creditsUnit}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t.user.usage.expireWarning}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Trend Chart */}
        <Card className="border border-[#8b5cf6]/20 bg-background/70 shadow-md backdrop-blur-md">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t.user.usage.usageTrend}</CardTitle>
                <CardDescription>{t.user.usage.usageTrendDescription}</CardDescription>
              </div>
              <div className="flex space-x-2">
                {[{key: '7-days', label: t.user.usage.timeRanges.sevenDays}, {key: '30-days', label: t.user.usage.timeRanges.thirtyDays}, {key: '90-days', label: t.user.usage.timeRanges.ninetyDays}].map((range) => (
                  <Button
                    key={range.key}
                    variant="outline"
                    size="sm"
                    onClick={() => setDateRange(range.key)}
                    className={`border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5 ${
                      dateRange === range.key ? 'bg-[#8b5cf6] text-white' : ''
                    }`}
                  >
                    {range.label.replace('-days', 'D').replace('-días', 'D').replace('-dias', 'D')}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#EDF2F7"
                  />
                  <XAxis
                    dataKey="date"
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
                    formatter={(value: number) => [`${value} credits`, 'Usage']}
                    labelFormatter={(label: string) => `${label}`}
                  />
                  <Bar dataKey="credits" fill="#2B6CB0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="border border-[#8b5cf6]/20 bg-background/70 shadow-md backdrop-blur-md">
          <CardHeader>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <CardTitle>{t.user.usage.activityLog}</CardTitle>
                <CardDescription>
                  {t.user.usage.activityLogDescription}
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#8b5cf6]/20 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t.user.usage.export}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Activity Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#8b5cf6]/10">
                    <th className="p-3 text-left font-medium">{t.user.usage.tableHeaders.date}</th>
                    <th className="p-3 text-left font-medium">{t.user.usage.tableHeaders.agent}</th>
                    <th className="p-3 text-left font-medium">{t.user.usage.tableHeaders.activity}</th>
                    <th className="p-3 text-left font-medium">{t.user.usage.tableHeaders.creditsUsed}</th>
                    <th className="p-3 text-left font-medium">{t.user.usage.tableHeaders.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((log, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#8b5cf6]/10 hover:bg-[#8b5cf6]/5"
                    >
                      <td className="p-3">
                        {new Date(log.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                        })}
                      </td>
                      <td className="p-3">{log.agent_type}</td>
                      <td className="p-3">{log.task_type}</td>
                      <td className="p-3">{log.credits_spent}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
                          {log.output_type === 'text' ? t.user.usage.success : t.user.usage.failed}
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
                Showing <span className="font-medium">1</span> to{' '}
                <span className="font-medium">10</span> of{' '}
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
                  className="border-[#8b5cf6]/20 bg-[#8b5cf6]/10 px-3 text-[#8b5cf6]"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#8b5cf6]/20 px-3 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#8b5cf6]/20 px-3 hover:border-[#8b5cf6]/40 hover:bg-[#8b5cf6]/5"
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
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-[#2B6CB0]" />
                <span className="font-medium">Total Credits Used:</span>
              </div>
              <span className="text-lg font-semibold">
                {creditLog.totalSpent} Credits
              </span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default UsagePage