import { type ReactNode, type ComponentPropsWithoutRef, type FC } from 'react';
import styles from '../../styles/Button.module.css';

type ButtonProps = { children: ReactNode } & ComponentPropsWithoutRef<'button'>;

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={styles.action_btn} {...props}>
      {children}
    </button>
  );
};

export default Button;
