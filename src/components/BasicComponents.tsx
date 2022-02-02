import { CSSProperties, ReactNode } from "react";

/* 
This is for components that are really just <div className="some-className">Children</div> where the className matches the component name

All of these components can receive styling and additional classes.
*/

export default function BasicWrapper({
  children,
  className,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className: string;
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

function curry(className: string) {
  return function Component({
    children,
    style,
    className: additionalClassName = "",
  }: {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
  }) {
    return (
      <BasicWrapper
        {...{
          className: `${className} ${additionalClassName}`,
          children,
          style,
        }}
      />
    );
  };
}

export const Note = curry("note");
export const Banner = curry("banner");
export const Card = curry("card");
