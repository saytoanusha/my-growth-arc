import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Sparkles, Briefcase, Target, CheckCircle2 } from "lucide-react";
import { industries } from "@/lib/industries";

const steps = [
  { icon: Briefcase, title: "Current Role", subtitle: "Where are you now?" },
  { icon: Target, title: "Target Role", subtitle: "Where do you want to go?" },
  { icon: CheckCircle2, title: "Experience", subtitle: "Tell us about yourself" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    currentRole: "",
    industry: "",
    targetRole: "",
    targetIndustry: "",
    yearsExperience: "",
    skills: [] as string[],
  });

  const allSkills = [
    "Leadership", "Communication", "Problem Solving", "Project Management",
    "Data Analysis", "Critical Thinking", "Teamwork", "Adaptability",
    "Time Management", "Strategic Planning", "Negotiation", "Public Speaking",
  ];

  const toggleSkill = (skill: string) => {
    setForm((f) => ({
      ...f,
      skills: f.skills.includes(skill)
        ? f.skills.filter((s) => s !== skill)
        : [...f.skills, skill],
    }));
  };

  const canNext =
    (step === 0 && form.currentRole && form.industry) ||
    (step === 1 && form.targetRole && form.targetIndustry) ||
    (step === 2 && form.yearsExperience && form.skills.length > 0);

  const handleFinish = () => {
    localStorage.setItem("skillarc_profile", JSON.stringify({
      ...form,
      yearsExperience: Number(form.yearsExperience),
    }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg space-y-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-display font-bold tracking-tight">
            Skill<span className="text-primary">Arc</span>
          </span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className={`h-1.5 w-full rounded-full transition-colors ${
                  i <= step ? "gradient-mint" : "bg-muted"
                }`}
              />
              <span className={`text-xs font-medium ${i <= step ? "text-primary" : "text-muted-foreground"}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="gradient-card rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-lg">
          <div className="flex items-center gap-3">
            {(() => {
              const Icon = steps[step].icon;
              return <Icon className="h-6 w-6 text-primary" />;
            })()}
            <div>
              <h2 className="text-lg font-display font-semibold">{steps[step].title}</h2>
              <p className="text-sm text-muted-foreground">{steps[step].subtitle}</p>
            </div>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Industry</label>
                <select
                  value={form.industry}
                  onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value, currentRole: "" }))}
                  className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select industry…</option>
                  {industries.map((ind) => (
                    <option key={ind.label} value={ind.label}>{ind.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Role</label>
                <input
                  type="text"
                  list="current-roles"
                  value={form.currentRole}
                  onChange={(e) => setForm((f) => ({ ...f, currentRole: e.target.value }))}
                  placeholder="e.g. Registered Nurse, Financial Analyst…"
                  className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <datalist id="current-roles">
                  {form.industry &&
                    industries
                      .find((i) => i.label === form.industry)
                      ?.roles.map((r) => <option key={r} value={r} />)}
                </datalist>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Industry</label>
                <select
                  value={form.targetIndustry}
                  onChange={(e) => setForm((f) => ({ ...f, targetIndustry: e.target.value, targetRole: "" }))}
                  className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select industry…</option>
                  {industries.map((ind) => (
                    <option key={ind.label} value={ind.label}>{ind.label}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Role</label>
                <input
                  type="text"
                  list="target-roles"
                  value={form.targetRole}
                  onChange={(e) => setForm((f) => ({ ...f, targetRole: e.target.value }))}
                  placeholder="e.g. Healthcare Administrator, CTO…"
                  className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <datalist id="target-roles">
                  {form.targetIndustry &&
                    industries
                      .find((i) => i.label === form.targetIndustry)
                      ?.roles.map((r) => <option key={r} value={r} />)}
                </datalist>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Years of Experience</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={form.yearsExperience}
                  onChange={(e) => setForm((f) => ({ ...f, yearsExperience: e.target.value }))}
                  placeholder="e.g. 5"
                  className="w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Transferable Skills</label>
                <p className="text-xs text-muted-foreground">Select all that apply</p>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors min-h-[44px] ${
                        form.skills.includes(skill)
                          ? "gradient-mint text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted min-h-[44px]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
          <button
            onClick={step === 2 ? handleFinish : () => setStep((s) => s + 1)}
            disabled={!canNext}
            className="flex-1 flex items-center justify-center gap-2 gradient-mint rounded-xl px-6 py-3 text-sm font-display font-semibold text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100 min-h-[44px]"
          >
            {step === 2 ? "Analyze My Skills" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
