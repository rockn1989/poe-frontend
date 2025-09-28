import { SkillType } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapterSkillsData = async (data: any): Promise<SkillType[] | []> => {
  if (!data.nodes) return [];

  const { nodes } = data;

  const skillsName = new Set();
  const skills: SkillType[] = [];

  for (const skill in nodes) {
    const { name, icon, stats } = nodes[skill];

    if (!skillsName.has(name) && name && !name.includes("DNT")) {
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

export { adapterSkillsData };
