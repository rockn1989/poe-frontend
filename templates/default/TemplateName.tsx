import s from "./TemplateName.module.scss";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type TemplateNameProps = {};

const TemplateName = ({}: TemplateNameProps) => (
  <div className={s.root}>TemplateName Component</div>
);

export { TemplateName };
