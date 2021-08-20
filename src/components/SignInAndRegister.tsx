import React, { useContext, useState } from "react";
import { Input, Submit, Form } from "./forms";
import { registerSchema, loginSchema } from "../schemas/users.schema";
import A from "./A";
import { AppContext, CookieContext } from "App";
import { navigate } from "@reach/router";
import fetchJson from "../utils/fetchJson";
import { AlertsContext } from "./AlertsProvider";

export default function SignInAndRegister({ title }: { title: string }) {
  const { addAlert, addSuccessMessage, addErrorMessage }: any =
    useContext(AlertsContext);
  const app = useContext(AppContext);
  console.log({ app });
  const [values, setValues] = useState({ username: "", password: "" });
  const formType = title === "Sign In" ? "login" : "register";
  const { setCookie } = useContext(CookieContext);
  console.log({ setCookie });

  const onSubmit = ({ values }: any) => {
    const onSuccessfulSubmission = (res: {
      successMessage: any;
      token: any;
      user: { username: any; role: any; _id: any };
      errorMessage: any;
    }) => {
      if (res.successMessage) {
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
        addAlert(res.errorMessage);
      }
    };
    fetchJson(`/api/users/${formType}`, {
      method: "POST",
      bodyObj: values,
      headers: { "Content-Type": "application/json" },
    })
      .then(onSuccessfulSubmission)
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Form
      values={values}
      setValues={setValues}
      schema={formType === "login" ? loginSchema : registerSchema}
      onSubmit={onSubmit}
      remap={[
        {
          name: "retypePassword",
          replacement: "Re-type password much match",
        },
      ]}
    >
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
