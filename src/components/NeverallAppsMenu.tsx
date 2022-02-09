import { ReactComponent as NeverallLogo } from "../assets/icons/neverall-logo.svg";
import { ReactComponent as Apps } from "../assets/icons/apps.svg";

export default function NeverallAppsMenu() {
  return (
    <div className="logo-container">
      <a href="https://neverall.com">
        <NeverallLogo
          style={{
            width: "60px",
            height: "60px",
            fill: "white",
            position: "relative",
            top: "-10px",
            left: "0px",
          }}
        />
        {
          <Apps
            style={{
              width: "25px",
              height: "25px",
              fill: "white",
              position: "relative",
              top: "3px",
              left: "-43px",
            }}
          />
        }
      </a>
    </div>
  );
}
