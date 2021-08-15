import { string } from "joi";
import { useState, createContext } from "react";
import { v4 as uuid } from "uuid";
export const ErrorContext = createContext({});

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
  const [errors, setErrors] = useState<Alert[]>([]);

  function addAlert({
    message,
    type = "error",
    timeout = 3000,
    closeable = true,
  }: Alert) {
    const error = { message, timeout, closeable, id: uuid(), type };
    setErrors([...errors, error]);
    setTimeout(() => {
      setErrors(errors.filter(({ id }) => id !== error.id));
    }, error.timeout);
  }

  function addSuccessMessage(message: string) {
    addAlert({ message, type: "success" });
  }

  function addErrorMessage(message: string) {
    addAlert({ message, type: "error" });
  }

  return (
    <>
      <div className="errors">
        {errors
          .filter(({ type }) => type === "error")
          .map((error) => (
            <div className="error">{error}</div>
          ))}
      </div>
      <div className="successes">
        {errors
          .filter(({ type }) => type === "success")
          .map((error) => (
            <div className="error">{error}</div>
          ))}
      </div>
      <ErrorContext.Provider
        value={{ addAlert, addSuccessMessage, addErrorMessage }}
      >
        {children}
      </ErrorContext.Provider>
    </>
  );
}
