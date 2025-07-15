import styles from "./button.module.css";
import { clsx } from "clsx";

interface ButtonProps {
  design: "default";
}

const Button = ({ design = "default" }: ButtonProps) => {
  const classNames = clsx(styles.button, styles[design]);

  return <button className={classNames}>qq</button>;
};

export { Button };
