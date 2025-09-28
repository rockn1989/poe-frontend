import { SkillType } from "@/types";

import { hightLightWord } from "@/utils/hightlightWord";
import s from "./SkillsList.module.scss";

type SkillsListProps = {
  data: SkillType[];
  query: string;
};

export function SkillsList({ data, query }: SkillsListProps) {
  return (
    <div>
      {query && query.length > 0 && (
        <div className={s.total}>
          Всего найдено талантов: <span>{data.length}</span>
        </div>
      )}
      <ul className={s.root}>
        {data.map((item, index) => {
          return (
            <li key={`${item.name}_${index}`} className={s.item}>
              <div className={s.imageWrapper}>
                <img
                  loading="lazy"
                  width={64}
                  height={64}
                  src={item.icon}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.src = "/NoImage.png";
                  }}
                />
              </div>
              <div className={s.description}>
                <div
                  className={s.name}
                  dangerouslySetInnerHTML={{
                    __html: hightLightWord(item.name, query),
                  }}
                />
                <div>
                  {item.stats &&
                    item.stats.length > 0 &&
                    item.stats.map((stat: string, index: number) => {
                      return <p key={`${item.name}_stat_${index}`}>{stat}</p>;
                    })}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
