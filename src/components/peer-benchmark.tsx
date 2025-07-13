import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, TrendingUp, Users, Award } from "lucide-react";

interface PeerBenchmarkProps {
  onNavigate: (screen: string) => void;
}

export const PeerBenchmark: React.FC<PeerBenchmarkProps> = ({ onNavigate }) => {
  const [selectedAge, setSelectedAge] = useState("25-30");
  const [selectedIncome, setSelectedIncome] = useState("5-8L");

  const userNetWorth = 1265000;
  const peerAverage = 950000;
  const percentileRank = 65;

  const chartData = [
    { label: "Bottom 25%", value: 400000, color: "bg-muted" },
    { label: "25-50%", value: 650000, color: "bg-secondary" },
    { label: "50-75%", value: 950000, color: "bg-accent" },
    { label: "Top 25%", value: 1500000, color: "bg-primary" },
    { label: "You", value: userNetWorth, color: "bg-success" }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Peer Benchmark</h2>
            <p className="text-sm text-muted-foreground">Compare with similar profiles</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Compare With</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Age Range</label>
                <Select value={selectedAge} onValueChange={setSelectedAge}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20-25">20-25 years</SelectItem>
                    <SelectItem value="25-30">25-30 years</SelectItem>
                    <SelectItem value="30-35">30-35 years</SelectItem>
                    <SelectItem value="35-40">35-40 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Income Range</label>
                <Select value={selectedIncome} onValueChange={setSelectedIncome}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select income" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-5L">₹3-5 LPA</SelectItem>
                    <SelectItem value="5-8L">₹5-8 LPA</SelectItem>
                    <SelectItem value="8-12L">₹8-12 LPA</SelectItem>
                    <SelectItem value="12L+">₹12+ LPA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-12 h-12 mx-auto mb-2 bg-success/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <p className="text-2xl font-bold text-foreground">{percentileRank}%</p>
              <p className="text-xs text-muted-foreground">Above peers</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-12 h-12 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xl font-bold text-foreground">₹{((userNetWorth - peerAverage) / 100000).toFixed(1)}L</p>
              <p className="text-xs text-muted-foreground">Above average</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-12 h-12 mx-auto mb-2 bg-secondary/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary-foreground" />
              </div>
              <p className="text-xl font-bold text-foreground">2.5K+</p>
              <p className="text-xs text-muted-foreground">Users compared</p>
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Net Worth Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {chartData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${item.label === 'You' ? 'text-success' : 'text-foreground'}`}>
                    {item.label}
                  </span>
                  <span className={`text-sm font-semibold ${item.label === 'You' ? 'text-success' : 'text-foreground'}`}>
                    ₹{(item.value / 100000).toFixed(1)}L
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div 
                    className={`${item.color} rounded-full h-3 transition-all duration-1000 ease-out`}
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Insights */}
        <Card className="bg-accent">
          <CardHeader>
            <CardTitle className="text-accent-foreground">🎯 Your Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-accent-foreground">
              <strong>Congratulations!</strong> You're ahead of {percentileRank}% of your peers in the {selectedAge} age group 
              earning {selectedIncome} annually.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <p className="text-sm text-accent-foreground">Your net worth is ₹{((userNetWorth - peerAverage) / 100000).toFixed(1)}L above average</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm text-accent-foreground">You're in the top 35% of your peer group</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <p className="text-sm text-accent-foreground">Your savings rate is above peer average</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button 
          className="w-full h-12"
          onClick={() => onNavigate('goals')}
        >
          Set New Financial Goals
        </Button>
      </div>
    </div>
  );
};