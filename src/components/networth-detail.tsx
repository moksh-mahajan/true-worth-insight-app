import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Home, Car, Wallet, CreditCard, Building2, TrendingUp } from "lucide-react";

interface NetWorthDetailProps {
  onNavigate: (screen: string) => void;
}

export const NetWorthDetail: React.FC<NetWorthDetailProps> = ({ onNavigate }) => {
  const assets = [
    { name: "Savings Account", amount: 285000, icon: Wallet, color: "bg-primary/20 text-primary" },
    { name: "Mutual Funds", amount: 450000, icon: TrendingUp, color: "bg-success/20 text-success" },
    { name: "Car", amount: 650000, icon: Car, color: "bg-secondary/20 text-secondary-foreground" },
    { name: "Property", amount: 850000, icon: Home, color: "bg-accent/20 text-accent-foreground" }
  ];

  const liabilities = [
    { name: "Home Loan", amount: 320000, icon: Building2, color: "bg-destructive/20 text-destructive" },
    { name: "Credit Card", amount: 45000, icon: CreditCard, color: "bg-warning/20 text-warning" },
    { name: "Personal Loan", amount: 85000, icon: Wallet, color: "bg-muted/40 text-muted-foreground" }
  ];

  const totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Net Worth Details</h2>
            <p className="text-sm text-muted-foreground">Complete breakdown of your finances</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Net Worth Summary */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6 text-center">
            <p className="text-primary-foreground/80 text-sm font-medium">Total Net Worth</p>
            <p className="text-4xl font-bold">₹{(netWorth / 100000).toFixed(1)}L</p>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div>
                <p className="text-primary-foreground/80">Assets</p>
                <p className="font-semibold">₹{(totalAssets / 100000).toFixed(1)}L</p>
              </div>
              <div>
                <p className="text-primary-foreground/80">Liabilities</p>
                <p className="font-semibold">₹{(totalLiabilities / 100000).toFixed(1)}L</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart Representation */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(var(--muted))"
                    strokeWidth="16"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="hsl(var(--primary))"
                    strokeWidth="16"
                    fill="transparent"
                    strokeDasharray={`${(totalAssets / (totalAssets + totalLiabilities)) * 351.8} 351.8`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-lg font-bold text-foreground">{((totalAssets / (totalAssets + totalLiabilities)) * 100).toFixed(0)}%</p>
                  <p className="text-xs text-muted-foreground">Assets</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-muted-foreground">Assets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted rounded-full"></div>
                <span className="text-sm text-muted-foreground">Liabilities</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Assets</h3>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Asset
            </Button>
          </div>
          
          <div className="space-y-3">
            {assets.map((asset, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${asset.color}`}>
                        <asset.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{asset.name}</p>
                        <p className="text-sm text-muted-foreground">Current value</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-foreground">₹{(asset.amount / 1000).toFixed(0)}K</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Liabilities */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Liabilities</h3>
            <Button size="sm" variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Liability
            </Button>
          </div>
          
          <div className="space-y-3">
            {liabilities.map((liability, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${liability.color}`}>
                        <liability.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{liability.name}</p>
                        <p className="text-sm text-muted-foreground">Outstanding amount</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-destructive">₹{(liability.amount / 1000).toFixed(0)}K</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};