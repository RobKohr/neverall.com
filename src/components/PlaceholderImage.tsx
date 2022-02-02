import { CSSProperties } from "react";

export default function PlaceholderImage({
  width,
  height,
  label,
  style,
}: {
  width: number;
  height: number;
  label: string;
  style?: CSSProperties;
}) {
  return (
    <img
      style={style}
      src={`https://via.placeholder.com/${width}x${height}.png?text=${label}`}
    />
  );
}
