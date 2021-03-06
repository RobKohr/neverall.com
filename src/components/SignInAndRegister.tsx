import React, { useContext, useState } from "react";
import { AppContext, CookieContext } from "App";
import { useNavigate } from "react-router-dom";
import { Input, Submit, Form, jsonHeaders } from "./forms";
import { registerSchema, loginSchema } from "../schemas/users.schema";
import A from "./A";
import fetchJson from "../utils/fetchJson";
import { AlertsContext } from "./AlertsProvider";
import { Values } from "./forms/Form";
import { CookieSetOptions } from "universal-cookie";

export default function SignInAndRegister({ title }: { title: string }) {
  const {
    addSuccessMessage,
    addErrorMessage,
    addErrorMessages,
    handleErrorResponse,
  } = useContext(AlertsContext);
  const app = useContext(AppContext);
  const navigate = useNavigate();
  const [values, setValues] = useState<Values>({ username: "", password: "" });
  const formType = title === "Login" ? "login" : "register";
  const { setCookie } = useContext(CookieContext);
  const schema = formType === "login" ? loginSchema : registerSchema;
  const onSubmit = (valuesToSubmit: Values) => {
    fetchJson(`/api/users/${formType}`, {
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
          const cookieOptions: CookieSetOptions = {
            path: "/",
            sameSite: "lax",
          };
          if (res?.successMessage) {
            if (formType === "login" && setCookie) {
              setCookie("token", res.token, cookieOptions);
              setCookie("username", res.user.username, cookieOptions);
              setCookie("userId", res.user._id, cookieOptions);
            }
            addSuccessMessage("User logged in");
            navigate(
              formType === "register"
                ? `${app.baseUrl}/login`
                : `${app.baseUrl}/`
            );
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
      <div className={`page page-sign-in form-${title}`}>
        <div>
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
            <A to="login">Have an account already? Sign in!</A>
          )}
          {title === "Sign In" && <A to="register">No account? Sign up!</A>}
        </div>
      </div>
    </Form>
  );
}
