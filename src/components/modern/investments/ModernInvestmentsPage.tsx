
import React from 'react';
import { TrendingUp, DollarSign, PieChart, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const ModernInvestmentsPage = () => {
  const portfolioValue = 45750;
  const totalGain = 3250;
  const gainPercentage = 7.6;

  const investments = [
    {
      name: "ETF World",
      symbol: "MSCI World",
      value: 15000,
      gain: 1250,
      percentage: 8.3,
      allocation: 33
    },
    {
      name: "S&P 500 ETF",
      symbol: "SPY",
      value: 12000,
      gain: 800,
      percentage: 6.7,
      allocation: 26
    },
    {
      name: "Europa ETF",
      symbol: "STOXX 600",
      value: 8000,
      gain: 450,
      percentage: 5.6,
      allocation: 17
    },
    {
      name: "Emerging Markets",
      symbol: "EM ETF",
      value: 5500,
      gain: 350,
      percentage: 6.4,
      allocation: 12
    },
    {
      name: "Bonds ETF",
      symbol: "AGG",
      value: 5250,
      gain: 150,
      percentage: 2.9,
      allocation: 12
    }
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Portfolio Wert</p>
                <p className="text-2xl font-bold">{portfolioValue.toLocaleString('de-DE')} €</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Gesamtgewinn</p>
                <p className="text-2xl font-bold text-green-600">+{totalGain.toLocaleString('de-DE')} €</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Performance</p>
                <p className="text-2xl font-bold text-green-600">+{gainPercentage}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Positionen</p>
                <p className="text-2xl font-bold">{investments.length}</p>
              </div>
              <PieChart className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Holdings */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Zusammensetzung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {investments.map((investment, index) => (
            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{investment.name}</h4>
                  <p className="text-sm text-gray-500">{investment.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{investment.value.toLocaleString('de-DE')} €</p>
                  <Badge 
                    variant={investment.gain > 0 ? "default" : "destructive"}
                    className={investment.gain > 0 ? "bg-green-500" : ""}
                  >
                    +{investment.gain} € ({investment.percentage}%)
                  </Badge>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Allocation</span>
                  <span>{investment.allocation}%</span>
                </div>
                <Progress value={investment.allocation} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Performance Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Verlauf</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
            Performance Chart wird hier angezeigt
          </div>
        </CardContent>
      </Card>

      {/* Asset Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
            Asset Allocation Chart wird hier angezeigt
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModernInvestmentsPage;
