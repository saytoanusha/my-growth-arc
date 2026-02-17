import { useEffect, useState } from "react";
import { Sparkles, User, Settings, LogOut, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "@/lib/industries";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("skillarc_profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  return (
    <div className="px-4 pt-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-2 md:hidden">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-display font-bold tracking-tight">
          Skill<span className="text-primary">Arc</span>
        </h1>
      </div>

      <div className="flex flex-col items-center gap-4 py-8">
        <div className="h-20 w-20 rounded-full bg-primary/15 flex items-center justify-center">
          <User className="h-10 w-10 text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-display font-semibold">
            {profile ? profile.currentRole : "New User"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {profile
              ? `${profile.currentRole} → ${profile.targetRole}`
              : "Complete onboarding to get started"}
          </p>
          {profile && (
            <p className="text-xs text-muted-foreground mt-1">
              {profile.industry} → {profile.targetIndustry}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <button
          onClick={() => navigate("/onboarding")}
          className="w-full flex items-center gap-3 gradient-card rounded-2xl border border-border p-4 text-sm font-medium transition-colors hover:border-primary/30 min-h-[44px] shadow-md"
        >
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
          Redo Career Analysis
        </button>
        {[
          { icon: Settings, label: "Settings" },
          { icon: LogOut, label: "Sign Out" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 gradient-card rounded-2xl border border-border p-4 text-sm font-medium transition-colors hover:border-primary/30 min-h-[44px] shadow-md"
          >
            <item.icon className="h-4 w-4 text-muted-foreground" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Profile;
