import React, { useState } from "react";
import Input from "../components/Input";
import { Link } from "@reach/router";
import Form from "./Form";

export default function SignInAndRegister({ title }) {
  const [values, setValues] = useState({});
  const updateValue = ({ name, value }) => {
    setValues({ ...values, [name]: value });
  };
  const inputProps = { values, updateValue };
  console.log(values);
  return (
    <Form values={values} setValues={setValues}>
      <div className="page page-sign-in">
        <div>
          <h2>{title}</h2>
          <fieldset>
            <Input name="username" label="Username" {...inputProps} />
            {title === "Register" && (
              <Input name="email" label="Email" {...inputProps} />
            )}
            <Input
              type="password"
              name="password"
              label="Password"
              {...inputProps}
            />
            {title === "Register" && (
              <Input
                type="password"
                name="retypePasswored"
                label="Retype-Password"
                {...inputProps}
              />
            )}
            <input type="submit" value={title} />
          </fieldset>
        </div>
        <div>
          {title === "Register" && (
            <Link to="/signin">Have an account already? Sign in!</Link>
          )}
          {title === "Sign In" && (
            <Link to="/register">No account? Sign up!</Link>
          )}
        </div>
      </div>
    </Form>
  );
}
