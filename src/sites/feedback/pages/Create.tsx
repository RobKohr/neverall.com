import { Form, Input, jsonHeaders, Submit } from "components/forms";
import Button from "components/forms/Button";
import { Values } from "components/forms/Form";
import Lipsum from "components/Lipsum";
import PlaceholderImage from "components/PlaceholderImage";
import { Tab, Tabset } from "components/Tabs";
import React, { ReactNode, useState } from "react";
import {
  forum,
  CreateForumValues,
  createForumDefaults,
} from "schemas/feedback/forum.schema";
import fetchJson from "utils/fetchJson";

export default function Create() {
  const [values, setValues] = useState<Values>(createForumDefaults);
  function onSubmit(valuesToSubmit: Values) {
    fetchJson(`/api/feedback/forum`, {
      method: "POST",
      bodyObj: valuesToSubmit,
      headers: jsonHeaders,
    })
      .then(
        (res: {
          successMessage: string;
          token: string;
          user: { username: string; role: string; _id: string };
          errorMessages: string[];
        }) => {
          if (res?.successMessage) {
          } else {
            //handleErrorResponse(res);
          }
        }
      )
      .catch((err) => {
        const errorText = String(err);
        switch (errorText) {
          case "TypeError: (destructured parameter) is undefined":
            //addErrorMessage("Failed to get a response from API");
            break;
          default:
          // addErrorMessage(`Unhandled Error: ${errorText}`);
        }
      });
  }

  return (
    <div className="page page-create">
      <Form card {...{ values, setValues, onSubmit, schema: forum, remap: [] }}>
        <Tabset activeTab="create">
          <Tab id="create">Create a Forum</Tab>
        </Tabset>
        <fieldset>
          <Input name="siteUrl" label="Your Site URL" />
          <Input
            name="name"
            label="Title"
            note="This will go on top of all forum pages"
          />
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
