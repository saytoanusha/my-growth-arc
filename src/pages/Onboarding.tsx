import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Briefcase,
  Target,
  CheckCircle2,
  UploadCloud,
  FileText,
  X,
  Loader2,
} from "lucide-react";
import { industries } from "@/lib/industries";
import { cn } from "@/lib/utils";

// ─── Platform definitions ──────────────────────────────────────────────────

export interface Platform {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string; // tailwind background utility class (bg-*)
}

export const platforms: Platform[] = [
  {
    id: "corporate",
    label: "Corporate / Business",
    description: "Strategy, consulting, finance, operations, management.",
    icon: "🏢",
    color: "from-blue-900/40 to-blue-800/20",
  },
  {
    id: "healthcare",
    label: "Healthcare Tech",
    description: "Clinical care, health informatics, medical devices.",
    icon: "🏥",
    color: "from-teal-900/40 to-teal-800/20",
  },
  {
    id: "creative",
    label: "Creative Industry",
    description: "Design, media, content, brand, and advertising.",
    icon: "🎨",
    color: "from-purple-900/40 to-purple-800/20",
  },
  {
    id: "education",
    label: "Education / E-learning",
    description: "Teaching, curriculum design, EdTech, training.",
    icon: "📚",
    color: "from-amber-900/40 to-amber-800/20",
  },
  {
    id: "manufacturing",
    label: "Industrial / Manufacturing",
    description: "Production, supply chain, safety, engineering.",
    icon: "🏭",
    color: "from-slate-800/60 to-slate-700/20",
  },
];

// ─── Step definitions ──────────────────────────────────────────────────────

const steps = [
  { icon: UploadCloud, title: "Resume", subtitle: "Upload your CV" },
  { icon: Target, title: "Platform", subtitle: "Choose your arena" },
  { icon: Briefcase, title: "Current Role", subtitle: "Where are you now?" },
  { icon: Target, title: "Target Role", subtitle: "Where do you want to go?" },
  { icon: CheckCircle2, title: "Experience", subtitle: "Tell us about yourself" },
];

