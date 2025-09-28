import s from "./Search.module.scss";

type SearchProps = {
  onChange: (value: string) => void;
  query: string;
};

const Search = ({ onChange, query }: SearchProps) => (
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

export { Search };
