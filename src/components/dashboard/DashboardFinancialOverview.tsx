
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, TrendingUp, TrendingDown, PiggyBank, CreditCard, Building, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Widget from '@/components/Widget';

const DashboardFinancialOverview = () => {
  // Schweizer Haushalts-Beispieldaten
  const monthlyBudget = {
    total: 8500,
    spent: 6240,
    categories: [
      { name: 'Wohnen & Nebenkosten', budget: 2800, spent: 2800, color: 'bg-red-500' },
      { name: 'Lebensmittel', budget: 1200, spent: 980, color: 'bg-orange-500' },
      { name: 'Transport & Mobilität', budget: 800, spent: 650, color: 'bg-yellow-500' },
      { name: 'Versicherungen', budget: 900, spent: 900, color: 'bg-green-500' },
      { name: 'Freizeit & Entertainment', budget: 600, spent: 420, color: 'bg-blue-500' },
      { name: 'Shopping & Diverses', budget: 500, spent: 490, color: 'bg-purple-500' }
    ]
  };

  const investments = [
    { name: 'UBS ETF Portfolio', value: 245000, change: +2.8, type: 'ETF' },
    { name: 'Saxo Bank Aktien', value: 178500, change: -1.2, type: 'Aktien' },
    { name: 'Raiffeisen 3a', value: 95000, change: +0.8, type: 'Säule 3a' },
    { name: 'Crypto Portfolio', value: 35000, change: +5.4, type: 'Krypto' }
  ];

  const upcomingBills = [
    { name: 'Krankenversicherung', amount: 580, due: '5 Tage', urgent: false },
    { name: 'Handyrechnung', amount: 95, due: '12 Tage', urgent: false },
    { name: 'Stromrechnung', amount: 240, due: '2 Tage', urgent: true },
    { name: 'Internet/TV', amount: 89, due: '8 Tage', urgent: false }
  ];

  const spentPercentage = Math.round((monthlyBudget.spent / monthlyBudget.total) * 100);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 text-green-700">Finanz-Dashboard</h2>
      <Card className="border-green-100 dark:border-green-800 shadow-md">
        <CardContent className="p-0">
          <Tabs defaultValue="overview" className="w-full">
            <div className="border-b border-green-100">
              <div className="px-4">
                <TabsList className="h-12 bg-transparent border-b-0 p-0">
                  <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 rounded-none bg-transparent">
                    Übersicht
                  </TabsTrigger>
                  <TabsTrigger value="budget" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 rounded-none bg-transparent">
                    <PiggyBank className="h-4 w-4 mr-2" />
                    Budget
                  </TabsTrigger>
                  <TabsTrigger value="investments" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 rounded-none bg-transparent">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Investitionen
                  </TabsTrigger>
                  <TabsTrigger value="bills" className="data-[state=active]:border-b-2 data-[state=active]:border-green-600 data-[state=active]:text-green-700 rounded-none bg-transparent">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Rechnungen
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            
            <TabsContent value="overview" className="p-0 m-0">
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Widget 
                    title="Monatsbudget" 
                    icon={<PiggyBank className="h-5 w-5" />}
                    className="border-green-100"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">CHF {monthlyBudget.spent.toLocaleString()}</span>
                        <Badge variant={spentPercentage > 85 ? "destructive" : spentPercentage > 70 ? "secondary" : "default"}>
                          {spentPercentage}%
                        </Badge>
                      </div>
                      <Progress value={spentPercentage} className="h-2" />
                      <p className="text-sm text-gray-600">
                        von CHF {monthlyBudget.total.toLocaleString()} • CHF {(monthlyBudget.total - monthlyBudget.spent).toLocaleString()} übrig
                      </p>
                    </div>
                  </Widget>

                  <Widget 
                    title="Gesamtvermögen" 
                    icon={<Building className="h-5 w-5" />}
                    className="border-green-100"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">CHF 553'500</span>
                        <div className="flex items-center text-green-600">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="text-sm">+2.1%</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Investitionen:</span>
                          <span>CHF 553'500</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Hypotheken:</span>
                          <span className="text-red-600">-CHF 1'200'000</span>
                        </div>
                      </div>
                    </div>
                  </Widget>

                  <Widget 
                    title="Anstehende Rechnungen" 
                    icon={<AlertTriangle className="h-5 w-5" />}
                    className="border-green-100"
                  >
                    <div className="space-y-2">
                      <div className="text-2xl font-bold">CHF 1'004</div>
                      <div className="space-y-1">
                        {upcomingBills.slice(0, 2).map((bill) => (
                          <div key={bill.name} className="flex justify-between text-sm">
                            <span className={bill.urgent ? "text-red-600 font-medium" : ""}>{bill.name}</span>
                            <span>CHF {bill.amount}</span>
                          </div>
                        ))}
                      </div>
                      <Badge variant="outline" className="w-full justify-center">
                        +{upcomingBills.length - 2} weitere
                      </Badge>
                    </div>
                  </Widget>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="budget" className="p-0 m-0">
              <div className="p-4">
                <Widget 
                  title="Budget-Aufschlüsselung" 
                  icon={<PiggyBank className="h-5 w-5" />}
                  className="border-green-100"
                >
                  <div className="space-y-4">
                    {monthlyBudget.categories.map((category) => {
                      const percentage = Math.round((category.spent / category.budget) * 100);
                      return (
                        <div key={category.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{category.name}</span>
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm">CHF {category.spent}</span>
                                <Badge variant={percentage > 100 ? "destructive" : percentage > 90 ? "secondary" : "outline"}>
                                  {percentage}%
                                </Badge>
                              </div>
                              <span className="text-xs text-gray-500">von CHF {category.budget}</span>
                            </div>
                          </div>
                          <Progress value={Math.min(percentage, 100)} className="h-1.5" />
                        </div>
                      );
                    })}
                  </div>
                </Widget>
              </div>
            </TabsContent>
            
            <TabsContent value="investments" className="p-0 m-0">
              <div className="p-4">
                <Widget 
                  title="Investment Portfolio" 
                  icon={<TrendingUp className="h-5 w-5" />}
                  className="border-green-100"
                >
                  <div className="space-y-3">
                    {investments.map((investment) => (
                      <div key={investment.name} className="flex justify-between items-center p-3 rounded-lg border border-gray-100 dark:border-gray-800">
                        <div>
                          <p className="font-medium">{investment.name}</p>
                          <p className="text-sm text-gray-500">{investment.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">CHF {investment.value.toLocaleString()}</p>
                          <div className={`flex items-center text-sm ${investment.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {investment.change > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                            {investment.change > 0 ? '+' : ''}{investment.change}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Widget>
              </div>
            </TabsContent>
            
            <TabsContent value="bills" className="p-0 m-0">
              <div className="p-4">
                <Widget 
                  title="Anstehende Zahlungen" 
                  icon={<CreditCard className="h-5 w-5" />}
                  className="border-green-100"
                >
                  <div className="space-y-3">
                    {upcomingBills.map((bill) => (
                      <div key={bill.name} className={`flex justify-between items-center p-3 rounded-lg border ${bill.urgent ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950' : 'border-gray-100 dark:border-gray-800'}`}>
                        <div>
                          <p className={`font-medium ${bill.urgent ? 'text-red-700 dark:text-red-300' : ''}`}>
                            {bill.name}
                          </p>
                          <p className="text-sm text-gray-500">Fällig in {bill.due}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">CHF {bill.amount}</p>
                          {bill.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Dringend
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Widget>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardFinancialOverview;
