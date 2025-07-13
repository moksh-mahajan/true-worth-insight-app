import React from 'react';
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Target } from "lucide-react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light to-accent flex flex-col">
      {/* Logo and Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-primary rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">TrueWorth</h1>
          <p className="text-lg text-muted-foreground font-medium">
            Your real financial picture starts here
          </p>
        </div>

        {/* Feature highlights */}
        <div className="space-y-4 mb-12 max-w-sm">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Complete Financial Health</p>
              <p className="text-sm text-muted-foreground">Beyond just credit scores</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <Target className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Smart Goal Planning</p>
              <p className="text-sm text-muted-foreground">Achieve your financial dreams</p>
            </div>
          </div>
        </div>

        <Button 
          onClick={onGetStarted}
          size="lg"
          className="w-full max-w-sm h-12 text-base font-semibold rounded-xl"
        >
          Get Started
        </Button>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Trusted by thousands of professionals
        </p>
      </div>
    </div>
  );
};