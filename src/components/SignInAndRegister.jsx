import React, { useContext, useState } from "react";
import Input from "../components/Input";
import Submit from "../components/Submit";
import Form from "./Form";
import { register } from "../schemas/users.schema";
import A from "./A";
import { CookieContext } from "App";
import { navigate } from "@reach/router";
import fetchJson from "../utils/fetchJson";

export default function SignInAndRegister({ title }) {
  const [values, setValues] = useState({ username: "", password: "" });
  const formType = title === "Login" ? "login" : "register";
  const { setCookie } = useContext(CookieContext);
  console.log({ setCookie });

  function setErrorMessage(message) {
    console.error(message);
  }
  const onSubmit = ({ values }) => {
    const onSuccessfulSubmission = (res) => {
      if (res.successMessage) {
        if (formType === "login") {
          setCookie("token", res.token);
          setCookie("username", res.user.username);
          setCookie("role", res.user.role);
          setCookie("userId", res.user._id);
        }
        setErrorMessage("User logged in");
        navigate(formType === "register" ? `/login` : `/`);
      } else {
        setErrorMessage(res.errorMessage);
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
      schema={register}
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
