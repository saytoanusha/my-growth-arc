import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-6 pb-24 overflow-hidden">
        {/* Background image */}
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

        {/* Content */}
        <div className="relative z-10 max-w-lg text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 animate-fade-in-up">
            <Sparkles className="h-7 w-7 text-primary" />
            <span className="text-2xl font-display font-bold tracking-tight">
              Skill<span className="text-primary">Arc</span>
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-display font-bold leading-tight animate-fade-in-up"
            style={{ animationDelay: "150ms" }}
          >
            Bridge the Gap to Your{" "}
            <span className="text-primary text-glow">Dream Career</span>
          </h1>

          <p
            className="text-muted-foreground text-lg animate-fade-in-up"
            style={{ animationDelay: "300ms" }}
          >
            Discover your skill DNA, map it against your target role, and get a personalized learning arc to close every gap.
          </p>

          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "450ms" }}
          >
            <button
              onClick={() => navigate("/dashboard")}
              className="inline-flex items-center gap-2 gradient-mint rounded-lg px-8 py-4 text-base font-display font-semibold text-primary-foreground transition-all hover:scale-[1.03] active:scale-[0.98] animate-pulse-glow"
            >
              Analyze My Resume
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
