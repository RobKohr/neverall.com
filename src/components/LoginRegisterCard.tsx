import { useState } from "react";
import { Card } from "./BasicComponents";
import SignInAndRegister from "./SignInAndRegister";
import { Tab, Tabset } from "./Tabs";

export default function LoginRegisterCard() {
  const [activeTab, setActiveTab] = useState("login");
  return (
    <Card>
      <Tabset {...{ activeTab, setActiveTab }}>
        <Tab id="login">LOG IN</Tab>
        <Tab id="register">REGISTER</Tab>
      </Tabset>
      {activeTab === "login" && <SignInAndRegister title="Login" />}
      {activeTab === "register" && <SignInAndRegister title="Register" />}
    </Card>
  );
}
