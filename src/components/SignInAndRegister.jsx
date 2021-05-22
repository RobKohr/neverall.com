import React, { useState } from "react";
import Input from "../components/Input";
import Submit from "../components/Submit";
import Form from "./Form";
import { register } from "../schemas/users.schema";
import A from "./A";
export default function SignInAndRegister({ title }) {
  const [values, setValues] = useState({ username: "", password: "" });
  const onSubmit = ({ values }) => {};
  return (
    <Form
      values={values}
      setValues={setValues}
      schema={register}
      onSubmit={onSubmit}
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
