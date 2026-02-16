import { Sparkles, User, Settings, LogOut } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
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
          <h2 className="text-lg font-display font-semibold">Alex Johnson</h2>
          <p className="text-sm text-muted-foreground">Frontend Developer → Senior FE Engineer</p>
        </div>
      </div>

      <div className="space-y-2">
        {[
          { icon: Settings, label: "Settings" },
          { icon: LogOut, label: "Sign Out" },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 gradient-card rounded-lg border border-border p-4 text-sm font-medium transition-colors hover:border-primary/30"
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
