import { ReactNode } from "react";
import s from "./Wrapper.module.scss";

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => (
  <div className={s.root}>{children}</div>
);

export { Wrapper };
