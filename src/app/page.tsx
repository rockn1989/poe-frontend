import IndexPage from "./IndexPage";
import { SkillType } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapterSkillsData = async (data: any): Promise<SkillType[] | []> => {
  if (!data.nodes) return [];

  const { nodes } = data;

  const skillsName = new Set();
  const skills: SkillType[] = [];

  for (const skill in nodes) {
    const { name, icon, stats } = nodes[skill];
    if (!skillsName.has(name)) {
      skills.push({
        name,
        icon,
        stats,
      });
      skillsName.add(name);
    }
  }

  return skills;
};

const getData = async () => {
  const env = process.env;
  const response = await fetch(env.NEXT_PUBLIC_SKILLS_DATA as string);
  if (!response.ok) {
    throw new Error("Error fetch");
  }

  const data = await response.json();

  return data;
};

export default async function Home() {
  const data = await getData();
  const skillsData = await adapterSkillsData(data);

  return <IndexPage data={skillsData} />;
}
