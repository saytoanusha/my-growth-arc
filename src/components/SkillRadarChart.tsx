import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface SkillDataPoint {
  skill: string;
  current: number;
  target: number;
}

interface SkillRadarChartProps {
  data?: SkillDataPoint[];
}

const defaultData: SkillDataPoint[] = [
  { skill: "Leadership", current: 65, target: 85 },
  { skill: "Communication", current: 75, target: 90 },
  { skill: "Problem Solving", current: 70, target: 88 },
  { skill: "Data Analysis", current: 45, target: 80 },
  { skill: "Project Mgmt", current: 55, target: 85 },
  { skill: "Strategic Plan.", current: 35, target: 82 },
];

const SkillRadarChart = ({ data = defaultData }: SkillRadarChartProps) => {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="hsl(220 20% 22%)" />
          <PolarAngleAxis
            dataKey="skill"
            tick={{ fill: "hsl(215 15% 55%)", fontSize: 11, fontFamily: "Inter" }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "hsl(215 15% 45%)", fontSize: 10 }}
            axisLine={false}
          />
          <Radar
            name="Your Skills"
            dataKey="current"
            stroke="hsl(160 55% 50%)"
            fill="hsl(160 55% 50%)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Radar
            name="Target Role"
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
