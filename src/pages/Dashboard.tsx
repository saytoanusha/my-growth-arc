import { Sparkles, Target } from "lucide-react";
import SkillRadarChart from "@/components/SkillRadarChart";
import TheArc from "@/components/TheArc";

const Dashboard = () => {
  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-display font-bold tracking-tight">
          Skill<span className="text-primary">Arc</span>
        </h1>
      </div>

      {/* Skill DNA section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-display font-semibold">Skill DNA</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Your current skills vs. Senior Frontend Engineer requirements.
        </p>

        <div className="gradient-card rounded-xl border border-border p-4">
          <SkillRadarChart />
        </div>
      </section>

      {/* The Arc */}
      <TheArc />
    </div>
  );
};

export default Dashboard;
