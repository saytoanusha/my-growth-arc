import { Compass, TrendingUp, BookOpen, User, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", icon: Compass, label: "Explore" },
  { to: "/dashboard", icon: TrendingUp, label: "My Arc" },
  { to: "/learning", icon: BookOpen, label: "Learning" },
  { to: "/profile", icon: User, label: "Profile" },
];

const AppSidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen border-r border-border bg-card/80 backdrop-blur-sm p-4 space-y-6 sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2 py-3">
        <Sparkles className="h-6 w-6 text-primary" />
        <span className="text-lg font-display font-bold tracking-tight">
          Skill<span className="text-primary">Arc</span>
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border pt-4 px-2">
        <p className="text-xs text-muted-foreground">Universal Career Platform</p>
      </div>
    </aside>
  );
};

export default AppSidebar;
