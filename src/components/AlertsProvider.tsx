import { string } from "joi";
import { useState, createContext } from "react";
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

export default function AlertsProvider({ children }: Props) {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      type: "success",
      message: "test success message",
      timeout: 3000,
      closeable: true,
    },
    {
      type: "error",
      message: "test error message",
      timeout: 3000,
      closeable: true,
    },
    {
      type: "error",
      message: "test error 2 message",
      timeout: 3000,
      closeable: true,
    },
  ]);

  function addAlert({
    message,
    type = "error",
    timeout = 3000,
    closeable = true,
  }: Alert) {
    const alert = { message, timeout, closeable, id: uuid(), type };
    setAlerts([...alerts, alert]);
    setTimeout(() => {
      setAlerts(alerts.filter(({ id }) => id !== alert.id));
    }, alert.timeout);
  }

  function addSuccessMessage(message: string) {
    addAlert({ message, type: "success" });
  }

  function addErrorMessage(message: string) {
    addAlert({ message, type: "error" });
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
                <div key={error.message} className="alert error">
                  {error.message}
                </div>
              ))}
          </div>
          <div className="alerts successes">
            {alerts
              .filter(({ type }) => type === "success")
              .map((error) => (
                <div key={error.message} className="alert success">
                  {error.message}
                </div>
              ))}
          </div>
        </div>
      )}
      <AlertsContext.Provider
        value={{ addAlert, addSuccessMessage, addErrorMessage }}
      >
        {children}
      </AlertsContext.Provider>
    </>
  );
}
