import { ExternalLink, Zap } from "lucide-react";

interface GapItem {
  skill: string;
  gap: number;
  course: string;
  url: string;
  description: string;
}

interface TheArcProps {
  gaps?: GapItem[];
}

const defaultGaps: GapItem[] = [
  {
    skill: "Industry Knowledge",
    gap: 55,
    course: "Cross-Industry Fundamentals",
    url: "#",
    description: "Build foundational knowledge for your target industry transition.",
  },
  {
    skill: "Strategic Leadership",
    gap: 40,
    course: "Executive Leadership Program",
    url: "#",
    description: "Develop strategic thinking and people management for senior roles.",
  },
  {
    skill: "Data-Driven Decisions",
    gap: 35,
    course: "Analytics for Professionals",
    url: "#",
    description: "Leverage data insights for better business outcomes across any field.",
  },
];

const TheArc = ({ gaps = defaultGaps }: TheArcProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-display font-semibold">The Arc</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Your top skill gaps — bridge them to reach your target role.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {gaps.map((item, i) => (
          <div
            key={item.skill}
            className="gradient-card rounded-2xl border border-border p-4 transition-all hover:border-primary/30 hover:glow-mint shadow-md"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <h3 className="font-display font-semibold text-sm">{item.skill}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{item.description}</p>

              {/* Gap bar */}
              <div>
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

              <a
                href={item.url}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-primary/10 px-3 py-2.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20 min-h-[44px]"
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
