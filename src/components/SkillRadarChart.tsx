import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

const skillData = [
  { skill: "React", current: 85, target: 95 },
  { skill: "TypeScript", current: 70, target: 90 },
  { skill: "System Design", current: 45, target: 85 },
  { skill: "Cloud/AWS", current: 30, target: 80 },
  { skill: "CI/CD", current: 55, target: 75 },
  { skill: "Testing", current: 60, target: 85 },
];

const SkillRadarChart = () => {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={skillData} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="hsl(220 20% 22%)" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: "hsl(215 15% 55%)", fontSize: 12, fontFamily: "Inter" }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "hsl(215 15% 45%)", fontSize: 10 }}
            axisLine={false}
          />
          <Radar
            name="Current Skills"
            dataKey="current"
            stroke="hsl(160 55% 50%)"
            fill="hsl(160 55% 50%)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Radar
            name="Target Requirements"
            dataKey="target"
            stroke="hsl(200 70% 55%)"
            fill="hsl(200 70% 55%)"
            fillOpacity={0.1}
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Legend
            wrapperStyle={{ fontSize: 12, fontFamily: "Inter" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadarChart;
