import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Target, Home, Shield, TrendingUp } from "lucide-react";

interface GoalPlannerProps {
  onNavigate: (screen: string) => void;
}

export const GoalPlanner: React.FC<GoalPlannerProps> = ({ onNavigate }) => {
  const [selectedGoal, setSelectedGoal] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [showPlan, setShowPlan] = useState(false);

  const goalTypes = [
    { id: "house", name: "Buy House", icon: Home, suggestedAmount: "3000000" },
    { id: "emergency", name: "Emergency Fund", icon: Shield, suggestedAmount: "300000" },
    { id: "retirement", name: "Retirement", icon: TrendingUp, suggestedAmount: "5000000" }
  ];

  const calculatePlan = () => {
    if (!targetAmount || !timeFrame) return null;
    
    const amount = parseInt(targetAmount);
    const months = parseInt(timeFrame) * 12;
    const monthlyRequired = Math.round(amount / months);
    
    return {
      monthlyRequired,
      totalAmount: amount,
      timeFrameYears: parseInt(timeFrame),
      progressPercentage: 0
    };
  };

  const plan = calculatePlan();

  const handleCreatePlan = () => {
    if (targetAmount && timeFrame) {
      setShowPlan(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Goal Planner</h2>
            <p className="text-sm text-muted-foreground">Plan and track your financial goals</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Goal Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Choose Your Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {goalTypes.map((goal) => (
                <div
                  key={goal.id}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedGoal === goal.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => {
                    setSelectedGoal(goal.id);
                    setTargetAmount(goal.suggestedAmount);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedGoal === goal.id ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                    }`}>
                      <goal.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{goal.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Suggested: ₹{(parseInt(goal.suggestedAmount) / 100000).toFixed(1)}L
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goal Details */}
        {selectedGoal && (
          <Card>
            <CardHeader>
              <CardTitle>Goal Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Target Amount (₹)</label>
                <Input
                  type="number"
                  placeholder="Enter target amount"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Time Frame</label>
                <Select value={timeFrame} onValueChange={setTimeFrame}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 year</SelectItem>
                    <SelectItem value="2">2 years</SelectItem>
                    <SelectItem value="3">3 years</SelectItem>
                    <SelectItem value="5">5 years</SelectItem>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="15">15 years</SelectItem>
                    <SelectItem value="20">20 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full h-12"
                onClick={handleCreatePlan}
                disabled={!targetAmount || !timeFrame}
              >
                Create Plan
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Generated Plan */}
        {showPlan && plan && (
          <Card className="bg-primary-light border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">📊 Your Savings Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card rounded-xl">
                  <p className="text-2xl font-bold text-foreground">₹{plan.monthlyRequired.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Monthly savings needed</p>
                </div>
                
                <div className="text-center p-4 bg-card rounded-xl">
                  <p className="text-2xl font-bold text-foreground">{plan.timeFrameYears} years</p>
                  <p className="text-sm text-muted-foreground">Time to achieve goal</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-foreground">Progress</span>
                  <span className="text-sm text-muted-foreground">{plan.progressPercentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className="bg-primary rounded-full h-3 transition-all duration-1000 ease-out"
                    style={{ width: `${plan.progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">
                  ₹0 of ₹{plan.totalAmount.toLocaleString()} saved
                </p>
              </div>

              {/* Tips */}
              <div className="space-y-3 mt-6">
                <h4 className="font-semibold text-foreground">💡 Tips to reach your goal faster:</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <p className="text-sm text-foreground">Set up automatic transfers to a dedicated savings account</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <p className="text-sm text-foreground">Consider SIPs in mutual funds for better returns</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <p className="text-sm text-foreground">Review and increase contributions quarterly</p>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full h-12 mt-6"
                onClick={() => onNavigate('dashboard')}
              >
                Track Progress
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Existing Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Active Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 rounded-xl border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Emergency Fund</p>
                    <p className="text-sm text-muted-foreground">₹2L goal by Dec 2024</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-primary">65%</p>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary rounded-full h-2 w-[65%]"></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">₹1.3L of ₹2L saved</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
