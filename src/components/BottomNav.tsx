import { Compass, TrendingUp, BookOpen, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", icon: Compass, label: "Explore" },
  { to: "/dashboard", icon: TrendingUp, label: "My Arc" },
  { to: "/learning", icon: BookOpen, label: "Learning" },
  { to: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg safe-area-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 text-xs transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-5 w-5 ${isActive ? "drop-shadow-[0_0_6px_hsl(160_55%_50%/0.6)]" : ""}`} />
                <span className="font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
