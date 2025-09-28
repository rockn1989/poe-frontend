// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SvgSkillsTreeProps = {};

const SvgSkillsTree = ({}: SvgSkillsTreeProps) => (
  <svg xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50,50
             L100,100"
      stroke="#660000"
      fill="none"
    />
    <circle cx={100} cy={100} r={40}></circle>
  </svg>
);

export { SvgSkillsTree };
