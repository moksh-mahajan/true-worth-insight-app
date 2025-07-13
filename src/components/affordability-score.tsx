import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { ArrowLeft, TrendingUp, Shield, CreditCard, Info } from "lucide-react";

interface AffordabilityScoreProps {
  onNavigate: (screen: string) => void;
}

export const AffordabilityScore: React.FC<AffordabilityScoreProps> = ({ onNavigate }) => {
  const score = 78;
  const getScoreLabel = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "text-success" };
    if (score >= 60) return { label: "Good", color: "text-primary" };
    if (score >= 40) return { label: "Fair", color: "text-warning" };
    return { label: "Poor", color: "text-destructive" };
  };

  const scoreInfo = getScoreLabel(score);

  const factors = [
    {
      name: "Net Worth",
      value: "₹12.65L",
      score: 85,
      icon: TrendingUp,
      description: "Strong asset base"
    },
    {
      name: "Credit Score", 
      value: "742",
      score: 74,
      icon: Shield,
      description: "Good credit history"
    },
    {
      name: "Debt-to-Income",
      value: "28%",
      score: 76,
      icon: CreditCard,
      description: "Healthy debt ratio"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Affordability Score</h2>
            <p className="text-sm text-muted-foreground">Your financial health assessment</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Score Display */}
        <Card>
          <CardContent className="p-8 text-center">
            <ProgressCircle value={score} size={160} strokeWidth={12}>
              <div>
                <p className="text-4xl font-bold text-foreground">{score}</p>
                <p className="text-sm text-muted-foreground">out of 100</p>
              </div>
            </ProgressCircle>
            <div className="mt-6">
              <p className={`text-2xl font-bold ${scoreInfo.color}`}>{scoreInfo.label}</p>
              <p className="text-muted-foreground mt-2">
                Your affordability score indicates strong financial health with room for improvement.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Score Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {factors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <factor.icon className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{factor.name}</p>
                      <p className="text-sm text-muted-foreground">{factor.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{factor.value}</p>
                    <p className="text-sm text-muted-foreground">{factor.score}/100</p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary rounded-full h-2 transition-all duration-1000 ease-out"
                    style={{ width: `${factor.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Improvement Tips */}
        <Card className="bg-primary-light border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">💡 Tips to Improve</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Reduce credit utilization</p>
                <p className="text-sm text-muted-foreground">Keep credit card usage below 30% of limit</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Increase emergency fund</p>
                <p className="text-sm text-muted-foreground">Build 6 months of expenses in savings</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <div>
                <p className="font-medium text-foreground">Diversify investments</p>
                <p className="text-sm text-muted-foreground">Consider adding bonds or index funds</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button 
          className="w-full h-12"
          onClick={() => onNavigate('goals')}
        >
          Create Improvement Plan
        </Button>
      </div>
    </div>
  );
};