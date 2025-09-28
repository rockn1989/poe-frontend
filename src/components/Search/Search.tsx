import { memo } from "react";
import s from "./Search.module.scss";

type SearchProps = {
  onChange: (value: string) => void;
  query: string;
};

const Search = memo(({ onChange, query }: SearchProps) => {
  return (
    <div className={s.root}>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        className={s.input}
        placeholder="Поиск по талантам"
        value={query}
      />
    </div>
  );
});

Search.displayName = "Search";

export { Search };
