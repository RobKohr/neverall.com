import { AppContext, AppSettings } from "App";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchSchema } from "schemas/search.schema";
import fetchJson from "utils/fetchJson";
import { AlertsContext } from "./AlertsProvider";
import { Form, Input } from "./forms";
import { Values } from "./forms/Form";

export default function Search() {
  const {
    addSuccessMessage,
    addErrorMessage,
    addErrorMessages,
    handleErrorResponse,
  } = useContext(AlertsContext);
  const [values, setValues] = useState<Values>({ search: "" });
  const navigate = useNavigate();
  const app = useContext(AppContext);

  const onSubmit = (valuesToSubmit: Values) => {
    fetchJson(`/api/search`, {
      method: "POST",
      bodyObj: valuesToSubmit,
      headers: { "Content-Type": "application/json" },
    })
      .then(
        (res: {
          successMessage: string;
          token: string;
          resultsList: unknown[];
          errorMessages: string[];
        }) => {
          if (res?.successMessage) {
            addSuccessMessage("User logged in");
            navigate(`${app.baseUrl}/search?=${values.search}`);
          } else {
            handleErrorResponse(res);
          }
        }
      )
      .catch((err) => {
        const errorText = String(err);
        switch (errorText) {
          case "TypeError: (destructured parameter) is undefined":
            addErrorMessage("Failed to get a response from API");
            break;
          default:
            addErrorMessage(`Unhandled Error: ${errorText}`);
        }
      });
  };

  return (
    <div className="search-container">
      <Form
        values={values}
        setValues={setValues}
        schema={searchSchema}
        onSubmit={onSubmit}
        remap={[
          {
            name: "retypePassword",
            replacement: "Re-type password much match",
          },
        ]}
      >
        <Input
          className="search"
          placeholder="Search"
          name="search"
          label="Search"
          hideLabel
        />
      </Form>
    </div>
  );
}
