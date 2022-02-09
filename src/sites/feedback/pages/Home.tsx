import { Banner } from "components/BasicComponents";
import Button from "components/forms/Button";
import Lipsum from "components/Lipsum";
import PlaceholderImage from "components/PlaceholderImage";
import React, { ReactNode } from "react";
import { ReactComponent as NeverallLogo } from "../../../assets/icons/neverall-logo.svg";

export default function Home() {
  return (
    <div>
      <Banner>
        <div style={{ padding: "2rem", flexGrow: 1 }}>
          <h2>Get Feedback from your customers</h2>
          <p>
            Feedback Forums by{" "}
            <a href="https://neverall.com">
              <NeverallLogo
                style={{
                  width: "3em",
                  height: "3em",
                  fill: "blue",
                  margin: "-3px",
                }}
                viewBox="0 0 100 30"
              />
              NeverAll
            </a>{" "}
            empowers your users to provide ideas, suggestions, and report bugs.
          </p>
          <p>
            Beyond all that, it also allows users to vote up or down feedback to
            help you prioritize what really matters most to users.
          </p>
          <p>
            <Button to="create" isActionButton>
              Create A Feedback Forum
            </Button>
          </p>
        </div>

        <div>
          <PlaceholderImage
            width={450}
            height={420}
            label={"Feedback banner image"}
            style={{ maxWidth: "100%" }}
          />
        </div>
      </Banner>
      <Lipsum paragraphs={5} />;
    </div>
  );
}
