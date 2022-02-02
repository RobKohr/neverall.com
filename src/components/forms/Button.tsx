import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export interface ButtonProps {
  children: ReactNode;
  to?: string;
  isActionButton?: boolean;
  className?: string;
}

export default function ({
  children,
  to,
  isActionButton,
  className: propClassName,
}: ButtonProps) {
  const className = `${isActionButton && "action-button"} ${propClassName}`;
  const navigate = useNavigate();

  const onClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
