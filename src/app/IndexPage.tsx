"use client";

import { useCallback, useState, useTransition } from "react";

import { SkillType } from "../types";

import { Search } from "@/components/Search";
import { SkillsList } from "@/components/SkillsList";
import { SvgSkillsTree } from "@/components/SvgSkillsTree";
import { Wrapper } from "@/components/Wrapper";
import s from "./IndexPage.module.scss";

export default function IndexPage({ data }: { data: SkillType[] }) {
  const [filteredData, setFilteredData] = useState(data);
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleFilterData = useCallback(
    (value: string) => {
      setQuery(value);
      startTransition(() => {
        const skillsData = data.filter((item) =>
          item.name.toLowerCase().includes(value)
        );

        setFilteredData(skillsData);
      });
    },
    [data]
  );

  return (
    <section className={s.root}>
      <Wrapper>
        <SvgSkillsTree />
        <Search onChange={handleFilterData} query={query} />
        {isPending ? (
          <div>Поиск...</div>
        ) : filteredData.length > 0 ? (
          <SkillsList data={filteredData} query={query} />
        ) : (
          <h2>Ничего не найдено</h2>
        )}
      </Wrapper>
    </section>
  );
}
