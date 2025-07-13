import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { TrendingUp, Target, Plus, User, Bell } from "lucide-react";

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Good morning, Priya!</h2>
            <p className="text-sm text-muted-foreground">Here's your financial snapshot</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Net Worth Card */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium">Total Net Worth</p>
                <p className="text-3xl font-bold">₹12,65,000</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+8.2% this month</span>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => onNavigate('networth')}
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {/* Affordability Score */}
          <Card className="cursor-pointer" onClick={() => onNavigate('affordability')}>
            <CardContent className="p-6 text-center">
              <ProgressCircle value={78} size={80} strokeWidth={6}>
                <div>
                  <p className="text-2xl font-bold text-foreground">78</p>
                  <p className="text-xs text-muted-foreground">Score</p>
                </div>
              </ProgressCircle>
              <p className="text-sm font-medium text-foreground mt-3">Affordability Score</p>
              <p className="text-xs text-success">Good</p>
            </CardContent>
          </Card>

          {/* Peer Comparison */}
          <Card className="cursor-pointer" onClick={() => onNavigate('peer-benchmark')}>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-secondary rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-secondary-foreground" />
                </div>
                <p className="text-2xl font-bold text-foreground">65%</p>
                <p className="text-xs text-muted-foreground">Above peers</p>
                <p className="text-sm font-medium text-foreground mt-2">Peer Benchmark</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-12 justify-start gap-3"
              onClick={() => onNavigate('goals')}
            >
              <Target className="w-5 h-5" />
              Track Goals
            </Button>
            <Button 
              variant="outline" 
              className="h-12 justify-start gap-3"
              onClick={() => onNavigate('networth')}
            >
              <Plus className="w-5 h-5" />
              Update Info
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium">Mutual Fund Investment</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-success">+₹15,000</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium">Goal Progress Updated</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};