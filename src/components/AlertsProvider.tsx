import { createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";
import "./AlertsProvider.scss";
export const AlertsContext = createContext({});

interface Props {
  children: any;
}

interface Alert {
  message: string;
  timeout?: number;
  closeable?: boolean;
  id?: string;
  type: "error" | "success";
}

function reducer(alerts: Alert[], action: any) {
  switch (action.type) {
    case "add":
      return [...alerts, action.alert];
    case "remove":
      return [...alerts].filter(({ id }) => id !== action.alert.id);
    default:
      throw new Error();
  }
}

export default function AlertsProvider({ children }: Props) {
  const [alerts, alertsDispatcher] = useReducer(reducer, []);

  function addAlert({
    message,
    type = "error",
    timeout = 3000,
    closeable = true,
  }: Alert) {
    const alert = { message, timeout, closeable, id: uuid(), type };
    alertsDispatcher({ type: "add", alert });
    setTimeout(() => {
      alertsDispatcher({ type: "remove", alert });
    }, alert.timeout);
  }

  function addSuccessMessage(message: string) {
    addAlert({ message, type: "success" });
  }
  function addSuccessMessages(messages: string[]) {
    messages.forEach((message) => addSuccessMessage(message));
  }

  function addErrorMessage(message: string) {
    addAlert({ message, type: "error" });
  }

  function addErrorMessages(messages: string[]) {
    messages.forEach((message) => addErrorMessage(message));
  }

  console.log({ alerts });

  return (
    <>
      {alerts.length && (
        <div className="alert-groups">
          <div className="alerts errors">
            {alerts
              .filter(({ type }) => type === "error")
              .map((error) => (
                <div key={error.id} className="alert error">
                  {error.message}
                </div>
              ))}
          </div>
          <div className="alerts successes">
            {alerts
              .filter(({ type }) => type === "success")
              .map((error) => (
                <div key={error.id} className="alert success">
                  {error.message}
                </div>
              ))}
          </div>
        </div>
      )}
      <AlertsContext.Provider
        value={{
          addAlert,
          addSuccessMessage,
          addSuccessMessages,
          addErrorMessage,
          addErrorMessages,
        }}
      >
        {children}
      </AlertsContext.Provider>
    </>
  );
}
