import { BookOpen, Sparkles } from "lucide-react";

const courses = [
  { title: "System Design Fundamentals", provider: "Educative", duration: "20h", progress: 0 },
  { title: "AWS Cloud Practitioner", provider: "AWS Training", duration: "30h", progress: 12 },
  { title: "Advanced TypeScript Patterns", provider: "Total TS", duration: "15h", progress: 45 },
];

const Learning = () => {
  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-display font-bold tracking-tight">
          Skill<span className="text-primary">Arc</span>
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-display font-semibold">Learning Path</h2>
      </div>

      <div className="space-y-3">
        {courses.map((c) => (
          <div key={c.title} className="gradient-card rounded-lg border border-border p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-display font-semibold text-sm">{c.title}</h3>
                <p className="text-xs text-muted-foreground">{c.provider} · {c.duration}</p>
              </div>
              <span className="text-xs font-medium text-primary">{c.progress}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted">
              <div className="h-1.5 rounded-full gradient-mint transition-all" style={{ width: `${c.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;
