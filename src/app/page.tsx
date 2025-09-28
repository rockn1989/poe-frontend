import { adapterSkillsData } from "@/utils/adapterSkillsData";
import IndexPage from "./IndexPage";

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
