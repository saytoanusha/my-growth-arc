import { ExternalLink, Zap } from "lucide-react";

const missingSkills = [
  {
    skill: "System Design",
    gap: 40,
    course: "Grokking System Design",
    url: "#",
    description: "Learn distributed systems, scalability patterns, and architecture fundamentals.",
  },
  {
    skill: "Cloud / AWS",
    gap: 50,
    course: "AWS Solutions Architect",
    url: "#",
    description: "Master cloud infrastructure, deployment, and managed services.",
  },
  {
    skill: "TypeScript Advanced",
    gap: 20,
    course: "Total TypeScript",
    url: "#",
    description: "Generics, conditional types, and advanced patterns for production apps.",
  },
];

const TheArc = () => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-display font-semibold">The Arc</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Your top 3 skill gaps — bridge them to reach your target role.
      </p>

      <div className="space-y-3">
        {missingSkills.map((item, i) => (
          <div
            key={item.skill}
            className="gradient-card rounded-lg border border-border p-4 transition-all hover:border-primary/30 hover:glow-mint"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <h3 className="font-display font-semibold">{item.skill}</h3>
                </div>
                <p className="text-xs text-muted-foreground pl-8">{item.description}</p>

                {/* Gap bar */}
                <div className="pl-8 pt-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Gap</span>
                    <span>{item.gap}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full gradient-mint transition-all duration-700"
                      style={{ width: `${item.gap}%` }}
                    />
                  </div>
                </div>
              </div>

              <a
                href={item.url}
                className="mt-1 flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20 whitespace-nowrap"
              >
                Bridge Course
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TheArc;
