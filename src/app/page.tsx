import { adapterSkillsData } from "@/utils/adapterSkillsData";
import mockJson from "../mocks/data_ru.json";
import IndexPage from "./IndexPage";

const getData = async () => {
  const env = process.env;

  try {
    const response = await fetch(env.NEXT_PUBLIC_SKILLS_DATA as string);
    if (!response.ok) {
      throw new Error("Error fetch");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
    return mockJson;
  }
};

export default async function Home() {
  const data = await getData();
  const skillsData = await adapterSkillsData(data);

  return <IndexPage data={skillsData} />;
}