// ─── Main component ────────────────────────────────────────────────────────

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [analysing, setAnalysing] = useState(false);
  const [analysisDone, setAnalysisDone] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    currentRole: "",
    industry: "",
    targetRole: "",
    targetIndustry: "",
    yearsExperience: "",
    skills: [] as string[],
  });

  const allSkills = [
    "Leadership",
    "Communication",
    "Problem Solving",
    "Project Management",
    "Data Analysis",
    "Critical Thinking",
    "Teamwork",
    "Adaptability",
    "Time Management",
    "Strategic Planning",
    "Negotiation",
    "Public Speaking",
  ];

  // ─── File handling ─────────────────────────────────────────────────────

  const acceptFile = (file: File) => {
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) return;
    setResumeFile(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) acceptFile(file);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) acceptFile(file);
  };

  // ─── AI analysis simulation ────────────────────────────────────────────

  const runAnalysis = () => {
    setAnalysing(true);
    setTimeout(() => {
      setAnalysing(false);
      setAnalysisDone(true);
    }, 2800);
  };

  // ─── Skill toggle ──────────────────────────────────────────────────────

  const toggleSkill = (skill: string) => {
    setForm((f) => ({
      ...f,
      skills: f.skills.includes(skill)
        ? f.skills.filter((s) => s !== skill)
        : [...f.skills, skill],
    }));
  };

  // ─── Validation ────────────────────────────────────────────────────────

  const canNext =
    (step === 0 && (resumeFile !== null || analysisDone)) ||
    (step === 1 && selectedPlatform !== "") ||
    (step === 2 && form.currentRole && form.industry) ||
    (step === 3 && form.targetRole && form.targetIndustry) ||
    (step === 4 && form.yearsExperience && form.skills.length > 0);

  // ─── Finish ────────────────────────────────────────────────────────────

  const handleFinish = () => {
    localStorage.setItem(
      "skillarc_profile",
      JSON.stringify({
        ...form,
        yearsExperience: Number(form.yearsExperience),
        platform: selectedPlatform,
        resumeName: resumeFile?.name ?? null,
      })
    );
    navigate("/dashboard");
  };

  // ─── Render ────────────────────────────────────────────────────────────

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

        {/* Progress bar */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "h-1.5 w-full rounded-full transition-colors duration-300",
                  i <= step ? "gradient-mint" : "bg-muted"
                )}
              />
              <span
                className={cn(
                  "text-[10px] font-medium hidden sm:block",
                  i <= step ? "text-primary" : "text-muted-foreground"
                )}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* ── STEP 0: Resume Upload ── */}
        {step === 0 && (
          <div className="gradient-card rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-lg">
            <div className="flex items-center gap-3">
              <UploadCloud className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-lg font-display font-semibold">Upload Your Resume</h2>
                <p className="text-sm text-muted-foreground">PDF or DOCX · Max 10 MB</p>
              </div>
            </div>

            {analysing ? (
              /* ── AI Loading Animation ── */
              <div className="flex flex-col items-center justify-center gap-4 py-10">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                  <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-primary animate-pulse" />
                </div>
                <div className="text-center space-y-1">
                  <p className="font-display font-semibold text-foreground">
                    AI Analysing Resume…
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Extracting transferable skills &amp; experience
                  </p>
                </div>
                <div className="w-48 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full gradient-mint rounded-full animate-[progress_2.8s_ease-in-out_forwards]" />
                </div>
              </div>
            ) : analysisDone ? (
              /* ── Analysis complete ── */
              <div className="flex flex-col items-center justify-center gap-3 py-8">
                <div className="h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center">
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                </div>
                <p className="font-display font-semibold text-foreground">
                  Resume Analysed Successfully
                </p>
                <p className="text-sm text-muted-foreground text-center">
                  {resumeFile?.name} — skills extracted and ready to map.
                </p>
                <button
                  onClick={() => { setResumeFile(null); setAnalysisDone(false); }}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 mt-1"
                >
                  <X className="h-3 w-3" /> Remove &amp; re-upload
                </button>
              </div>
            ) : resumeFile ? (
              /* ── File selected, confirm ── */
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm font-medium truncate flex-1">{resumeFile.name}</span>
                  <button onClick={() => setResumeFile(null)}>
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                </div>
                <button
                  onClick={runAnalysis}
                  className="w-full flex items-center justify-center gap-2 gradient-mint rounded-xl px-6 py-3 text-sm font-display font-semibold text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] min-h-[44px]"
                >
                  <Sparkles className="h-4 w-4" />
                  Analyse Resume
                </button>
              </div>
            ) : (
              /* ── Drop zone ── */
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 py-12 cursor-pointer transition-colors",
                  dragOver
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                )}
              >
                <UploadCloud
                  className={cn("h-10 w-10 transition-colors", dragOver ? "text-primary" : "text-muted-foreground")}
                />
                <div className="text-center space-y-1">
                  <p className="font-medium text-sm">
                    Drag &amp; drop your resume here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or{" "}
                    <span className="text-primary underline underline-offset-2">
                      browse files
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">PDF or DOCX accepted</p>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={handleFileInput}
            />

            {/* Skip option */}
            {!resumeFile && !analysing && !analysisDone && (
              <button
                onClick={() => setStep(1)}
                className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip — fill in details manually
              </button>
            )}
          </div>
        )}

        {/* ── STEP 1: Platform Selection ── */}
        {step === 1 && (
          <div className="gradient-card rounded-2xl border border-border p-6 md:p-8 space-y-5 shadow-lg">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-lg font-display font-semibold">Choose Your Target Platform</h2>
                <p className="text-sm text-muted-foreground">We'll tailor your skill targets to this world.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlatform(p.id)}
                  className={cn(
                    "relative flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all min-h-[44px]",
                    selectedPlatform === p.id
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border hover:border-primary/40 hover:bg-muted"
                  )}
                >
                  <span className="text-2xl">{p.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.description}</p>
                  </div>
                  {selectedPlatform === p.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: Current Role ── */}
        {step === 2 && (
          <div className="gradient-card rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-lg">
            <div className="flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-lg font-display font-semibold">Current Role</h2>
                <p className="text-sm text-muted-foreground">Where are you now?</p>
              </div>
            </div>
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
          </div>
        )}

        {/* ── STEP 3: Target Role ── */}
        {step === 3 && (
          <div className="gradient-card rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-lg">
            <div className="flex items-center gap-3">
              <Target className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-lg font-display font-semibold">Target Role</h2>
                <p className="text-sm text-muted-foreground">Where do you want to go?</p>
              </div>
            </div>
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
          </div>
        )}

        {/* ── STEP 4: Experience & Skills ── */}
        {step === 4 && (
          <div className="gradient-card rounded-2xl border border-border p-6 md:p-8 space-y-6 shadow-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-lg font-display font-semibold">Experience</h2>
                <p className="text-sm text-muted-foreground">Tell us about yourself</p>
              </div>
            </div>
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
                      className={cn(
                        "px-3 py-2 rounded-xl text-xs font-medium transition-colors min-h-[44px]",
                        form.skills.includes(skill)
                          ? "gradient-mint text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        {!analysing && (
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
            {/* On step 0 only show Continue when analysis is done */}
            {(step !== 0 || analysisDone) && (
              <button
                onClick={step === 4 ? handleFinish : () => setStep((s) => s + 1)}
                disabled={!canNext}
                className="flex-1 flex items-center justify-center gap-2 gradient-mint rounded-xl px-6 py-3 text-sm font-display font-semibold text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100 min-h-[44px]"
              >
                {step === 4 ? "Analyse My Skills" : "Continue"}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
