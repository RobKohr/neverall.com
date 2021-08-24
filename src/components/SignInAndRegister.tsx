import React, { useContext, useState } from "react";
import { Input, Submit, Form } from "./forms";
import { registerSchema, loginSchema } from "../schemas/users.schema";
import A from "./A";
import { AppContext, CookieContext } from "App";
import { navigate } from "@reach/router";
import fetchJson from "../utils/fetchJson";
import { AlertsContext } from "./AlertsProvider";

export default function SignInAndRegister({ title }: { title: string }) {
  const { addSuccessMessage, addErrorMessage, addErrorMessages }: any =
    useContext(AlertsContext);
  const app = useContext(AppContext);

  const [values, setValues] = useState({ username: "", password: "" });
  const formType = title === "Sign In" ? "login" : "register";
  const { setCookie } = useContext(CookieContext);
  const schema = formType === "login" ? loginSchema : registerSchema;
  const onSubmit = ({ values }: any) => {
    fetchJson(`/api/users/${formType}`, {
      method: "POST",
      bodyObj: values,
      headers: { "Content-Type": "application/json" },
    })
      .then(
        (res: {
          successMessage: any;
          token: any;
          user: { username: any; role: any; _id: any };
          errorMessages: string[];
        }) => {
          if (res?.successMessage) {
            if (formType === "login") {
              setCookie("token", res.token);
              setCookie("username", res.user.username);
              setCookie("role", res.user.role);
              setCookie("userId", res.user._id);
            }
            addSuccessMessage("User logged in");
            navigate(
              formType === "register" ? `${app.baseUrl}login` : `${app.baseUrl}`
            );
          } else {
            addErrorMessages(res.errorMessages);
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
            addErrorMessage("Unhandled Error: " + errorText);
        }
      });
  };
  return (
    <Form
      values={values}
      setValues={setValues}
      schema={schema}
      onSubmit={onSubmit}
      remap={[
        {
          name: "retypePassword",
          replacement: "Re-type password much match",
        },
      ]}
    >
      <div onClick={() => addErrorMessage("some test error message")}>
        error
      </div>
      <div onClick={() => addSuccessMessage("some test notice message")}>
        notice
      </div>
      <div className="page page-sign-in">
        <div>
          <h2>{title}</h2>
          <fieldset>
            <Input name="username" label="Username" />
            {title === "Register" && <Input name="email" label="Email" />}
            <Input type="password" name="password" label="Password" />
            {title === "Register" && (
              <Input
                type="password"
                name="retypePassword"
                label="Retype-Password"
              />
            )}
            <Submit label={title} />
          </fieldset>
        </div>
        <div>
          {title === "Register" && (
            <A to="signin">Have an account already? Sign in!</A>
          )}
          {title === "Sign In" && <A to="register">No account? Sign up!</A>}
        </div>
      </div>
    </Form>
  );
}
