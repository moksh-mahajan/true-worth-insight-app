import React, { useState } from 'react';
import { WelcomeScreen } from '@/components/welcome-screen';
import { Dashboard } from '@/components/dashboard';
import { NetWorthDetail } from '@/components/networth-detail';
import { AffordabilityScore } from '@/components/affordability-score';
import { PeerBenchmark } from '@/components/peer-benchmark';
import { GoalPlanner } from '@/components/goal-planner';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => handleNavigate('dashboard')} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'networth':
        return <NetWorthDetail onNavigate={handleNavigate} />;
      case 'affordability':
        return <AffordabilityScore onNavigate={handleNavigate} />;
      case 'peer-benchmark':
        return <PeerBenchmark onNavigate={handleNavigate} />;
      case 'goals':
        return <GoalPlanner onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return renderScreen();
};

export default Index;
