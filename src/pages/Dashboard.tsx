import { useEffect, useState } from "react";
import { Sparkles, Target, UserCheck } from "lucide-react";
import SkillRadarChart from "@/components/SkillRadarChart";
import TheArc from "@/components/TheArc";
import { generateSkillAnalysis, generateGapRecommendations, type UserProfile } from "@/lib/industries";

const Dashboard = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [skillData, setSkillData] = useState<{ skill: string; current: number; target: number }[]>([]);
  const [gaps, setGaps] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("skillarc_profile");
    if (saved) {
      const p = JSON.parse(saved) as UserProfile;
      setProfile(p);
      setSkillData(generateSkillAnalysis(p));
      setGaps(generateGapRecommendations(p));
    }
  }, []);

  return (
    <div className="px-4 pt-6 max-w-5xl mx-auto space-y-8">
      {/* Header - hidden on desktop (sidebar has logo) */}
      <div className="flex items-center gap-2 md:hidden">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-display font-bold tracking-tight">
          Skill<span className="text-primary">Arc</span>
        </h1>
      </div>

      {/* Profile Summary */}
      {profile && (
        <div className="gradient-card rounded-2xl border border-border p-4 md:p-6 flex flex-col sm:flex-row sm:items-center gap-4 shadow-md">
          <div className="h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <UserCheck className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Career Transition</p>
            <p className="font-display font-semibold truncate">
              {profile.currentRole} → {profile.targetRole}
            </p>
            <p className="text-xs text-muted-foreground">
              {profile.industry} → {profile.targetIndustry} · {profile.yearsExperience}y experience
            </p>
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Skill DNA section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-display font-semibold">Skill DNA</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Your transferable skills vs. target role requirements.
          </p>
          <div className="gradient-card rounded-2xl border border-border p-4 shadow-md">
            <SkillRadarChart data={skillData.length > 0 ? skillData : undefined} />
          </div>
        </section>

        {/* The Arc */}
        <TheArc gaps={gaps.length > 0 ? gaps : undefined} />
      </div>
    </div>
  );
};

export default Dashboard;
