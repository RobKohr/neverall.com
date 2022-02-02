import { Banner } from "components/BasicComponents";
import Button from "components/forms/Button";
import Lipsum from "components/Lipsum";
import PlaceholderImage from "components/PlaceholderImage";
import React, { ReactNode } from "react";

export default function Home() {
  return (
    <div>
      <Banner>
        <div style={{ padding: "2rem", flexGrow: 1 }}>
          <h2>Get Feedback from your customers</h2>
          <p>This is some powerful convincing text</p>
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
