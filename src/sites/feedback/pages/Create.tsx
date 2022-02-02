import { Form, Input, Submit } from "components/forms";
import Button from "components/forms/Button";
import { Values } from "components/forms/Form";
import Lipsum from "components/Lipsum";
import PlaceholderImage from "components/PlaceholderImage";
import { Tab, Tabset } from "components/Tabs";
import React, { ReactNode, useState } from "react";
import { forum } from "schemas/feedback/forum.schema";

export default function Create() {
  const [values, setValues] = useState<Values>({ siteUrl: "", shortName: "" });
  function onSubmit() {}

  return (
    <div className="page page-create">
      <Form card {...{ values, setValues, onSubmit, schema: forum, remap: [] }}>
        <Tabset activeTab="create">
          <Tab id="create">Create a Forum</Tab>
        </Tabset>
        <fieldset>
          <Input name="siteUrl" label="Your Site URL" />
          <Input
            name="shortName"
            label="Short name for the forum"
            note="Less than 80 characters, letters, numbers, and - only (no spaces)"
          />
          <Submit label="Create" />
        </fieldset>
      </Form>
    </div>
  );
}
